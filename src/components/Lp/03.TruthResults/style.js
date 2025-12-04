import styled from "styled-components";
import bgPc from "../../../assets/landingpage/03.TruthResults/background.webp";
import circle from "../../../assets/landingpage/03.TruthResults/circle.webp";

const Media = {
  FourK: "@media(min-width:2750px)",
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
  background-image: url(${bgPc});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4.5rem 0 5rem;
  gap: 4rem;
  height: auto;
  min-width: 279px;

  ${Media.FourK} {
    background-image: none;
  }

  .inner {
    width: 90%;
    max-width: 75rem;
  }

  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rem;
    margin-bottom: 10rem;

    ${Media.Tablet} {
      gap: 3rem;
    }

    ${Media.TabletSmall} {
      flex-direction: column-reverse;
      align-items: center;
      margin-bottom: 5rem;
    }
  }

  .topLeft {
    flex: 1;
    position: relative;
  }

  .mainPhoto {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-width: 650px;
      border-radius: 1.6rem;
    }
  }

  .topRight {
    flex: 1.1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    ${Media.TabletSmall} {
      max-width: 42rem;
    }

    h2 {
      font-family: "Poppins";
      font-size: 2.05rem;
      font-style: normal;
      font-weight: 700;
      line-height: 120%;
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
  }

  .badge {
    padding: 0.8rem 1.6rem;
    border-radius: 0.9rem;
    background: #994700;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    span {
      font-family: "Poppins";
      font-weight: 600;
      font-size: 1.1rem;
      color: var(--white);
      text-align: center;
    }

    ${Media.PhoneLarge} {
      span {
        font-size: 0.9rem;
      }
    }
  }

  .paragraph {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 160%;
    color: #7f7f7f;

    ${Media.PhoneLarge} {
      font-size: 0.9rem;
    }
  }

  .highlight {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 150%;
    color: var(--orange);

    ${Media.PhoneLarge} {
      font-size: 0.94rem;
    }
  }

  .bottom {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 10%;

    ${Media.TabletSmall} {
      flex-direction: column;
      align-items: center;
      gap: 3rem;
    }
  }

  .bottomLeft {
    max-width: 28rem;
    position: relative;

    ${Media.TabletSmall} {
      max-width: 100%;
    }

    h3 {
      font-family: "Poppins";
      line-height: 100%;
      font-size: 2.05rem;
      font-style: normal;
      font-weight: 700;
      color: var(--orange);
      margin-bottom: 1.8rem;

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
  }

  .pillList {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .pill {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    border-radius: 1rem;
    background: #994700;
    color: var(--white);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);

    ${Media.PhoneLarge} {
      padding: 0.8rem 1.2rem;
    }

    img {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
    }
  }

  .pillText {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 140%;

    ${Media.PhoneLarge} {
      font-size: 0.88rem;
    }
  }

  .bottomRight {
    flex: 1.1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    max-width: 40rem;

    ${Media.Tablet} {
      width: 100%;
      align-items: center;
    }
  }

  .imagesGrid {
    width: 100%;
    max-width: 50rem;
    height: 40rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 180px 180px;
    gap: 8rem 2rem;
    position: relative;

    background-image: url(${circle});
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    ${Media.PhoneLarge} {
      max-width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 180px 290px;
      flex-direction: column;
      height: auto;
      gap: 2rem;
      justify-content: center;
      align-items: center;
    }

    ${Media.PhoneSmall} {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      gap: 2rem;
      background-image: none;
    }
  }

  .gridItem {
    height: 18rem;
    position: relative;

    ${Media.PhoneLarge} {
      height: auto;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 20px;

      ${Media.PhoneLarge} {
        max-width: 350px;
      }
    }
  }

  .textCard {
    display: flex;
    align-items: start;
    justify-content: start;

    p {
      font-family: "Nunito";
      font-style: normal;
      font-weight: 600;
      font-size: 1.1rem;
      line-height: 150%;
      color: var(--orange);
      text-align: left;
      padding-top: 1.2rem;
      padding-right: 4rem;

      ${Media.TabletSmall} {
        height: 15rem;
      }

      ${Media.PhoneSmall} {
        height: auto;
        padding: 0;
        text-align: center;
      }
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
`;
