import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TITULOS_GUIA } from "./guia-titulos";
import { espera, reduzMovimento, useEntrada } from "./movimento";

/**
 * Guia de fechamento em cartoes. Recebe o JSON que a IA devolve (ver
 * schema-guia.json) e e reutilizado pela demo (com selo "Exemplo" e entrada
 * em cascata) e pela pagina do comprador (sem selo, tudo de uma vez).
 *
 * Titulos: Workspace/ana/lowticket-saude/guia/exemplos.md, "Titulos dos cartoes".
 */

const MENSAGENS = [
  ["mesmaNoite", "Na mesma noite"],
  ["doisDias", "Dois dias depois"],
  ["umaSemana", "Uma semana depois"],
];

const TINTA = "#16203A";
const CORPO = "#3E4657";
const FRACA = "#635E51";
const OURO = "#7A5C12";
const LINHA = "rgba(22, 32, 58, 0.10)";

export const Cartao = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding: 14px 15px 15px;
  border-radius: 16px 16px 16px 4px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(18, 26, 48, 0.06);
  color: ${TINTA};
  font-family: "Nunito Sans", sans-serif;
  font-size: 14px;
  line-height: 1.45;
  text-align: left;

  .cab {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
  }

  h4 {
    margin: 0;
    font-family: "EB Garamond", serif;
    font-weight: 500;
    font-size: 19px;
    line-height: 1.15;
    color: ${TINTA};
  }

  .selo {
    flex: none;
    margin-top: 1px;
    padding: 2px 8px;
    border-radius: 999px;
    background: #e0b65a;
    color: #121a30;
    font-family: "Poppins", sans-serif;
    font-size: 9.5px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }

  .rot {
    margin: 12px 0 5px;
    font-family: "Poppins", sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: ${OURO};
  }

  .rot:first-of-type {
    margin-top: 0;
  }

  p {
    margin: 0;
    color: ${CORPO};
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    position: relative;
    padding: 6px 0 6px 16px;
    border-top: 1px solid ${LINHA};
    color: ${CORPO};
  }

  li:first-child {
    border-top: 0;
  }

  ul li::before {
    content: "";
    position: absolute;
    left: 3px;
    top: 0.95em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${OURO};
  }

  ol {
    counter-reset: passo;
  }

  ol li {
    padding-left: 28px;
    counter-increment: passo;
  }

  ol li::before {
    content: counter(passo);
    position: absolute;
    left: 2px;
    top: 4px;
    font-family: "EB Garamond", serif;
    font-size: 19px;
    line-height: 1.2;
    color: ${OURO};
  }

  .frase {
    margin-top: 8px;
    font-family: "EB Garamond", serif;
    font-style: italic;
    font-size: 17px;
    line-height: 1.3;
    color: ${TINTA};
  }

  .destaque {
    font-family: "EB Garamond", serif;
    font-size: 18px;
    line-height: 1.2;
    color: ${TINTA};
    margin-bottom: 4px;
  }

  .obj {
    padding: 8px 0;
    border-top: 1px solid ${LINHA};
  }

  .obj:first-child {
    border-top: 0;
    padding-top: 0;
  }

  .obj b {
    display: block;
    font-weight: 700;
    color: ${TINTA};
    margin-bottom: 2px;
  }

  .obj p {
    padding-left: 10px;
    border-left: 2px solid #e0b65a;
  }

  .msg {
    padding: 9px 11px;
    border-radius: 11px;
    background: #f3f0e8;
    font-size: 13px;
    line-height: 1.42;
    color: ${CORPO};
    white-space: pre-line;
  }

  .nota {
    color: ${FRACA};
  }
`;

export const BolhaAviso = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 13px;
  border-radius: 16px 16px 16px 4px;
  background: #fbf1d4;
  border: 1px solid rgba(122, 92, 18, 0.25);
  color: ${TINTA};
  font-family: "Nunito Sans", sans-serif;
  font-size: 14px;
  line-height: 1.42;
`;

