import styled, { createGlobalStyle, keyframes } from "styled-components";

const Media = {
  Tablet: "@media(max-width:1000px)",
  PhoneLarge: "@media(max-width:610px)",
  PhoneSmall: "@media(max-width:450px)",
};

/**
 * Identidade da Toka: navy + gold, tipografia Poppins e Nunito Sans.
 * Os tokens ficam escopados nesta página. O :root global do site, que
 * usa o laranja legado, continua intocado.
 */
export const Tokens = createGlobalStyle`
  .toka-aplicacao {
    --navy-900: #121A30;
    --navy-800: #181F30;
    --navy-700: #1F2941;
    --navy-600: #2C3853;
    --gold: #E0B65A;
    --gold-soft: rgba(224, 182, 90, 0.14);
    --off-white: #D0D2D7;
    --white: #FFFFFF;
    --erro: #E9967A;
  }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  min-height: 100dvh;
  width: 100%;
  background: radial-gradient(
      120% 90% at 85% 10%,
      var(--navy-700) 0%,
      transparent 60%
    ),
    var(--navy-900);
  color: var(--off-white);
  font-family: "Nunito Sans", "Inter", sans-serif;
  display: flex;
  flex-direction: column;
`;

export const Progress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.08);
  z-index: 20;

  div {
    height: 100%;
    background-color: var(--gold);
    transition: width 320ms ease;
  }
`;

export const Topbar = styled.header`
  padding: 34px 48px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${Media.PhoneLarge} {
    padding: 26px 24px 0;
  }

  img {
    width: 104px;
    height: auto;

    ${Media.PhoneLarge} {
      width: 84px;
    }
  }

  span {
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(208, 210, 215, 0.5);

    /* no celular o rótulo brigaria com o logo */
    ${Media.PhoneLarge} {
      display: none;
    }
  }
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;

  ${Media.PhoneLarge} {
    padding: 32px 24px 56px;
    align-items: flex-start;
  }
`;

export const Panel = styled.section`
  width: 100%;
  max-width: 680px;
  animation: ${fadeUp} 380ms ease both;
`;

export const Kicker = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(224, 182, 90, 0.45),
      transparent
    );
  }
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: ${({ $small }) => ($small ? "1.85rem" : "2.4rem")};
  font-weight: 600;
  line-height: 1.22;
  letter-spacing: -0.015em;
  color: var(--white);
  margin-bottom: 16px;
  /* evita palavra viúva na quebra do título */
  text-wrap: balance;

  ${Media.Tablet} {
    font-size: ${({ $small }) => ($small ? "1.6rem" : "2rem")};
  }

  ${Media.PhoneLarge} {
    font-size: ${({ $small }) => ($small ? "1.35rem" : "1.6rem")};
  }

  em {
    font-style: italic;
    color: var(--gold);
  }
`;

export const Lead = styled.p`
  font-size: 1.06rem;
  line-height: 1.65;
  color: var(--off-white);
  margin-bottom: 14px;

  ${Media.PhoneLarge} {
    font-size: 0.96rem;
  }
`;

export const Body = styled.p`
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(208, 210, 215, 0.72);
  white-space: pre-line;
  margin-bottom: 34px;

  ${Media.PhoneLarge} {
    font-size: 0.9rem;
    margin-bottom: 28px;
  }
`;

export const Warning = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
  background-color: var(--gold-soft);
  border: 1px solid rgba(224, 182, 90, 0.3);
  border-radius: 999px;
  padding: 7px 14px;
  margin-bottom: 18px;
`;

export const Counter = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  color: rgba(224, 182, 90, 0.75);
  margin-bottom: 14px;
`;

export const Description = styled.p`
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(208, 210, 215, 0.6);
  margin-bottom: 26px;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 26px;

  button {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    text-align: left;
    padding: 16px 20px;
    font-family: "Nunito Sans", sans-serif;
    font-size: 1rem;
    line-height: 1.4;
    color: var(--off-white);
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    transition: border-color 160ms ease, background-color 160ms ease,
      transform 160ms ease;

    &:hover {
      border-color: rgba(224, 182, 90, 0.55);
      background-color: rgba(224, 182, 90, 0.06);
      transform: translateX(3px);
    }

    &.selected {
      border-color: var(--gold);
      background-color: var(--gold-soft);
      color: var(--white);
    }

    ${Media.PhoneLarge} {
      font-size: 0.92rem;
      padding: 14px 16px;
      gap: 12px;
    }
  }

  .key {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    font-family: "Poppins", sans-serif;
    font-size: 0.76rem;
    font-weight: 600;
    color: var(--gold);
    border: 1px solid rgba(224, 182, 90, 0.4);
    border-radius: 5px;
  }

  button.selected .key {
    background-color: var(--gold);
    color: var(--navy-900);
    border-color: var(--gold);
  }
`;

export const Field = styled.div`
  margin-top: 26px;

  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.22);
    padding: 12px 2px;
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--white);
    transition: border-color 160ms ease;

    &::placeholder {
      color: rgba(208, 210, 215, 0.3);
    }

    &:focus {
      outline: none;
      border-bottom-color: var(--gold);
    }

    ${Media.PhoneLarge} {
      font-size: 1.15rem;
    }
  }

  textarea {
    min-height: 110px;
    resize: vertical;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 10px;
    padding: 16px;
    font-size: 1.02rem;
    line-height: 1.6;

    &:focus {
      border-color: var(--gold);
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;
`;

export const Primary = styled.button`
  font-family: "Poppins", sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--navy-900);
  background-color: var(--gold);
  border-radius: 8px;
  padding: 15px 30px;
  transition: filter 160ms ease, transform 160ms ease;

  &:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const Ghost = styled.button`
  font-family: "Poppins", sans-serif;
  font-size: 0.86rem;
  color: rgba(208, 210, 215, 0.65);
  background: transparent;
  padding: 12px 4px;
  transition: color 160ms ease;

  &:hover {
    color: var(--gold);
  }
`;

export const Hint = styled.p`
  font-size: 0.8rem;
  color: rgba(208, 210, 215, 0.42);
  margin-top: 22px;

  /* atalho de teclado não existe em touch */
  @media (hover: none), (max-width: 610px) {
    display: none;
  }
`;

export const Error = styled.p`
  font-size: 0.88rem;
  color: var(--erro);
  margin-top: 18px;
`;

export const VideoFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 26px 0 4px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--navy-800);

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;
