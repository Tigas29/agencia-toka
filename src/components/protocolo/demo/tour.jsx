import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { cliqueComprar, eventoClarity, linkCheckout } from "../checkout";
import CartoesGuia from "./cartoes-guia";
import GUIA_EXEMPLOS, { GUIA_IA_PRONTO } from "./guia-exemplos";
import { respostasDoCaso } from "./guia-respostas";
import { reais } from "./formato";
import { reduzMovimento } from "./movimento";
import { LinhasOpcoes, Mt, MiniFolha, PaginaPapel } from "./papel";
import { AreaPdf } from "./pdf";
import { ehInstagram, entregarPdf, gerarBlobPdf, nomeArquivo } from "./pdf-export";
import { CASOS, faixaAvulsa, montarProposta, primeiroNome, valoresPara } from "./proposta";
import {
  Abertura, Acoes, AcoesAbertura, BarraProximo, Controle, Coluna, CtaNavy, FaixaCompra, Giro, Guia, Numero, Oferta, Palco,
  PapelPainel, Porque, Progresso, Pronta, Proximo, Pular, Raiz, Titulo, Topo, Voltar, VoltarLink,
} from "./tour-style";
import Visualizador from "./visualizador";

/**
 * A demo como tour guiado (direcao E, cartoes limpos): abertura, 4 passos
 * (capa, frase, opcoes, regras e cor), pronta e oferta. Cada passo mostra UMA
 * parte da proposta, diz por que ela ajuda a paciente a decidir e deixa a
 * profissional personalizar ali; embaixo (celular) ou ao lado (desktop) o
 * papel cresce com os dados dela em marca-texto.
 *
 * Um estado so, na memoria: nada vai para localStorage nem para fora do
 * aparelho. Nenhum InitiateCheckout aqui.
 */

const EXEMPLO_PROF = "Carla Mendes";
const ABERTURA = 0;
const PRONTA = 5;
const OFERTA = 6;
/* Evento do Clarity ao chegar em cada passo (0 = abertura ... 4 = regras). */
const EVENTOS = ["passo_abertura", "passo_capa", "passo_frase", "passo_opcoes", "passo_regras"];
const PAGINAS = ["Página 1", "Página 2", "Página 3", "Página 4", "PDF"];

/* ---------- pecas pequenas ---------- */

const Seta = ({ tam = 18 }) => (
  <svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const Chevron = ({ tam = 16 }) => (
  <svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const Duplo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 17 5-5-5-5" />
    <path d="m13 17 5-5-5-5" />
  </svg>
);

const Check = ({ cor = "#E0B65A", tam = 18 }) => (
  <svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const IconeImagem = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7A5C12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
  </svg>
);

const IconeBaixar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
);

const CONSULTA_DESKTOP = "(min-width: 960px)";
const assinarDesktop = (cb) => {
  const m = window.matchMedia(CONSULTA_DESKTOP);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const useDesktop = () => useSyncExternalStore(assinarDesktop, () => window.matchMedia(CONSULTA_DESKTOP).matches, () => false);

/** Aspas retas viram tipograficas ("vou pensar" -> “vou pensar”). */
const aspas = (t) => t.replace(/"([^"]+)"/g, "“$1”");

/** [AVULSA] e [NOME] viram o dado dela; qualquer outro [colchete] fica em marca-texto. */
function preencher(texto, { avulsa, nome }) {
  return texto.split(/(\[[^\]]+\])/).map((parte, i) => {
    const m = parte.match(/^\[([^\]]+)\]$/);
    if (!m) return parte;
    if (m[1] === "AVULSA") return reais(Number(avulsa));
    if (m[1] === "NOME") return nome;
    return (
      <span key={i} className="mt">
        {parte}
      </span>
    );
  });
}

/* ---------- barra de progresso ---------- */

