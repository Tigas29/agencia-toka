import styled from "styled-components";
import { Media } from "../../estilo/ds";
import tiagoRetrato from "../../assets/protocolo/tiago-retrato.webp";
import doc from "./docs";

/**
 * Uma ilustracao por peca do protocolo. As tres primeiras usam as paginas
 * reais do documento; as outras sao feitas em CSS, com o texto do proprio
 * produto (conversa, passos, selo), sem nome nem foto de terceiros.
 */

const Palco = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 6 / 5;
  border-radius: 20px;
  background: var(--fundo-fundo);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    height: auto;
  }
`;

const sombra = "0 14px 30px -14px rgba(18, 26, 48, 0.5), 0 2px 6px rgba(18, 26, 48, 0.12)";

/* Peca 1: leque das paginas 1, 2 e 3. */
const Leque = styled(Palco)`
  img {
    position: absolute;
    width: 42%;
    top: 12%;
    box-shadow: ${sombra};
    background: #fff;
  }
  .p1 { left: 9%; transform: rotate(-8deg); z-index: 1; }
  .p2 { left: 29%; top: 8%; z-index: 2; }
  .p3 { left: 49%; transform: rotate(8deg); z-index: 1; }

  .selo {
    position: absolute;
    right: 5%;
    bottom: 6%;
    z-index: 3;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    background: var(--tinta);
    color: var(--fundo);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: ${sombra};
    font-family: "Poppins", sans-serif;
    font-size: 0.66rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.2;

    b {
      font-family: "EB Garamond", Georgia, serif;
      font-weight: 400;
      font-size: 2rem;
      letter-spacing: 0;
      line-height: 1;
      color: #E0B65A;
    }
  }
`;

export function IlustraModelo({ nicho }) {
  return (
    <Leque>
      {[1, 2, 3].map((n) => (
        <img key={n} className={`p${n}`} src={doc[nicho][n]} width="700" height="990" alt="" />
      ))}
      <div className="selo">
        <b>4</b>
        páginas
      </div>
    </Leque>
  );
}

/* Peca 2: pagina 2 com a etiqueta de exemplo ficticio. */
const Exemplo = styled(Palco)`
  img {
    width: 52%;
    box-shadow: ${sombra};
    background: #fff;
  }

  .etiqueta {
    position: absolute;
    top: 16%;
    right: 9%;
    transform: rotate(5deg);
    background: #E0B65A;
    color: #121A30;
    font-family: "Poppins", sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 8px 14px;
    border-radius: 6px;
    box-shadow: ${sombra};
  }
