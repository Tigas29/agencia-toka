import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { Inner, Media, Page, Tokens } from "./style";
import { capturarUtm, track } from "./lead";
import { ScrollTrigger, useMenosMovimento, useRolagemSuave } from "./animacao";
import Atmosfera from "./Atmosfera";

import Hero from "./secoes/01.Hero";
import Cena from "./secoes/02.Cena";
import Risco from "./secoes/04.Risco";
import Foco from "./secoes/05.Foco";
import Prova from "./secoes/06.Prova";
import Exclusividade from "./secoes/07.Exclusividade";
import Form from "./secoes/08.Form";

const Rodape = styled.footer`
  padding: 40px 0 56px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  z-index: 1;

  .linha {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  p {
    margin: 0;
    font-size: 0.82rem;
    color: var(--apagado);
  }

  ${Media.PhoneLarge} {
    .linha {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default function PaginaHabitat() {
  const menosMovimento = useMenosMovimento();

  /**
   * A UTM é lida no primeiro render, e não no submit: quem chega do
   * anúncio e navega dentro da página perderia os parâmetros da query se
   * a leitura ficasse só na hora de enviar.
   */
  useEffect(() => {
    capturarUtm();
    track("ViewContent", { content_name: "habitat-estrategico" });
  }, []);

  // Lenis suaviza a rolagem da página inteira e alimenta o ScrollTrigger
  // a cada frame do ticker do GSAP. Some por completo quando a pessoa
  // pediu menos movimento — o hook já cuida disso sozinho.
  useRolagemSuave(menosMovimento);

  /**
   * Rede de segurança para a navegação SPA: cada seção já limpa os seus
   * próprios ScrollTriggers via `gsap.context().revert()`, mas isso só
   * roda no unmount de quem os criou. Se algum escapar (ex.: um F5 no
   * meio de um HMR, ou uma seção que falhou ao montar), esta varredura
   * garante que ninguém sai da página com listener pendurado.
   */
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const irParaForm = useCallback(() => {
    const alvo = document.getElementById("formulario");
    if (!alvo) return;
    alvo.scrollIntoView({ behavior: "smooth", block: "start" });
    alvo.querySelector("input")?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <Tokens />
      <Page className="toka-habitat">
        <Atmosfera />

        <Hero aoClicar={irParaForm} />
        <Cena />
        <Risco aoClicar={irParaForm} />
        <Foco />
        <Prova />
        <Exclusividade />
        <Form />

        <Rodape>
          <Inner>
            <div className="linha">
              <p>Toka Company · Habitat Estratégico©</p>
              <p>Marketing e operação para clínicas médicas.</p>
            </div>
          </Inner>
        </Rodape>
      </Page>
    </>
  );
}
