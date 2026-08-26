import { useRef } from "react";
import styled from "styled-components";
import { H2, Inner, Media, Section, Selo } from "../../../estilo/ds";
import { Estabiliza } from "../grafismos";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";

/**
 * Inteligência de mercado e automações.
 *
 * Fica no fim de propósito. Tecnologia dita cedo demais vira promessa de
 * ferramenta, e o médico já ouviu promessa de ferramenta o bastante.
 * Depois da jornada e da prova, ela entra como o que sustenta o que foi
 * dito, e não como o argumento principal.
 *
 * Headline grande à esquerda, parágrafo curto à direita: é o par que a
 * página usa sempre que uma afirmação precisa de uma nota de rodapé
 * sem virar bloco de texto.
 */

const Grade = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 0 70px;
  align-items: start;

  ${Media.Tablet} {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const Apoio = styled.div`
  padding-top: 14px;

  p {
    font-size: 1rem;
    line-height: 1.64;
    color: var(--tinta-fraca);
    margin: 0 0 20px;
  }

  ul {
    list-style: none;
    margin: 26px 0 0;
    padding: 0;
  }

  li {
    font-size: 0.96rem;
    line-height: 1.5;
    color: var(--tinta-corpo);
    padding: 14px 0;
    border-top: 1px solid var(--linha);
  }

  svg {
    color: var(--tinta-fraca);
    opacity: 0.5;
    margin-top: 26px;
  }
`;

const APOIOS = [
  "IA que responde em segundos, dia e noite, no seu tom.",
  "Nenhum paciente se perde: dá para ver de onde veio e onde parou.",
  "Painel com o custo por procedimento realizado.",
];

export default function Tecnologia() {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, { menosMovimento, folga: 24, distancia: 34 });

  const guardar = (i) => (el) => (pecas.current[i] = el);

  return (
    <Section className="faixa-clara" ref={escopo}>
      <Inner>
        <Selo ref={guardar(0)}>Inteligência de mercado e automações</Selo>
        <Grade>
          <H2 ref={guardar(1)}>
            Dados para decidir. <em>Automação para não perder ninguém.</em>
          </H2>
          <Apoio ref={guardar(2)}>
            <p>
              Automação existe para devolver tempo a quem atende, nunca para
              colocar uma máquina entre você e o paciente.
            </p>
            <ul>
              {APOIOS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <Estabiliza />
          </Apoio>
        </Grade>
      </Inner>
    </Section>
  );
}
