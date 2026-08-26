import styled from "styled-components";
import { Media, Section } from "../../../estilo/ds";

/**
 * "Por que funciona" — a dobra do Tiago.
 *
 * É a única parte da página em que uma pessoa aparece por inteiro, e o
 * tratamento acompanha: retrato grande, sem cantos redondos exagerados e
 * sem selo de foguete flutuando por cima. A credencial fica embaixo do
 * retrato, em versalete, como legenda de foto — que é o que ela é.
 *
 * As três afirmações do fim ("É método. É execução. É crescimento
 * mensurável.") vinham escalonadas em diagonal com traços de ligação.
 * Continuam as três, agora empilhadas na serifada: a escada era um
 * efeito que atrapalhava a leitura de uma frase curta.
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

  .headlineRow {
    display: flex;
    align-items: center;
    gap: 22px;
    margin-bottom: 52px;
  }

  h2 {
    font-family: "Poppins", sans-serif;
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
    margin: 0;
    flex: none;
  }

  .headlineLine {
    flex: 1;
    height: 1px;
    background: var(--linha);
  }

  .containerTiago {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 4.5rem;
    align-items: start;

    ${Media.Tablet} {
      grid-template-columns: 1fr;
      gap: 2.8rem;
    }
  }

  .subTitle {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(2rem, 4.2vw, 3.1rem);
    line-height: 1.07;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0 0 34px;
    max-width: 20ch;
  }

  .experienceTitle {
    font-size: 1.06rem;
    line-height: 1.6;
    color: var(--tinta-corpo);
    margin: 0 0 20px;
    max-width: 44ch;
  }

  .experience ul {
    list-style: none;
    padding: 0;
    margin: 0 0 40px;
    border-top: 1px solid var(--linha);
  }

  .experience li {
    padding: 14px 0;
    border-bottom: 1px solid var(--linha);
    font-size: 1.02rem;
    line-height: 1.45;
    color: var(--tinta-corpo);
  }

  .claims {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .claim {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.5rem, 2.6vw, 2.1rem);
    font-weight: 400;
    line-height: 1.14;
    color: var(--tinta);
    margin: 0;

    /* Só a última é acentuada: é ela que carrega a promessa, e três
       linhas douradas seguidas não destacariam nenhuma. */
    &.growth {
      color: var(--acento);
    }
  }

  .photoWrapper {
    position: relative;
    width: 100%;
    max-width: 420px;

    ${Media.Tablet} {
      max-width: 340px;
    }

    /* O arquivo já é uma colagem pronta — o retrato grande com duas
       fotos menores encostadas nas bordas — e vem com fundo
       transparente e cantos próprios. Por isso nada de moldura, de
       proporção fixa ou de object-fit: qualquer um dos três recorta uma
       composição que já está fechada. */
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  /* Legenda do retrato, e não etiqueta sobre ele. */
  .nameTag {
    margin-top: 14px;

    span {
      font-family: "Poppins", sans-serif;
      font-size: 0.68rem;
      font-weight: 400;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--tinta-fraca);
    }
  }

  /* O selo do foguete sai: emoji-ícone flutuando sobre retrato é o tipo
     de enfeite que o resto do site não usa em lugar nenhum. */
  .badge {
    display: none;
  }
`;
