import styled from "styled-components";
import { Media, Section } from "../../../estilo/ds";

/**
 * Dobra de abertura da LP.
 *
 * O que ela era: um bloco branco com foto de fundo, cantos arredondados
 * de 80px, botão em degradê marrom e a palavra "toka" em 23rem de Nunito
 * cortada na borda. Cada um desses recursos vinha de um lugar diferente,
 * e nenhum deles é do design system.
 *
 * O que ficou: uma faixa escura como qualquer outra do site, a foto do
 * médico dentro de uma moldura simples, e a palavra grande reduzida a
 * marca d'água em EB Garamond — a mesma letra do wordmark. Ela existe
 * como grafismo de fundo, não como elemento a ser lido, e por isso não
 * carrega mais peso visual que a headline ao lado.
 */
export const Container = styled(Section).attrs({
  as: "header",
  className: "faixa-escura",
})`
  overflow: hidden;

  .containerBackground {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
  }

  .inner {
    width: 90%;
    max-width: 1140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    position: relative;
    z-index: 1;

    ${Media.TabletSmall} {
      flex-direction: column;
      align-items: flex-start;
      gap: 2.5rem;
    }

    ${Media.PhoneLarge} {
      width: 100%;
      padding: 0 22px;
      gap: 2rem;
    }
  }

  .left {
    flex: 1;
    max-width: 34rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.1rem;

    ${Media.TabletSmall} {
      max-width: 100%;
    }
  }

  .logo {
    margin-bottom: 1.4rem;
    display: flex;
    align-items: center;

    img {
      display: block;
      width: auto;
      height: 34px;

      ${Media.PhoneLarge} {
        height: 27px;
      }
    }
  }

  h1 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(2.3rem, 4.6vw, 3.6rem);
    line-height: 1.06;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0;
  }

  .description {
    font-size: 1.06rem;
    line-height: 1.6;
    color: var(--tinta-corpo);
    max-width: 46ch;
    margin: 0;

    ${Media.PhoneLarge} {
      font-size: 1rem;
    }

    /* O segundo parágrafo é a promessa. Ele não precisa de negrito para
       pesar mais que o primeiro: basta ser a única linha na cor cheia da
       faixa, enquanto o de cima fica no tom de corpo. */
    &.highlight {
      color: var(--tinta);
    }
  }

  button {
    margin-top: 0.8rem;
  }

  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;

    ${Media.TabletSmall} {
      align-self: stretch;
      justify-content: flex-start;
    }
  }

  /* O arquivo já vem com cantos arredondados e fundo transparente, então
     não leva moldura nem proporção fixa: qualquer uma das duas
     apareceria como um retângulo por trás dos cantos da própria imagem.
     A versão em uso é a medico-sem-selo.webp, recortada a partir da
     original — aquela trazia o símbolo laranja da identidade antiga
     queimado no canto, e era o último ponto laranja do site. */
  .photoCard {
    width: 100%;
    max-width: 400px;

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    ${Media.TabletSmall} {
      max-width: 320px;
    }
  }

  /**
   * A palavra da marca como grafismo, não como título: fica atrás de
   * tudo, na tinta da faixa em opacidade baixa, e sai de cena no
   * telemóvel, onde não há largura para ela sem atropelar o texto.
   */
  .bigWord {
    position: absolute;
    right: -1%;
    bottom: -14%;
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: 22rem;
    line-height: 0.75;
    text-transform: lowercase;
    color: var(--tinta);
    opacity: 0.04;
    pointer-events: none;
    user-select: none;
    z-index: 0;

    ${Media.Desktop} {
      font-size: 17rem;
    }

    ${Media.Tablet} {
      font-size: 13rem;
    }

    ${Media.TabletSmall} {
      display: none;
    }
  }
`;
