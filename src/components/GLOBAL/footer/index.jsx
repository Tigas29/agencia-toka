import * as Styled from "./style";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import Button from "./../../GLOBAL/button/index";

// Importa o SVG como imagem
import logoFooter from "../../../assets/footer/toka cortada.svg";

export default function Footer() {
  return (
    <Styled.Container>
      <div className="content">
        <div className="socials">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="icon" />
            LinkedIn
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="icon" />X (Twitter)
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FiInstagram className="icon" />
            Instagram
          </a>
        </div>

        <p className="copy">© 2025 Toka. Todos os direitos reservados.</p>

        <div className="logo">
          <img src={logoFooter} alt="Logo Toka" />
        </div>
      </div>
    </Styled.Container>
  );
}
