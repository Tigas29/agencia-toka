import { useRef } from "react";
import styled from "styled-components";
import { H2, Selo } from "../../../estilo/ds";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";
import { Coluna, Dobra, Linha, Media } from "../style";

/**
 * Dobra 3, o dominó. Uma frase só precisa cair aqui: demanda própria é
 * o que separa quem opera melhor de quem tem fila.
 *
 * Vem em faixa clara de propósito. É a primeira troca de papel da
 * página e marca que o registro mudou: até aqui era sobre o que doeu,
 * daqui em diante é sobre o que resolve.
 */

const Definicao = styled.div`
  margin: 40px 0 34px;
  padding-left: 26px;
  border-left: 2px solid var(--acento);

  p {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.3rem, 2.6vw, 1.75rem);
    line-height: 1.34;
    color: var(--tinta);
    margin: 0;
    max-width: 34ch;
  }

  ${Media.PhoneLarge} {
    padding-left: 18px;
    margin: 32px 0 28px;
  }
`;

const Sentenca = styled.p`
  font-family: "EB Garamond", Georgia, serif;
  font-size: clamp(1.7rem, 4.6vw, 2.9rem);
  line-height: 1.12;
  letter-spacing: -0.012em;
  color: var(--acento);
  margin: 0;
  max-width: 20ch;
`;

export default function Domino({ dados }) {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, { menosMovimento, folga: 30 });
  const guardar = (i) => (el) => (pecas.current[i] = el);

  const { domino } = dados;

  return (
    <Dobra className="faixa-clara" ref={escopo}>
      <Coluna>
        <Selo ref={guardar(0)}>{domino.selo}</Selo>
        <H2 ref={guardar(1)}>{domino.titulo}</H2>

        {domino.linhas.map((linha, i) => (
          <Linha key={linha} ref={guardar(2 + i)}>
            {linha}
          </Linha>
        ))}

        <Definicao ref={guardar(2 + domino.linhas.length)}>
          <p>
            {domino.definicao.titulo} {domino.definicao.texto}
          </p>
        </Definicao>

        <Sentenca ref={guardar(3 + domino.linhas.length)}>
          {domino.fecho}
        </Sentenca>
      </Coluna>
    </Dobra>
  );
}
