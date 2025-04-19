import { AiOutlineDownload } from "react-icons/ai";
import * as Styled from "./style";

export default function Who() {
  return (
    <Styled.Container>
      <div className="content">
        <div className="intro">
          <p className="label">
            SOMOS O ELO ENTRE ESTRATÉGIA, EXECUÇÃO E RESULTADO.
          </p>
          <h2>
            A Toka nasceu para fazer negócios <br />
            venderem mais. Com estrutura, clareza e <br />
            visão de longo prazo.
          </h2>

          <div className="download">
            <p>Baixe nossa apresentação institucional:</p>
            <a
              href="/comercialToka.pdf"
              download="Apresentacao-Toka.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineDownload className="icon" />
            </a>
          </div>
        </div>

        <div className="grid">
          <div className="box">
            <p className="title">SOBRE A TOKA</p>
            <h3>Uma assessoria especializada em Marketing e vendas</h3>
            <p>
              Não fazemos só campanhas.
              <br />
              Ajudamos empresas a crescer com um plano estruturado de marketing,
              vendas e tecnologia pensado para escalar.
            </p>
          </div>

          <div className="box">
            <p className="title">O QUE NOS MOVE</p>
            <h3>Foco em crescimento real, não vaidade digital.</h3>
            <p>
              Não buscamos likes, buscamos lucro.
              <br />
              Nosso compromisso é entregar resultados previsíveis e mensuráveis,
              sem fórmulas genéricas.
            </p>
          </div>

          <div className="box">
            <p className="title">NOSSO DIFERENCIAL</p>
            <h3>Estratégia validada. Execução de verdade.</h3>
            <p>
              Trabalhamos com método, dados e time experiente.
              <br />
              Cada projeto recebe um plano sob medida e acompanhamento
              constante.
            </p>
          </div>

          <div className="box">
            <p className="title">ENTÃO, O QUE FAZEMOS?</p>
            <h3>Crescimento com clareza. Vendas com estrutura.</h3>
            <p>
              Se você quer escalar, a Toka é o habitat.
              <br />
              Pensamos, planejamos e executamos o próximo passo do seu negócio
              com consistência.
            </p>
          </div>
        </div>
      </div>
    </Styled.Container>
  );
}
