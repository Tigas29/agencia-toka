import Button from "../button/index.jsx";
import * as Styled from "./style.js";
import logo from "../../../assets/header/logo.svg";

export default function Header() {
  return (
    <Styled.Container>
      <div className="logo">
        <img src={logo} alt="Logo Toka" />
      </div>

      <div className="Button">
        <Button text="Agendar uma call" />
      </div>
    </Styled.Container>
  );
}
