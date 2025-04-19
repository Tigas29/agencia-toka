import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
const Media = {
  Tablet: "@media(max-width:1000px)",
};

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.2rem 1rem;
  background: var(--orange);
  border-radius: 12px;
  transition: 0.3s ease;

  p {
    font-family: "Nunito", sans-serif;
    font-weight: 700;
    color: var(--white);
    font-size: 1.5rem;
    ${Media.Tablet} {
      font-size: 1rem;
    }
  }

  .icon {
    display: flex;
    font-size: 1.2rem;
    color: var(--white);
  }

  ${Media.Tablet} {
    padding: 0.5rem 1.2rem;

    p {
      font-size: 0.95rem;
    }

    .icon {
      display: flex;
      font-size: 1.4rem;
      color: var(--white);
    }
    ${Media.Tablet} {
      padding: 0.5rem 1.2rem;

      p {
        font-size: 0.95rem;
      }

      .icon {
        font-size: 1.2rem;
      }
    }
  }
`;

const Button = ({ text, showIcon = true, to = "/clienteForm" }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };

  return (
    <Container onClick={handleClick} aria-label={`Botão para ${text}`}>
      {showIcon && <BiRightArrowAlt className="icon" />}
      <p>{text}</p>
    </Container>
  );
};

export default Button;
