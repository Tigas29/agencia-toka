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
  background-color: var(--white);
  display: flex;
  justify-content: center;
  padding: 7.5rem 0 5rem;
  min-width: 279px;

  ${Media.Tablet} {
    padding: 3.5rem 0 4rem;
  }

  .inner {
    width: 90%;
    max-width: 75rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 4rem;

    ${Media.TabletSmall} {
      flex-direction: column;
      align-items: center;
      gap: 3rem;
    }

    ${Media.PhoneLarge} {
      gap: 2.5rem;
    }
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.4rem;
    max-width: 43rem;

    ${Media.TabletSmall} {
      width: 100%;
    }

    h2 {
      font-family: "Poppins";
      line-height: 100%;
      font-size: 2.05rem;
      font-style: normal;
      font-weight: 700;
      color: var(--orange);

      ${Media.Laptop} {
        font-size: 1.9rem;
        width: 100%;
      }

      ${Media.PhoneLarge} {
        max-width: 100%;
        font-size: 1.7rem;
      }

      ${Media.PhoneSmall} {
        font-size: 1.55rem;
      }
    }

    .subtitle {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 400;
      font-size: 1.1rem;
      line-height: 150%;
      color: #7f7f7f;

      ${Media.PhoneLarge} {
        max-width: 100%;
        font-size: 0.9rem;
      }
    }
  }

  .right {
    flex: 1.1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.5rem;
    max-width: 35rem;

    ${Media.Tablet} {
      align-items: center;
      max-width: 100%;
      margin: auto;
    }
  }

  .pillList {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;

    ${Media.Tablet} {
      align-items: start;
      width: 100%;
    }

    ${Media.PhoneLarge} {
      align-items: stretch;
    }
  }

  .pill {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.5rem 2rem;
    border-radius: 10px;
    background-color: #6c3200;
    color: var(--white);
    font-family: "Poppins";
    font-weight: 500;
    font-size: 0.95rem;
    line-height: 140%;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
    white-space: nowrap;
    align-self: flex-start;

    ${Media.Laptop} {
      font-size: 0.9rem;
      padding: 0.85rem 3rem;
    }

    ${Media.Tablet} {
      white-space: normal;
      font-size: 0.8rem;
    }

    ${Media.PhoneLarge} {
      width: 100%;
      padding: 0.85rem 1.7rem;
    }
  }

  .pill:nth-child(1) {
    min-width: 16rem;
  }

  .pill:nth-child(2),
  .pill:nth-child(4) {
    min-width: 25rem;
  }

  .pill:nth-child(5) {
    min-width: 20rem;
  }

  .pill:nth-child(3),
  .pill:nth-child(6),
  .pill:nth-child(7) {
    min-width: 19rem;
  }

  ${Media.PhoneLarge} {
    .pill:nth-child(n) {
      min-width: 0;
      align-self: stretch;
    }
  }

  .footerText {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 150%;
    color: #ff8419;

    ${Media.TabletSmall} {
      width: 100%;
    }

    ${Media.Laptop} {
      font-size: 1rem;
    }

    ${Media.PhoneLarge} {
      font-size: 0.95rem;
      max-width: 100%;
    }
  }

  button {
    background: linear-gradient(90deg, #8f0007 0%, #fd9b02 100%);
    padding: 1rem 1.5rem;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    transform: translateY(0);
    transition: background 0.4s ease, box-shadow 0.25s ease,
      transform 0.25s ease;
  }

  button p {
    font-size: 1.05rem;
    font-weight: 600;
    color: #fff;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(108, 50, 0, 0.45);
    background: linear-gradient(90deg, #fd9b02 0%, #8f0007 100%);
  }

  .button-desktop button {
    ${Media.TabletSmall} {
      display: none !important;
    }
  }

  .button-mobile {
    display: none !important;
    ${Media.TabletSmall} {
      display: block !important;
    }
  }
`;
