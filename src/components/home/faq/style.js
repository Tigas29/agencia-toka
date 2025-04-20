import styled from "styled-components";

const Media = {
  Tablet: "@media(max-width: 1000px)",
  Phone: "@media(max-width: 600px)",
};

export const Container = styled.section`
  width: 100%;
  background: #f6f5f7;
  padding: 6rem 0;
  display: flex;
  justify-content: center;

  .content {
    width: 95%;
    max-width: 75rem;
    display: flex;
    gap: 5rem;

    ${Media.Tablet} {
      flex-direction: column;
      gap: 3rem;
    }
  }

  .left {
    flex: 1;

    .label {
      text-transform: uppercase;
      opacity: 0.6;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      color: var(--black);
      font-family: "Inter";
    }

    h2 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--black);
      font-family: "Nunito";
    }

    .desc {
      font-size: 1rem;
      opacity: 0.7;
      line-height: 1.6;
      max-width: 22rem;
      color: var(--black);
      font-family: "Inter";
    }
  }

  .right {
    flex: 1;

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 0;

      li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding-bottom: 1rem;

        .question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
          font-weight: 500;
          color: var(--black);
          cursor: pointer;
          font-family: "Inter";

          span {
            font-size: 1.5rem;
            font-weight: 300;
            line-height: 1;
          }
        }

        .answer {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;

          p {
            font-family: "Inter";
          }
        }

        .answer.active {
          max-height: 200px;
          opacity: 0.9;
          margin-top: 0.7rem;
          pointer-events: auto;

          p {
            font-size: 0.95rem;
            color: var(--black);
            line-height: 1.5;
          }
        }
      }
    }
  }
`;
