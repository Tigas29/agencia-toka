import { Children, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import styled from "styled-components";
import { reais } from "./formato";
import { reduzMovimento } from "./movimento";
import { ACENTO_PADRAO, TINTA_PADRAO, varsTema } from "./tema";

/**
 * O "papel": a proposta crescendo ao lado do passo (canvas E2 a E5 e E8).
 * Cada pagina aqui mostra SO o que o passo preencheu; no desktop (`amplo`)
 * e a pagina inteira. Os dados dela entram em marca-texto (`Mt`), que acende
 * quando o valor muda. Medidas em `calc(var(--u) * n)`: --u = 1px no celular,
 * maior no desktop, e o papel todo escala junto.
 */

const OURO_ESC = "#7A5C12";
const FRACA = "#635E51";
const CORPO = "#3E4657";
const MT = "rgba(224, 182, 90, var(--mt-a, 0.4))";
const u = (n) => `calc(var(--u) * ${n})`;

/* ---------- marca-texto ---------- */

/** Texto dela com marca-texto. Quando `children` muda, o realce acende de novo. */
export function Mt({ children, className = "", ...resto }) {
  const ref = useRef(null);
  const chave = Children.toArray(children).join("");
  const anterior = useRef(chave);
  useLayoutEffect(() => {
    if (anterior.current === chave) return undefined;
    anterior.current = chave;
    if (!ref.current || reduzMovimento()) return undefined;
    const t = gsap.fromTo(ref.current, { "--mt-a": 0.95 }, { "--mt-a": 0.4, duration: 0.5, ease: "power2.out" });
    return () => t.kill();
  }, [chave]);
  return (
    <span ref={ref} className={`mt ${className}`} {...resto}>
      {children}
    </span>
  );
}

/** Campo de valor editavel dentro do cartao (R$ 2.080). Seleciona tudo ao tocar. */
export function InputValor({ valor, aoMudar, rotulo }) {
  const [foco, setFoco] = useState(false);
  const ref = useRef(null);
  const mostrado = !foco && valor !== "" ? reais(Number(valor)) : valor;
  useLayoutEffect(() => {
    if (foco) ref.current?.select();
  }, [foco]);
  const n = Math.max(String(mostrado).length, 3);
  return (
    <input
      ref={ref}
      className="campo-valor"
      type="text"
      inputMode="numeric"
      autoComplete="off"
      aria-label={rotulo}
      value={mostrado}
      size={n}
      style={{ width: `${n + 0.4}ch` }}
      onFocus={() => setFoco(true)}
      onBlur={() => setFoco(false)}
      onChange={(ev) => aoMudar(ev.target.value.replace(/\D/g, "").slice(0, 6))}
    />
  );
}

/* ---------- estilo ---------- */

export const Pg = styled.div`
  --u: 1px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: ${CORPO};
  font-family: "Nunito Sans", sans-serif;
  font-size: ${u(10.5)};
  line-height: 1.4;
  text-align: left;

  .g {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    color: var(--f-tinta, ${TINTA_PADRAO});
    font-variant-numeric: lining-nums proportional-nums;
  }

  .mt {
    background-image: linear-gradient(${MT}, ${MT});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: ${u(3)};
    padding: 0 ${u(3)};
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: ${CORPO};
  }

  .tag {
    font-family: "Poppins", sans-serif;
    font-size: ${u(7.5)};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${FRACA};
  }

  .topo {
    display: flex;
    justify-content: space-between;
    gap: ${u(10)};
    padding-bottom: ${u(8)};
    border-bottom: 1px solid var(--f-linha, rgba(22, 32, 58, 0.13));
    margin-bottom: ${u(10)};
    font-family: "Poppins", sans-serif;
    font-size: ${u(7.5)};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${FRACA};

    .ouro {
      color: var(--f-acento, ${OURO_ESC});
    }

    span:last-child {
      text-align: right;
    }
  }

  h3 {
    margin: 0;
    font-size: ${u(20)};
    line-height: 1.05;
  }

  .rotulo {
    margin: ${u(9)} 0 ${u(3)};
    font-family: "Poppins", sans-serif;
    font-size: ${u(7.5)};
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--f-acento, ${OURO_ESC});
  }

  .sub {
    margin: ${u(6)} 0 0;
    font-size: ${u(10.5)};
  }

  .frase {
    margin: 0;
    font-family: "EB Garamond", Georgia, serif;
    font-style: italic;
    font-size: ${u(15)};
    line-height: 1.3;
    color: ${TINTA_PADRAO};
  }

  .item {
    margin: ${u(3)} 0 0;
    display: flex;
    gap: ${u(6)};
    color: ${CORPO};

    b {
      flex: none;
      font-family: "Poppins", sans-serif;
      font-size: ${u(8)};
      font-weight: 500;
      color: var(--f-acento, ${OURO_ESC});
      padding-top: ${u(1.5)};
    }
  }

  .fecho {
    margin: ${u(10)} 0 0;
    font-style: italic;
  }

  /* capa */
  .logo-vazio,
  .logo-img {
    align-self: flex-start;
  }

  .logo-vazio {
    box-sizing: border-box;
    min-width: ${u(62)};
    height: ${u(26)};
    padding: 0 ${u(8)};
    border: 1px dashed ${OURO_ESC};
    border-radius: ${u(4)};
    background: ${MT};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${u(9.5)};
    color: ${CORPO};
  }

  .logo-img {
    max-width: ${u(96)};
    max-height: ${u(34)};
    object-fit: contain;
  }

  .titulo-capa {
    margin-top: ${u(10)};
    max-width: ${u(230)};
    font-size: ${u(21)};
  }

  .para {
    margin-top: ${u(7)};
    font-size: ${u(10.5)};
  }

  .regua {
    margin-top: ${u(10)};
    height: 1px;
    background: var(--f-acento, rgba(22, 32, 58, 0.13));
  }

  .assina {
    margin-top: ${u(9)};
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: ${u(2)} ${u(5)};

    .nome {
      font-family: "EB Garamond", Georgia, serif;
      font-size: ${u(16)};
      color: var(--f-tinta, ${TINTA_PADRAO});
    }

    .miudo {
      font-size: ${u(10)};
    }
  }

  /* pagina 3 */
  .cartoes {
    margin-top: ${u(10)};
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${u(6)};
  }

  .cartao {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    box-sizing: border-box;
    padding: ${u(10)} ${u(8)} ${u(8)};
    border: 1px solid rgba(22, 32, 58, 0.15);
    border-radius: ${u(7)};
    background: #fff;

    &.rec {
      border: 1.5px solid var(--f-tinta, ${TINTA_PADRAO});
      background: var(--f-suave, #faf8f2);
    }

    .selo {
      position: absolute;
      left: ${u(8)};
      top: ${u(-6)};
      padding: 0 ${u(5)};
      background: #fff;
      font-family: "Poppins", sans-serif;
      font-size: ${u(6.2)};
      font-weight: 600;
      letter-spacing: 0.06em;
      white-space: nowrap;
      text-transform: uppercase;
      color: var(--f-acento, ${OURO_ESC});
    }

    .op {
      font-family: "Poppins", sans-serif;
      font-size: ${u(7)};
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${FRACA};
    }

    .tit {
      margin-top: ${u(3)};
      font-size: ${u(13)};
      line-height: 1.1;
    }

    .det {
      margin-top: ${u(3)};
      font-size: ${u(8.5)};
      line-height: 1.35;
    }

    .quem {
      margin-top: ${u(6)};
      font-size: ${u(9)};
      line-height: 1.4;
    }

    .valor {
      margin-top: auto;
      padding-top: ${u(7)};
    }

    .valor .k {
      font-family: "Poppins", sans-serif;
      font-size: ${u(7)};
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${FRACA};
    }

    .valor .v {
      margin-top: ${u(2)};
      font-family: "EB Garamond", Georgia, serif;
      font-size: ${u(16)};
      line-height: 1.2;
      color: var(--f-tinta, ${TINTA_PADRAO});
      white-space: nowrap;
    }

    .valor .parc {
      margin-top: ${u(3)};
      font-size: ${u(8.5)};
    }

    .valor .mes {
      font-size: ${u(9)};
      margin-left: ${u(3)};
    }
  }

  label.mt {
    display: inline-flex;
    align-items: baseline;
    cursor: text;
  }

  .campo-valor {
    box-sizing: content-box;
    margin: 0;
    padding: ${u(2)} 0;
    border: 0;
    border-bottom: 1.5px solid ${OURO_ESC};
    background: transparent;
    font: inherit;
    color: inherit;
    min-width: 0;
    border-radius: 0;
  }

  .campo-valor:focus {
    outline: none;
    border-bottom-color: ${TINTA_PADRAO};
    background: rgba(255, 255, 255, 0.55);
  }

  .incluido {
    margin-top: ${u(10)};
    padding: ${u(9)} ${u(11)};
    border-radius: ${u(7)};
    background: var(--f-suave, #f7f5f0);

    b {
      display: block;
      font-family: "Poppins", sans-serif;
      font-size: ${u(7.5)};
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--f-acento, ${OURO_ESC});
    }

    ul {
      margin: ${u(5)} 0 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: ${u(8)};
      font-size: ${u(10)};
    }
  }

  .nota {
    margin: ${u(10)} 0 0;
    font-size: ${u(10.5)};
  }

  .assinaturas {
    margin-top: auto;
    padding-top: ${u(18)};
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${u(24)};

    div {
      padding-top: ${u(6)};
      border-top: 1px solid rgba(22, 32, 58, 0.3);
      font-family: "Poppins", sans-serif;
      font-size: ${u(7.5)};
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${FRACA};
    }
  }

  .pe {
    margin-top: ${u(12)};
    display: flex;
    justify-content: space-between;
    gap: ${u(10)};
    font-size: ${u(9)};
    color: ${FRACA};
  }

  /* pagina 4 */
  .regras {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      padding: ${u(6)} 0;
      border-top: 1px solid var(--f-linha, rgba(22, 32, 58, 0.12));
    }

    li:first-child {
      border-top: 0;
      padding-top: 0;
    }

    b {
      display: block;
      font-family: "Poppins", sans-serif;
      font-size: ${u(7.5)};
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--f-acento, ${OURO_ESC});
    }

    span.t {
      display: block;
      margin-top: ${u(2)};
      font-size: ${u(10)};
      line-height: 1.4;
    }
  }

  .proximo {
    margin-top: ${u(12)};
    padding: ${u(9)} ${u(11)};
    border-radius: ${u(7)};
    background: var(--f-suave, #f7f5f0);

    b {
      display: block;
      margin-bottom: ${u(3)};
      font-family: "Poppins", sans-serif;
      font-size: ${u(7.5)};
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--f-acento, ${OURO_ESC});
    }
  }
`;

/* ---------- conteudo de cada pagina ---------- */

const comQtd = (texto, qtd) => texto.replaceAll("{qtd}", qtd);

function parcela(total, vezes) {
  const t = Number(total);
  const n = Number(vezes);
  if (!(t > 0) || !(n > 1)) return null;
  return t / n;
}

/** Realca "24 horas", "30 dias" etc. nas regras. */
function comNumeros(texto) {
  return texto.split(/(\d+(?= (?:horas|dias)))/).map((parte, i) => (i % 2 ? <Mt key={i}>{parte}</Mt> : parte));
}

const Topo = ({ p, e }) => (
  <div className="topo">
    <span className="ouro">Proposta do seu {p.plano.titulo.replace("O seu ", "")}</span>
    <span>{e.pessoa}</span>
  </div>
);

function PagCapa({ p, e, amplo }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        {e.logo ? <img className="logo-img" src={e.logo} alt="O seu logo" /> : <div className="logo-vazio">seu logo</div>}
        <span className="tag">Exemplo fictício</span>
      </div>
      <h3 className="g titulo-capa">{p.tituloCapa}</h3>
      <div className="para">
        Para: {e.pessoa} · {p.dataRotulo}: {p.data}
      </div>
      {amplo && <div style={{ flex: 1 }} />}
      <div className="regua" />
      <div className="assina">
        <Mt className="nome">{e.prof || "Seu nome"}</Mt>
        <span className="miudo">
          · {p.profissao}
          {p.registro ? ` · ${p.registro}` : ""}
        </span>
      </div>
      {amplo && <div className="miudo" style={{ marginTop: 6 }}>{p.contato}</div>}
    </>
  );
}

