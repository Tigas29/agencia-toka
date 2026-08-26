import { useRef } from "react";
import styled from "styled-components";
import { H2, Inner, Lead, Media, Section, Selo } from "../../../estilo/ds";
import { Certo, Cruz } from "../grafismos";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";

/**
 * O comparativo.
 *
 * Duas colunas emparelhadas linha a linha: a mesma pergunta respondida
 * de dois jeitos. O par importa mais que a lista, e é por isso que no
 * telemóvel as colunas não viram duas listas soltas: cada linha vira um
 * bloco com as duas respostas, uma sob a outra, para o contraste
 * sobreviver à falta de largura.
 *
 * Sem vermelho e verde de semáforo: a coluna da esquerda usa a tinta
 * apagada da própria faixa e a da direita usa o acento. Cor de alerta
 * numa página de médico puxa a leitura para "propaganda", e o contraste
 * de intensidade já faz o trabalho.
 */

const PARES = [
  {
    comum: "Atende qualquer nicho, e aprende o seu no seu dinheiro.",
    toka: "Só medicina, há cinco anos.",
  },
  {
    comum: "Entrega peça: post, anúncio, relatório.",
    toka: "Entrega operação: da atração ao procedimento marcado.",
  },
  {
    comum: "Fala com o marketing, nunca com quem atende o paciente.",
    toka: "Trabalha dentro do seu comercial, com o seu time.",
  },
  {
    comum: "Some quando o contrato acaba, e leva o método junto.",
    toka: "Você sai com tudo: método, funil e histórico.",
  },
  {
    comum: "Mede alcance e engajamento.",
    toka: "Mede custo por procedimento realizado.",
  },
];

const Grade = styled.div`
  margin-top: 66px;
  border-top: 1px solid var(--linha);
`;

const Cabeca = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 60px;
  padding: 22px 0;
  border-bottom: 1px solid var(--linha);

  h3 {
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin: 0;
    color: var(--tinta-fraca);

    &.nossa {
      color: var(--acento);
    }
  }

  ${Media.TabletSmall} {
    display: none;
  }
`;

const Par = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 60px;
  padding: 26px 0;
  border-bottom: 1px solid var(--linha);

  .lado {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 0 14px;
    align-items: start;
    font-size: 1rem;
    line-height: 1.55;
  }

  .comum {
    color: var(--tinta-fraca);
  }

  .toka {
    color: var(--tinta-corpo);
  }

  svg {
    margin-top: 5px;
  }

  .comum svg {
    color: var(--tinta-fraca);
    opacity: 0.7;
  }

  .toka svg {
    color: var(--acento);
  }

  ${Media.TabletSmall} {
    grid-template-columns: 1fr;
    gap: 14px;

    /* Sem as colunas, o rótulo volta para dentro de cada linha: sem ele
       ninguém sabe qual das duas respostas é a nossa. */
    .lado::after {
      grid-column: 2;
      font-family: "Poppins", sans-serif;
      font-size: 0.62rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      opacity: 0.75;
      margin-top: 4px;
    }

    .comum::after {
      content: "Agência comum";
      color: var(--tinta-fraca);
    }

    .toka::after {
      content: "Toka";
      color: var(--acento);
    }
  }
`;

export default function Comparativo() {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, {
    menosMovimento,
    folga: 30,
    distancia: 34,
  });

  const guardar = (i) => (el) => (pecas.current[i] = el);

  return (
    <Section className="faixa-clara" ref={escopo}>
      <Inner>
        <Selo ref={guardar(0)}>Por que a Toka</Selo>
        <H2 ref={guardar(1)}>
          Não é o mesmo trabalho com <em>outro nome</em>.
        </H2>
        <Lead ref={guardar(2)}>
          A diferença não está no que se promete. Está em quem opera, no que se
          entrega e no que se mede.
        </Lead>

        <Grade>
          <Cabeca ref={guardar(3)}>
            <h3>Agência comum</h3>
            <h3 className="nossa">A Toka</h3>
          </Cabeca>

          {PARES.map((par, i) => (
            <Par key={par.toka} ref={guardar(4 + i)}>
              <p className="lado comum">
                <Cruz />
                <span>{par.comum}</span>
              </p>
              <p className="lado toka">
                <Certo />
                <span>{par.toka}</span>
              </p>
            </Par>
          ))}
        </Grade>
      </Inner>
    </Section>
  );
}
