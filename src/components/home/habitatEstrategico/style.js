import styled from "styled-components";

const Media = {
  Tablet: "@media(max-width: 1000px)",
  Phone: "@media(max-width: 600px)",
};

export const Container = styled.section`
  width: 100%;
  background: #f6f3f3;
  color: black;
  padding: 6rem 0;
  display: flex;
  justify-content: center;

  .content {
    width: 95%;
    max-width: 75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }

  .topBox,
  .bottomBox {
    background: linear-gradient(
      180deg,
      rgba(245, 245, 245, 0.05) 0%,
      rgba(31, 32, 48, 0.029) 126.11%
    );
    border-radius: 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.05);
    padding: 2rem 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    width: 100%;
    height: auto;

    ${Media.Tablet} {
      flex-direction: column;
      text-align: left;
      padding: 2rem;
    }

    h3 {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 1.4;
      font-family: "Nunito";

      ${Media.Phone} {
        font-size: 1.4rem;
      }
    }

    p {
      font-size: 1rem;
      line-height: 1.6;
      opacity: 0.85;
      font-family: "Inter";

      ${Media.Phone} {
        font-size: 0.95rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }

  .topBox {
    flex-direction: row;

    ${Media.Tablet} {
      flex-direction: column-reverse;
    }

    .image {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 30rem;

        ${Media.Tablet} {
          width: 20rem;
        }

        ${Media.Phone} {
          width: 16rem;
        }
      }
    }

    .text {
      flex: 1;

      ${Media.Tablet} {
        width: 100%;
      }
    }
  }

  .bottomBox {
    flex-direction: row;

    ${Media.Tablet} {
      flex-direction: column;
    }

    .chart {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 30rem;

        ${Media.Tablet} {
          width: 20rem;
        }

        ${Media.Phone} {
          width: 16rem;
        }
      }
    }

    .text {
      flex: 1;

      ${Media.Tablet} {
        width: 100%;
      }
    }
  }
`;
