import styled from "styled-components";
import { Media, Section } from "../../../estilo/ds";

/**
 * Fecho da LP e rodapé do site.
 *
 * A dobra de convite fica escura, como a abertura: a página termina onde
 * começou, falando com a pessoa. O rodapé vem logo abaixo, na mesma
 * faixa, separado só por uma régua de 1px.
 *
 * Os cinco bônus eram cartões com ícone de tarefa. Viraram lista com
 * régua, pelo mesmo motivo dos entregáveis lá em cima: o ícone repetido
 * cinco vezes vira textura e o check não acrescenta nada a um item que
 * já está numa lista de bônus.
 */
export const Container = styled(Section).attrs({ className: "faixa-escura" })`
  padding-bottom: 0;

  .inner {
    width: 90%;
    max-width: 1140px;
    margin: 0 auto;

    ${Media.PhoneLarge} {
      width: 100%;
      padding: 0 22px;
    }
  }

  /* O símbolo da marca no topo do fecho, em monocromático: o arquivo é
     a versão laranja, e sobre navy ela seria o único ponto laranja do
     site inteiro. */
  .iconTop {
    width: auto;
    height: 40px;
    margin-bottom: 34px;
    filter: grayscale(1) brightness(2.6);
    opacity: 0.8;
  }

  .title {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(2.3rem, 4.8vw, 3.7rem);
    line-height: 1.06;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0 0 20px;
  }

  .smallGray {
    font-size: 0.92rem;
    color: var(--tinta-fraca);
    margin: 0 0 44px;
  }

  .bonusTitle {
    font-size: 1.06rem;
    line-height: 1.6;
    color: var(--tinta-corpo);
    margin: 0 0 22px;
  }

  .grid {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--linha);
    margin-bottom: 40px;
    max-width: 46rem;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid var(--linha);
    font-size: 1.04rem;
    line-height: 1.4;
    color: var(--tinta-corpo);

    img {
      display: none;
    }

    ${Media.PhoneLarge} {
      font-size: 0.98rem;
    }
  }

  .footer {
    margin-top: var(--respiro-curto);
    padding: 44px 0 40px;
    border-top: 1px solid var(--linha);
    width: 90%;
    max-width: 1140px;
    margin-left: auto;
    margin-right: auto;

    ${Media.PhoneLarge} {
      width: 100%;
      padding: 36px 22px 34px;
    }
  }

  .footerTop {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: 2.5rem;

    ${Media.Tablet} {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    ${Media.PhoneLarge} {
      grid-template-columns: 1fr;
    }
  }

  .footerLogo {
    width: auto;
    height: 30px;
    margin-bottom: 20px;
    filter: grayscale(1) brightness(2.6);
    opacity: 0.85;
  }

  .footerSocial {
    display: flex;
    gap: 12px;
  }

  .socialIcon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid var(--linha);
    transition: border-color 200ms ease, opacity 200ms ease;

    img {
      width: 15px;
      height: 15px;
      object-fit: contain;
      filter: grayscale(1) brightness(2.4);
      opacity: 0.8;
    }

    &:hover {
      border-color: var(--acento);

      img {
        opacity: 1;
      }
    }
  }

  .footerHeading {
    font-family: "Poppins", sans-serif;
    font-size: 0.66rem;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
    margin: 0 0 18px;
  }

  .footerTextLine {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 0.92rem;
    color: var(--tinta-corpo);
    margin: 0 0 10px;

    img {
      width: 14px;
      height: 14px;
      object-fit: contain;
      filter: grayscale(1) brightness(2.4);
      opacity: 0.7;
    }
  }

  .footerLink {
    font-size: 0.92rem;
    color: var(--tinta-corpo);
    margin: 0 0 10px;
    cursor: pointer;
    transition: color 200ms ease;

    &:hover {
      color: var(--acento);
    }
  }

  .footerBottom {
    margin-top: 40px;
    padding-top: 22px;
    border-top: 1px solid var(--linha);

    p {
      margin: 0;
      font-size: 0.82rem;
      color: var(--tinta-fraca);
    }
  }
`;
