import { useRef } from "react";
import styled from "styled-components";
import { H2, Inner, Lead, Media, numerais, Section, Selo } from "../style";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";

/**
 * Como começa. O método é o que a Toka faz durante meses; este bloco é a
 * única coisa que o leitor precisa fazer hoje, e as duas coisas não
 * podem se parecer.
 *
 * Por isso aqui não tem lista, não tem letra gigante, não tem painel. É
 * uma escada curta de três degraus, com o numeral serifado grande e nada
 * mais. Fica em papel claro para o navy do fecho, logo abaixo, ser a
 * única coisa escura da parte final da página.
 */

const Escada = styled.ol`
  list-style: none;
  margin: 64px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 56px;
  border-top: 1px solid var(--linha);

  ${Media.Tablet} {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const Passo = styled.li`
  padding: 38px 0;
  border-bottom: 1px solid var(--linha);
  display: grid;
  grid-template-columns: 74px 1fr;
  align-items: start;
  gap: 0 8px;

  .numero {
    font-family: "EB Garamond", Georgia, serif;
    ${numerais};
    font-size: 3.2rem;
    font-weight: 400;
    line-height: 0.85;
    color: var(--acento);
  }

  h3 {
    font-family: "EB Garamond", Georgia, serif;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.2;
    color: var(--tinta);
    margin: 0 0 12px;
  }

  p {
    font-size: 0.96rem;
    line-height: 1.62;
    color: var(--tinta-fraca);
    margin: 0;
  }

  ${Media.Tablet} {
    padding: 30px 0;
    grid-template-columns: 62px 1fr;

    .numero {
      font-size: 2.6rem;
    }
  }
`;

const PASSOS = [
  {
    numero: "1",
    titulo: "Diagnóstico gratuito",
    texto:
      "Quarenta minutos. A gente aponta onde o paciente está se perdendo, mesmo que você não siga com a gente.",
  },
  {
    numero: "2",
    titulo: "Desenho da operação",
    texto: "Objetivo, escopo, verba e prazo por escrito. Você aprova antes.",
  },
  {
    numero: "3",
    titulo: "Execução com o time",
    texto: "O time entra em campo e você acompanha pelo painel.",
  },
];

export default function Passos() {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, { menosMovimento, folga: 24, distancia: 34 });

  const guardar = (i) => (el) => (pecas.current[i] = el);

  return (
    <Section id="comeco" className="faixa-clara" ref={escopo}>
      <Inner>
        <Selo ref={guardar(0)}>Como começa</Selo>
        <H2 ref={guardar(1)}>Três passos.</H2>
        <Lead ref={guardar(2)}>
          Nenhum deles exige que você decida hoje se vai trabalhar com a gente.
        </Lead>

        <Escada>
          {PASSOS.map((passo, i) => (
            <Passo key={passo.numero} ref={guardar(3 + i)}>
              <span className="numero">{passo.numero}</span>
              <div>
                <h3>{passo.titulo}</h3>
                <p>{passo.texto}</p>
              </div>
            </Passo>
          ))}
        </Escada>
      </Inner>
    </Section>
  );
}
