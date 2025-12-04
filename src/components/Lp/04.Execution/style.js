import styled from "styled-components";

const Media = {
  PhoneLarge: "@media(max-width:610px)",
  Tablet: "@media(max-width:1000px)",
};

export const Container = styled.section`
  width: 100%;
  background-color: #ff8419;
  display: flex;
  justify-content: center;
  padding: 7rem 0 5rem;
  min-width: 279px;

  ${Media.PhoneLarge} {
    padding: 4.5rem 0 4rem;
  }

  .inner {
    width: 90%;
    max-width: 75rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2.5rem;

    ${Media.Tablet} {
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  .titleBlock {
    position: relative;
    max-width: 32rem;

    &::before {
      content: "";
      position: absolute;
      left: -1.5rem;
      top: -0.5rem;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      background: rgba(173, 80, 0, 0.8);
      box-shadow: 0 0 0 18px rgba(173, 80, 0, 0.5),
        0 0 0 36px rgba(173, 80, 0, 0.3);
      z-index: 0;
    }

    h2 {
      position: relative;
      z-index: 1;
      font-family: "Poppins";
      line-height: 100%;
      font-size: 2.05rem;
      font-weight: 700;
      color: var(--white);

      ${Media.Laptop} {
        font-size: 1.9rem;
      }

      ${Media.PhoneLarge} {
        font-size: 1.7rem;
      }

      ${Media.PhoneSmall} {
        font-size: 1.5rem;
      }
    }
  }

  .subtitle {
    font-family: "Poppins";
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 150%;
    color: var(--white);
    max-width: 16rem;

    ${Media.Tablet} {
      max-width: 100%;
      font-size: 0.95rem;
    }
  }

  .grid {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    box-sizing: border-box;
  }

  .row {
    width: 100%;
    display: flex;
    gap: 1.4rem;
    box-sizing: border-box;
  }

  .rowTop {
    ${Media.Tablet} {
      flex-wrap: wrap;
    }

    .card {
      flex: 1;

      ${Media.Tablet} {
        flex: 1 1 calc(50% - 0.7rem);
      }

      ${Media.Tablet} &:nth-child(3) {
        flex-basis: 100%;
      }

      ${Media.PhoneLarge} {
        flex-basis: 100%;
      }
    }
  }

  .rowBottom {
    ${Media.Tablet} {
      flex-wrap: wrap;
    }

    .card {
      flex: 1;

      ${Media.Tablet} {
        flex: 1 1 calc(50% - 0.7rem);
      }

      ${Media.Tablet} &:nth-child(3) {
        flex-basis: 100%;
      }

      ${Media.PhoneLarge} {
        flex-basis: 100%;
      }
    }
  }

  .card {
    border-radius: 1.5rem;
    padding: 2rem 2.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    height: 15rem;
    align-items: flex-start;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;

    max-width: 100%;
    overflow: hidden;

    ${Media.PhoneLarge} {
      padding: 1.6rem 1.4rem;
    }
  }

  .white {
    background-color: var(--white);

    h3,
    p {
      color: #e46c04;
    }
  }

  .orange {
    background-color: #e46c04;

    h3,
    p {
      color: var(--white);
    }
  }

  .card h3 {
    font-family: "Nunito";
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 100%;

    ${Media.PhoneLarge} {
      font-size: 1.55rem;
    }
  }

  .card p {
    font-family: "Poppins";
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 150%;

    ${Media.PhoneLarge} {
      font-size: 0.9rem;
    }
  }

  button {
    background: linear-gradient(90deg, #6c3200 0%, #9f3d1f 100%);
    padding: 1rem 1.5rem;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    transform: translateY(0);
    transition: background 0.4s ease, box-shadow 0.25s ease,
      transform 0.25s ease;
  }

  button p {
    font-size: 1.05rem;
    font-weight: 600;
    color: #fff;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(108, 50, 0, 0.45);
    background: linear-gradient(90deg, #9f3d1f 0%, #6c3200 100%);
  }
`;