`;

export function IlustraExemplo({ nicho }) {
  return (
    <Exemplo>
      <img src={doc[nicho][2]} width="700" height="990" alt="" />
      <span className="etiqueta">Exemplo fictício</span>
    </Exemplo>
  );
}

/* Peca 3: tela de WhatsApp em CSS. */
const Celular = styled(Palco)`
  .corpo {
    width: min(250px, 62%);
    border-radius: 30px;
    background: #121A30;
    padding: 9px;
    box-shadow: ${sombra};
  }

  .tela {
    border-radius: 22px;
    overflow: hidden;
    background: #ECE5DD;
  }

  .barra {
    height: 34px;
    background: #075E54;
  }

  .chat {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 12px 9px 16px;
  }

  .b {
    max-width: 86%;
    padding: 7px 10px;
    border-radius: 9px;
    font-family: "Nunito Sans", sans-serif;
    font-size: 0.72rem;
    line-height: 1.35;
    color: #111B21;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
  }

  .ela { align-self: flex-start; background: #fff; border-top-left-radius: 2px; }
  .voce { align-self: flex-end; background: #DCF8C6; border-top-right-radius: 2px; }

  ${Media.PhoneSmall} {
    .corpo { width: 68%; }
  }
`;

export function IlustraMensagens({ conversa }) {
  return (
    <Celular>
      <div className="corpo">
        <div className="tela">
          <div className="barra" />
          <div className="chat">
            {conversa.map((m, i) => (
              <div key={i} className={`b ${m.de === "ela" ? "ela" : "voce"}`}>
                {m.texto}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Celular>
  );
}

/* Peca 4: folha A4 com os cinco passos. */
const Folha = styled(Palco)`
  aspect-ratio: 1 / 1.05;

  @media (min-width: 881px) {
    aspect-ratio: 6 / 5;

    .folha {
      width: 250px;
    }
  }

  .folha {
    width: min(290px, 70%);
    aspect-ratio: 1 / 1.414;
    background: #fff;
    box-shadow: ${sombra};
    padding: 7% 8%;
    color: #16203A;
    overflow: hidden;
  }

  .rot {
    font-family: "Poppins", sans-serif;
    font-size: 0.5rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #7A5C12;
    margin: 0 0 4px;
  }

  h4 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: 1.45rem;
    line-height: 1.1;
    margin: 0 0 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(22, 32, 58, 0.15);
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: p;
  }

  li {
    counter-increment: p;
    display: flex;
    gap: 9px;
    align-items: baseline;
    font-family: "Nunito Sans", sans-serif;
    font-size: 0.72rem;
    line-height: 1.3;
    padding: 6px 0;
    border-bottom: 1px solid rgba(22, 32, 58, 0.08);
  }

  li::before {
    content: counter(p);
    font-family: "EB Garamond", Georgia, serif;
    font-size: 1.05rem;
    color: #7A5C12;
    flex: none;
    width: 12px;
  }
`;

export function IlustraGuia({ passos }) {
  return (
    <Folha>
      <div className="folha">
        <h4>Por onde começar</h4>
        <ol>
          {passos.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </div>
    </Folha>
  );
}

/* Peca 5: cartao de video 16:9. O selo dourado avisa que ainda nao existe. */
const Video = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  background: #0F1626;
  box-shadow: ${sombra};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 18%;
    filter: brightness(0.42) saturate(0.85);
  }

  .play {
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 62px;
    height: 62px;
    border-radius: 50%;
    background: rgba(244, 243, 238, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: "";
      margin-left: 4px;
      border-style: solid;
      border-width: 10px 0 10px 17px;
      border-color: transparent transparent transparent #121A30;
    }
  }

  .chip {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(18, 26, 48, 0.8);
    color: #F4F3EE;
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    padding: 5px 11px;
    border-radius: 999px;
  }

  .selo {
    position: absolute;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    white-space: nowrap;
    background: #E0B65A;
    color: #121A30;
    font-family: "Poppins", sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 999px;
  }
`;

export function IlustraAula({ selo }) {
  return (
    <Video>
      <img src={tiagoRetrato} width="900" height="1125" alt="" />
      <span className="chip">30 min</span>
      <span className="play" />
      <span className="selo">{selo}</span>
    </Video>
  );
}

/* Miniaturas (pilha). */
const Mini = styled.span`
  flex: none;
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 9px;
  overflow: hidden;
  background: var(--fundo-fundo);
  display: block;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
  }

  &.escuro img { filter: brightness(0.45); object-position: 50% 15%; }
  &.escuro::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-30%, -50%);
    border-style: solid;
    border-width: 6px 0 6px 10px;
    border-color: transparent transparent transparent #F4F3EE;
  }
  &.zap { background: #ECE5DD; }
  &.zap i {
    position: absolute;
    height: 9px;
    border-radius: 3px;
    background: #fff;
    left: 7px;
    width: 26px;
    top: 10px;
  }
  &.zap i + i { background: #DCF8C6; left: auto; right: 7px; top: 24px; width: 24px; }
  &.folha { background: #fff; }
  &.folha i {
    position: absolute;
    left: 10px;
    right: 10px;
    height: 2px;
    background: rgba(22, 32, 58, 0.35);
    top: 12px;
  }
  &.folha i:nth-child(2) { top: 20px; }
  &.folha i:nth-child(3) { top: 28px; }
  &.folha i:nth-child(4) { top: 36px; }
`;

export function Miniatura({ indice, nicho }) {
  switch (indice) {
    case 0:
      return <Mini><img src={doc[nicho][1]} alt="" width="48" height="48" /></Mini>;
    case 1:
      return <Mini><img src={doc[nicho][2]} alt="" width="48" height="48" /></Mini>;
    case 2:
      return <Mini className="zap"><i /><i /></Mini>;
    case 3:
      return <Mini className="folha"><i /><i /><i /><i /></Mini>;
    default:
      return <Mini className="escuro"><img src={tiagoRetrato} alt="" width="48" height="48" /></Mini>;
  }
}
