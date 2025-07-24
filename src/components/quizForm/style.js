import styled from "styled-components";

const Media = {
  PhoneLarge: "@media(max-width:610px)",
  Laptop: "@media(max-width:1150px)",
  Tablet: "@media(max-width:1000px)",
  PhoneSmall: "@media(max-width:450px)",
};

export const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  background-color: inherit;
  height: 70vh;

  ${Media.Tablet} {
    width: 90%;
  }

  .box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 20px;
    width: 100%;
  }
`;

export const ContainerBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1b1b1b;

  .box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 20px;
    width: 100%;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  z-index: 10;

  div {
    height: 100%;
    background-color: var(--orange);
    position: absolute;
  }
`;

export const Question = styled.div`
  text-align: center;

  p {
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 20px;
    color: var(--off-white);

    ${Media.PhoneLarge} {
      font-size: 1.5rem;
      text-align: left;
    }
  }
`;

export const Options = styled.div`
  display: flex;
  gap: 20px;

  button {
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid var(--orange);
    background: transparent;
    cursor: pointer;
    border-radius: 5px;
    color: white;

    &.active {
      background-color: var(--orange);
      color: white;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 20px;
    color: var(--off-white);

    ${Media.PhoneLarge} {
      text-align: left;
    }
  }

  input,
  select {
    width: 50%;
    padding: 10px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    background-color: transparent;
    color: var(--off-white);

    ${Media.Tablet} {
      width: 80%;
    }
  }
`;

export const RevenueOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  button {
    width: 100%;
    text-align: left;
    padding: 12px 20px;
    border-radius: 5px;
    border: 1px solid var(--orange);
    background: transparent;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      background-color: rgba(219, 171, 109, 0.1);
    }

    &.selected {
      background-color: var(--orange);
      color: #1b1b1b;
    }
  }
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    bottom: 10px;
    left: 10px;
    right: 10px;
    justify-content: space-between;
  }
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  position: absolute;
  bottom: 3rem;
  right: 1rem;

  button {
    width: 50px;
    height: 50px;
    font-size: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: var(--orange);
    color: white;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &.back {
      background-color: var(--orange);
    }

    &.next {
      background-color: var(--orange);
    }
  }

  @media (max-width: 768px) {
    button {
      width: auto;
      height: auto;
      padding: 10px 15px;
      border-radius: 5px;
    }
  }
`;

export const EndMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  font-size: 1.5rem;
  color: var(--off-white);
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--orange);
    color: white;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

export const StartScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  text-align: center;
  color: var(--off-white);
  padding: 2rem;

  h1 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    max-width: 500px;
    margin-bottom: 2rem;
  }

  button {
    padding: 12px 24px;
    font-size: 1rem;
    border-radius: 5px;
    background-color: var(--orange);
    color: white;
    border: none;
    cursor: pointer;
  }
`;

export const LogoWrapper = styled.div`
  margin-bottom: 2rem;

  img {
    max-width: 100px;
    height: auto;
    display: block;
    margin: 0 auto 1rem auto;
  }
`;

export const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  color: var(--off-white);
  background-color: #1b1b1b;
  text-align: center;
  font-size: 1.5rem;

  .progress-bar {
    width: 80%;
    height: 10px;
    background-color: #e0e0e0;
    margin-top: 20px;
    border-radius: 5px;
    overflow: hidden;
  }

  .progress {
    height: 100%;
    background-color: var(--orange);
    border-radius: 5px;
    transition: width 0.2s ease-in-out;
  }
`;

export const ResultScreenContainer = styled.div`
  background-color: #1b1b1b;
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--orange);
  }

  p {
    max-width: 600px;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    margin: 20px 0 40px 0;
    border-radius: 5px;
    overflow: hidden;
  }

  .progress {
    height: 100%;
    width: 100%;
    background-color: var(--orange);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    width: 100%;
  }

  label {
    text-align: left;
    font-weight: 600;
    font-size: 1rem;
  }

  input {
    padding: 10px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
  }

  button {
    margin-top: 1rem;
    padding: 12px;
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    background-color: var(--orange);
    color: #1b1b1b;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

export const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--off-white);
  max-width: 700px;
  padding: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--orange);
    text-align: center;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    text-align: center;
  }
`;
