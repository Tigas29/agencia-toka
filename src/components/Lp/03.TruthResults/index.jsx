import * as Styled from "./style.js";
import Button from "../button/index.jsx";

import doctorMain from "../../../assets/landingpage/03.TruthResults/Imagem.webp";
import doctorGroup1 from "../../../assets/landingpage/03.TruthResults/doctorGroup1.webp";
import doctorGroup2 from "../../../assets/landingpage/03.TruthResults/doctorGroup2.webp";
import doctorGroup3 from "../../../assets/landingpage/03.TruthResults/doctorGroup3.webp";

import check from "../../../assets/landingpage/03.TruthResults/check.svg";

export default function TruthResults() {
  return (
    <Styled.Container>
      <div className="inner top">
        <div className="topLeft">
          <div className="mainPhoto">
            <img src={doctorMain} alt="Médico conversando com paciente" />
          </div>
        </div>

        <div className="topRight">
          <h2>A verdade que ninguém te fala</h2>

          <div className="badge">
            <span>O paciente escolhe quem aparece como autoridade</span>
          </div>

          <p className="paragraph">
            Não basta ser bom.
            <br />
            O mercado segue quem domina a narrativa.
            <br />
            Quem se posiciona.
            <br />
            Quem transmite segurança antes mesmo da consulta.
            <br />
            O médico que lidera o digital vira referência.
            <br />O que espera indicação... espera.
          </p>

          <p className="highlight">
            O Habitat Estratégico faz você assumir esse protagonismo.
          </p>
        </div>
      </div>

      <div className="inner bottom" id="entregaveis">
        <div className="bottomLeft">
          <h3>Resultados reais que mudam seu faturamento</h3>

          <div className="pillList">
            <div className="pill">
              <img src={check} alt="" />
              <span className="pillText">Agenda previsível</span>
            </div>
            <div className="pill">
              <img src={check} alt="" />
              <span className="pillText">Pacientes que pagam seu valor</span>
            </div>
            <div className="pill">
              <img src={check} alt="" />
              <span className="pillText">
                Crescimento constante no particular
              </span>
            </div>
            <div className="pill">
              <img src={check} alt="" />
              <span className="pillText">Reconhecimento local</span>
            </div>
            <div className="pill">
              <img src={check} alt="" />
              <span className="pillText">
                Conteúdos que atraem pacientes certos
              </span>
            </div>
            <div className="pill">
              <img src={check} alt="" />
              <span className="pillText">Conversão acelerada no WhatsApp</span>
            </div>
            <div className="pill">
              <img src={check} alt="" />
              <span className="pillText">Marca forte, sólida e desejada</span>
            </div>
          </div>
        </div>

        <div className="bottomRight">
          <div className="imagesGrid">
            <div className="gridItem">
              <img src={doctorGroup1} alt="Equipe médica em reunião" />
            </div>
            <div className="gridItem">
              <img src={doctorGroup2} alt="Médicos conversando com paciente" />
            </div>
            <div className="gridItem">
              <img src={doctorGroup3} alt="Médico examinando paciente" />
            </div>
            <div className="gridItem textCard">
              <p>
                Quando sua marca começa a funcionar como um ecossistema
                estratégico, tudo muda.
              </p>
            </div>
          </div>

          <Button
            text="Quero esses resultados na minha clínica"
            showIcon={true}
          />
        </div>
      </div>
    </Styled.Container>
  );
}
