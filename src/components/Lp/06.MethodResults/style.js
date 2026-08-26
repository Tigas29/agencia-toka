import styled from "styled-components";
import { Media, Section } from "../../../estilo/ds";

/**
 * "Médicos e clínicas que aplicaram o método relatam".
 *
 * A página volta ao escuro aqui e fica assim até o fim: daqui em diante
 * é prova e convite, que é conversa com a pessoa, não descrição de
 * operação.
 *
 * Os seis relatos eram cartões laranja de alturas diferentes numa grade
 * de duas colunas — o olho lia a grade antes de ler qualquer frase.
 * Viraram uma lista com régua: seis afirmações curtas, na ordem.
 */
export const Container = styled(Section).attrs({ className: "faixa-escura" })`
  .inner {
    width: 90%;
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 4.5rem;
    align-items: center;

    ${Media.Tablet} {
      grid-template-columns: 1fr;
      gap: 2.6rem;
    }

    ${Media.PhoneLarge} {
      width: 100%;
      padding: 0 22px;
    }
  }

  .photoWrapper {
    width: 100%;
    aspect-ratio: 3 / 4;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--linha);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  h2 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(2rem, 4.2vw, 3.1rem);
    line-height: 1.07;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0 0 32px;
    max-width: 20ch;
  }

  .pillGrid {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--linha);
  }

  .pill {
    padding: 16px 0;
    border-bottom: 1px solid var(--linha);
    font-size: 1.06rem;
    line-height: 1.4;
    color: var(--tinta-corpo);

    ${Media.PhoneLarge} {
      font-size: 1rem;
    }
  }

  .footerText {
    margin: 30px 0 0;
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.3rem, 2vw, 1.65rem);
    font-weight: 400;
    line-height: 1.22;
    color: var(--acento);
    max-width: 30ch;
  }
`;
