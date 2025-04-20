import styled from "styled-components";
import bgPc from "../../../assets/homepage/forWho/bannerPc.png";
import bgMob from "../../../assets/homepage/forWho/bannerMob.png";

const Media = {
  Tablet: "@media(max-width: 1000px)",
  Phone: "@media(max-width: 600px)",
};

export const Container = styled.section`
  width: 100%;
  padding: 6rem 0;
  display: flex;
  justify-content: center;
  color: white;

  background-image: url(${bgPc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${Media.Tablet} {
    background-image: url(${bgMob});
  }

  .content {
    width: 95%;
    max-width: 80rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 4rem;

    ${Media.Tablet} {
      flex-direction: column;
      gap: 3rem;
    }
  }

  .left {
    flex: 1;

    .headline {
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.5;
      font-family: "Nunito";

      ${Media.Phone} {
        font-size: 1.5rem;
      }
    }
  }

  .right {
    flex: 1;

    ul {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 0;
      margin: 0;
      list-style: none;

      li {
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        padding-top: 1rem;

        h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
          font-family: "Nunito";
        }

        p {
          font-size: 0.95rem;
          opacity: 0.85;
          font-family: "Inter";
        }
      }
    }
  }
`;