function BarraProgresso({ passo, rotulos }) {
  return (
    <Progresso aria-label={`Progresso: passo ${passo} de 5`}>
      {rotulos.map((r, i) => (
        <li key={r} className={i + 1 < passo ? "feito" : i + 1 === passo ? "atual" : ""} aria-current={i + 1 === passo ? "step" : undefined}>
          <span className="barra" />
          <span className="rot">{r}</span>
        </li>
      ))}
    </Progresso>
  );
}

/* ---------- o papel ---------- */

function Papel({ passo, p, e, desktop, aoMudarValor, compacto = false }) {
  const n = passo - 1;
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduzMovimento()) return undefined;
    const folha = el.querySelector("[data-folha-papel]");
    const marcas = el.querySelectorAll(".mt");
    const tl = gsap.timeline();
    if (folha) tl.fromTo(folha, { y: 26, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", clearProps: "transform,opacity" });
    tl.fromTo(marcas, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: 0.35, stagger: 0.07, ease: "power2.out", clearProps: "backgroundSize" }, 0.15);
    return () => tl.kill();
  }, [passo]);
  return (
    <PapelPainel ref={ref} aria-label="A sua proposta até aqui" style={compacto ? { marginTop: 16, minHeight: 0, borderRadius: 16, paddingBottom: 4 } : undefined}>
      <div className="cab">
        <span className="t">A sua proposta até aqui</span>
        <span className="pg">
          <span className="gl" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <i key={i} className={i <= n ? "on" : ""} />
            ))}
          </span>
          Página {passo} de 4
        </span>
      </div>
      {compacto ? (
        <LinhasOpcoes p={p} e={e} aoMudarValor={aoMudarValor} />
      ) : (
      <>
      <div aria-hidden="true">
        {Array.from({ length: n }, (_, k) => (
          <div key={k} className="aba" style={{ marginInline: (n - k) * (desktop ? 10 : 8) }} />
        ))}
      </div>
      <PaginaPapel n={n} p={p} e={e} amplo={desktop} editavel={passo === 3} aoMudarValor={aoMudarValor} className="folha" data-folha-papel />
      </>
      )}
    </PapelPainel>
  );
}

/* ---------- bloco do guia (tela pronta) ---------- */

