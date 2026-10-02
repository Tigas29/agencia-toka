import styled from "styled-components";
import { Media } from "../../../estilo/ds";

/* As folhas sao papel branco com tinta propria, iguais as do documento
   que a pessoa recebe. Nao herdam os tokens da faixa. */
const TINTA = "#16203A";
const CORPO = "#3E4657";
const FRACA = "#6B6F78";
const LINHA = "#E3DFD6";
const OURO = "#8A6A2A";
const MARCA = "#F6E6B0";

export const Folhas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

/* Barra fina que acompanha a rolagem: a dica e o botao de voltar. */
export const Ferramentas = styled.div`
  position: sticky;
  top: 8px;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  padding: 8px 8px 8px 14px;
  border-radius: 22px;
  background: #fff;
  border: 1px solid ${LINHA};
  box-shadow: 0 10px 24px -14px rgba(18, 26, 48, 0.4);
  font-size: 0.84rem;
  line-height: 1.3;
  color: ${CORPO};

  .dica {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  ${Media.PhoneLarge} {
    font-size: 0.78rem;
    padding: 7px 7px 7px 12px;

    .amostra {
      display: none;
    }
  }

  .amostra {
    flex: none;
    width: 22px;
    height: 12px;
    border-radius: 3px;
    background: ${MARCA};
  }

  button {
    flex: none;
    font-family: "Poppins", sans-serif;
    font-size: 0.78rem;
    color: ${TINTA};
    background: transparent;
    border: 1px solid ${LINHA};
    border-radius: 999px;
    padding: 9px 14px;
    cursor: pointer;
    transition: opacity 200ms ease, border-color 200ms ease;
  }

  button:hover:not(:disabled) {
    border-color: ${TINTA};
  }

  button:disabled {
    opacity: 0.45;
    cursor: default;
  }

  button:focus-visible {
    outline: 2px solid ${TINTA};
    outline-offset: 2px;
  }
`;

export const Pagina = styled.section`
  max-width: 720px;
  width: 100%;
  margin: 0 auto;

  .legenda {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 0 2px 12px;
    font-family: "Poppins", sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
  }

  .etiqueta {
    font-weight: 500;
    letter-spacing: 0.1em;
    color: #121A30;
    background: #E0B65A;
    padding: 6px 12px;
    border-radius: 6px;
  }
`;

export const Folha = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  color: ${CORPO};
  border-radius: 6px;
  box-shadow: 0 18px 40px -24px rgba(18, 26, 48, 0.5), 0 2px 6px rgba(18, 26, 48, 0.08);
  padding: 22px 20px 18px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 0.94rem;
  font-weight: 400;
  line-height: 1.55;

  ${Media.PhoneLarge} {
    min-height: 0;
  }

  @media (min-width: 720px) {
    padding: 44px 48px 30px;
    min-height: 960px;
  }

  h3,
  .garamond {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    color: ${TINTA};
    font-variant-numeric: lining-nums proportional-nums;
    font-feature-settings: "lnum" 1;
  }

  .topo,
  .pe {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-size: 0.64rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .topo {
    padding-bottom: 14px;
    border-bottom: 1px solid ${LINHA};
    margin-bottom: 26px;
    color: ${FRACA};

    .ouro {
      color: ${OURO};
    }

    span:last-child {
      text-align: right;
      overflow-wrap: anywhere;
    }
  }

  .pe {
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid ${LINHA};
    font-size: 0.74rem;
    letter-spacing: 0;
    text-transform: none;
    color: ${FRACA};
  }

  .espaco {
    flex: 1;
    min-height: 24px;
  }

  h3 {
    font-size: clamp(1.9rem, 8vw, 2.7rem);
    line-height: 1.08;
    letter-spacing: -0.012em;
    margin: 0 0 22px;
  }

  .rotulo {
    font-size: 0.64rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${OURO};
    margin: 26px 0 10px;
  }

  /* Pagina 1 */
  .logo {
    align-self: flex-start;
    border: 1px dashed #CFCABD;
    border-radius: 6px;
    padding: 18px 26px;
    font-size: 0.72rem;
    color: ${FRACA};
  }

  .titulo-capa {
    margin: 64px 0 40px;
    font-size: clamp(2.5rem, 12vw, 3.9rem);
    max-width: 8em;
  }

  .linha {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 14px 0;
    border-top: 1px solid ${LINHA};

    &:last-of-type {
      border-bottom: 1px solid ${LINHA};
    }

    .k {
      flex: none;
      width: 11em;
      font-size: 0.6rem;
      line-height: 1.5;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: ${FRACA};
    }

    .v {
      font-family: "EB Garamond", Georgia, serif;
      font-size: 1.45rem;
      color: ${TINTA};
      min-width: 0;
      flex: 1;
    }
  }

  .assina {
    margin-top: 56px;

    .nome {
      font-family: "EB Garamond", Georgia, serif;
      font-size: 1.5rem;
      line-height: 1.3;
      color: ${TINTA};
    }

    .miudo {
      font-size: 0.74rem;
      letter-spacing: 0.08em;
      color: ${FRACA};
    }
  }

  /* Pagina 2 */
  .quote {
    font-family: "EB Garamond", Georgia, serif;
    font-style: italic;
    font-size: 1.4rem;
    line-height: 1.35;
    color: ${TINTA};
    margin: 0;
    padding: 0 0 8px;
  }

  .itens {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      gap: 18px;
      padding: 13px 0;
      border-top: 1px solid ${LINHA};
      font-family: "EB Garamond", Georgia, serif;
      font-size: 1.22rem;
      line-height: 1.32;
      color: ${TINTA};
    }

    li:last-child {
      border-bottom: 1px solid ${LINHA};
    }

    .n {
      flex: none;
      font-size: 1rem;
      line-height: 1.6;
      color: ${OURO};
      font-variant-numeric: lining-nums;
    }
  }

  .fecho {
    margin: 24px 0 0;
    font-size: 0.86rem;
    color: ${FRACA};
  }

  /* Pagina 3 */
  .sub {
    margin: -10px 0 28px;
    font-size: 0.92rem;
    color: ${FRACA};
    max-width: 38em;
  }

  .assinaturas {
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
    margin-top: 26px;

    @media (min-width: 560px) {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    div {
      border-top: 1px solid #CFCABD;
      padding-top: 8px;
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: ${FRACA};
      min-height: 52px;
      overflow-wrap: anywhere;
    }
  }

  .nota {
    margin: 22px 0 0;
    font-size: 0.86rem;
    color: ${FRACA};
  }

  /* Pagina 4 */
  .regras {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      padding: 13px 0;
      border-top: 1px solid ${LINHA};
    }

    li:last-child {
      border-bottom: 1px solid ${LINHA};
    }

    b {
      font-family: "EB Garamond", Georgia, serif;
      font-weight: 500;
      font-size: 1.1rem;
      color: ${TINTA};
      margin-right: 4px;
    }
  }

  .proximo {
    margin-top: 22px;
    padding: 16px 18px;
    border-radius: 8px;
    background: #FBFAF5;
    border: 1px solid ${LINHA};

    b {
      display: block;
      font-size: 0.64rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${OURO};
      margin-bottom: 6px;
    }
  }
