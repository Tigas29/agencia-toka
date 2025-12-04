import styled from "styled-components";
import bgPc from "../../../assets/landingpage/01.Banner/background.webp";

const Media = {
  FourK: "@media(min-width:2750px)",
  PhoneLarge: "@media(max-width:610px)",
  LaptopLarge: "@media(max-width:1450px)",
  Laptop: "@media(max-width:1150px)",
  Tablet: "@media(max-width:1000px)",
  TabletSmall: "@media(max-width:880px)",
  PhoneSmall: "@media(max-width:450px)",
};

export const Container = styled.main`
  width: 100%;
  height: 95vh;
  max-height: 1500px;
  background-color: var(--white);
  min-width: 279px;

  ${Media.TabletSmall} {
    height: auto;
  }

  .containerBackground {
    background-image: url(${bgPc});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 95vh;
    max-height: 1500px;

    ${Media.TabletSmall} {
      height: auto;
      padding: 5rem 0;
    }
  }

  .inner {
    width: 90%;
    max-width: 75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3.5rem;

    ${Media.TabletSmall} {
      flex-direction: column;
      align-items: center;
      gap: 2.5rem;
    }

    ${Media.PhoneLarge} {
      gap: 2rem;
    }
  }

  .left {
    flex: 1;
    max-width: 32rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;

    ${Media.PhoneLarge} {
      max-width: 100%;
    }
  }

  .logo {
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;

    img {
      display: block;
      max-width: 120px;
      margin-bottom: -1rem;
    }
  }

  h1 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 2.1rem;
    line-height: 120%;
    color: var(--white);

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

  .description {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 150%;
    color: rgba(255, 255, 255, 0.9);

    ${Media.PhoneLarge} {
      font-size: 0.9rem;
    }

    &.highlight {
      font-weight: 700;
      color: var(--white);
    }
  }

  button {
    background: linear-gradient(90deg, #6c3200 0%, #9f3d1f 100%);
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
    background: linear-gradient(90deg, #9f3d1f 0%, #6c3200 100%);
  }

  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    min-height: 15rem;

    ${Media.TabletSmall} {
      align-self: stretch;
      justify-content: center;
      min-height: 17rem;
    }

    ${Media.PhoneLarge} {
      justify-content: center;
    }
  }

  .photoCard {
    width: 100%;
    max-width: 500px;
    border-radius: 1.8rem;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    justify-content: stretch;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    ${Media.TabletSmall} {
      max-width: 500px;
    }
  }

  .bigWord {
    position: absolute;
    right: 2%;
    bottom: -8%;
    font-family: "Nunito";
    font-weight: 400;
    font-size: 23rem;
    line-height: 0.8;
    text-transform: lowercase;
    color: rgba(255, 255, 255);
    pointer-events: none;
    user-select: none;

    ${Media.FourK} {
      display: none;
    }

    ${Media.LaptopLarge} {
      right: -1%;
      bottom: -3%;
      font-size: 18rem;
    }

    ${Media.Laptop} {
      font-size: 15rem;
    }

    ${Media.PhoneLarge} {
      bottom: -1%;
      font-size: 10rem;
    }
  }
`;
