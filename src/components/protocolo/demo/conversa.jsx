import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cliqueComprar, eventoClarity, linkCheckout } from "../checkout";
import CartoesGuia from "./cartoes-guia";
import { CASOS, faixaAvulsa, montarProposta, primeiroNome, valoresPara } from "./proposta";
import GUIA_EXEMPLOS from "./guia-exemplos";
import { espera, reduzMovimento, useEntrada } from "./movimento";
import { AreaPdf } from "./pdf";
import { ehInstagram, entregarPdf, gerarBlobPdf, nomeArquivo } from "./pdf-export";
import { misturar } from "./tema";
import Visualizador from "./visualizador";
import { reais } from "./formato";
import {
  Arquivo, Barra, Bot, BotaoClaro, BotaoEscuro, Cabecalho, Chips, Digitando, Fundo, Giro, Mensagem,
  Nota, Oferta, Opcoes, Paletas, Pessoa, Pular, Rica, Rolagem, Tela, Zap,
} from "./chat-style";

/**
 * A demo como conversa (direcao B). Uma tela de chat, um estado so:
 * nome, logo, caso, avulsa, valores, cor. Cada resposta vira bolha; o
 * assistente "digita" antes de cada fala; a proposta chega como arquivo.
 * Nada vai para localStorage nem para fora do aparelho.
 *
 * Os itens da conversa sao dados (`itens`); o que depende do estado (regua,
 * valores, miniatura) le `e` na hora de desenhar.
 */

const EXEMPLO_PROF = "Carla Mendes";
const PASSOS = { nome: ["1 de 4", 25], caso: ["2 de 4", 50], valor: ["3 de 4", 75], cor: ["4 de 4", 88], pronta: ["pronta", 100] };

const preenche = (texto, vars) => texto.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

const Seta = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const IconePdf = ({ tam = 24, cor = "#9B3412" }) => (
  <svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

/** Cada bolha sobe com fade ao entrar. */
function Entra({ children }) {
  const ref = useRef(null);
  useEntrada(ref);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }} className="entra">
      {children}
    </div>
  );
}

/* Barras da onda de audio, sempre as mesmas. */
const ONDA = Array.from({ length: 34 }, (_, i) => 6 + Math.round(Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)) * 18));

function ConversaExemplo({ rotulo, conversa }) {
  const [tudo, setTudo] = useState(false);
  const mostradas = tudo ? conversa : conversa.slice(0, 4);
  return (
    <Zap>
      <div className="rotulo">{rotulo}</div>
      <div className="fundo">
        {mostradas.map((m, i) => (
          <div key={i} className={`m ${m.de}`}>
            {m.texto}
            {m.anexo && (
              <div className="anexo">
                <IconePdf tam={14} />
                {m.anexo}
              </div>
            )}
          </div>
        ))}
      </div>
      {conversa.length > 4 && (
        <button type="button" className="mais" aria-expanded={tudo} onClick={() => setTudo((v) => !v)}>
          {tudo ? "ver menos" : "ver tudo"}
        </button>
      )}
    </Zap>
  );
}

function AudioExemplo({ audio }) {
  const [ver, setVer] = useState(false);
  return (
    <Zap>
      <div className="audio">
        <span className="play" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
        </span>
        <span className="onda" aria-hidden="true">
          {ONDA.map((h, i) => (
            <i key={i} style={{ height: h }} />
          ))}
        </span>
        <span className="dur">{audio.duracao}</span>
      </div>
      <button type="button" className="mais" aria-expanded={ver} onClick={() => setVer((v) => !v)}>
        {ver ? "ocultar transcrição" : "ver transcrição"}
      </button>
      {ver && <div className="transcricao">{audio.transcricao}</div>}
    </Zap>
  );
}

function InputValor({ valor, aoMudar, rotulo }) {
  const [foco, setFoco] = useState(false);
  const ref = useRef(null);
  const mostrado = !foco && valor !== "" ? reais(Number(valor)) : valor;
  /* Ao focar, o texto passa de "2.080" para "2080": seleciona tudo depois
     dessa troca, antes de pintar, para quem digita substituir o valor. */
  useLayoutEffect(() => {
    if (foco) ref.current?.select();
  }, [foco]);
  return (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      aria-label={rotulo}
      value={mostrado}
      size={Math.max(String(mostrado).length, 3)}
      style={{ width: `${Math.max(String(mostrado).length, 3)}ch` }}
      onFocus={() => setFoco(true)}
      onBlur={() => setFoco(false)}
      onChange={(ev) => aoMudar(ev.target.value.replace(/\D/g, "").slice(0, 6))}
    />
  );
}

