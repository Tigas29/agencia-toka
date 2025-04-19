import React, { useEffect, useState } from "react";
import Button from "../button/index.jsx";
import * as Styled from "./style.js";
import logo from "../../../assets/header/logo.svg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Styled.Container className={scrolled ? "scrolled" : ""}>
      <div className="logo">
        <img src={logo} alt="Logo Toka" />
      </div>

      <div className="Button">
        <Button text="Agendar uma call" />
      </div>
    </Styled.Container>
  );
}
