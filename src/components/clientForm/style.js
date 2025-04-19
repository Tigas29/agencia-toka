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

  div {
    height: 100%;
    background-color: var(--gold);
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
