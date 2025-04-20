import styled from "styled-components";

const Media = {
  Phone: "@media(max-width: 600px)",
  Tablet: "@media(max-width: 1000px)",
};

export const Container = styled.footer`
  width: 100%;
  padding: 4rem 0 0 0;
  background-color: #f6f5f6;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  .content {
    width: 95%;
    max-width: 75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    z-index: 2;
  }

  .socials {
    display: flex;
    gap: 2rem;
    background-color: #18181d;
    padding: 0.8rem 2rem;
    border-radius: 2rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      text-decoration: none;
      font-weight: 500;
      font-size: 1rem;
      transition: opacity 0.3s ease;

      .icon {
        font-size: 1.1rem;
      }

      &:hover {
        opacity: 0.8;
      }
    }

    ${Media.Phone} {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1rem;
    }
  }

  .copy {
    font-size: 0.9rem;
    opacity: 0.6;
    color: #333;
    text-align: center;
    z-index: 2;
  }

  .logo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 2rem;

    img {
      width: auto;
      display: block;
      pointer-events: none;
    }
  }
`;
