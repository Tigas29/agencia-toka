import styled from "styled-components";

const Media = {
  PhoneLarge: "@media(max-width:610px)",
  Laptop: "@media(max-width:1150px)",
  Tablet: "@media(max-width:1000px)",
  PhoneSmall: "@media(max-width:450px)",
};
export const Container = styled.main`
  width: 95%;
  max-width: 75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
  padding-top: 1rem;
  z-index: 999;

  transition: background 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease,
    margin-top 0.3s ease, border-radius 0.3s ease;

  &.scrolled {
    background: rgba(255, 156, 57, 0.14);
    backdrop-filter: blur(5px);
    border-radius: 12px;
    padding: 0.5rem;
    margin-top: 1rem;
  }

  ${Media.Tablet} {
    width: 95%;
    max-width: 95rem;
  }

  img {
    width: 5rem;

    ${Media.Tablet} {
      width: 4rem;
    }
  }
`;
