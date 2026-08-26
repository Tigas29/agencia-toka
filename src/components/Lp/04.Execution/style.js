import styled from "styled-components";
import { Media, Section } from "../../../estilo/ds";

/**
 * Os cinco pilares.
 *
 * Eram cartões alternando branco e laranja, com o laranja tentando dar
 * hierarquia a pilares que não têm hierarquia nenhuma — os cinco pesam
 * igual. Agora são cinco entradas numeradas na mesma superfície, e a
 * ordem é a única coisa que os distingue, que é o correto.
 *
 * As classes `.white` e `.orange` continuam no JSX e não pintam mais
 * nada: mantê-las custa uma linha de comentário e evita mexer na
 * marcação onde mora a copy.
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

  .header {
    margin-bottom: 56px;
    max-width: 44rem;
  }

  h2 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(2rem, 4.2vw, 3.2rem);
    line-height: 1.07;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0 0 20px;
  }

  .subtitle {
    font-size: 1.06rem;
    line-height: 1.6;
    color: var(--tinta-corpo);
    margin: 0;
    max-width: 48ch;
  }

  .grid {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--linha);
    margin-bottom: 44px;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    ${Media.Tablet} {
      grid-template-columns: 1fr;
    }
  }

  .rowBottom {
    grid-template-columns: repeat(2, 1fr);

    ${Media.Tablet} {
      grid-template-columns: 1fr;
    }
  }

  /* As classes .white e .orange são resquício da versão anterior e
     não têm efeito: os cinco pilares pesam igual e são desenhados
     igual. */
  .card {
    padding: 30px 30px 30px 0;
    border-bottom: 1px solid var(--linha);
    /* A régua vertical separa colunas sem fechar caixa: caixa em cinco
       itens iguais devolveria a grade de cartões que saiu daqui. */
    border-right: 1px solid var(--linha);

    &:last-child {
      border-right: 0;
    }

    ${Media.Tablet} {
      border-right: 0;
      padding: 24px 0;
    }
  }

  .card h3 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.16;
    color: var(--tinta);
    margin: 0 0 10px;
    padding-left: 30px;

    ${Media.Tablet} {
      padding-left: 0;
    }
  }

  .card p {
    font-size: 0.98rem;
    line-height: 1.55;
    color: var(--tinta-fraca);
    margin: 0;
    max-width: 34ch;
    padding-left: 30px;

    ${Media.Tablet} {
      padding-left: 0;
    }
  }
`;
