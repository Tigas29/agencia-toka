import styled from "styled-components";

const Media = {
  Tablet: "@media(max-width: 1000px)",
  Phone: "@media(max-width: 600px)",
};

export const Container = styled.section`
  width: 100%;
  background: #f6f3f3;
  padding: 6rem 0;
  display: flex;
  justify-content: center;

  .content {
    width: 95%;
    max-width: 75rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    align-items: center;
    text-align: center;
  }

  .intro {
    max-width: 42rem;

    .label {
      text-transform: uppercase;
      opacity: 0.6;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }

    h2 {
      font-weight: 700;
      font-size: 2.2rem;
      line-height: 1.3;

      ${Media.Phone} {
        font-size: 1.7rem;
      }

      span {
        font-weight: 400;
        font-size: 1.2rem;
        display: block;
        margin-top: 0.5rem;
        opacity: 0.9;

        ${Media.Phone} {
          font-size: 1rem;
        }
      }
    }

    .desc {
      font-size: 1rem;
      opacity: 0.8;
      margin-top: 1rem;
      line-height: 1.6;

      strong {
        color: var(--orange);
        font-weight: 600;
      }
    }
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .step {
      background: white;
      border-radius: 1.5rem;
      padding: 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);

      ${Media.Tablet} {
        flex-direction: column;
        text-align: center;
      }

      .image {
        flex: 1;
        min-width: 140px;
        height: 140px;
        background: #f3f3f3;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      .text {
        flex: 2;
        text-align: left;

        ${Media.Tablet} {
          text-align: center;
        }

        h3 {
          font-size: 1.5rem;
          font-weight: 700;
        }

        h4 {
          font-size: 1.1rem;
          margin-top: 0.4rem;
          font-weight: 500;
        }

        p {
          margin-top: 0.5rem;
          font-size: 0.95rem;
          opacity: 0.85;
        }
      }
    }
  }

  .footer {
    max-width: 45rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    margin-top: 3rem;

    p {
      font-size: 0.95rem;
      opacity: 0.85;
      line-height: 1.6;
    }

    button {
      margin-top: 1.5rem;
    }
  }
`;
