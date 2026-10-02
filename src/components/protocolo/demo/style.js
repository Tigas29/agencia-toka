import styled, { css } from "styled-components";
import { Media } from "../../../estilo/ds";

/* As folhas sao papel branco com tinta propria, iguais as do documento
   que a pessoa recebe. Nao herdam os tokens da pagina. A cor escolhida na
   conversa entra pelas variaveis --f-* (ver tema.js). */
const CORPO = "#3E4657";
const FRACA = "#6B6F78";

/* A4 a 96 dpi (794 x 1123), sempre no desenho largo: o PDF nao pode depender
   da largura da janela de quem exporta. Reserva a faixa navy de 45px no pe
   (34px a 595 de largura no canvas PDF-marca, escalado). */
const PDF = css`
  /* && sobe a especificidade: o @media (min-width: 720px) da folha de tela
     nao pode vencer quando o PDF e gerado numa janela larga. */
  && {
  width: 794px;
  height: 1123px;
  box-sizing: border-box;
  border-radius: 0;
  box-shadow: none;
  padding: 56px 56px 77px;
  min-height: 0;
  overflow: hidden;
  font-size: 0.94rem;

  h3 {
    font-size: 2.7rem;
  }

  .titulo-capa {
    font-size: 3.9rem;
  }

  .linha .k {
    width: 11em;
  }

  .assinaturas {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .incluido ul {
    grid-template-columns: 1fr 1fr;
  }
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
    color: var(--f-tinta, #16203A);
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
    border-bottom: 1px solid var(--f-linha, #E3DFD6);
    margin-bottom: 26px;
    color: ${FRACA};

    .ouro {
      color: var(--f-acento, #8A6A2A);
    }

    span:last-child {
      text-align: right;
      overflow-wrap: anywhere;
    }
  }

  .pe {
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid var(--f-linha, #E3DFD6);
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
    color: var(--f-acento, #8A6A2A);
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
    border-top: 1px solid var(--f-linha, #E3DFD6);

    &:last-of-type {
      border-bottom: 1px solid var(--f-linha, #E3DFD6);
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
      color: var(--f-tinta, #16203A);
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
      color: var(--f-tinta, #16203A);
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
    color: var(--f-tinta, #16203A);
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
      border-top: 1px solid var(--f-linha, #E3DFD6);
      font-family: "EB Garamond", Georgia, serif;
      font-size: 1.22rem;
      line-height: 1.32;
      color: var(--f-tinta, #16203A);
    }

    li:last-child {
      border-bottom: 1px solid var(--f-linha, #E3DFD6);
    }

    .n {
      flex: none;
      font-size: 1rem;
      line-height: 1.6;
      color: var(--f-acento, #8A6A2A);
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

  .incluido {
    margin-top: 22px;
    padding: 16px 18px 14px;
    border-radius: 8px;
    background: var(--f-suave, #FBFAF5);
    border: 1px solid var(--f-linha, #E3DFD6);

    b {
      display: block;
      font-size: 0.64rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--f-acento, #8A6A2A);
      margin-bottom: 8px;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: 1fr;
      gap: 4px 28px;

      @media (min-width: 720px) {
        grid-template-columns: 1fr 1fr;
      }
    }

    li {
      position: relative;
      padding-left: 16px;
      font-size: 0.88rem;
      color: ${CORPO};
    }

    li::before {
      content: "";
      position: absolute;
      left: 2px;
      top: 0.65em;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--f-acento, #8A6A2A);
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
      border-top: 1px solid var(--f-linha, #E3DFD6);
    }

    li:last-child {
      border-bottom: 1px solid var(--f-linha, #E3DFD6);
    }

    b {
      font-family: "EB Garamond", Georgia, serif;
      font-weight: 500;
      font-size: 1.1rem;
      color: var(--f-tinta, #16203A);
      margin-right: 4px;
    }
  }

  .proximo {
    margin-top: 22px;
    padding: 16px 18px;
    border-radius: 8px;
    background: var(--f-suave, #FBFAF5);
    border: 1px solid var(--f-linha, #E3DFD6);

    b {
      display: block;
      font-size: 0.64rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--f-acento, #8A6A2A);
      margin-bottom: 6px;
    }
  }

  ${(p) => p.$pdf && PDF}
`;

export const Cartoes = styled.div`
  display: grid;
  grid-template-columns: ${(p) => (p.$pdf ? "repeat(3, 1fr)" : "1fr")};
  gap: ${(p) => (p.$pdf ? "12px" : "22px")};

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
`;

export const Cartao = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--f-linha, #E3DFD6);
  border-radius: 8px;
  padding: 18px 16px 16px;
  background: #fff;

  &.rec {
    border-color: var(--f-tinta, #16203A);
    background: var(--f-suave, #FBFAF5);
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
    color: var(--f-acento, #8A6A2A);
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
    color: var(--f-tinta, #16203A);
    margin-bottom: 8px;
  }

  .det {
    font-size: 0.8rem;
    color: ${CORPO};
    line-height: 1.5;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--f-linha, #E3DFD6);
  }

  .quem {
    font-size: 0.8rem;
    color: ${FRACA};
    line-height: 1.5;
    padding: 12px 0;
    flex: 1;
  }

  .valor {
    border-top: 1px solid var(--f-linha, #E3DFD6);
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
    color: var(--f-tinta, #16203A);
    font-variant-numeric: lining-nums;
  }

  .valor .parc {
    font-size: 0.82rem;
    color: ${CORPO};
    margin-top: 4px;
  }
`;
