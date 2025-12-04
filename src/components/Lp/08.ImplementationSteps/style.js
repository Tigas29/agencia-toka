import styled from "styled-components";
import bgPc from "../../../assets/landingpage/08.ImplementationSteps/background.webp";

const Media = {
  PhoneLarge: "@media(max-width:610px)",
  Tablet: "@media(max-width:1000px)",
};

export const Container = styled.section`
  width: 100%;
  padding: 6rem 0;
  min-width: 279px;
  background: #050505;
  display: flex;
  justify-content: center;
  background-image: url(${bgPc});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .inner {
    width: 90%;
    max-width: 75rem;
  }

  .title {
    color: #ff8419;
    font-family: "Poppins";
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 110%;
    margin-bottom: 3.5rem;

    ${Media.PhoneLarge} {
      font-size: 1.8rem;
    }
  }

  .grid {
    width: 100%;
    max-width: 75rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1.4fr;
    grid-template-rows: auto auto auto;
    row-gap: 2.7rem;

    ${Media.Tablet} {
      max-width: 100%;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto auto;
      column-gap: 1.5rem;
      row-gap: 2rem;
    }

    ${Media.PhoneLarge} {
      grid-template-columns: 1fr;
      row-gap: 1.6rem;
    }
  }

  .bar {
    height: 8rem;
  }

  .bar--1 {
    grid-row: 2;
    grid-column: 1;
    background: #1e1e1e;

    ${Media.Tablet} {
      grid-row: 1;
      grid-column: 1;
    }

    ${Media.PhoneLarge} {
      display: none;
    }
  }

  .bar--2 {
    grid-row: 2;
    grid-column: 2;
    background: #2e2e2e;

    ${Media.Tablet} {
      grid-row: 2;
      grid-column: 1;
    }

    ${Media.PhoneLarge} {
      display: none;
    }
  }

  .bar--3 {
    grid-row: 2;
    grid-column: 3;
    background: linear-gradient(90deg, #ff6a00, #ffb300);
    box-shadow: 0 0 50px rgba(255, 153, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;

    ${Media.Tablet} {
      grid-row: 3;
      grid-column: 1;
    }

    ${Media.PhoneLarge} {
      grid-row: 4;
      grid-column: 1;
    }
  }

  .highlight {
    font-family: "Poppins";
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 135%;

    span {
      color: #ffe3a6;
      font-weight: 700;
    }

    ${Media.PhoneLarge} {
      font-size: 0.9rem;
      text-align: center;
    }
  }

  .step {
    position: relative;
    font-family: "Poppins";
    color: #ffffff;
    margin: 1rem 0;
  }

  .step p {
    margin-top: 0.4rem;
    max-width: 18rem;
    color: #bcbcbc;
    font-size: 0.85rem;
    line-height: 150%;
  }

  .index {
    color: #ff8419;
    font-size: 0.85rem;
    margin-bottom: 0.3rem;
    display: block;
  }

  .step h3 {
    color: #ff8419;
    font-weight: 600;
    font-size: 1.35rem;
    line-height: 130%;

    ${Media.PhoneLarge} {
      font-size: 1.15rem;
    }
  }

  .step::before {
    content: "";
    position: absolute;
    width: 1px;
    background: #707070;
    opacity: 1;
    left: 1%;
    transform: translateX(-50%);

    ${Media.Tablet} {
      display: none;
    }
  }

  .step--3::before {
    content: "";
    position: absolute;
    width: 1px;
    background: #707070;
    opacity: 1;
    left: 99%;
    transform: translateX(-50%);

    ${Media.Tablet} {
      display: none;
    }
  }

  .step--1 {
    grid-row: 3;
    grid-column: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    ${Media.Tablet} {
      grid-row: 1;
      grid-column: 2;
      align-items: flex-start;
      justify-content: center;
      text-align: left;
    }

    ${Media.PhoneLarge} {
      grid-row: 1;
      grid-column: 1;
    }
  }

  .step--1::before {
    top: -3.2rem;
    height: 2.8rem;
  }

  .step--2 {
    grid-row: 3;
    grid-column: 2;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    ${Media.Tablet} {
      grid-row: 2;
      grid-column: 2;
      align-items: flex-start;
      text-align: left;
      justify-content: center;
    }

    ${Media.PhoneLarge} {
      grid-row: 2;
      grid-column: 1;
    }
  }

  .step--2::before {
    top: -3.2rem;
    height: 2.8rem;
  }

  .step--3 {
    grid-row: 1;
    grid-column: 3;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    ${Media.Tablet} {
      grid-row: 3;
      grid-column: 2;
      align-items: flex-start;
      text-align: left;
      justify-content: center;
    }

    ${Media.PhoneLarge} {
      grid-row: 3;
      grid-column: 1;
    }
  }

  .step--3::before {
    bottom: -3.2rem;
    height: 2.8rem;
  }
`;
