import styled from "styled-components";
import bgPc from "../../../assets/homepage/banner/background-pc.png";
import bgMob from "../../../assets/homepage/banner/background-mob.png";

const Media = {
  PhoneLarge: "@media(max-width:610px)",
  Laptop: "@media(max-width:1150px)",
  Tablet: "@media(max-width:1000px)",
  PhoneSmall: "@media(max-width:450px)",
};
export const Container = styled.main`
  width: 100%;
  height: 50vh;
  background-image: url(${bgPc});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${Media.Tablet} {
    background-image: url(${bgMob});
  }

  .textContainer {
    width: 95%;
    max-width: 75rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;
    gap: 0.8rem;
    height: 80%;
    margin: auto;
    ${Media.Tablet} {
      width: 95%;
      max-width: 95rem;
    }
    h1 {
      font-family: "Nunito";
      font-style: normal;
      font-weight: 400;
      color: var(--white);
      span {
        color: var(--orange);
        text-transform: capitalize;
      }
    }

    p {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
    }
    p:nth-child(1) {
      color: var(--white);
      font-weight: 500;
      ${Media.Tablet} {
        font-size: 1.4rem;
      }
    }
  }
`;
