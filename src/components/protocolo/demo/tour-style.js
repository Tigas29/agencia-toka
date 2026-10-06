import styled, { css } from "styled-components";

/**
 * Estilo do tour guiado (direcao E, cartoes limpos): canvas E1 a E8.
 * Fundo creme, progresso de 5 segmentos, numero grande em EB Garamond,
 * pilula navy de "Proximo" e o papel (papel.jsx) crescendo embaixo no
 * celular e numa segunda coluna no desktop (>= 960px).
 *
 * Cores iguais as do design system do site (src/estilo/ds.js): creme
 * #EFEDE6, navy #121A30, ouro escuro #7A5C12 (o ouro claro sobre creme nao
 * passa de 4.5:1, ver o comentario la).
 */

export const NAVY = "#121A30";
export const TINTA = "#16203A";
export const CORPO = "#3E4657";
export const FRACA = "#635E51";
export const OURO = "#E0B65A";
export const OURO_ESC = "#7A5C12";
export const CREME = "#EFEDE6";

const DESKTOP = "@media (min-width: 960px)";

const num = css`
  font-variant-numeric: lining-nums;
`;

export const Raiz = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: ${CREME};
  color: ${TINTA};
  font-family: "Nunito Sans", sans-serif;
  -webkit-text-size-adjust: 100%;
  overflow-x: clip;

  button,
  input,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible {
    outline: 3px solid ${OURO_ESC};
    outline-offset: 2px;
  }

  h1:focus {
    outline: none;
  }

  ${DESKTOP} {
    &[data-fase="passo"] {
      flex-direction: row;
      align-items: stretch;
    }
  }
`;

export const Coluna = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;

  ${DESKTOP} {
    [data-fase="passo"] > & {
      padding-left: clamp(40px, 6.2vw, 80px);
      padding-right: 48px;
      max-width: 640px;
      min-height: 100dvh;
    }

    [data-fase="abertura"] > &,
    [data-fase="pronta"] > &,
    [data-fase="oferta"] > & {
      width: 100%;
      margin: 0 auto;
    }

    [data-fase="abertura"] > & {
      max-width: 600px;
    }

    [data-fase="pronta"] > & {
      max-width: 900px;
    }

    [data-fase="oferta"] > & {
      max-width: 1080px;
    }
  }
`;

/* Faixa de compra (05/out): o link do checkout visivel durante o tour, nao so na
   ultima tela. Sticky dentro da Coluna, entao no desktop nao cobre o papel. */
export const FaixaCompra = styled.a`
  position: sticky;
  top: 0;
  z-index: 6;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: env(safe-area-inset-top) 20px 0;
  background: ${NAVY};
  color: #f4f3ee;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  line-height: 1.2;
  text-decoration: none;

  .preco {
    white-space: nowrap;
  }

  .ir {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${OURO};
    font-weight: 600;
    white-space: nowrap;
  }

  &:active .ir {
    opacity: 0.8;
  }

  ${DESKTOP} {
    margin-top: 0;
    border-radius: 0 0 14px 14px;
    padding: 0 20px;
    font-size: 14px;
  }
`;

export const Topo = styled.header`
  flex: none;
  height: 48px;
  padding: 4px 12px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .marca {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 2.4px;
    color: ${TINTA};
  }

  .apoio {
    font-size: 13px;
    padding-right: 8px;
    color: ${FRACA};
  }

  ${DESKTOP} {
    padding: 20px 0 0;
    height: 64px;
    [data-fase="pronta"] &,
    [data-fase="oferta"] &,
    [data-fase="abertura"] & {
      padding-left: 20px;
      padding-right: 12px;
    }
  }
`;

const botaoTexto = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 8px;
  border: 0;
  background: transparent;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${CORPO};
  cursor: pointer;
  text-decoration: none;
`;

export const Pular = styled.button`
  ${botaoTexto}
  font-size: 13px;
  color: ${OURO_ESC};
  text-decoration: underline;
  text-underline-offset: 3px;
`;

export const VoltarLink = styled.button`
  ${botaoTexto}
