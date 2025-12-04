import * as Styled from "./style.js";
import Button from "../button/index.jsx";

export default function Execution() {
  return (
    <Styled.Container id="beneficios">
      <div className="inner">
        <div className="header">
          <div className="titleBlock">
            <h2>O Habitat Estratégico é execução, não teoria</h2>
          </div>

          <p className="subtitle">
            Você recebe uma estrutura personalizada construída sobre 5 pilares:
          </p>
        </div>

        <div className="grid">
          <div className="row rowTop">
            <div className="card white">
              <h3>Posicionamento</h3>
              <p>
                Identidade forte que coloca sua marca médica acima da média.
              </p>
            </div>

            <div className="card orange">
              <h3>Conteúdo Estratégico</h3>
              <p>
                Não é estética. É conteúdo que gera demanda e fecha consulta.
              </p>
            </div>

            <div className="card white">
              <h3>Funil Comercial Médico</h3>
              <p>
                Clareza, fluxo e previsibilidade para converter pacientes todos
                os dias.
              </p>
            </div>
          </div>

          <div className="row rowBottom">
            <div className="card orange">
              <h3>Tráfego Pago Inteligente</h3>
              <p>
                Investimento otimizado para atrair pessoas preparadas para
                comprar.
              </p>
            </div>

            <div className="card white">
              <h3>Acompanhamento e Ajuste</h3>
              <p>Rotina de evolução contínua para manter o crescimento.</p>
            </div>
          </div>
        </div>

        <Button text="Quero construir meu ecossistema agora" showIcon={true} />
      </div>
    </Styled.Container>
  );
}
