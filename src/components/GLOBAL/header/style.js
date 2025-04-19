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