/** Monta a lista de cartoes a partir do GUIA, pulando o que vier vazio. */
function montar(g) {
  const lista = (a) => (Array.isArray(a) ? a.filter(Boolean) : []);
  const cartoes = [];
  if (g.caso?.resumo || g.caso?.fraseDela) {
    cartoes.push({
      id: "caso",
      titulo: TITULOS_GUIA.caso,
      corpo: (
        <>
          {g.caso.resumo && <p>{g.caso.resumo}</p>}
          {g.caso.fraseDela && <p className="frase">“{g.caso.fraseDela}”</p>}
        </>
      ),
    });
  }
  const spin = [
    ["situacao", TITULOS_GUIA.spinS],
    ["problema", TITULOS_GUIA.spinP],
    ["implicacao", TITULOS_GUIA.spinI],
    ["necessidade", TITULOS_GUIA.spinN],
  ].filter(([k]) => lista(g.spin?.[k]).length);
  if (spin.length) {
    cartoes.push({
      id: "spin",
      titulo: TITULOS_GUIA.spin,
      corpo: spin.map(([k, rot]) => (
        <div key={k}>
          <div className="rot">{rot}</div>
          <ul>
            {lista(g.spin[k]).map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )),
    });
  }
  if (g.recomendacao?.opcao || g.recomendacao?.porque) {
    cartoes.push({
      id: "opcao",
      titulo: TITULOS_GUIA.opcao,
      corpo: (
        <>
          {g.recomendacao.opcao && <div className="destaque">{g.recomendacao.opcao}</div>}
          {g.recomendacao.porque && <p>{g.recomendacao.porque}</p>}
        </>
      ),
    });
  }
  if (lista(g.conducao).length) {
    cartoes.push({
      id: "conducao",
      titulo: TITULOS_GUIA.conducao,
      corpo: (
        <ol>
          {lista(g.conducao).map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      ),
    });
  }
  const objs = (g.objecoes ?? []).filter((o) => o?.objecao || o?.resposta);
  if (objs.length) {
    cartoes.push({
      id: "objecoes",
      titulo: TITULOS_GUIA.seDisser,
      corpo: objs.map((o, i) => (
        <div className="obj" key={i}>
          <b>{o.objecao}</b>
          <p>{o.resposta}</p>
        </div>
      )),
    });
  }
  const msgs = MENSAGENS.filter(([k]) => g.mensagens?.[k]);
  if (msgs.length) {
    cartoes.push({
      id: "mensagens",
      titulo: TITULOS_GUIA.mensagens,
      corpo: msgs.map(([k, rot]) => (
        <div key={k}>
          <div className="rot">{rot}</div>
          <div className="msg">{g.mensagens[k]}</div>
        </div>
      )),
    });
  }
  const p2 = g.pagina2;
  if (p2 && (p2.trouxe || lista(p2.encontrei).length || lista(p2.trabalhar).length)) {
    cartoes.push({
      id: "pagina2",
      titulo: TITULOS_GUIA.pagina2,
      corpo: (
        <>
          {p2.trouxe && (
            <>
              <div className="rot">O que te trouxe aqui</div>
              <p className="frase" style={{ marginTop: 0 }}>“{p2.trouxe}”</p>
            </>
          )}
          {lista(p2.encontrei).length > 0 && (
            <>
              <div className="rot">O que eu encontrei</div>
              <ul>{lista(p2.encontrei).map((t, i) => <li key={i}>{t}</li>)}</ul>
            </>
          )}
          {lista(p2.trabalhar).length > 0 && (
            <>
              <div className="rot">O que a gente vai trabalhar</div>
              <ul>{lista(p2.trabalhar).map((t, i) => <li key={i}>{t}</li>)}</ul>
            </>
          )}
        </>
      ),
    });
  }
  if (g.cuidado) {
    cartoes.push({ id: "cuidado", titulo: TITULOS_GUIA.cuidado, corpo: <p>{g.cuidado}</p> });
  }
  return cartoes;
}

function UmCartao({ c, selo, animar }) {
  const ref = useRef(null);
  useEntrada(ref, animar);
  return (
    <Cartao ref={ref} data-cartao-guia={c.id}>
      <div className="cab">
        <h4>{c.titulo}</h4>
        {selo && <span className="selo">{selo}</span>}
      </div>
      {c.corpo}
    </Cartao>
  );
}

/**
 * `selo`: texto do selo em cada cartao (a demo passa "Exemplo").
 * `cascata`: entram um a um, a cada `intervalo` ms.
 * `aoCrescer`: chamado depois de cada cartao novo (a conversa rola).
 * `aoTerminar`: chamado uma vez, com todos na tela.
 */
export default function CartoesGuia({ guia, selo = null, cascata = false, intervalo = 420, aoCrescer, aoTerminar, className, style }) {
  const cartoes = montar(guia ?? {});
  const total = cartoes.length;
  const [n, setN] = useState(cascata && !reduzMovimento() ? 0 : total);
  const cb = useRef({ aoCrescer, aoTerminar });
  cb.current = { aoCrescer, aoTerminar };

  useEffect(() => {
    if (!cascata || reduzMovimento()) {
      setN(total);
      return undefined;
    }
    let vivo = true;
    (async () => {
      for (let i = 1; i <= total; i += 1) {
        await espera(intervalo);
        if (!vivo) return;
        setN(i);
      }
    })();
    return () => {
      vivo = false;
    };
  }, [cascata, intervalo, total]);

  useEffect(() => {
    if (n > 0) cb.current.aoCrescer?.();
    if (n === total && total > 0) cb.current.aoTerminar?.();
  }, [n, total]);

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", ...style }}>
      {guia?.aviso ? <BolhaAviso role="note">{guia.aviso}</BolhaAviso> : null}
      {cartoes.slice(0, n).map((c) => (
        <UmCartao key={c.id} c={c} selo={selo} animar={cascata} />
      ))}
    </div>
  );
}
