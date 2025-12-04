import styled from "styled-components";

const Media = {
  PhoneLarge: "@media(max-width:610px)",
  LaptopLarge: "@media(max-width:1450px)",
  Laptop: "@media(max-width:1150px)",
  Tablet: "@media(max-width:1000px)",
  TabletSmall: "@media(max-width:880px)",
  PhoneSmall: "@media(max-width:450px)",
};

export const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4.5rem 0rem 5rem;
  min-width: 279px;
  background-color: var(--white);

  .inner {
    width: 90%;
    max-width: 85rem;
    background-color: #ff8419;
    border-radius: 20px;
    padding: 5rem 1rem;
  }

  .containerFaq {
    width: 100%;
    max-width: 75rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 4rem;
    margin: auto;

    ${Media.Tablet} {
      flex-direction: column;
      gap: 2rem;
    }
  }

  .left {
    flex: 0.9;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2rem;
      border-radius: 999px;
      background-color: #5a2a00;
      font-family: "Poppins";
      font-weight: 600;
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      max-width: 350px;
      color: var(--white);
    }

    h2 {
      font-family: "Poppins";
      line-height: 100%;
      font-size: 2.05rem;
      font-weight: 700;
      color: #5a2a00;

      ${Media.Laptop} {
        font-size: 1.9rem;
      }

      ${Media.PhoneLarge} {
        font-size: 1.7rem;
      }

      ${Media.PhoneSmall} {
        font-size: 1.5rem;
      }
    }

    .underline {
      width: 7rem;
      height: 2px;
      background: rgba(90, 42, 0, 0.25);
      margin-top: 0.4rem;
    }
  }

  .right {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    width: 100%;
  }

  .faqItem {
    width: 100%;
    background: transparent;
  }

  .questionRow {
    width: 100%;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 1.2rem;
    background-color: #ffece0;
    padding: 1rem 1.6rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: box-shadow 0.2s ease, transform 0.15s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    }
  }

  .number {
    min-width: 2.2rem;
    font-family: "Nunito";
    font-weight: 700;
    font-size: 1.5rem;
    color: rgba(255, 132, 25, 0.7);

    ${Media.Tablet} {
      font-size: 1.1rem;
    }
  }

  .questionText {
    flex: 1;
    text-align: left;
    font-family: "Poppins";
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 110%;
    color: #4c3a30;

    ${Media.Tablet} {
      font-size: 0.9rem;
    }
  }

  .icon {
    font-size: 1.2rem;
    font-weight: 700;
    color: #c67633;
    transform-origin: center;
    transition: transform 0.2s ease;

    &.open {
      transform: rotate(45deg);
    }
  }

  .answerText {
    margin-top: 0.4rem;
    margin-left: 3.8rem;
    font-family: "Poppins";
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 150%;
    color: #5a2a00;

    ${Media.Tablet} {
      font-size: 0.9rem;
      margin-left: 1rem;
    }
  }
`;
