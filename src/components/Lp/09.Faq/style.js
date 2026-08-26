import styled from "styled-components";
import { Media, Section, numerais } from "../../../estilo/ds";

/**
 * Perguntas frequentes.
 *
 * O acordeão continua o mesmo — um item aberto por vez, controlado pelo
 * `useState` do componente. Mudou a régua: cada pergunta é uma linha
 * separada por 1px, com o número à esquerda e o sinal de mais à direita,
 * e a resposta entra no mesmo recuo do texto da pergunta em vez de
 * começar na margem.
 */
export const Container = styled(Section).attrs({ className: "faixa-clara" })`
  .inner {
    width: 90%;
    max-width: 1140px;
    margin: 0 auto;

    ${Media.PhoneLarge} {
      width: 100%;
      padding: 0 22px;
    }
  }

  .containerFaq {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 4.5rem;
    align-items: start;

    ${Media.Tablet} {
      grid-template-columns: 1fr;
      gap: 2.4rem;
    }
  }

  .badge {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: "Poppins", sans-serif;
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
    margin-bottom: 26px;

    &::before {
      content: "";
      width: 34px;
      height: 1px;
      background: currentColor;
      flex: none;
    }
  }

  h2 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(2rem, 4.2vw, 3.1rem);
    line-height: 1.07;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0;
    max-width: 14ch;
  }

  /* O sublinhado decorativo sai: o título já está sozinho na coluna. */
  .underline {
    display: none;
  }

  .faqItem {
    border-bottom: 1px solid var(--linha);

    &:first-child {
      border-top: 1px solid var(--linha);
    }
  }

  .questionRow {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    padding: 22px 0;
    background: none;
    border: 0;
    text-align: left;
    cursor: pointer;

    &:focus-visible {
      outline: 1px solid var(--tinta);
      outline-offset: 3px;
    }
  }

  .number {
    flex: none;
    font-family: "Poppins", sans-serif;
    font-size: 0.74rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: var(--tinta-fraca);
    ${numerais};
  }

  .questionText {
    flex: 1;
    margin: 0;
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.2rem, 1.9vw, 1.5rem);
    font-weight: 400;
    line-height: 1.2;
    color: var(--tinta);
  }

  .icon {
    flex: none;
    font-size: 1.3rem;
    line-height: 1;
    color: var(--tinta-fraca);
    transition: transform 240ms ease, color 240ms ease;
  }

  .icon.open {
    transform: rotate(45deg);
    color: var(--acento);
  }

  /* O recuo alinha a resposta com a pergunta, e não com o número:
     20px do gap + a largura do número. */
  .answerText {
    margin: 0 0 24px;
    padding-left: calc(20px + 1.6rem);
    font-size: 1.02rem;
    line-height: 1.6;
    color: var(--tinta-corpo);
    max-width: 56ch;

    ${Media.PhoneLarge} {
      padding-left: 0;
    }
  }
`;
