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
  flex-direction: column;
  justify-content: center;
  background: #fff;
  padding: 2rem 0 0rem;
  min-width: 279px;

  .inner {
    width: 90%;
    max-width: 75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.7rem;
    margin: auto auto 3rem;

    ${Media.TabletSmall} {
      align-items: start;
    }
  }

  .iconTop {
    width: 120px;
    margin-bottom: 1.2rem;

    ${Media.PhoneLarge} {
      width: 60px;
    }
  }

  .title {
    font-family: "Poppins";
    font-size: 2.7rem;
    font-weight: 700;
    line-height: 120%;
    color: #ff8419;

    ${Media.Laptop} {
      font-size: 2.3rem;
    }

    ${Media.TabletSmall} {
      text-align: left;
      width: 100%;
    }

    ${Media.PhoneLarge} {
      font-size: 1.9rem;
    }

    ${Media.PhoneSmall} {
      font-size: 1.7rem;
    }
  }

  .smallGray {
    font-family: "Poppins";
    font-size: 1.4rem;
    color: #8f8f8f;

    ${Media.TabletSmall} {
      text-align: left;
    }

    ${Media.PhoneLarge} {
      font-size: 1rem;
    }
  }

  .bonusTitle {
    margin-top: -0.5rem;
    font-family: "Poppins";
    font-size: 1.5rem;
    font-weight: 600;
    color: #3b3b3b;

    ${Media.TabletSmall} {
      text-align: left;
    }

    ${Media.PhoneLarge} {
      font-size: 1.1rem;
    }
  }

  .grid {
    margin-top: 0.4rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 0rem;
    justify-items: center;
    align-items: center;

    ${Media.TabletSmall} {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin: auto;
      width: 100%;
      gap: 1rem;
    }
  }

  .grid .item:last-child {
    grid-column: 1 / -1;
    justify-self: center;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: "Poppins";
    font-size: 1.1rem;
    color: #ff8419;
    font-weight: 500;
    gap: 0.5rem;

    ${Media.TabletSmall} {
      text-align: left;
    }

    img {
      width: 17px;
      height: auto;
    }

    ${Media.PhoneLarge} {
      font-size: 0.92rem;
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

  footer {
    width: 100%;
    margin-top: 3.5rem;
    background-color: #ff8419;
    color: #ffffff;
    font-family: "Poppins";
  }

  .footerTop {
    width: 90%;
    max-width: 75rem;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 3.5rem;
    padding: 2.2rem 0 1.5rem;

    ${Media.Tablet} {
      gap: 2.5rem;
      flex-wrap: wrap;
    }

    ${Media.PhoneLarge} {
      flex-direction: column;
      gap: 2rem;
    }
  }

  .footerCol {
    font-size: 0.88rem;
  }

  .footerCol--brand {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footerLogo {
    max-width: 120px;
  }

  .footerSocial {
    display: flex;
    gap: 0.6rem;
  }

  .socialIcon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #c86316;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.55rem;
    text-transform: uppercase;
    cursor: pointer;

    img {
      width: 20px;
      height: 20px;
    }
  }

  .footerHeading {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }

  .footerTextLine {
    font-size: 0.85rem;
    line-height: 150%;
    margin: 0.5rem 0;
    display: flex;
    gap: 0.5rem;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
    }
  }

  .footerLink {
    font-size: 0.85rem;
    line-height: 150%;
    margin: 0.5rem 0;
    cursor: pointer;
  }

  .footerCol--legal {
    text-align: left;
  }

  .footerBottom {
    width: 100%;
    text-align: center;
    padding: 0.9rem 0 1.2rem;

    p {
      font-size: 1rem;
    }
  }

  ${Media.PhoneSmall} {
    .footerTop {
      align-items: flex-start;
    }

    .footerLogo {
      max-width: 100px;
    }
  }
`;
