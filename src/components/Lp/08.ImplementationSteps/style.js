import styled from "styled-components";
import { Media, Section, numerais } from "../../../estilo/ds";

/**
 * As três etapas da implementação.
 *
 * A versão anterior desenhava um gráfico: três barras de alturas
 * diferentes com os passos posicionados em volta por grid-area, e a
 * ordem visual (3, depois 1, depois 2) não era a ordem de leitura. Numa
 * página, um gráfico de barras que não mede nada é decoração cara.
 *
 * Aqui as três etapas viram trilha numerada, na ordem em que acontecem —
 * o JSX continua declarando o passo 3 primeiro, e a ordem correta é
 * restabelecida no CSS pela classe de cada um. O prazo, que era o rótulo
 * da barra mais alta, fecha a dobra como frase.
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

  .title {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(2rem, 4.2vw, 3.2rem);
    line-height: 1.07;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0 0 56px;
    max-width: 20ch;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border-top: 1px solid var(--linha);

    ${Media.Tablet} {
      grid-template-columns: 1fr;
    }
  }

  /* O JSX lista 3, 1, 2 (era o que a grade de barras exigia). A ordem de
     leitura é restabelecida aqui, e não lá, para a marcação onde mora a
     copy ficar intocada. */
  .step--1 {
    order: 1;
  }

  .step--2 {
    order: 2;
  }

  .step--3 {
    order: 3;
  }

  .step {
    padding: 30px 30px 34px 0;
    border-right: 1px solid var(--linha);
    border-bottom: 1px solid var(--linha);

    &:last-child {
      border-right: 0;
    }

    ${Media.Tablet} {
      border-right: 0;
      padding: 24px 0;
    }
  }

  .index {
    display: block;
    font-family: "EB Garamond", Georgia, serif;
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 1;
    color: var(--acento);
    margin-bottom: 16px;
    ${numerais};
  }

  .step h3 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.16;
    color: var(--tinta);
    margin: 0 0 8px;
  }

  .step p {
    font-size: 0.98rem;
    line-height: 1.55;
    color: var(--tinta-fraca);
    margin: 0;
    max-width: 30ch;
  }

  /* As barras do gráfico saem; sobra o prazo, que era o rótulo de uma
     delas e é a única informação que elas carregavam. */
  .bar--1,
  .bar--2 {
    display: none;
  }

  .bar--3 {
    order: 4;
    grid-column: 1 / -1;
    padding-top: 34px;
  }

  .highlight {
    margin: 0;
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.5rem, 2.6vw, 2.1rem);
    font-weight: 400;
    line-height: 1.16;
    color: var(--tinta);
    max-width: 26ch;
    ${numerais};

    /* A quebra de linha vem do JSX, que compunha o rótulo dentro da
       barra do gráfico. Ela FICA: sem ela, "elevar o" encosta em
       "nível" e a frase renderiza como "elevar onível" — o <br> era o
       único espaço entre as duas partes. */
    span {
      color: var(--acento);
    }
  }
`;