function BlocoGuia({ demo, nicho, caso, avulsa, refBloco }) {
  const [tudo, setTudo] = useState(false);
  const ex = GUIA_EXEMPLOS[nicho][caso.id];
  const resp = respostasDoCaso(nicho, caso.id);
  const conversa = tudo ? ex.conversa : ex.conversa.slice(-4);
  const dados = { avulsa, nome: primeiroNome(caso.nome) };
  return (
    <Guia ref={refBloco} aria-labelledby="guia-titulo">
      <span className="selo">{demo.pronta.guiaSelo}</span>
      <h2 id="guia-titulo">{aspas(demo.pronta.guiaTitulo)}</h2>
      <p className="sub">{demo.pronta.guiaSub}</p>
      {GUIA_IA_PRONTO ? (
        <div style={{ marginTop: 14 }}>
          <CartoesGuia guia={ex.guia} selo="Exemplo" />
        </div>
      ) : (
        <>
          <div className="papo">
            {ex.conversa.length > 4 && !tudo && (
              <button type="button" className="mais" onClick={() => setTudo(true)} aria-expanded="false">
                ver tudo
              </button>
            )}
            {conversa.map((m, i) => (
              <p key={`${tudo}-${i}`} className={`m ${m.de}`}>
                {preencher(m.texto, dados)}
                {m.anexo && <span className="anexo" style={{ display: "block" }}>Anexo: {m.anexo}</span>}
              </p>
            ))}
            {tudo && (
              <button type="button" className="mais" onClick={() => setTudo(false)} aria-expanded="true">
                ver menos
              </button>
            )}
          </div>
          {resp && (
            <div className="resposta">
              <h3>{resp.quando}</h3>
              <div className="lista">
                {resp.msgs.map((m, i) => (
                  <div key={i} style={{ display: "contents" }}>
                    {m.pre && <span className="pre">{m.pre}</span>}
                    <p className="m voce">{preencher(m.texto, dados)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Guia>
  );
}

/* ---------- a pagina ---------- */

export default function Tour({ d, demo }) {
  const nicho = d.slug;
  const casos = CASOS[nicho];
  const href = useMemo(() => linkCheckout(d.checkout, nicho, `demo-protocolo-${nicho}`), [d, nicho]);
  const desktop = useDesktop();

  const inicial = useMemo(() => {
    const pc = montarProposta(nicho, casos[0].id);
    return { prof: "", logo: null, casoId: casos[0].id, avulsa: pc.plano.avulsa, valor: valoresPara(pc, pc.plano.avulsa), cor: null };
  }, [nicho, casos]);

  const [passo, setPasso] = useState(ABERTURA);
  const [e, setEstado] = useState(inicial);
  const [viz, setViz] = useState(null);
  const [pdf, setPdf] = useState({ estado: "", aviso: "" });
  const [erroLogo, setErroLogo] = useState(false);

  const eRef = useRef(e);
  const passoRef = useRef(passo);
  passoRef.current = passo;
  const ocupado = useRef(false);
  const pendente = useRef(null);
  const direcao = useRef(1);
  const primeira = useRef(true);
  const palco = useRef(null);
  const titulo = useRef(null);
  const areaPdf = useRef(null);
  const arquivoInput = useRef(null);
  const blocoGuia = useRef(null);
  const vistos = useRef(new Set());

  const atualizar = useCallback((parte) => {
    const novo = { ...eRef.current, ...(typeof parte === "function" ? parte(eRef.current) : parte) };
    eRef.current = novo;
    setEstado(novo);
  }, []);

  const caso = casos.find((c) => c.id === e.casoId) ?? casos[0];
  const p = useMemo(() => montarProposta(nicho, caso.id), [nicho, caso.id]);
  const faixa = faixaAvulsa(p);
  const rotulos = [...demo.passos.map((x) => x.rotulo), "Pronta"];
  const arquivoNome = `Proposta · ${caso.nome}.pdf`;

  /* Papel de tela: antes do passo 2 o nome ainda pode estar vazio ("Seu nome"). */
  const dadosPapel = useMemo(
    () => ({ prof: e.prof, logo: e.logo, pessoa: caso.nome, avulsa: e.avulsa, valor: e.valor, cor: e.cor }),
    [e, caso.nome],
  );
  /* Folhas e PDF: sem nome digitado, o nome do exemplo. */
  const dadosFolha = useMemo(() => ({ ...dadosPapel, prof: e.prof || EXEMPLO_PROF }), [dadosPapel, e.prof]);

  /* ---------- navegacao com a tela deslizando de lado ---------- */

  const ir = useCallback((novo) => {
    const atual = passoRef.current;
    if (novo < ABERTURA || novo > OFERTA) return;
    /* Toque no meio da troca: vale o ultimo pedido. */
    if (ocupado.current) {
      pendente.current = novo;
      return;
    }
    if (novo === atual) return;
    direcao.current = novo > atual ? 1 : -1;
    if (novo === 4 && !eRef.current.cor) atualizar({ cor: demo.passos[3].paletas[0].hex });
    const el = palco.current;
    if (!el || reduzMovimento()) {
      setPasso(novo);
      return;
    }
    ocupado.current = true;
    gsap.to(el, {
      x: -direcao.current * 44,
      opacity: 0,
      duration: 0.16,
      ease: "power2.in",
      onComplete: () => {
        const alvo = pendente.current ?? novo;
        pendente.current = null;
        setPasso(alvo);
      },
    });
  }, [atualizar, demo]);

  useLayoutEffect(() => {
    ocupado.current = false;
    const el = palco.current;
    window.scrollTo(0, 0);
    titulo.current?.focus({ preventScroll: true });
    if (primeira.current) {
      primeira.current = false;
      return undefined;
    }
    if (!el || reduzMovimento()) return undefined;
    const t = gsap.fromTo(el, { x: direcao.current * 44, opacity: 0 }, { x: 0, opacity: 1, duration: 0.26, ease: "power2.out", clearProps: "transform,opacity" });
    return () => t.kill();
  }, [passo]);

  /* Um evento do Clarity por passo, so na primeira vez que chega nele. */
  useEffect(() => {
    const nome = EVENTOS[passo];
    if (nome && !vistos.current.has(nome)) {
      vistos.current.add(nome);
      eventoClarity(nome);
    }
  }, [passo]);

  /* viu_guia: quando o bloco aparece na tela. */
  useEffect(() => {
    if (passo !== PRONTA) return undefined;
    const el = blocoGuia.current;
    if (!el || vistos.current.has("viu_guia")) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      vistos.current.add("viu_guia");
      eventoClarity("viu_guia");
      return undefined;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((x) => x.isIntersecting) && !vistos.current.has("viu_guia")) {
          vistos.current.add("viu_guia");
          eventoClarity("viu_guia");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [passo]);

  /* ---------- respostas ---------- */

  const escolherCaso = (c) => {
    const pc = montarProposta(nicho, c.id);
    atualizar({ casoId: c.id, avulsa: pc.plano.avulsa, valor: valoresPara(pc, pc.plano.avulsa) });
  };

  const mudarAvulsa = (v) => atualizar({ avulsa: String(v), valor: valoresPara(p, v) });
  const mudarValor = (i, v) => atualizar((cur) => ({ valor: cur.valor.map((x, j) => (j === i ? v : x)) }));

  const pular = () => {
    const cur = eRef.current;
    atualizar({
      prof: cur.prof || EXEMPLO_PROF,
      cor: cur.cor || demo.passos[3].paletas[0].hex,
    });
    ir(PRONTA);
  };

  const enviarNome = (ev) => {
    ev.preventDefault();
    ir(2);
  };

  /* ---------- logo (so no aparelho) ---------- */

  const lerLogo = (ev) => {
    const arq = ev.target.files?.[0];
    ev.target.value = "";
    if (!arq) return;
    const falha = () => setErroLogo(true);
    const aceitar = (dados) => {
      setErroLogo(false);
      atualizar({ logo: dados });
    };
    if (!["image/png", "image/jpeg", "image/webp"].includes(arq.type)) {
      falha();
      return;
    }
    const leitor = new FileReader();
    leitor.onerror = falha;
    leitor.onload = () => {
      const bruto = String(leitor.result);
      const img = new Image();
      img.onload = () => {
        if (!img.width || !img.height) {
          falha();
          return;
        }
        /* Reduz para caber leve no PDF. */
        const maxLado = 600;
        if (Math.max(img.width, img.height) <= maxLado) {
          aceitar(bruto);
          return;
        }
        const k = maxLado / Math.max(img.width, img.height);
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        aceitar(c.toDataURL(arq.type === "image/jpeg" ? "image/jpeg" : "image/png", 0.9));
      };
      /* Nao decodificou: nao grava o logo. */
      img.onerror = falha;
      img.src = bruto;
    };
    leitor.readAsDataURL(arq);
  };

  /* ---------- PDF e visualizador ---------- */

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

  const abrirProposta = (n) => {
    eventoClarity("abriu_proposta");
    setViz(n);
  };

  /* Clique na faixa de compra durante o tour: origem separada do botao do fim, e a tela vai para o Clarity. */
  const aoClicarFaixa = (ev) => {
    eventoClarity(passo === PRONTA ? "comprar_durante_pronta" : `comprar_durante_passo_${passo}`);
    aoClicarCta(ev, "demo-durante");
  };

  const aoClicarCta = (ev, origem = "demo") => {
    cliqueComprar(nicho, origem);
    if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button !== 0) return;
    ev.preventDefault();
    setTimeout(() => window.location.assign(href), 180);
  };

  /* ---------- desenho de cada tela ---------- */

  const emPasso = passo >= 1 && passo <= 4;
  const fase = passo === ABERTURA ? "abertura" : emPasso ? "passo" : passo === PRONTA ? "pronta" : "oferta";
  const cfg = emPasso ? demo.passos[passo - 1] : null;

  const botoes = (
    <Acoes>
      <Proximo type="button" onClick={() => ir(passo + 1)}>
        {demo.proximo}
        <Seta />
      </Proximo>
      <Voltar type="button" onClick={() => ir(passo - 1)}>
        <Chevron />
        {demo.voltar}
      </Voltar>
    </Acoes>
  );

  const controle = () => {
    switch (passo) {
      case 1:
        return (
          <Controle as="form" onSubmit={enviarNome}>
            <div className="campo">
              <label htmlFor="t-nome">{cfg.campo}</label>
              <input
                id="t-nome"
                type="text"
                value={e.prof}
                onChange={(ev) => atualizar({ prof: ev.target.value.slice(0, 40) })}
                maxLength={40}
                autoComplete="name"
                enterKeyHint="next"
              />
            </div>
            {e.logo ? (
              <div className="logo">
                <div className="logo-ok">
                  <img src={e.logo} alt="O seu logo" />
                  <div className="acoes">
                    <button type="button" className="mini" onClick={() => arquivoInput.current?.click()}>Trocar</button>
                    <button type="button" className="mini" onClick={() => atualizar({ logo: null })}>Tirar</button>
                  </div>
                </div>
              </div>
            ) : (
              <button type="button" className="logo-botao" onClick={() => arquivoInput.current?.click()}>
                <IconeImagem />
                <span>
                  <span className="t1">{cfg.campoLogo.split(" (")[0]}</span>
                  <span className="t2">({cfg.campoLogo.split(" (")[1]}</span>
                </span>
              </button>
            )}
            {erroLogo && (
              <p className="erro" role="alert">
                Não consegui abrir essa imagem. Tenta um PNG ou JPG?
              </p>
            )}
          </Controle>
        );
      case 2:
        return (
          <Controle>
            <fieldset>
              <legend>{cfg.campo}</legend>
              <div className="opcoes">
                {casos.map((c) => (
                  <button key={c.id} type="button" className="op" aria-pressed={c.id === caso.id} onClick={() => escolherCaso(c)}>
                    <span className="pino" aria-hidden="true" />
                    {c.rotulo}
                  </button>
                ))}
              </div>
            </fieldset>
          </Controle>
        );
      case 3:
        return (
          <Controle>
            <label className="rotulo" htmlFor="t-avulsa">{cfg.campo}</label>
            <output className="regua-linha" htmlFor="t-avulsa">
              <span className="rs">R$</span>
              <span className="v">{reais(Number(e.avulsa))}</span>
            </output>
            <input
              id="t-avulsa"
              type="range"
              min={faixa.min}
              max={faixa.max}
              step={faixa.passo}
              value={Number(e.avulsa)}
              aria-valuetext={`R$ ${reais(Number(e.avulsa))}`}
              onChange={(ev) => mudarAvulsa(ev.target.value)}
            />
            <p className="apoio">{cfg.apoio}</p>
          </Controle>
        );
      case 4:
        return (
          <Controle>
            <fieldset>
              <legend>{cfg.campo}</legend>
              <div className="opcoes cores">
                {cfg.paletas.map((pal) => (
                  <button key={pal.nome} type="button" className="op" aria-pressed={e.cor === pal.hex} onClick={() => atualizar({ cor: pal.hex })}>
                    <span className="cor" style={{ background: pal.hex }} aria-hidden="true" />
                    {pal.nome}
                  </button>
                ))}
              </div>
            </fieldset>
          </Controle>
        );
      default:
        return null;
    }
  };

  const topoDireita = () => {
    if (emPasso) {
      return (
        <Pular type="button" onClick={pular}>
          {demo.pular}
          <Duplo />
        </Pular>
      );
    }
    if (passo === PRONTA || passo === OFERTA) {
      return (
        <VoltarLink type="button" onClick={() => ir(passo - 1)}>
          <Chevron />
          {demo.voltar}
        </VoltarLink>
      );
    }
    return null;
  };

  const tela = () => {
    if (passo === ABERTURA) {
      return (
        <Abertura>
          <h1 ref={titulo} tabIndex={-1}>{demo.abertura.titulo}</h1>
          <p className="sub">{demo.abertura.sub}</p>
          <ol aria-label="Os 5 passos">
            {rotulos.map((r, i) => (
              <li key={r}>
                <span className="n">{i + 1}</span>
                <span className="r">{r}</span>
                <span className="p">{PAGINAS[i]}</span>
              </li>
            ))}
          </ol>
          <AcoesAbertura>
            <CtaNavy type="button" onClick={() => ir(1)}>
              {demo.abertura.cta}
              <Seta />
            </CtaNavy>
            <button type="button" className="pular" onClick={pular}>
              {demo.pular}
              <Duplo />
            </button>
          </AcoesAbertura>
        </Abertura>
      );
    }
    if (emPasso) {
      return (
        <>
          <Numero>
            <span className="n">{passo}</span>
            <span className="de">de 5</span>
          </Numero>
          <Titulo ref={titulo} tabIndex={-1}>{cfg.titulo}</Titulo>
          <Porque>{cfg.porque}</Porque>
          {controle()}
          {passo === 3 && !desktop && <Papel passo={passo} p={p} e={papelProp} desktop={false} aoMudarValor={mudarValor} compacto />}
          {botoes}
        </>
      );
    }
    if (passo === PRONTA) {
      const [antes, ...resto] = demo.pronta.titulo.split(": ");
      return (
        <Pronta>
          <h1 ref={titulo} tabIndex={-1}>
            <span className="pr">{antes}:</span>
            {resto.join(": ")}
          </h1>
          <p className="sub">{demo.pronta.sub}</p>
          <ul className="grade">
            {[0, 1, 2, 3].map((n) => (
              <li key={n}>
                <button type="button" className="mini" onClick={() => abrirProposta(n)} aria-label={`Abrir a página ${n + 1}: ${rotulos[n]}`} style={{ borderTopColor: e.cor ?? undefined }}>
                  <span className="cap">{n + 1} · {rotulos[n]}</span>
                  <span className="vista" style={{ "--f-acento": e.cor ?? undefined }}>
                    <MiniFolha n={n} p={p} e={dadosFolha} />
                  </span>
                  <span className="abrir">Abrir</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="baixar">
            <button type="button" className="btn-pdf" onClick={baixar} disabled={pdf.estado === "gerando"} aria-busy={pdf.estado === "gerando"}>
              {pdf.estado === "gerando" ? (
                <>
                  <Giro aria-hidden="true" />
                  Gerando o PDF…
                </>
              ) : (
                <>
                  <IconeBaixar />
                  {demo.pronta.baixar}
                </>
              )}
            </button>
            <p className={pdf.aviso ? "aviso" : "nota"} role="status">{pdf.aviso || demo.pronta.baixarNota}</p>
          </div>
          <BlocoGuia demo={demo} nicho={nicho} caso={caso} avulsa={e.avulsa} refBloco={blocoGuia} />
          <BarraProximo>
            <button type="button" className="voltar" onClick={() => ir(passo - 1)}>
              <Chevron />
              {demo.voltar}
            </button>
            <button type="button" className="prox" onClick={() => ir(OFERTA)}>
              {demo.proximo}
              <Seta />
            </button>
          </BarraProximo>
        </Pronta>
      );
    }
    /* oferta */
    const marcas = [38, 104, 170];
    const cartao = (comMarca) => (
      <div className="cartao" style={{ "--f-acento": e.cor ?? undefined, "--f-tinta": undefined }} aria-hidden="true">
        {comMarca && (
          <div className="vidro">
            {marcas.map((t) => (
              <div key={t} className="marca" style={{ top: t * (desktop ? 1.45 : 1) }}>{demo.exportar.marcaDagua}</div>
            ))}
            <div className="faixa" />
          </div>
        )}
        {!comMarca && (
          <span className="selo"><Check cor="#121A30" tam={18} /></span>
        )}
        {e.logo ? <img src={e.logo} alt="" style={{ position: "relative", maxWidth: 56, maxHeight: 24, objectFit: "contain", alignSelf: "flex-start" }} /> : <div className="logo-v" style={{ position: "relative" }} />}
        <div className="tit" style={{ position: "relative" }}>{p.tituloCapa}</div>
        <div className="para" style={{ position: "relative" }}>Para: {caso.nome}</div>
        <div className="reg" style={{ position: "relative" }} />
        <div className="nm" style={{ position: "relative" }}>{e.prof || EXEMPLO_PROF}</div>
        <div className="rg" style={{ position: "relative" }}>{p.profissao}</div>
      </div>
    );
    return (
      <Oferta>
        <div className="palco">
          <div className="par">
            {cartao(true)}
            <Seta tam={22} />
            {cartao(false)}
          </div>
          <div className="legendas" aria-hidden="true">
            <span>PDF de demonstração</span>
            <span>Versão editável, sem marca</span>
          </div>
        </div>
        <section className="folha-oferta" aria-labelledby="t-oferta">
          <h1 id="t-oferta" ref={titulo} tabIndex={-1}>{demo.oferta.titulo}</h1>
          <ul>
            {demo.oferta.itens.map((t) => (
              <li key={t}>
                <Check />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="preco">
            <s>De R$ 47</s>
            <span className="v">R$ 27</span>
          </p>
          <a className="cta" href={href} onClick={aoClicarCta}>
            {demo.oferta.cta}
            <Seta />
          </a>
          <p className="micro">{demo.oferta.micro}</p>
        </section>
      </Oferta>
    );
  };

  const papelProp = passo <= 1 ? dadosPapel : dadosFolha;

  return (
    <Raiz data-fase={fase}>
      <Coluna>
        {(emPasso || passo === PRONTA) && (
          <FaixaCompra href={href} onClick={aoClicarFaixa} aria-label={demo.compra.rotulo}>
            <span className="preco">{demo.compra.preco}</span>
            <span className="ir">
              {demo.compra.cta}
              <Seta tam={16} />
            </span>
          </FaixaCompra>
        )}
        <Topo>
          <span className="marca">TOKA</span>
          {topoDireita()}
        </Topo>
        {emPasso || passo === PRONTA ? <BarraProgresso passo={passo} rotulos={rotulos} /> : null}
        <Palco ref={palco}>{tela()}</Palco>
        {emPasso && !desktop && passo !== 3 && <Papel passo={passo} p={p} e={papelProp} desktop={false} aoMudarValor={mudarValor} />}
      </Coluna>
      {emPasso && desktop && <Papel passo={passo} p={p} e={papelProp} desktop aoMudarValor={mudarValor} />}

      <input ref={arquivoInput} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={lerLogo} />

      {pdf.estado === "gerando" && <AreaPdf ref={areaPdf} p={p} e={dadosFolha} marca={demo.exportar.marcaDagua} faixa={demo.exportar.faixa} />}

      {viz !== null && <Visualizador p={p} e={dadosFolha} nomeArquivo={arquivoNome} inicial={viz} aoFechar={() => setViz(null)} />}
    </Raiz>
  );
}
