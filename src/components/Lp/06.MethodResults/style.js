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
  padding: 6rem 0 5rem;
  min-width: 279px;

  ${Media.PhoneLarge} {
    padding: 4.5rem 0 4rem;
  }

  .inner {
    width: 90%;
    max-width: 75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    ${Media.Tablet} {
      flex-direction: column-reverse;
    }
  }

  .left {
    flex: 1;
    display: flex;
    justify-content: flex-start;

    ${Media.Tablet} {
      justify-content: center;
      width: 100%;
    }
  }

  .photoWrapper {
    width: 100%;
    border-radius: 2.2rem;
    max-width: 450px;

    ${Media.Tablet} {
      max-width: 650px;
      object-fit: cover;
      height: 650px;
      margin-top: 2rem;
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      border-radius: 20px;
    }
  }

  .right {
    flex: 1.1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.8rem;
    max-width: 40rem;

    ${Media.Tablet} {
      max-width: 100%;
    }
  }

  .right h2 {
    font-family: "Poppins";
    line-height: 100%;
    font-size: 2.05rem;
    font-weight: 700;
    color: var(--orange);

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

  .pillGrid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.9rem 1.1rem;

    ${Media.Tablet} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    ${Media.PhoneLarge} {
      grid-template-columns: 1fr;
    }
  }

  .pill {
    background-color: #ff8419;
    border-radius: 1.2rem;
    padding: 1.7rem 2rem;
    font-family: "Poppins";
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 140%;
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);

    ${Media.Tablet} {
      font-size: 0.9rem;
    }
  }

  .footerText {
    margin-top: 1.5rem;
    font-family: "Poppins";
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 100%;
    color: var(--orange);

    ${Media.PhoneLarge} {
      font-size: 1.2rem;
    }
  }
`;
