import styled from "styled-components";
import bgPc from "../../../assets/homepage/contact/bannerPc.png";
import bgMob from "../../../assets/homepage/contact/bannerMob.png";

const Media = {
  PhoneLarge: "@media(max-width:610px)",
  Laptop: "@media(max-width:1150px)",
  Tablet: "@media(max-width:1000px)",
  PhoneSmall: "@media(max-width:450px)",
};

export const Container = styled.section`
  width: 100%;
  height: 30vh;
  background-image: url(${bgPc});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  ${Media.Tablet} {
    background-image: url(${bgMob});
    height: auto;
    padding: 4rem 0;
  }

  .content {
    width: 95%;
    max-width: 75rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    ${Media.Tablet} {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 35rem;

    .label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #ffffff;
      text-transform: uppercase;
      opacity: 0.9;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      padding-bottom: 0.5rem;
      width: fit-content;
    }

    h1 {
      color: #ffffff;
      font-family: "Nunito";
      font-weight: 700;
      font-size: 2.4rem;
      line-height: 1.3;

      ${Media.Phone} {
        font-size: 1.8rem;
      }
    }

    .sub {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1rem;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;

    ${Media.Tablet} {
      align-items: flex-start;
      text-align: left;
    }

    .info {
      .title {
        font-weight: 700;
        font-size: 1.1rem;
        color: white;
      }

      p {
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
`;
