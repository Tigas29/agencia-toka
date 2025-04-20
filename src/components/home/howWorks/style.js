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
    text-align: left;
  }

  .intro {
    max-width: 42rem;

    .label {
      text-transform: uppercase;
      opacity: 0.6;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      color: var(--black);
    }

    h2 {
      font-weight: 700;
      font-size: 2.2rem;
      line-height: 1.3;
      color: var(--black);
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

    .subtitle {
      color: var(--black);
    }

    .desc {
      opacity: 0.8;
      margin-top: 1rem;
      line-height: 1.6;
      color: var(--black);

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
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      height: 300px;

      .text {
        border-radius: 1.5rem;
        padding: 2rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        background: white;
        flex: 2;
        text-align: left;
        color: var(--black);

        h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--black);
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

      .whiteBox {
        background: #ffffff;
        box-shadow: 8.77352px 13.1603px 33.9974px rgba(255, 156, 57, 0.1),
          35.0941px 52.6411px 62.5114px rgba(255, 156, 57, 0.09),
          77.865px 117.346px 84.4452px rgba(255, 156, 57, 0.05),
          139.28px 208.371px 99.7988px rgba(255, 156, 57, 0.01);
        border-radius: 35.0941px;
        height: 100%;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 10rem;
        }
      }

      ${Media.Tablet} {
        flex-direction: column;
        align-items: stretch;
        height: auto;
        padding: 2rem;
        background: white;
        border-radius: 1.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);

        .whiteBox {
          box-shadow: none;
          border-radius: 0;
          margin-bottom: 1rem;
          justify-content: flex-start;

          img {
            width: 8rem;
          }
        }

        .text {
          box-shadow: none;
          background: transparent;
          border-radius: 0;
          padding: 0;
          align-items: flex-start;
          text-align: left;
        }
      }
    }
  }

  .footer {
    max-width: 45rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left;
    margin-top: 3rem;

    p {
      font-size: 0.95rem;
      opacity: 0.85;
      line-height: 1.6;
    }
  }

  .footerText {
    color: var(--black);
  }
`;
