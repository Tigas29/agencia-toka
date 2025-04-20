import styled from "styled-components";

const Media = {
  Tablet: "@media(max-width: 1000px)",
  Phone: "@media(max-width: 600px)",
};

export const Container = styled.section`
  width: 100%;
  background: inherit;
  padding: 5rem 0;
  display: flex;
  justify-content: center;

  .content {
    width: 95%;
    max-width: 75rem;
    display: flex;
    flex-direction: row;
    gap: 4rem;

    ${Media.Tablet} {
      flex-direction: column;
      gap: 3rem;
    }
  }

  .intro {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;

    ${Media.Tablet} {
      text-align: left;
    }

    .label {
      text-transform: uppercase;
      opacity: 0.7;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 0.5rem;
      width: 100%;
      max-width: 30rem;
      font-size: 0.9rem;
      font-family: "Inter";

      ${Media.Phone} {
        font-size: 0.8rem;
      }
    }

    h2 {
      font-weight: 700;
      font-size: 2.4rem;
      font-family: "Nunito";

      ${Media.Tablet} {
        font-size: 2rem;
        text-align: left;
      }

      ${Media.Phone} {
        font-size: 1.6rem;
      }
    }

    .download {
      display: flex;
      align-items: center;
      gap: 1rem;

      p {
        font-weight: 600;
        font-size: 1rem;
        font-family: "Inter";

        ${Media.Phone} {
          font-size: 0.9rem;
        }
      }

      .icon {
        background-color: var(--orange);
        padding: 0.3rem;
        border-radius: 10px;
        width: 3rem;
        height: 3rem;
        color: white;
        transition: 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .icon:hover {
        transform: scale(1.1);
      }
    }
  }

  .grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem 4rem;

    ${Media.Tablet} {
      grid-template-columns: 1fr;
    }

    .box {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      text-align: left;

      .title {
        text-transform: uppercase;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 0.4rem;
        opacity: 0.7;
        font-weight: 600;
        font-size: 0.9rem;
        font-family: "Inter";

        ${Media.Phone} {
          font-size: 0.8rem;
        }
      }

      h3 {
        font-weight: 700;
        font-size: 1.4rem;
        font-family: "Nunito";

        ${Media.Phone} {
          font-size: 1.2rem;
        }
      }

      p {
        font-weight: 400;
        line-height: 1.6;
        opacity: 0.9;
        font-size: 1rem;
        font-family: "Inter";

        ${Media.Phone} {
          font-size: 0.95rem;
        }
      }
    }
  }
`;
