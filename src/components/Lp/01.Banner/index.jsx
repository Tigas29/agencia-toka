import * as Styled from "./style.js";
import Button from "../button/index.jsx";

import logoToka from "../../../assets/landingpage/logo.svg";
import doctorImage from "../../../assets/landingpage/01.Banner/imagem.webp";

export default function Banner() {
  return (
    <Styled.Container>
      <div className="containerBackground">
        <div className="inner">
          <div className="left">
            <div className="logo">
              <img src={logoToka} alt="Toka" />
            </div>

            <h1>
              Sua clínica não nasceu para sobreviver.
              <br />
              Nasceu para crescer.
            </h1>

            <p className="description">
              Agenda vazia. Concorrência aparecendo mais. Faturamento travado.
              Nada disso combina com o seu nível.
            </p>

            <p className="description highlight">
              O Habitat Estratégico coloca sua marca no topo, atrai pacientes
              certos e transforma sua autoridade em faturamento alto (e bem
              alto).
            </p>

            <Button text="Quero crescer agora" showIcon={true} />
          </div>

          <div className="right">
            <div className="photoCard">
              <img src={doctorImage} alt="Médico sorrindo" />
            </div>
          </div>

          <span className="bigWord">toka</span>
        </div>
      </div>
    </Styled.Container>
  );
}
