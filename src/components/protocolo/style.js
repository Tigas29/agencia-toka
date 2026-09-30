import styled from "styled-components";
import { Cta, H1, H2, Media, Section, numerais } from "../../estilo/ds";

/* Secao curta: o respiro padrao do DS e feito para pagina longa. */
export const Bloco = styled(Section)`
  padding: var(--respiro-curto) 0;
`;

export const Titulo1 = styled(H1)`
  font-size: clamp(1.75rem, 1.4rem + 2vw, 2.9rem);
  line-height: 1.12;
  text-wrap: balance;
  margin-bottom: 18px;
`;

export const Titulo2 = styled(H2)`
  font-size: clamp(1.75rem, 6.2vw, 2.7rem);
  max-width: 24ch;
  margin-bottom: 20px;

  ${Media.PhoneLarge} {
    max-width: 100%;
  }
`;

/* Botao-link: mesma pilula do DS, sobre ancora. */
export const Botao = styled(Cta).attrs({ as: "a" })`
  text-decoration: none;
  text-align: center;
`;

export const Topo = styled.header`
  background: var(--fundo);
  padding: 16px 0;

  img {
    display: block;
    height: 26px;
    width: auto;
  }
`;

export const Kicker = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--acento);
  margin: 0 0 16px;
`;

export const Preco = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin: 0 0 18px;

  .de {
    font-size: 1rem;
    color: var(--tinta-fraca);
    text-decoration: line-through;
  }

  .por {
    ${numerais};
    font-family: "EB Garamond", Georgia, serif;
    font-size: 3.4rem;
    line-height: 1;
    color: var(--tinta);
  }
`;

export const Mockup = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  box-shadow: 0 18px 40px -22px rgba(18, 26, 48, 0.45);
  margin: 28px 0 30px;
`;

export const HeroGrade = styled.div`
  @media (min-width: 881px) {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 56px;
    align-items: center;

    ${Mockup} {
      grid-column: 2;
      grid-row: 1;
      margin: 0;
    }
  }
`;



export const Garantia = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--linha);

  p {
    margin: 0;
    font-size: 0.95rem;
    color: var(--tinta-corpo);
  }

  svg {
    flex: none;
  }
`;

export const Duvidas = styled.div`
  max-width: 44rem;

  details {
    border-top: 1px solid var(--linha);
    padding: 18px 0;
  }

  details:last-child {
    border-bottom: 1px solid var(--linha);
  }

  summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-size: 1.04rem;
    font-weight: 600;
    color: var(--tinta);
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::after {
    content: "+";
    flex: none;
    color: var(--acento);
    font-size: 1.3rem;
    line-height: 1;
  }

  details[open] summary::after {
    content: "−";
  }

  details p {
    margin: 12px 0 0;
    color: var(--tinta-corpo);
  }
`;

export const Barra = styled.div`
  display: none;

  ${Media.TabletSmall} {
    display: flex;
    align-items: center;
    gap: 14px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
    background: var(--fundo);
    border-top: 1px solid var(--linha);
    transform: translateY(110%);
    transition: transform 260ms ease;

    &.visivel {
      transform: translateY(0);
    }

    .valor {
      ${numerais};
      font-family: "EB Garamond", Georgia, serif;
      font-size: 2rem;
      line-height: 1;
      color: var(--tinta);
      flex: none;
    }

    a {
      flex: 1;
      padding: 13px 16px;
      font-size: 0.9rem;
    }
  }
`;

/* ---------- Rodada 2: pecas, pilha e autoridade ---------- */

export const Pecas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  margin-top: 36px;
`;

export const Peca = styled.article`
  display: grid;
  gap: 22px;
  align-items: center;

  .rotulo {
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--acento);
    margin: 0 0 10px;
  }

  h3 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(1.6rem, 5.4vw, 2.2rem);
    line-height: 1.1;
    color: var(--tinta);
    margin: 0 0 12px;
  }

  p.texto {
    margin: 0;
    font-size: 1.02rem;
    color: var(--tinta-corpo);
    max-width: 34rem;
  }

  @media (min-width: 881px) {
    grid-template-columns: 1fr 1fr;
    gap: 64px;

    &.inverte > :first-child {
      order: 2;
    }
  }
`;

export const Pilha = styled.div`
  margin-top: 64px;
  border-radius: 24px;
  padding: 34px 26px 30px;
  background: var(--fundo);
  color: var(--tinta-corpo);

  h3 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(1.7rem, 5.6vw, 2.4rem);
    line-height: 1.1;
    color: var(--tinta);
    margin: 0 0 22px;
  }

  ul {
    list-style: none;
    margin: 0 0 26px;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 13px 0;
    border-top: 1px solid var(--linha);
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 420ms ease, transform 420ms ease;
    transition-delay: calc(var(--i) * 140ms);

    span.t {
      flex: 1;
      font-size: 1rem;
      line-height: 1.4;
      color: var(--tinta);
    }
  }

  &.on li {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    li {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  .fecho {
    border-top: 1px solid var(--linha);
    padding-top: 24px;
    max-width: 420px;
  }

  @media (min-width: 881px) {
    padding: 48px 56px;
  }
`;

export const Check = styled.svg`
  flex: none;
  width: 22px;
  height: 22px;
`;

export const Autoridade = styled.div`
  display: grid;
  gap: 36px;

  figure {
    margin: 0;
  }

  figure img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: 22px;
  }

  figcaption {
    margin-top: 12px;
    font-size: 0.86rem;
    color: var(--tinta-fraca);
  }

  @media (min-width: 881px) {
    grid-template-columns: 0.8fr 1.2fr;
    gap: 72px;
    align-items: start;

    figure {
      position: sticky;
      top: 40px;
    }
  }
`;

export const Linha = styled.ol`
  list-style: none;
  margin: 28px 0 0;
  padding: 0 0 0 26px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 4px;
    top: 8px;
    bottom: 8px;
    width: 1px;
    background: var(--acento);
  }

  li {
    position: relative;
    margin: 0 0 24px;
  }

  li:last-child {
    margin-bottom: 0;
  }

  li::before {
    content: "";
    position: absolute;
    left: -26px;
    top: 7px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--acento);
  }

  .rotulo {
    display: block;
    font-family: "Poppins", sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--acento);
    margin-bottom: 4px;
  }

  .desc {
    color: var(--tinta-corpo);
    font-size: 1.02rem;
    line-height: 1.5;
  }
`;

export const Numeros = styled.div`
  display: grid;
  gap: 0;
  margin: 36px 0 28px;
  border-top: 1px solid var(--linha);

  div {
    padding: 16px 0;
    border-bottom: 1px solid var(--linha);
  }

  .n {
    ${numerais};
    display: block;
    font-family: "EB Garamond", Georgia, serif;
    font-size: 2rem;
    line-height: 1.1;
    color: var(--acento);
  }

  .l {
    display: block;
    margin-top: 4px;
    font-size: 0.86rem;
    color: var(--tinta-fraca);
  }

  @media (min-width: 881px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    border-top: 0;

    div {
      border-bottom: 0;
      border-top: 1px solid var(--linha);
    }
  }
`;