`;

export const Progresso = styled.ol`
  margin: 6px 20px 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 6px;

  li {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .barra {
    display: block;
    height: 4px;
    border-radius: 2px;
    background: rgba(22, 32, 58, 0.14);
    transition: background 0.2s;
  }

  .rot {
    font-family: "Poppins", sans-serif;
    font-size: 9.5px;
    line-height: 1.25;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    font-weight: 400;
    color: ${FRACA};
  }

  li.feito .barra {
    background: ${TINTA};
  }

  li.feito .rot {
    font-weight: 500;
    color: ${CORPO};
  }

  li.atual .barra {
    background: ${OURO_ESC};
  }

  li.atual .rot {
    font-weight: 600;
    color: ${OURO_ESC};
  }

  ${DESKTOP} {
    margin: 26px 0 0;
    gap: 8px;
    .rot {
      font-size: 10.5px;
    }
  }
`;

export const Palco = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 14px 20px 0;
  will-change: transform, opacity;

  ${DESKTOP} {
    padding: 52px 0 40px;
    [data-fase="pronta"] &,
    [data-fase="abertura"] &,
    [data-fase="oferta"] & {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`;

export const Numero = styled.p`
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 8px;

  .n {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 500;
    font-size: 64px;
    line-height: 46px;
    color: ${OURO_ESC};
    ${num}
  }

  .de {
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${FRACA};
  }

  ${DESKTOP} {
    .n {
      font-size: 96px;
      line-height: 70px;
    }
    .de {
      font-size: 13px;
    }
  }
`;

export const Titulo = styled.h1`
  margin: 6px 0 0;
  font-family: "EB Garamond", Georgia, serif;
  font-weight: 500;
  font-size: 28px;
  line-height: 1.1;
  color: ${TINTA};
  overflow-wrap: break-word;
  text-wrap: balance;

  ${DESKTOP} {
    margin-top: 10px;
    font-size: 40px;
    line-height: 1.08;
  }
`;

export const Porque = styled.p`
  margin: 8px 0 0;
  font-size: 15.5px;
  line-height: 1.45;
  color: ${CORPO};

  ${DESKTOP} {
    margin-top: 14px;
    font-size: 18px;
    line-height: 1.55;
  }
`;

export const Controle = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${DESKTOP} {
    margin-top: 28px;
  }

  .rotulo {
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${CORPO};
  }

  /* nome */
  .campo {
    box-sizing: border-box;
    min-height: 56px;
    padding: 7px 16px 6px;
    border: 2px solid ${TINTA};
    border-radius: 14px;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .campo label {
    font-family: "Poppins", sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: ${FRACA};
  }

  .campo input {
    width: 100%;
    height: 26px;
    margin: 1px 0 0;
    padding: 0;
    border: 0;
    background: transparent;
    font-family: "Nunito Sans", sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: ${TINTA};
    outline: none;
  }

  .campo:focus-within {
    outline: 3px solid ${OURO_ESC};
    outline-offset: 2px;
  }

  /* logo */
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-botao {
    flex: 1;
    min-width: 0;
    min-height: 56px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    border: 1.5px dashed rgba(22, 32, 58, 0.35);
    border-radius: 14px;
    background: transparent;
    cursor: pointer;
    text-align: left;
    color: ${TINTA};
  }

  .logo-botao .t1 {
    display: block;
    font-size: 15px;
    font-weight: 700;
  }

  .logo-botao .t2 {
    display: block;
    font-size: 12.5px;
    color: ${FRACA};
  }

  .logo-ok {
    flex: 1;
    min-width: 0;
    min-height: 56px;
    box-sizing: border-box;
    padding: 6px 8px 6px 12px;
    border: 1.5px solid rgba(22, 32, 58, 0.2);
    border-radius: 14px;
    background: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo-ok img {
    flex: none;
    max-width: 72px;
    max-height: 40px;
    object-fit: contain;
  }

  .logo-ok .acoes {
    margin-left: auto;
    display: flex;
    gap: 2px;
  }

  .mini {
    min-height: 44px;
    padding: 0 10px;
    border: 0;
    background: transparent;
    font-family: "Poppins", sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: ${OURO_ESC};
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  .erro {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
    color: #9b3412;
  }

  /* escolhas (caso e cor) */
  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
    min-width: 0;
  }

  legend {
    padding: 0;
    margin-bottom: 10px;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${CORPO};
  }

  .opcoes {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .opcoes.cores .op {
    padding: 0 12px;
    gap: 10px;
    font-size: 15px;
  }

  .opcoes.cores {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .op {
    box-sizing: border-box;
    min-height: 52px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1.5px solid rgba(22, 32, 58, 0.22);
    border-radius: 14px;
    background: #fff;
    font-family: "Nunito Sans", sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: ${TINTA};
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }

  .op .pino {
    flex: none;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid rgba(22, 32, 58, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .op .pino::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${NAVY};
    transform: scale(0);
    transition: transform 0.15s;
  }

  .op[aria-pressed="true"] {
    border: 2px solid ${TINTA};
    background: #faf8f2;
  }

  .op[aria-pressed="true"] .pino {
    border-color: ${NAVY};
  }

  .op[aria-pressed="true"] .pino::after {
    transform: scale(1);
  }

  .op .cor {
    flex: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
  }

  .op[aria-pressed="true"] .cor {
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px ${NAVY};
  }

  /* regua */
  .regua-linha {
    display: flex;
    align-items: baseline;
    gap: 10px;
    color: ${TINTA};
  }

  .regua-linha .rs {
    font-size: 22px;
    font-weight: 500;
    color: ${FRACA};
  }

  .regua-linha .v {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 500;
    font-size: 60px;
    line-height: 52px;
    ${num}
  }

  input[type="range"] {
    display: block;
    width: 100%;
    height: 44px;
    margin: 0;
    accent-color: ${OURO_ESC};
    cursor: pointer;
  }

  .apoio {
    margin: 0;
    font-size: 15px;
    line-height: 1.45;
    color: ${FRACA};
  }

  ${DESKTOP} {
    .regua-linha .v {
      font-size: 92px;
      line-height: 76px;
    }
    .opcoes.cores {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;

export const Acoes = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${DESKTOP} {
    margin-top: 30px;
    flex-direction: row-reverse;
    align-items: center;
    gap: 12px;
  }
`;

const pilula = css`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 28px;
  border: 0;
  border-radius: 999px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.12s, opacity 0.12s;

  &:active {
    transform: scale(0.985);
  }
`;

export const Proximo = styled.button`
  ${pilula}
  background: ${NAVY};
  color: #f4f3ee;

  ${DESKTOP} {
    flex-grow: 1;
  }
`;

export const Voltar = styled.button`
  ${botaoTexto}
  height: 44px;

  ${DESKTOP} {
    height: 56px;
    padding: 0 18px 0 8px;
    font-size: 15px;
  }
`;

/* ---------- abertura (E1) ---------- */

export const Abertura = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 14px 0 0;
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 500;
    font-size: 28px;
    line-height: 1.1;
    color: ${TINTA};
  }

  .sub {
    margin: 8px 0 0;
    font-size: 15px;
    line-height: 1.45;
    color: ${CORPO};
  }

  .folha-ab {
    position: relative;
    margin-top: 4px;
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(18, 26, 48, 0.14);
    transform: rotate(-0.8deg);
    overflow: hidden;
    background: #fff;
  }

  .folha-ab .vista {
    pointer-events: none;
    user-select: none;
  }

  .folha-ab .selo {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
    padding: 2px 9px;
    border: 1px solid ${OURO_ESC};
    border-radius: 999px;
    background: #fbf7ea;
    font-family: "Poppins", sans-serif;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: ${OURO_ESC};
  }

  .pg {
    margin: 12px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 13px;
    color: ${FRACA};
  }

  .pg .gl {
    display: inline-flex;
    gap: 5px;
  }

  .pg i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(22, 32, 58, 0.18);
  }

  .pg i.on {
    background: ${NAVY};
  }

  ${DESKTOP} {
    h1 {
      font-size: 40px;
    }
  }
`;

export const AcoesAbertura = styled.div`
  margin-top: auto;
  padding: 16px 0 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .pular {
    ${botaoTexto}
    color: ${OURO_ESC};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const CtaNavy = styled.button`
  ${pilula}
  background: ${NAVY};
  color: #f4f3ee;
`;

/* ---------- papel (E2 a E5 e E8) ---------- */

export const PapelPainel = styled.aside`
  --u: 1px;
  position: relative;
  margin-top: 18px;
  background: #f7f5f0;
  border-radius: 22px 22px 0 0;
  box-shadow: 0 -10px 30px rgba(18, 26, 48, 0.1);
  padding: 13px 20px 0;
  min-height: 200px;
  overflow: hidden;

  .cab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
  }

  .cab .t {
    font-family: "Poppins", sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${FRACA};
  }

  .cab .pg {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: "Poppins", sans-serif;
    font-size: 10.5px;
    font-weight: 500;
    color: ${CORPO};
    white-space: nowrap;
  }

  .cab .pg i {
    display: block;
    width: 9px;
    height: 12px;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid rgba(22, 32, 58, 0.3);
  }

  .cab .pg i.on {
    background: ${TINTA};
    border-color: ${TINTA};
  }

  .cab .pg .gl {
    display: flex;
    gap: 3px;
  }

  .aba {
    height: 7px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid rgba(22, 32, 58, 0.1);
    border-bottom: 0;
    border-radius: 5px 5px 0 0;
  }

  .folha {
    box-sizing: border-box;
    padding: 14px 16px 30px;
    border-left: 1px solid rgba(22, 32, 58, 0.1);
    border-right: 1px solid rgba(22, 32, 58, 0.1);
    border-radius: 6px 6px 0 0;
    background: #fff;
    box-shadow: 0 6px 18px rgba(18, 26, 48, 0.08);
  }

  ${DESKTOP} {
    --u: 1.3px;
    flex: none;
    width: 680px;
    margin-top: 0;
    border-radius: 0;
    box-shadow: none;
    background: #e7e3d9;
    padding: 22px 90px 40px;
    min-height: 100dvh;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    align-self: flex-start;
    height: 100dvh;
    overflow-y: auto;

    .cab {
      margin-bottom: 14px;
    }

    .cab .t {
      font-size: 11px;
      letter-spacing: 1.3px;
    }

    .cab .pg {
      font-size: 11px;
    }

    .aba {
      height: 12px;
    }

    .folha {
      min-height: 640px;
      display: flex;
      flex-direction: column;
      padding: 34px 32px 28px;
      border: 0;
      border-radius: 4px;
      box-shadow: 0 24px 50px rgba(18, 26, 48, 0.16);
    }
  }
`;

/* ---------- pronta (E6) ---------- */

export const Pronta = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 500;
    font-size: 26px;
    line-height: 1.12;
    color: ${TINTA};
  }

  h1 .pr {
    display: block;
    font-size: 52px;
    line-height: 50px;
    color: ${OURO_ESC};
  }

  .sub {
    margin: 8px 0 0;
    font-size: 15px;
    line-height: 1.45;
    color: ${CORPO};
  }

  .grade {
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .mini {
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    text-align: left;
    border: 1px solid rgba(22, 32, 58, 0.12);
    border-top: 3px solid var(--f-acento, ${OURO_ESC});
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 6px 16px rgba(18, 26, 48, 0.07);
    cursor: pointer;
    overflow: hidden;
    font: inherit;
    color: inherit;
  }

  .mini .cap {
    display: block;
    padding: 8px 10px 0;
    font-family: "Poppins", sans-serif;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: ${FRACA};
  }

  .mini .vista {
    display: block;
    height: 116px;
  }

  .mini .abrir {
    display: block;
    padding: 6px 10px 8px;
    border-top: 1px solid rgba(22, 32, 58, 0.08);
    font-family: "Poppins", sans-serif;
    font-size: 11px;
    font-weight: 500;
    color: ${OURO_ESC};
  }

  .baixar {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .btn-pdf {
    ${pilula}
    height: 52px;
    background: ${NAVY};
    color: #f4f3ee;
  }

  .btn-pdf:disabled {
    opacity: 0.75;
    cursor: progress;
  }

  .nota {
    margin: 0;
    font-size: 13px;
    line-height: 1.4;
    color: ${FRACA};
    text-align: center;
  }

  .aviso {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
    color: #9b3412;
    text-align: center;
  }

  ${DESKTOP} {
    h1 {
      font-size: 34px;
    }
    h1 .pr {
      font-size: 64px;
      line-height: 60px;
    }
    .sub {
      font-size: 17px;
    }
    .grade {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .baixar {
      max-width: 420px;
    }
  }
`;

/* ---------- bloco do guia ---------- */

export const Guia = styled.section`
  margin: 26px -20px 0;
  padding: 18px 20px 24px;
  background: #fff;
  border-radius: 22px 22px 0 0;
  box-shadow: 0 -10px 30px rgba(18, 26, 48, 0.08);

  .selo {
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    padding: 3px 11px;
    border-radius: 999px;
    background: ${OURO};
    font-family: "Poppins", sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    line-height: 1.3;
    color: ${TINTA};
  }

  h2 {
    margin: 10px 0 0;
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 1.15;
    color: ${TINTA};
  }

  .sub {
    margin: 6px 0 0;
    font-size: 14px;
    line-height: 1.45;
    color: ${CORPO};
  }

  .papo {
    margin-top: 14px;
    padding: 10px;
    border-radius: 14px;
    background: #efeadf;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .m {
    box-sizing: border-box;
    max-width: 88%;
    margin: 0;
    padding: 8px 12px;
    border-radius: 14px;
    font-size: 14px;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  .m.voce {
    align-self: flex-end;
    background: ${NAVY};
    color: #f4f3ee;
    border-bottom-right-radius: 4px;
  }

  .m.paciente {
    align-self: flex-start;
    background: #fff;
    border-bottom-left-radius: 4px;
  }

  .m.nota {
    align-self: center;
    max-width: 96%;
    padding: 3px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.75);
    font-size: 12px;
    font-style: italic;
    color: ${FRACA};
    text-align: center;
  }

  .anexo {
    margin-top: 6px;
    padding: 6px 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.14);
    font-size: 12.5px;
  }

  .mais {
    align-self: flex-start;
    min-height: 44px;
    margin: 4px 0 -6px;
    padding: 0 6px;
    border: 0;
    background: transparent;
    font-family: "Poppins", sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: ${OURO_ESC};
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  .resposta {
    margin-top: 14px;
    padding-top: 16px;
    border-top: 1px solid rgba(22, 32, 58, 0.1);
  }

  .resposta h3 {
    margin: 0 0 10px;
    font-family: "Nunito Sans", sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.3;
    color: ${TINTA};
  }

  .resposta .lista {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
  }

  .resposta .pre {
    align-self: flex-end;
    font-family: "Poppins", sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: ${FRACA};
  }

  .resposta .m {
    max-width: 96%;
  }

  .resposta .mt {
    background-image: linear-gradient(rgba(224, 182, 90, 0.55), rgba(224, 182, 90, 0.55));
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 3px;
    padding: 0 3px;
    color: #fff;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  ${DESKTOP} {
    margin: 30px 0 0;
    padding: 24px 28px 28px;
    border-radius: 22px;
    box-shadow: 0 12px 34px rgba(18, 26, 48, 0.08);
  }
`;

export const BarraProximo = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 5;
  margin: 0 -20px;
  padding: 10px 20px calc(10px + env(safe-area-inset-bottom));
  display: flex;
  gap: 8px;
  align-items: center;
  background: linear-gradient(to top, ${CREME} 70%, rgba(239, 237, 230, 0));

  .voltar {
    ${botaoTexto}
    flex: none;
    height: 56px;
  }

  .prox {
    ${pilula}
    flex: 1;
    background: ${NAVY};
    color: #f4f3ee;
  }

  ${DESKTOP} {
    margin: 0;
    padding-left: 0;
    padding-right: 0;
  }
`;

/* ---------- oferta (E7) ---------- */

export const Oferta = styled.div`
  flex: 1;
  margin: 0 -20px;
  display: flex;
  flex-direction: column;

  .palco {
    padding: 8px 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .par {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }

  .cartao {
    --u: 1px;
    position: relative;
    width: 138px;
    height: 196px;
    flex: none;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 14px 12px 24px;
    background: #fff;
    border-top: 3px solid var(--f-acento, ${OURO_ESC});
    border-radius: 4px;
    box-shadow: 0 14px 30px rgba(18, 26, 48, 0.14);
    text-align: left;
  }

  .cartao .logo-v {
    width: 40px;
    height: 18px;
    border: 1px dashed rgba(22, 32, 58, 0.35);
    border-radius: 3px;
  }

  .cartao .tit {
    margin-top: 28px;
    font-family: "EB Garamond", Georgia, serif;
    font-size: 15px;
    line-height: 1.08;
    color: var(--f-tinta, ${TINTA});
  }

  .cartao .para {
    margin-top: 8px;
    font-size: 8px;
    color: ${CORPO};
  }

  .cartao .reg {
    margin-top: 26px;
    height: 1px;
    background: var(--f-acento, ${OURO_ESC});
  }

  .cartao .nm {
    margin-top: 6px;
    font-family: "EB Garamond", Georgia, serif;
    font-size: 12px;
    color: ${TINTA};
  }

  .cartao .rg {
    font-size: 7px;
    color: ${CORPO};
  }

  .cartao .vidro {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: 4px;
    pointer-events: none;
  }

  .cartao .marca {
    position: absolute;
    left: -40px;
    right: -40px;
    text-align: center;
    transform: rotate(-32deg);
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 3px;
    white-space: nowrap;
    color: rgba(155, 52, 18, 0.16);
    pointer-events: none;
  }

  .cartao .faixa {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 14px;
    background: ${NAVY};
  }

  .cartao .selo {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${OURO};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(18, 26, 48, 0.18);
  }

  .legendas {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    gap: 28px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.35;
    text-align: center;
    color: ${CORPO};
  }

  .legendas span {
    width: 138px;
  }

  .legendas span + span {
    font-weight: 700;
    color: ${TINTA};
  }

  .folha-oferta {
    margin-top: 22px;
    padding: 26px 22px 28px;
    text-wrap: balance;
    background: ${NAVY};
    border-radius: 26px 26px 0 0;
    color: #f4f3ee;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-self: stretch;
  }

  .folha-oferta h1 {
    margin: 0;
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 500;
    font-size: 30px;
    line-height: 1.1;
    color: #f4f3ee;
    text-wrap: balance;
  }

  .folha-oferta ul {
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 15.5px;
    line-height: 1.4;
    color: #e4e6eb;
  }

  .folha-oferta li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .folha-oferta li svg {
    flex: none;
    margin-top: 2px;
  }

  .preco {
    margin: 22px 0 0;
    display: flex;
    align-items: baseline;
    gap: 14px;
  }

  .preco s {
    font-size: 18px;
    color: #b9bdc8;
  }

  .preco .v {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 500;
    font-size: 64px;
    line-height: 58px;
    color: ${OURO};
    ${num}
  }

  .cta {
    ${pilula}
    padding: 0 16px;
    gap: 8px;
    margin-top: 18px;
    flex: none;
    background: ${OURO};
    color: ${NAVY};
    font-weight: 600;
  }

  .micro {
    margin: 12px 0 0;
    font-size: 13px;
    line-height: 1.4;
    color: #b9bdc8;
    text-align: center;
  }

  ${DESKTOP} {
    margin: 0;
    flex-direction: row;
    align-items: center;
    gap: 56px;
    padding: 30px 20px 60px;

    .palco {
      flex: none;
      padding: 0;
    }

    .cartao {
      width: 200px;
      height: 284px;
      padding: 20px 17px;
    }

    .cartao .logo-v {
      width: 54px;
      height: 24px;
    }

    .cartao .tit {
      margin-top: 40px;
      font-size: 21px;
    }

    .cartao .para {
      font-size: 11px;
    }

    .cartao .reg {
      margin-top: 38px;
    }

    .cartao .nm {
      font-size: 16px;
    }

    .cartao .rg {
      font-size: 9.5px;
    }

    .cartao .marca {
      font-size: 21px;
    }

    .cartao .faixa {
      height: 18px;
    }

    .legendas span {
      width: 200px;
    }

    .folha-oferta {
      margin-top: 0;
      flex: 1;
      border-radius: 26px;
      padding: 36px 36px 34px;
    }
  }
`;

export const Giro = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(244, 243, 238, 0.35);
  border-top-color: #f4f3ee;
  animation: giro 0.8s linear infinite;

  @keyframes giro {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
