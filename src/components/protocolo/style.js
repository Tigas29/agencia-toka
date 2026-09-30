import styled from "styled-components";
import { Cta, H1, H2, Media, Section, numerais } from "../../estilo/ds";

/* Secao curta: o respiro padrao do DS e feito para pagina longa. */
export const Bloco = styled(Section)`
  padding: var(--respiro-curto) 0;
`;

export const Titulo1 = styled(H1)`
  font-size: clamp(2rem, 7.6vw, 3.5rem);
  max-width: 20ch;
  margin-bottom: 18px;

  ${Media.PhoneLarge} {
    max-width: 100%;
  }
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

export const Lista = styled.ol`
  list-style: none;
  counter-reset: item;
  padding: 0;
  margin: 28px 0 0;
  max-width: 44rem;

  li {
    counter-increment: item;
    position: relative;
    padding: 0 0 0 46px;
    margin: 0 0 20px;
    font-size: 1.04rem;
    line-height: 1.55;
    color: var(--tinta-corpo);

    &::before {
      content: counter(item);
      ${numerais};
      position: absolute;
      left: 0;
      top: -0.1em;
      font-family: "EB Garamond", Georgia, serif;
      font-size: 1.9rem;
      line-height: 1.2;
      color: var(--acento);
    }

    strong {
      color: var(--tinta);
      font-weight: 600;
    }
  }
`;

export const Quem = styled.div`
  display: flex;
  gap: 28px;
  align-items: center;

  img {
    flex: none;
    width: 132px;
    height: 132px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    border: 1px solid var(--linha);
  }

  ${Media.PhoneLarge} {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
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
