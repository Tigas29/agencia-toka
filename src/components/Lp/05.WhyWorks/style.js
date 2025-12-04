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
  padding: 6.5rem 0 5.5rem;
  min-width: 279px;

  ${Media.PhoneLarge} {
    padding: 4.5rem 0 4rem;
  }

  .inner {
    width: 90%;
    max-width: 75rem;
  }

  .left {
    flex: 1.1;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    margin: auto;
    max-width: 40rem;
  }

  .containerTiago {
    display: flex;
    margin-top: 6rem;
    gap: 4rem;

    ${Media.Tablet} {
      flex-direction: column;
      gap: 3rem;
    }
  }

  .headlineRow {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2.2rem;
  }

  .headlineRow h2 {
    font-family: "Poppins";
    line-height: 100%;
    font-size: 2.05rem;
    font-weight: 700;
    color: var(--orange);
    white-space: nowrap;

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

  .headlineLine {
    flex: 1;
    height: 1.5px;
    background: #f2c9a1;

    ${Media.PhoneLarge} {
      display: none;
    }
  }

  .subTitle {
    font-family: "Poppins";
    font-weight: 700;
    font-size: 1.9rem;
    line-height: 135%;
    margin-bottom: 1rem;
    color: var(--orange);

    ${Media.Tablet} {
      font-size: 1.7rem;
    }

    ${Media.PhoneLarge} {
      font-size: 1.55rem;
    }
  }

  .experience {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .experienceTitle {
    font-family: "Nunito";
    font-weight: 700;
    font-size: 1.4rem;
    color: #6c3200;

    ${Media.Tablet} {
      font-size: 1.1rem;
    }
  }

  .experience ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .experience li {
    position: relative;
    padding-left: 1.6rem;
    font-family: "Poppins";
    font-size: 1.1rem;
    line-height: 150%;
    color: #6c3200;

    ${Media.Tablet} {
      font-size: 0.9rem;
    }
  }

  .experience li::before {
    content: "➝";
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0.95rem;
    color: #6c3200;
  }

  .claims {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .claim {
    font-family: "Nunito";
    font-weight: 700;
    font-size: 1.6rem;
    color: var(--orange);
    position: relative;
    display: inline-flex;
    align-items: center;

    ${Media.Tablet} {
      font-size: 1.2rem;
    }
  }

  .execution {
    margin-left: 5rem;

    ${Media.PhoneLarge} {
      margin-left: 0;
    }
  }

  .execution::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(50%);
    height: 1.5px;
    background: #f2c9a1;

    ${Media.PhoneLarge} {
      display: none;
    }
  }

  .execution::before {
    left: -3.4rem;
    width: 3.2rem;
  }

  .growth {
    margin-left: 10rem;

    ${Media.PhoneLarge} {
      margin-left: 0;
    }
  }

  .growth::before {
    content: "";
    position: absolute;
    left: -4.2rem;
    height: 2px;
    width: 4rem;
    background: #f2c9a1;

    ${Media.PhoneLarge} {
      display: none;
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    ${Media.Tablet} {
      justify-content: center;
      width: 100%;
    }
  }

  .photoWrapper {
    position: relative;
    width: 100%;
    max-width: 35rem;
    border-radius: 2rem;
    z-index: 1;

    ${Media.Tablet} {
      max-width: 35rem;
    }
  }

  .photoWrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 2rem;
  }

  .nameTag {
    position: absolute;
    right: -4rem;
    top: 26%;
    transform: translateY(-50%);
    padding: 0.5rem 1.6rem;
    background: #3a302c;
    border-radius: 0.7rem;
    border: 2px solid #ff8419;
    z-index: 2;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

    span {
      font-family: "Nunito";
      font-weight: 700;
      font-size: 0.78rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--white);
      white-space: nowrap;
    }

    ${Media.Tablet} {
      position: absolute;
      top: -20px;
      right: auto;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .badge {
    position: absolute;
    left: 50%;
    bottom: -2.1rem;
    transform: translateX(-50%);
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 1.5rem;
    background: #17100c;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.35);
    z-index: 2;

    img {
      width: 1.8rem;
      height: 2.7rem;
      object-fit: contain;
    }
  }
`;
