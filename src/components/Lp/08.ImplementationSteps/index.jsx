import * as Styled from "./style.js";

export default function ImplementationSteps() {
  return (
    <Styled.Container>
      <div className="inner">
        <h2 className="title">As 3 Etapas da Implementação</h2>

        <div className="grid">
          <div className="step step--3">
            <span className="index">(03)</span>
            <h3>Ativação e Treinamento</h3>
            <p>Operamos tudo para te gerar resultado</p>
          </div>

          <div className="bar bar--1" />
          <div className="bar bar--2" />
          <div className="bar bar--3">
            <p className="highlight">
              De 6 a 12 MESES para <span>elevar o</span>
              <br />
              nível da sua empresa
            </p>
          </div>

          <div className="step step--1">
            <span className="index">(01)</span>
            <h3>Diagnóstico Estratégico</h3>
            <p>Mapeamos seu cenário, público e diferenciais</p>
          </div>

          <div className="step step--2">
            <span className="index">(02)</span>
            <h3>Criação e Direção</h3>
            <p>Montamos todo o posicionamento, posts e roteiros</p>
          </div>
        </div>
      </div>
    </Styled.Container>
  );
}