`;

export const Cartoes = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
`;

export const Cartao = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid ${LINHA};
  border-radius: 8px;
  padding: 18px 16px 16px;
  background: #fff;

  &.rec {
    border-color: ${TINTA};
    background: #FBFAF5;
  }

  .selo {
    position: absolute;
    top: -8px;
    left: 14px;
    padding: 0 6px;
    background: #fff;
    font-size: 0.56rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${OURO};
  }

  &.rec .selo {
    background: #fff;
  }

  .op {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${FRACA};
    margin-bottom: 10px;
  }

  .tit {
    font-family: "EB Garamond", Georgia, serif;
    font-size: 1.7rem;
    line-height: 1.08;
    color: ${TINTA};
    margin-bottom: 8px;
  }

  .det {
    font-size: 0.8rem;
    color: ${CORPO};
    line-height: 1.5;
    padding-bottom: 12px;
    border-bottom: 1px solid ${LINHA};
  }

  .quem {
    font-size: 0.8rem;
    color: ${FRACA};
    line-height: 1.5;
    padding: 12px 0;
    flex: 1;
  }

  .valor {
    border-top: 1px solid ${LINHA};
    padding-top: 12px;
  }

  .valor .k {
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${FRACA};
    margin-bottom: 4px;
  }

  .valor .v {
    font-family: "EB Garamond", Georgia, serif;
    font-size: 1.95rem;
    line-height: 1.1;
    color: ${TINTA};
    font-variant-numeric: lining-nums;
  }

  .valor .parc {
    font-size: 0.82rem;
    color: ${CORPO};
    margin-top: 4px;
  }
`;

/* O campo editavel. Fundo de marca-texto, sem borda de formulario: na
   folha ele tem que parecer o proprio texto. Em 16px no minimo, porque
   o iOS da zoom na tela em campo menor que isso. */
export const CampoInline = styled.input`
  font: inherit;
  font-size: max(1em, 16px);
  letter-spacing: inherit;
  text-transform: inherit;
  color: inherit;
  background: ${MARCA};
  border: 0;
  border-radius: 3px;
  padding: 0 0.22em;
  margin: 0 -0.1em;
  vertical-align: baseline;
  outline: none;
  max-width: 100%;
  min-width: 2ch;
  transition: box-shadow 160ms ease;
  box-shadow: inset 0 -2px 0 rgba(138, 106, 42, 0.45);

  &:hover {
    box-shadow: inset 0 -2px 0 rgba(138, 106, 42, 0.8);
  }

  &:focus {
    box-shadow: 0 0 0 2px ${OURO};
    background: #FBEFC4;
  }

  @supports (field-sizing: content) {
    field-sizing: content;
    width: auto !important;
  }
`;

export const Alem = styled.div`
  display: grid;
  gap: 32px;
  align-items: center;

  @media (min-width: 881px) {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    gap: 18px;
    padding: 16px 0;
    border-top: 1px solid var(--linha);
    color: var(--tinta);
    font-size: 1.04rem;
    line-height: 1.5;
  }

  li:last-child {
    border-bottom: 1px solid var(--linha);
  }

  .n {
    flex: none;
    font-family: "EB Garamond", Georgia, serif;
    font-size: 1.5rem;
    line-height: 1.2;
    color: var(--acento);
    font-variant-numeric: lining-nums;
  }
`;
