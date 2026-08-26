import styled from "styled-components";
import { Media, Section } from "../../../estilo/ds";

/**
 * "Para quem é" — a dobra de reconhecimento.
 *
 * As dores vinham como pílulas laranja de cantos redondos, todas do
 * mesmo tamanho, e o efeito era de nuvem de tags: nada para ler em
 * ordem. Agora são linhas de uma lista, separadas por régua de 1px, na
 * ordem em que foram escritas. Cada uma é uma frase que a pessoa
 * reconhece ou não — e reconhecer uma de cada vez é o ponto da dobra.
 */
export const Container = styled(Section).attrs({ className: "faixa-escura" })`
  .inner {
    width: 90%;
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;

    ${Media.Tablet} {
      grid-template-columns: 1fr;
      gap: 2.6rem;
    }

    ${Media.PhoneLarge} {
      width: 100%;
      padding: 0 22px;
    }
  }

  h2 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(2rem, 4.2vw, 3.2rem);
    line-height: 1.07;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0 0 22px;
  }

  .subtitle {
    font-size: 1.06rem;
    line-height: 1.6;
    color: var(--tinta-corpo);
    max-width: 46ch;
    margin: 0 0 32px;
  }

  /* O botão do desktop fica na coluna do título; no telemóvel ele desce
     para depois da lista, que é onde a leitura termina. */
  .button-desktop {
    ${Media.Tablet} {
      display: none;
    }
  }

  .button-mobile {
    display: none;
    margin-top: 30px;

    ${Media.Tablet} {
      display: block;
    }
  }

  .pillList {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--linha);
  }

  .pill {
    display: block;
    padding: 17px 0;
    border-bottom: 1px solid var(--linha);
    font-size: 1.06rem;
    line-height: 1.4;
    color: var(--tinta-corpo);
    transition: color 200ms ease, padding-left 200ms ease;

    &:hover {
      color: var(--tinta);
      padding-left: 8px;
    }

    ${Media.PhoneLarge} {
      font-size: 1rem;
      padding: 15px 0;
    }
  }

  .footerText {
    margin: 30px 0 0;
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.3rem, 2vw, 1.65rem);
    font-weight: 400;
    line-height: 1.22;
    color: var(--acento);
    max-width: 34ch;
  }
`;
