import styled from "styled-components";

const Media = {
  PhoneLarge: "@media(max-width:610px)",
  Laptop: "@media(max-width:1150px)",
  Tablet: "@media(max-width:1000px)",
  PhoneSmall: "@media(max-width:450px)",
};
export const Container = styled.main`
  width: 80%;
  max-width: 80rem;
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin: auto;
  gap: 1rem;
  min-height: 30rem;

  ${Media.Tablet} {
    min-height: 40rem;
    flex-direction: column;
  }
  ${Media.PhoneLarge} {
    width: 90%;
    max-width: 90rem;
    justify-content: center;
    gap: 2rem;
  }

  .column {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
  .row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
  }

  .textinfo {
    gap: 0.81rem;
    align-items: flex-start;
    width: 60%;
    ${Media.Tablet} {
      width: 100%;
    }

    p {
      font-family: "Sora";
      font-style: normal;
      font-weight: 300;
      font-size: 13px;
      display: flex;
      align-items: center;
      color: var(--light-gray);
      span {
        font-weight: bold;
      }
      ${Media.PhoneLarge} {
        font-size: 8px;
      }
    }

    h1 {
      font-family: "Sora";
      font-style: normal;
      font-weight: 400;
      font-size: 2rem;

      span {
        background: radial-gradient(
          50.48% 364.29% at 50% 50%,
          #ffeb9e 0%,
          #e9cb80 25%,
          #d3ac63 50%,
          #bd8e49 75%,
          #a77030 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      color: var(--light-gray);

      ${Media.PhoneLarge} {
        font-size: 1.4rem;
      }
    }
  }

  .imgContainer {
    width: 40%;
    margin: auto;
    ${Media.Tablet} {
      width: 100%;
      margin: 0;
    }
    img {
      margin: auto;
      display: block;
      width: 100%;
      ${Media.Tablet} {
        width: 60%;
        margin: 0;
      }
      ${Media.PhoneLarge} {
        width: 100%;
        margin: 0;
      }
    }
  }
`;
