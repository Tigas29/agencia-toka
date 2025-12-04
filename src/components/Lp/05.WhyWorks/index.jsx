import * as Styled from "./style.js";

import tiagoPhoto from "../../../assets/landingpage/05.WhyWorks/Tiago.webp";
import rocketIcon from "../../../assets/landingpage/05.WhyWorks/Rocket.svg";

export default function WhyWorks() {
  return (
    <Styled.Container id="por-que-funciona">
      <div className="inner">
        <div className="headlineRow">
          <h2>Por que funciona?</h2>
          <span className="headlineLine" />
        </div>

        <div className="containerTiago">
          <div className="left">
            <h3 className="subTitle">
              Porque foi criado dentro do campo de batalha
            </h3>

            <div className="experience">
              <p className="experienceTitle">
                O Habitat Estratégico nasce da experiência de Tiago Santos:
              </p>

              <ul>
                <li>Mais de 5 anos escalando médicos e clínicas</li>
                <li>Especialista em Growth Marketing e vendas</li>
                <li>Estratégias aplicadas em dezenas de especialidades</li>
                <li>Foco absoluto em faturamento e autoridade</li>
                <li>
                  Processos que funcionam independente do tamanho atual da sua
                  estrutura
                </li>
              </ul>
            </div>

            <div className="claims">
              <p className="claim method">É método.</p>
              <p className="claim execution">É execução.</p>
              <p className="claim growth">É crescimento mensurável.</p>
            </div>
          </div>

          <div className="right">
            <div className="photoWrapper">
              <img src={tiagoPhoto} alt="Tiago Santos" />

              <div className="nameTag">
                <span>TIAGO SANTOS</span>
              </div>

              <div className="badge">
                <img src={rocketIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Styled.Container>
  );
}
