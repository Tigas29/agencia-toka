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

  .intro {
    text-align: center;
    max-width: 45rem;

    ${Media.Tablet} {
      text-align: left;
      align-items: flex-start;
    }

    .label {
      text-transform: uppercase;
      opacity: 0.6;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      font-family: "Inter";

      ${Media.Phone} {
        font-size: 0.8rem;
      }
    }

    h2 {
      font-weight: 700;
      font-size: 2.4rem;
      line-height: 1.3;
      font-family: "Nunito";

      ${Media.Tablet} {
        font-size: 2rem;
      }

      ${Media.Phone} {
        font-size: 1.6rem;
      }

      span {
        font-weight: 400;
        display: block;
        font-size: 1.4rem;
        margin-top: 0.4rem;
        font-family: "Inter";

        ${Media.Phone} {
          font-size: 1.1rem;
        }
      }
    }

    .subtitle {
      font-size: 1.1rem;
      opacity: 0.85;
      margin-top: 1.2rem;
      line-height: 1.6;
      font-family: "Inter";

      ${Media.Phone} {
        font-size: 1rem;
      }

      strong {
        color: #ff9c39;
        font-weight: 600;
      }
    }
  }

  .grid {
    display: flex;
    flex-direction: row;
    gap: 2rem;

    ${Media.Tablet} {
      flex-direction: column;
      align-items: flex-start;
    }

    .card {
      background: #ffffff;
      padding: 2rem;
      border-radius: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1.2rem;
      min-height: 550px;
      transition: transform 0.3s ease;
      box-shadow: 8.775px 13.1625px 34.0031px rgba(255, 156, 57, 0.1),
        35.1px 52.65px 62.5219px rgba(255, 156, 57, 0.09),
        77.8781px 117.366px 84.4594px rgba(255, 156, 57, 0.05),
        139.303px 208.406px 99.8156px rgba(255, 156, 57, 0.01);
      border-radius: 35.1px;

      ${Media.Tablet} {
        align-items: flex-start;
        text-align: left;
      }

      &:hover {
        transform: translateY(-5px);
      }

      &:nth-child(2) {
        min-height: 580px;
        margin-top: -30px;

        ${Media.Tablet} {
          margin-top: 0;
          min-height: 550px;
        }
      }

      h3 {
        font-size: 1.3rem;
        font-weight: 700;
        font-family: "Nunito";

        &.highlight {
          color: #ff9c39;
        }
      }

      p {
        font-size: 1rem;
        line-height: 1.6;
        opacity: 0.85;
        font-family: "Inter";

        strong {
          font-weight: 600;
        }

        ${Media.Phone} {
          font-size: 0.95rem;
        }
      }

      .icon {
        position: relative;
        width: 100%;
        display: block;
        margin: auto;

        img {
          position: relative;
          display: block;
          margin: auto;
          height: auto;
          width: 70%;
          object-fit: contain;
          box-shadow: 8.775px 13.1625px 34.0031px rgba(255, 156, 57, 0.1),
            35.1px 52.65px 62.5219px rgba(255, 156, 57, 0.09),
            77.8781px 117.366px 84.4594px rgba(255, 156, 57, 0.05),
            139.303px 208.406px 99.8156px rgba(255, 156, 57, 0.01);
        }
      }
    }
  }
`;
