import * as Styled from "./style.js";

import teamPhoto from "../../../assets/landingpage/06.MethodResults/Team.webp";

export default function MethodResults() {
  return (
    <Styled.Container>
      <div className="inner">
        <div className="left">
          <div className="photoWrapper">
            <img src={teamPhoto} alt="Equipe médica em centro cirúrgico" />
          </div>
        </div>

        <div className="right">
          <h2>Médicos e clínicas que aplicaram o método relatam:</h2>

          <div className="pillGrid">
            <div className="pill">Agenda cheia em semanas</div>
            <div className="pill">Crescimento de 3 a 10x no particular</div>
            <div className="pill">
              Ticket mais alto e valorização automática
            </div>
            <div className="pill">Fluxo constante de pacientes</div>
            <div className="pill">Independência real de convênios</div>
            <div className="pill">Autoridade percebida como marca premium</div>
          </div>

          <p className="footerText">
            Quando a estratégia é certa, o mercado responde.
          </p>
        </div>
      </div>
    </Styled.Container>
  );
}
