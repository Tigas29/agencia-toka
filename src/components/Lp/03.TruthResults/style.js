import styled from "styled-components";
import { Media, Section } from "../../../estilo/ds";

/**
 * "A verdade que ninguém te fala" + os entregáveis.
 *
 * São dois blocos numa faixa só, e a página vira papel aqui: a partir
 * desta dobra o assunto deixa de ser a promessa e passa a ser o que a
 * Toka entrega. É o mesmo arco da home — escuro quando fala com a
 * pessoa, claro quando fala de operação.
 *
 * Os sete entregáveis eram pílulas com ícone de check; viraram lista com
 * régua, na ordem escrita. Check em item de lista é redundante: a lista
 * já afirma que aquilo está incluído.
 */
export const Container = styled(Section).attrs({ className: "faixa-clara" })`
  .inner {
    width: 90%;
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
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

  /* O segundo bloco começa depois de uma pausa, não de uma linha: a
     faixa é a mesma, e o que separa os dois assuntos é o ar. */
  .inner.bottom {
    margin-top: var(--respiro-curto);
    align-items: start;
  }

  .mainPhoto {
    width: 100%;
    aspect-ratio: 4 / 5;
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

  h2,
  h3 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    line-height: 1.07;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0 0 24px;
  }

  h2 {
    font-size: clamp(2rem, 4.2vw, 3.2rem);
  }

  h3 {
    font-size: clamp(1.7rem, 3.2vw, 2.5rem);
  }

  /* Rótulo da dobra, no mesmo desenho do selo de seção do site: traço
     curto, versalete, entreletras larga. */
  .badge {
    margin: 0 0 26px;

    span {
      display: flex;
      align-items: center;
      gap: 16px;
      font-family: "Poppins", sans-serif;
      font-size: 0.68rem;
      font-weight: 400;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--tinta-fraca);

      &::before {
        content: "";
        width: 34px;
        height: 1px;
        background: currentColor;
        flex: none;
      }
    }
  }

  .paragraph {
    font-size: 1.06rem;
    line-height: 1.62;
    color: var(--tinta-corpo);
    margin: 0 0 26px;
    max-width: 48ch;
  }

  .highlight {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.3rem, 2vw, 1.65rem);
    font-weight: 400;
    line-height: 1.22;
    color: var(--acento);
    margin: 0;
    max-width: 34ch;
  }

  .pillList {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--linha);
  }

  .pill {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--linha);

    /* O check some: numa lista de entregáveis, o ícone repete o que a
       própria lista já diz, e sete deles empilhados viram textura. */
    img {
      display: none;
    }
  }

  .pillText {
    font-size: 1.06rem;
    line-height: 1.4;
    color: var(--tinta-corpo);

    ${Media.PhoneLarge} {
      font-size: 1rem;
    }
  }

  .imagesGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 32px;

    ${Media.PhoneSmall} {
      grid-template-columns: 1fr;
    }
  }

  .gridItem {
    aspect-ratio: 1 / 1;
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

  /* O quarto quadro da grade é texto, não foto: ele fecha o raciocínio
     das três imagens ao lado. Fundo de superfície para pertencer à
     grade sem fingir ser uma imagem. */
  .textCard {
    background: var(--superficie);
    display: flex;
    align-items: center;
    padding: 22px;

    p {
      margin: 0;
      font-family: "EB Garamond", Georgia, serif;
      font-size: 1.24rem;
      line-height: 1.24;
      color: var(--tinta);
    }

    ${Media.PhoneLarge} {
      aspect-ratio: auto;
      padding: 20px;
    }
  }
`;
