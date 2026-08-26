import styled from "styled-components";
import { Media, Section, numerais } from "../../../estilo/ds";

/**
 * Carrossel de cases.
 *
 * A mecânica é a de antes — trilho que desliza, setas, pontos, vídeo do
 * YouTube que só carrega depois do clique na miniatura — e nada disso
 * mudou. O que mudou é que os números pararam de gritar: eles eram
 * marrom `#6c3200` em 3.8rem de Poppins 700, o elemento mais pesado da
 * página inteira, competindo com o próprio depoimento que deveriam
 * sustentar.
 *
 * Agora o retrato do médico e a frase de virada é que lideram o cartão,
 * e o número entra na serifada, na cor da tinta, com o rótulo embaixo.
 * A métrica "fantasma" (o investimento, sempre a primeira) continua em
 * tom mais fraco: ela existe para dar escala ao resultado, não para ser
 * lida primeiro.
 */
export const Container = styled(Section).attrs({ className: "faixa-escura" })`
  .inner {
    width: 90%;
    max-width: 1140px;
    margin: 0 auto;

    ${Media.PhoneLarge} {
      width: 100%;
      padding: 0 22px;
    }
  }

  .carousel {
    display: flex;
    align-items: center;
    gap: 22px;
  }

  .slideWrapper {
    flex: 1;
    overflow: hidden;
  }

  .slideTrack {
    display: flex;
    transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  .slide {
    flex: 0 0 100%;
    min-width: 100%;
  }

  .card {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 3rem;
    align-items: start;

    ${Media.TabletSmall} {
      grid-template-columns: 1fr;
      gap: 1.8rem;
    }
  }

  .cardImage {
    position: relative;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid var(--linha);

    img {
      width: 100%;
      aspect-ratio: 3 / 4;
      object-fit: cover;
      display: block;
    }
  }

  .videoWrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;

    iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  .thumbButton {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    background: none;
    cursor: pointer;
  }

  /* Botão de play: círculo vazado com um triângulo, sobre o retrato.
     Sem fundo cheio — o retrato é o que deve ser visto. */
  .playIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 62px;
    height: 62px;
    border-radius: 50%;
    border: 1px solid rgba(244, 243, 238, 0.7);
    background: rgba(18, 26, 48, 0.35);
    backdrop-filter: blur(2px);
    transition: background 220ms ease, transform 220ms ease;
  }

  .playIcon::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 54%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 9px 0 9px 15px;
    border-color: transparent transparent transparent #f4f3ee;
  }

  .thumbButton:hover .playIcon {
    background: rgba(18, 26, 48, 0.55);
    transform: translate(-50%, -50%) scale(1.06);
  }

  /* O nome do case como legenda embaixo do retrato, não como etiqueta
     por cima dele. */
  .cardImageName {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 30px 16px 12px;
    background: linear-gradient(
      to top,
      rgba(15, 22, 38, 0.85),
      transparent
    );

    p {
      margin: 0;
      font-family: "Poppins", sans-serif;
      font-size: 0.72rem;
      font-weight: 400;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #f4f3ee;
    }
  }

  .cardContent {
    display: flex;
    flex-direction: column;
  }

  .caseLogo {
    margin-bottom: 18px;

    img {
      height: 30px;
      width: auto;
      display: block;
      /* Os logos dos parceiros vêm em cores próprias. Sobre navy, a
         única forma de eles conviverem com a faixa é entrarem como
         marca monocromática. */
      filter: grayscale(1) brightness(2.4);
      opacity: 0.75;
    }
  }

  /* A frase de virada. É o título do cartão. */
  .tag {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.6rem, 2.8vw, 2.3rem);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.012em;
    color: var(--tinta);
    margin: 0 0 22px;
    max-width: 22ch;
  }

  .bodyText p {
    font-size: 1rem;
    line-height: 1.62;
    color: var(--tinta-corpo);
    margin: 0 0 14px;
    max-width: 52ch;

    strong {
      color: var(--tinta);
      font-weight: 600;
    }
  }

  .metrics {
    display: flex;
    flex-wrap: wrap;
    gap: 2.6rem;
    margin: 20px 0 22px;
    padding-top: 22px;
    border-top: 1px solid var(--linha);
  }

  .metric {
    display: flex;
    flex-direction: column;
  }

  .metricHighlight {
    display: flex;
    align-items: baseline;
    gap: 0.15rem;
    font-family: "EB Garamond", Georgia, serif;
    color: var(--tinta);
    ${numerais};
  }

  .metricHighlight .prefix,
  .metricHighlight .suffix {
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--tinta-fraca);
  }

  .metricHighlight .value {
    font-size: clamp(2.2rem, 3.6vw, 3rem);
    font-weight: 400;
    line-height: 1;
  }

  /* O investimento entra apagado de propósito: ele dá escala ao número
     que vem depois e não deve ser lido antes dele. */
  .metric--ghost .value,
  .metric--ghost .prefix,
  .metric--ghost .suffix,
  .metric--ghost .metricCaption {
    color: var(--tinta-fraca);
  }

  .metricCaption {
    margin-top: 8px;
    font-size: 0.84rem;
    line-height: 1.35;
    color: var(--tinta-fraca);
    max-width: 22ch;
  }

  .footerTextCard {
    margin: 0;
    font-family: "EB Garamond", Georgia, serif;
    font-size: 1.24rem;
    font-weight: 400;
    line-height: 1.24;
    color: var(--acento);
    max-width: 34ch;
  }

  .navButton {
    flex: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--linha);
    background: transparent;
    color: var(--tinta-corpo);
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: border-color 200ms ease, color 200ms ease;

    p {
      margin: 0;
      font-size: 1.05rem;
      line-height: 1;
    }

    &:hover {
      border-color: var(--acento);
      color: var(--tinta);
    }

    &:focus-visible {
      outline: 1px solid var(--tinta);
      outline-offset: 3px;
    }
  }

  /* No telemóvel as setas saem das laterais (onde roubariam largura do
     cartão) e vão para uma linha própria abaixo dele. */
  .navButton--left-desktop,
  .navButton--right-desktop {
    ${Media.TabletSmall} {
      display: none;
    }
  }

  .buttom-mobile {
    display: none;
    gap: 12px;
    margin-top: 26px;

    ${Media.TabletSmall} {
      display: flex;
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 34px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 0;
    padding: 0;
    background: var(--tinta-fraca);
    opacity: 0.45;
    cursor: pointer;
    transition: opacity 200ms ease, background 200ms ease, width 200ms ease;

    &:hover {
      opacity: 0.8;
    }
  }

  /* O ponto ativo vira traço: em seis pontos iguais, mudar só a cor não
     diz o suficiente sobre onde a pessoa está. */
  .dot--active {
    width: 20px;
    border-radius: 3px;
    background: var(--acento);
    opacity: 1;
  }
`;