export default function Conversa({ d, demo }) {
  const nicho = d.slug;
  const casos = CASOS[nicho];
  const href = useMemo(() => linkCheckout(d.checkout, nicho, `demo-protocolo-${nicho}`), [d, nicho]);

  const [itens, setItens] = useState([{ id: 0, tipo: "nota" }]);
  const [digitando, setDigitando] = useState(false);
  const [etapa, setEtapa] = useState("nome");
  const [barra, setBarra] = useState(null);
  const [texto, setTexto] = useState("");
  const [e, setEstado] = useState({ prof: "", logo: null, casoId: null, avulsa: "", valor: [], cor: null });
  const [viz, setViz] = useState(false);
  const [pdf, setPdf] = useState({ estado: "", aviso: "" });

  const eRef = useRef(e);
  const corrida = useRef(0);
  const nid = useRef(0);
  const rolagem = useRef(null);
  const areaPdf = useRef(null);
  const arquivoInput = useRef(null);
  const inicio = useRef(false);

  const atualizar = useCallback((parte) => {
    const novo = { ...eRef.current, ...(typeof parte === "function" ? parte(eRef.current) : parte) };
    eRef.current = novo;
    setEstado(novo);
  }, []);

  const caso = casos.find((c) => c.id === e.casoId) ?? casos[0];
  const p = useMemo(() => montarProposta(nicho, caso.id), [nicho, caso.id]);
  const dadosFolha = useMemo(
    () => ({ prof: e.prof || EXEMPLO_PROF, logo: e.logo, pessoa: caso.nome, avulsa: e.avulsa || p.plano.avulsa, valor: e.valor.length ? e.valor : valoresPara(p, p.plano.avulsa), cor: e.cor }),
    [e, caso.nome, p],
  );
  const vars = {
    nomeCaso: primeiroNome(caso.nome),
    seuNome: primeiroNome(e.prof || EXEMPLO_PROF),
    pessoa: demo.pessoa,
    nome: primeiroNome(caso.nome),
  };
  const arquivoNome = `Proposta · ${caso.nome}.pdf`;

  /* ---------- fila de falas ---------- */

  const adicionar = useCallback((item) => {
    const id = ++nid.current;
    setItens((l) => [...l, { id, ...item }]);
    return id;
  }, []);

  const atualizarItem = useCallback((tipo, parte) => {
    setItens((l) => l.map((it) => (it.tipo === tipo ? { ...it, ...parte } : it)));
  }, []);

  const removerTipos = useCallback((...tipos) => {
    setItens((l) => l.filter((it) => !tipos.includes(it.tipo)));
  }, []);

  /** O assistente "digita" 600 a 900 ms antes de cada fala. */
  const falar = useCallback(
    async (lista) => {
      const meu = corrida.current;
      for (const item of lista) {
        setDigitando(true);
        await espera(600 + Math.random() * 300);
        if (meu !== corrida.current) return false;
        setDigitando(false);
        adicionar(item);
        await espera(140);
        if (meu !== corrida.current) return false;
      }
      return true;
    },
    [adicionar],
  );

  /* ---------- rolagem automatica ---------- */

  const rolar = useCallback(() => {
    const el = rolagem.current;
    if (!el) return;
    const lista = el.firstElementChild;
    const ultimo = lista?.lastElementChild;
    if (!ultimo) return;
    const suave = reduzMovimento() ? "auto" : "smooth";
    if (ultimo.offsetHeight > el.clientHeight - 28) {
      el.scrollTo({ top: Math.max(0, ultimo.offsetTop - 12), behavior: suave });
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: suave });
    }
  }, []);

  useLayoutEffect(() => {
    rolar();
  }, [itens.length, digitando, barra, rolar]);

  /* ---------- o roteiro ---------- */

  const fluxoGuia = useCallback(async () => {
    const meu = corrida.current;
    const ex = GUIA_EXEMPLOS[nicho][eRef.current.casoId ?? casos[0].id];
    const casoAtual = casos.find((c) => c.id === (eRef.current.casoId ?? casos[0].id)) ?? casos[0];
    const v = { pessoa: demo.pessoa, nome: primeiroNome(casoAtual.nome) };
    let ok = await falar([{ tipo: "bot", texto: preenche(demo.guia.intro, v) }]);
    if (!ok) return;
    setBarra("guia");
    ok = await falar([{ tipo: "guiaConversa", rotulo: preenche(demo.guia.exemploRotulo, v), conversa: ex.conversa }]);
    if (!ok) return;
    if (ex.audio) {
      ok = await falar([{ tipo: "guiaAudio", audio: ex.audio }]);
      if (!ok) return;
    }
    setDigitando(false);
    const idMontando = adicionar({ tipo: "montando" });
    await espera(1500);
    if (meu !== corrida.current) return;
    setItens((l) => l.filter((it) => it.id !== idMontando));
    eventoClarity("viu_guia");
    adicionar({ tipo: "guiaCartoes", guia: ex.guia });
  }, [nicho, casos, demo, falar, adicionar]);

  const aoTerminarCartoes = useCallback(async () => {
    const meu = corrida.current;
    await espera(300);
    if (meu !== corrida.current) return;
    setItens((l) => (l.some((it) => it.tipo === "oferta") ? l : [...l, { id: ++nid.current, tipo: "oferta" }]));
  }, []);

  const fluxoPronta = useCallback(async () => {
    setEtapa("pronta");
    setBarra(null);
    const ok = await falar([{ tipo: "arquivo" }, { tipo: "legenda" }, { tipo: "baixar" }]);
    if (!ok) return;
    await fluxoGuia();
  }, [falar, fluxoGuia]);

  const fluxoNome = useCallback(async () => {
    const ok = await falar([
      { tipo: "bot", texto: demo.abertura },
      { tipo: "bot", texto: demo.nome.pergunta },
      { tipo: "logo" },
    ]);
    if (ok) setBarra("nome");
  }, [falar, demo]);

  useEffect(() => {
    corrida.current += 1;
    if (!inicio.current) {
      inicio.current = true;
    }
    fluxoNome();
    return () => {
      corrida.current += 1;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- respostas ---------- */

  const enviarNome = async (ev) => {
    ev.preventDefault();
    const nome = texto.trim().slice(0, 40);
    if (!nome || barra !== "nome") return;
    setTexto("");
    setBarra(null);
    atualizar({ prof: nome });
    adicionar({ tipo: "pessoa", texto: nome });
    eventoClarity("passo_nome");
    setEtapa("caso");
    await falar([
      { tipo: "bot", texto: `Prazer, ${primeiroNome(nome)}. ${demo.caso.pergunta}` },
      { tipo: "chips" },
    ]);
  };

  const escolherCaso = async (c) => {
    removerTipos("chips");
    adicionar({ tipo: "pessoa", texto: c.rotulo });
    const pc = montarProposta(nicho, c.id);
    atualizar({ casoId: c.id, avulsa: pc.plano.avulsa, valor: valoresPara(pc, pc.plano.avulsa) });
    eventoClarity("passo_caso");
    setEtapa("valor");
    await falar([{ tipo: "regua" }, { tipo: "valores" }]);
  };

  const mudarAvulsa = (v) => {
    atualizar({ avulsa: String(v), valor: valoresPara(p, v) });
  };

  const mudarValor = (i, v) => {
    atualizar((cur) => ({ valor: cur.valor.map((x, j) => (j === i ? v : x)) }));
  };

  const continuarValores = async () => {
    atualizarItem("regua", { travado: true });
    atualizarItem("valores", { travado: true });
    eventoClarity("passo_valor");
    setEtapa("cor");
    await falar([{ tipo: "bot", texto: demo.cor.pergunta }, { tipo: "paletas" }]);
  };

  const escolherCor = async (pal) => {
    removerTipos("paletas");
    adicionar({ tipo: "pessoa", texto: pal.nome });
    atualizar({ cor: pal.hex });
    eventoClarity("passo_cor");
    await fluxoPronta();
  };

  const pular = async () => {
    corrida.current += 1;
    setDigitando(false);
    setBarra(null);
    const cur = eRef.current;
    const c = casos.find((x) => x.id === cur.casoId) ?? casos[0];
    const pc = montarProposta(nicho, c.id);
    atualizar({
      prof: cur.prof || EXEMPLO_PROF,
      casoId: c.id,
      avulsa: cur.avulsa || pc.plano.avulsa,
      valor: cur.valor.length ? cur.valor : valoresPara(pc, pc.plano.avulsa),
      cor: cur.cor || demo.cor.paletas[0].hex,
    });
    removerTipos("logo", "chips", "paletas", "montando");
    atualizarItem("regua", { travado: true });
    atualizarItem("valores", { travado: true });
    eventoClarity("passo_pulou");
    await fluxoPronta();
  };

  /* ---------- logo (so no aparelho) ---------- */

  const lerLogo = (ev) => {
    const arq = ev.target.files?.[0];
    ev.target.value = "";
    if (!arq || !arq.type.startsWith("image/")) return;
    const leitor = new FileReader();
    leitor.onload = () => {
      const bruto = String(leitor.result);
      const img = new Image();
      img.onload = () => {
        /* Reduz para caber leve no PDF; SVG e imagens pequenas passam direto. */
        const maxLado = 600;
        if (arq.type === "image/svg+xml" || Math.max(img.width, img.height) <= maxLado) {
          atualizar({ logo: bruto });
          return;
        }
        const k = maxLado / Math.max(img.width, img.height);
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        atualizar({ logo: c.toDataURL(arq.type === "image/jpeg" ? "image/jpeg" : "image/png", 0.9) });
      };
      img.onerror = () => atualizar({ logo: bruto });
      img.src = bruto;
    };
    leitor.readAsDataURL(arq);
  };

  /* ---------- PDF ---------- */

  const baixar = async () => {
    if (pdf.estado === "gerando") return;
    if (ehInstagram()) {
      setPdf({ estado: "", aviso: demo.exportar.avisoInstagram });
      return;
    }
    setPdf({ estado: "gerando", aviso: "" });
    eventoClarity("exportou_pdf");
    try {
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const blob = await gerarBlobPdf(areaPdf.current);
      await entregarPdf(blob, nomeArquivo(caso.nome));
      setPdf({ estado: "", aviso: "" });
    } catch {
      setPdf({ estado: "", aviso: "Não consegui gerar o PDF agora. Toque de novo." });
    }
  };

  const abrirProposta = () => {
    eventoClarity("abriu_proposta");
    setViz(true);
  };

  const aoClicarCta = (ev) => {
    cliqueComprar(nicho, "demo");
    if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button !== 0) return;
    ev.preventDefault();
    setTimeout(() => window.location.assign(href), 180);
  };

  /* ---------- desenho de cada item ---------- */

  const tema = e.cor ?? "#8A6A2A";
  const faixa = faixaAvulsa(p);

  const desenhar = (it) => {
    switch (it.tipo) {
      case "nota":
        return <Nota>Exemplo fictício · o que você digitar fica só no seu aparelho</Nota>;
      case "bot":
        return <Bot>{it.texto}</Bot>;
      case "pessoa":
        return <Pessoa>{it.texto}</Pessoa>;
      case "logo":
        return (
          <Rica>
            <span>{demo.nome.logo}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {e.logo && <img src={e.logo} alt="Seu logo" style={{ maxWidth: 72, maxHeight: 40, objectFit: "contain" }} />}
              <button
                type="button"
                onClick={() => arquivoInput.current?.click()}
                style={{ border: "1.5px solid #121A30", borderRadius: 999, background: "#fff", padding: "8px 14px", fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#16203A", cursor: "pointer" }}
              >
                {e.logo ? "Trocar" : "Escolher imagem"}
              </button>
              {e.logo && (
                <button
                  type="button"
                  onClick={() => atualizar({ logo: null })}
                  style={{ border: 0, background: "transparent", padding: "8px 4px", fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#7A5C12", textDecoration: "underline", cursor: "pointer" }}
                >
                  Tirar
                </button>
              )}
            </div>
          </Rica>
        );
      case "chips":
        return (
          <Chips role="group" aria-label={demo.caso.pergunta}>
            {casos.map((c) => (
              <button key={c.id} type="button" onClick={() => escolherCaso(c)}>
                <span className="rotulo">{c.rotulo}</span>
                <span className="quem">{primeiroNome(c.nome)}, {c.idade} anos</span>
              </button>
            ))}
          </Chips>
        );
      case "regua":
        return (
          <Rica>
            <label htmlFor="avulsa" style={{ fontSize: 15, lineHeight: 1.4 }}>{demo.avulsa.pergunta}</label>
            <div className="linhaRegua">
              <span className="valor">R$ {reais(Number(e.avulsa || p.plano.avulsa))}</span>
              <input
                id="avulsa"
                type="range"
                min={faixa.min}
                max={faixa.max}
                step={faixa.passo}
                value={Number(e.avulsa || p.plano.avulsa)}
                disabled={it.travado}
                onChange={(ev) => mudarAvulsa(ev.target.value)}
              />
            </div>
            <span className="apoio">{demo.avulsa.apoio}</span>
          </Rica>
        );
      case "valores":
        return (
          <Opcoes>
            {p.plano.opcoes.map((o, i) => {
              const parcelado = p.plano.modo === "parcelado";
              const titulo = o.titulo.replaceAll("{qtd}", o.qtd);
              const detalhe = o.detalhe.map((l) => l.replaceAll("{qtd}", o.qtd)).join(" · ");
              return (
                <div className="op" key={i}>
                  <div>
                    <div className="titulo">
                      {titulo}
                      {o.recomendada && <span className="rec">recomendada</span>}
                    </div>
                    {detalhe && <div className="det">{detalhe}</div>}
                  </div>
                  {o.semValor ? (
                    <span className="num" style={{ fontSize: 14 }}>{o.semValor}</span>
                  ) : (
                    <span className={`num ${it.travado ? "" : "edita"}`}>
                      R$&nbsp;
                      {it.travado ? (
                        reais(Number(e.valor[i] || 0))
                      ) : (
                        <InputValor valor={e.valor[i] ?? ""} rotulo={`Opção ${i + 1}: ${parcelado ? "valor total" : "mensalidade"}`} aoMudar={(v) => mudarValor(i, v)} />
                      )}
                      {!parcelado && <span className="mes">/mês</span>}
                    </span>
                  )}
                </div>
              );
            })}
            {!it.travado && (
              <div className="continuar">
                <BotaoEscuro type="button" onClick={continuarValores}>Continuar</BotaoEscuro>
              </div>
            )}
          </Opcoes>
        );
      case "paletas":
        return (
          <Paletas role="group" aria-label={demo.cor.pergunta}>
            {demo.cor.paletas.map((pal) => (
              <button key={pal.nome} type="button" onClick={() => escolherCor(pal)}>
                <span className="bolinha" style={{ background: pal.hex }} />
                <span className="nome">{pal.nome}</span>
              </button>
            ))}
          </Paletas>
        );
      case "arquivo":
        return (
          <Arquivo>
            <div className="titulo">{demo.revelacao.titulo}</div>
            <button type="button" className="abrir" onClick={abrirProposta} aria-label={`Abrir ${arquivoNome}, 4 páginas`}>
              <div className="miniatura" style={{ background: misturar(tema, "#FFFFFF", 0.88) }}>
                <div className="folha tras" />
                <div className="folha frente">
                  {e.logo && <img className="m-logo" src={e.logo} alt="" />}
                  <div className="m-rot" style={{ color: tema }}>Proposta</div>
                  <div className="m-tit" style={{ color: e.cor ? misturar(e.cor, "#0B100D", 0.62) : "#16203A" }}>{p.tituloCapa}</div>
                  <div className="m-linha" style={{ background: tema }} />
                  <div className="m-nome">{caso.nome}</div>
                  <div className="m-prof">{dadosFolha.prof} · {p.profissao}</div>
                </div>
              </div>
              <div className="arquivoLinha">
                <IconePdf />
                <div>
                  <div className="nm">{arquivoNome}</div>
                  <div className="sb">4 páginas · toque para abrir</div>
                </div>
              </div>
            </button>
          </Arquivo>
        );
      case "legenda":
        return (
          <Mensagem>
            <span className="legenda">{preenche(demo.revelacao.legenda, vars)}</span>
            <div className="zap">
              {preenche(demo.revelacao.mensagem, vars)}
              <div className="anexo">
                <IconePdf tam={16} />
                {arquivoNome}
              </div>
            </div>
          </Mensagem>
        );
      case "baixar":
        return (
          <Rica style={{ padding: 10 }}>
            <BotaoClaro type="button" onClick={baixar} disabled={pdf.estado === "gerando"} aria-busy={pdf.estado === "gerando"}>
              {pdf.estado === "gerando" ? (
                <>
                  <Giro aria-hidden="true" />
                  Gerando o PDF…
                </>
              ) : (
                <>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v12" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M5 21h14" />
                  </svg>
                  {demo.exportar.botao}
                </>
              )}
            </BotaoClaro>
            <span className="pequeno" role="status">
              {pdf.aviso || `Sai com a marca ${demo.exportar.marcaDagua} nas quatro páginas.`}
            </span>
          </Rica>
        );
      case "guiaConversa":
        return <ConversaExemplo rotulo={it.rotulo} conversa={it.conversa} />;
      case "guiaAudio":
        return <AudioExemplo audio={it.audio} />;
      case "montando":
        return (
          <Bot style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span>{demo.guia.montando}</span>
            <span style={{ display: "inline-flex", gap: 4 }} aria-hidden="true">
              {[0, 1, 2].map((n) => (
                <i key={n} style={{ width: 5, height: 5, borderRadius: "50%", background: "#635E51", opacity: 0.5 + n * 0.2 }} />
              ))}
            </span>
          </Bot>
        );
      case "guiaCartoes":
        return <CartoesGuia guia={it.guia} selo="Exemplo" cascata aoCrescer={rolar} aoTerminar={aoTerminarCartoes} style={{ maxWidth: 340 }} />;
      case "oferta":
        return (
          <Oferta>
            <div className="titulo">{demo.oferta.titulo}</div>
            <div className="itens">{demo.oferta.itens}</div>
            <a className="cta" href={href} onClick={aoClicarCta}>{demo.oferta.botao}</a>
            <div className="micro">{demo.oferta.micro}</div>
          </Oferta>
        );
      default:
        return null;
    }
  };

  const [rotuloPasso, larguraPasso] = PASSOS[etapa];

  return (
    <Fundo>
      <Tela>
        <Cabecalho>
          <button type="button" className="voltar" aria-label="Voltar" onClick={() => window.history.back()}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <div className="avatar" aria-hidden="true">P</div>
          <div className="nomes">
            <span className="nome">Assistente da proposta</span>
            <span className="sub" aria-live="polite">{digitando ? "digitando…" : "Protocolo de Proposta · Toka"}</span>
          </div>
          <span className="passo">{rotuloPasso}</span>
          <div className="progresso" style={{ width: `${larguraPasso}%` }} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={larguraPasso} aria-label="Andamento" />
        </Cabecalho>

        {etapa !== "pronta" && (
          <Pular>
            <button type="button" onClick={pular}>Pular e ver pronta ›</button>
          </Pular>
        )}

        <Rolagem ref={rolagem}>
          <div className="lista" role="log" aria-live="polite">
            {itens.map((it) => (
              <Entra key={it.id}>{desenhar(it)}</Entra>
            ))}
            {digitando && (
              <Digitando aria-label="digitando">
                <i /><i /><i />
              </Digitando>
            )}
          </div>
        </Rolagem>

        {barra && (
          <Barra onSubmit={enviarNome}>
            {barra === "nome" ? (
              <input
                type="text"
                value={texto}
                onChange={(ev) => setTexto(ev.target.value)}
                placeholder={demo.nome.placeholder}
                aria-label={demo.nome.pergunta}
                maxLength={40}
                autoComplete="name"
                enterKeyHint="send"
              />
            ) : (
              <textarea
                disabled
                rows={2}
                placeholder={demo.guia.campoBloqueado}
                aria-label={demo.guia.campoBloqueado}
              />
            )}
            <button type="submit" aria-label="Enviar" disabled={barra !== "nome" || !texto.trim()}>
              <Seta />
            </button>
          </Barra>
        )}

        <input ref={arquivoInput} type="file" accept="image/*" hidden onChange={lerLogo} />
      </Tela>

      {pdf.estado === "gerando" && <AreaPdf ref={areaPdf} p={p} e={dadosFolha} marca={demo.exportar.marcaDagua} faixa={demo.exportar.faixa} />}

      {viz && (
        <Visualizador p={p} e={dadosFolha} nomeArquivo={arquivoNome} aoFechar={() => setViz(false)} />
      )}
    </Fundo>
  );
}
