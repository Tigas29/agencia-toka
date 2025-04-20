import * as Styled from "./style";
import Button from "./../../GLOBAL/button";

// Caminhos das imagens (adicione os corretos)
import img1 from "../../../assets/homepage/howWorks/card1.png";
import img2 from "../../../assets/homepage/howWorks/card2.png";
import img3 from "../../../assets/homepage/howWorks/card3.png";
import img4 from "../../../assets/homepage/howWorks/card4.png";

export default function HowWorks() {
  return (
    <Styled.Container>
      <div className="content">
        <div className="intro">
          <p className="label">COMO FUNCIONA?</p>
          <h2>Do primeiro contato à escala</h2>
          <p className="subtitle">com clareza e estratégia desde o início.</p>
          <p className="desc">
            Preencheu nosso formulário? <strong>Em até 2h</strong> nossa equipe
            entra em contato com você. A partir daí,seguimos um processo
            validado para impulsionar o crescimento do seu negócio.
          </p>
        </div>

        <div className="steps">
          <div className="step highlight">
            <div className="whiteBox">
              <img src={img1} alt="Diagnóstico" />
            </div>
            <div className="text">
              <h3>Diagnóstico</h3>
              <h4>Mapeamos seus desafios e oportunidades.</h4>
              <p>
                Analisamos sua operação, momento e metas para entender onde
                atuar com mais impacto.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="text">
              <h3>Estratégia</h3>
              <h4>Definimos o caminho certo pra crescer.</h4>
              <p>
                Com base no diagnóstico, traçamos uma estratégia clara e
                personalizada.
              </p>
            </div>
            <div className="whiteBox">
              <img src={img2} alt="Estratégia" />
            </div>
          </div>

          <div className="step">
            <div className="whiteBox">
              <img src={img3} alt="Implementação" />
            </div>
            <div className="text">
              <h3>Implementação</h3>
              <h4>Transformamos plano em ação.</h4>
              <p>
                Aplicamos o que foi desenhado: tráfego, CRM, criativos,
                automações e muito mais.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="text">
              <h3>Otimização</h3>
              <h4>Ajustamos pra maximizar os resultados.</h4>
              <p>
                Com base no diagnóstico, traçamos uma estratégia clara e
                personalizada.
              </p>
            </div>
            <div className="whiteBox">
              <img src={img4} alt="Otimização" />
            </div>
          </div>
        </div>

        <div className="footerText">
          <p>
            Para empresas que querem crescer de verdade, explicamos cada etapa
            do nosso método ponta a ponta com clareza, transparência e
            profundidade. Porque crescimento sério exige mais do que uma
            sequência de entregas. Exige visão, estratégia e execução alinhadas
            com o seu momento e potencial. Se você busca esse tipo de parceria,
            vamos conversar.
          </p>
        </div>

        <Button text="Agendar uma call" showIcon={false} />
      </div>
    </Styled.Container>
  );
}
