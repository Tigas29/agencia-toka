import * as Styled from "./style.js";
import Button from "../button/index.jsx";

export default function MadeFor() {
  return (
    <Styled.Container id="para-quem-e">
      <div className="inner">
        <div className="left">
          <h2>
            Feito para médicos e donos de clínicas que querem destravar
            crescimento
          </h2>

          <p className="subtitle">
            Se você sente que poderia estar faturando mais, atendendo mais e
            sendo mais reconhecido, essa assessoria é para você.
          </p>

          <div className="button-desktop">
            <Button
              text="Quero diagnosticar meu posicionamento"
              showIcon={true}
            />
          </div>
        </div>

        <div className="right">
          <div className="pillList">
            <span className="pill">Agenda instável</span>
            <span className="pill">Baixo fluxo de pacientes particulares</span>
            <span className="pill">Conteúdos que não convertem</span>
            <span className="pill">Concorrentes crescendo mais rápido</span>
            <span className="pill">WhatsApp desorganizado</span>
            <span className="pill">Marketing inconsistente</span>
            <span className="pill">Faturamento estagnado</span>
            <span className="pill">Diagnosticar</span>
          </div>

          <p className="footerText">
            Se isso aparece na sua rotina, o problema não é sua competência. É
            sua estratégia.
          </p>

          <div className="button-mobile">
            <Button
              text="Quero diagnosticar meu posicionamento"
              showIcon={true}
            />
          </div>
        </div>
      </div>
    </Styled.Container>
  );
}