function PagFrase({ p, e, amplo }) {
  const a = p.avaliacao;
  const lista = (itens) =>
    itens.map((t, i) => (
      <p className="item" key={t}>
        <b>{String(i + 1).padStart(2, "0")}</b>
        <span>{t}</span>
      </p>
    ));
  return (
    <>
      <Topo p={p} e={e} />
      <h3 className="g">{a.titulo}</h3>
      <p className="rotulo">{a.trouxeRotulo}</p>
      <p className="frase">
        <Mt>“{a.trouxe}”</Mt>
      </p>
      <p className="rotulo">{a.achadosRotulo}</p>
      {lista(amplo ? a.achados : a.achados.slice(0, 1))}
      {amplo && (
        <>
          <p className="rotulo">O que a gente vai trabalhar</p>
          {lista(a.trabalhar)}
          <p className="fecho">{a.fecho}</p>
        </>
      )}
    </>
  );
}

function Cartao3({ o, i, p, e, editavel, aoMudarValor, amplo }) {
  const parcelado = p.plano.modo === "parcelado";
  const valor = e.valor[i];
  const cada = parcelado ? parcela(valor, o.parcelas) : null;
  const rotuloCampo = `Opção ${i + 1}: ${parcelado ? "valor total" : "mensalidade"}`;
  const conteudo = editavel ? (
    <label className="mt">
      R$&nbsp;
      <InputValor valor={valor ?? ""} rotulo={rotuloCampo} aoMudar={(v) => aoMudarValor(i, v)} />
    </label>
  ) : (
    <Mt>R$ {reais(Number(valor))}</Mt>
  );
  return (
    <div className={`cartao${o.recomendada ? " rec" : ""}`}>
      {o.recomendada && <span className="selo">A que eu recomendo</span>}
      <span className="op">Opção {i + 1}</span>
      <span className="g tit">{comQtd(o.titulo, o.qtd)}</span>
      <span className="det">{o.detalhe.map((l) => comQtd(l, o.qtd)).join(" · ")}</span>
      {amplo && <span className="quem">{o.quem}</span>}
      <div className="valor">
        {o.semValor ? (
          <div className="v" style={{ fontSize: "1.1em" }}>{o.semValor}</div>
        ) : (
          <>
            {amplo && <div className="k">{parcelado ? "Valor" : "Mensalidade"}</div>}
            <div className="v">
              {conteudo}
              {!parcelado && <span className="mes">/mês</span>}
            </div>
            {parcelado && cada !== null && (
              <div className="parc">
                <Mt>ou {o.parcelas}x de R$ {reais(cada)}</Mt>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PagOpcoes({ p, e, amplo, editavel, aoMudarValor }) {
  const pl = p.plano;
  return (
    <>
      <Topo p={p} e={e} />
      <h3 className="g">{pl.titulo}</h3>
      {amplo && pl.sub && <p className="sub">{pl.sub}</p>}
      <div className="cartoes">
        {pl.opcoes.map((o, i) => (
          <Cartao3 key={i} o={o} i={i} p={p} e={e} amplo={amplo} editavel={editavel} aoMudarValor={aoMudarValor} />
        ))}
      </div>
      {amplo && (
        <>
          <div className="incluido">
            <b>{pl.incluidoTitulo}</b>
            <ul>
              {pl.incluido.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <p className="nota">
            {pl.avulsaPrefixo} <Mt>R$ {reais(Number(e.avulsa))}</Mt>
            {pl.avulsaSufixo}. {pl.rodape}
          </p>
          <div className="assinaturas">
            <div>{p.pessoa} · {e.pessoa}</div>
            <div>{p.profissao} · {e.prof}</div>
          </div>
          <div className="pe">
            <span>{e.prof} · {p.profissao}{p.registro ? ` · ${p.registro}` : ""}</span>
            <span>3 / 4</span>
          </div>
        </>
      )}
    </>
  );
}

function PagRegras({ p, e, amplo }) {
  const r = p.regras;
  return (
    <>
      <Topo p={p} e={e} />
      <h3 className="g">{r.titulo}</h3>
      <ul className="regras" style={{ marginTop: 10 }}>
        {r.itens.map(([titulo, texto]) => (
          <li key={titulo}>
            <b>{titulo.replace(/\.$/, "")}</b>
            <span className="t">{comNumeros(texto)}</span>
          </li>
        ))}
      </ul>
      {amplo && (
        <div className="proximo">
          <b>Próximo passo</b>
          {r.proximo}
        </div>
      )}
    </>
  );
}

/**
 * Uma pagina do papel (n = 0 a 3). `e` = { prof, logo, pessoa, valor[],
 * avulsa, cor }. A cor escolhida entra pelas variaveis --f-* (tema.js).
 */
export function PaginaPapel({ n, p, e, amplo = false, editavel = false, aoMudarValor, className, style, ...resto }) {
  const Corpo = [PagCapa, PagFrase, PagOpcoes, PagRegras][n];
  return (
    <Pg className={className} style={{ ...varsTema(e.cor), ...style }} {...resto}>
      <Corpo p={p} e={e} amplo={amplo} editavel={editavel} aoMudarValor={aoMudarValor} />
    </Pg>
  );
}

/* ---------- miniaturas da tela "pronta" ---------- */

export const Mini = styled.div`
  --u: 1px;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding: 9px 10px 0;
  background: #fff;
  overflow: hidden;
  text-align: left;
  font-family: "Nunito Sans", sans-serif;
  font-size: 10px;
  line-height: 1.3;
  color: ${CORPO};

  .g {
    font-family: "EB Garamond", Georgia, serif;
    color: var(--f-tinta, ${TINTA_PADRAO});
  }

  .mt {
    background-image: linear-gradient(${MT}, ${MT});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 3px;
    padding: 0 3px;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  .t {
    margin-top: 5px;
    font-size: 13px;
    line-height: 1.1;
  }

  .s {
    margin-top: 4px;
    font-size: 9.5px;
  }

  .q {
    margin: 5px 0 0;
    font-family: "EB Garamond", Georgia, serif;
    font-style: italic;
    font-size: 11.5px;
    line-height: 1.25;
    color: ${TINTA_PADRAO};
  }

  .l {
    margin-top: 6px;
    height: 1px;
    background: var(--f-acento, ${OURO_ESC});
  }

  .linha {
    margin-top: 4px;
    height: 20px;
    padding: 0 6px;
    border: 1px solid rgba(22, 32, 58, 0.12);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 9px;
    white-space: nowrap;
    gap: 6px;
  }

  .linha.rec {
    border-color: var(--f-acento, ${OURO_ESC});
    background: var(--f-suave, #f7f5f0);
  }

  .linha b {
    font-weight: 400;
    font-family: "EB Garamond", Georgia, serif;
    font-size: 12px;
    color: ${TINTA_PADRAO};
  }

  .reg {
    padding: 3px 0;
    border-top: 1px solid var(--f-linha, rgba(22, 32, 58, 0.12));
    font-family: "Poppins", sans-serif;
    font-size: 8px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--f-acento, ${OURO_ESC});
  }

  .reg:first-of-type {
    border-top: 0;
  }
`;

export function MiniFolha({ n, p, e }) {
  const a = p.avaliacao;
  return (
    <Mini style={varsTema(e.cor)}>
      {n === 0 && (
        <>
          {e.logo ? <img src={e.logo} alt="" style={{ maxWidth: 70, maxHeight: 22, objectFit: "contain", display: "block" }} /> : <div className="tag" style={{ fontFamily: "Poppins", fontSize: 7.5, letterSpacing: 1, textTransform: "uppercase" }}>seu logo</div>}
          <div className="g t">{p.tituloCapa}</div>
          <div className="s">Para: {e.pessoa}</div>
          <div className="l" />
          <div className="s"><span className="mt">{e.prof}</span> · {p.profissao}</div>
        </>
      )}
      {n === 1 && (
        <>
          <div className="g t" style={{ fontSize: 12 }}>{a.titulo}</div>
          <p className="q"><span className="mt">“{a.trouxe}”</span></p>
        </>
      )}
      {n === 2 && (
        <>
          <div className="g t" style={{ fontSize: 12 }}>{p.plano.titulo}</div>
          <div style={{ marginTop: 3 }}>
            {p.plano.opcoes.map((o, i) => (
              <div key={i} className={`linha${o.recomendada ? " rec" : ""}`}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{comQtd(o.titulo, o.qtd)}</span>
                <b>{o.semValor ? "—" : <span className="mt">R$ {reais(Number(e.valor[i]))}</span>}</b>
              </div>
            ))}
          </div>
        </>
      )}
      {n === 3 && (
        <>
          <div className="g t" style={{ fontSize: 12 }}>{p.regras.titulo}</div>
          <div style={{ marginTop: 4 }}>
            {p.regras.itens.map(([t]) => (
              <div key={t} className="reg">{t.replace(/\.$/, "")}</div>
            ))}
          </div>
        </>
      )}
    </Mini>
  );
}
