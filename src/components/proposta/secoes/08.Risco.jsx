import { useRef } from "react";
import styled from "styled-components";
import { H2, Selo } from "../../../estilo/ds";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";
import { Coluna, Dobra, Linha, Rotulo } from "../style";

/**
 * Dobra 8, o medo e o teto do medo. Nesta ordem, e sem inverter.
 *
 * Primeiro o custo de não fazer nada, que é real e não aparece em
 * boleto. Depois o teto do risco de fazer, escrito item a item. Em peça
 * de médico o medo é fato verificável (a mensagem de domingo que
 * ninguém responde), nunca escassez fabricada: prazo inventado a pessoa
 * sente, e o que ela sente é que está sendo empurrada.
 */

const Teto = styled.ul`
  list-style: none;
  padding: 0;
  margin: 22px 0 0;

  li {
    position: relative;
    padding: 18px 0 18px 30px;
    border-bottom: 1px solid var(--linha);
    font-size: 1rem;
    line-height: 1.58;
    color: var(--tinta-corpo);

    &:last-child {
      border-bottom: 0;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 1.5em;
      width: 14px;
      height: 1px;
      background: var(--acento);
    }
  }
`;

const Sentenca = styled.p`
  font-family: "EB Garamond", Georgia, serif;
  font-size: clamp(1.4rem, 3.4vw, 2.1rem);
  line-height: 1.2;
  color: var(--acento);
  margin: 34px 0 56px;
  max-width: 24ch;
`;

export default function Risco({ dados }) {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, { menosMovimento, folga: 30 });
  const guardar = (i) => (el) => (pecas.current[i] = el);

  const { risco } = dados;
  let i = 2;

  return (
    <Dobra className="faixa-escura" ref={escopo}>
      <Coluna>
        <Selo ref={guardar(0)}>{risco.selo}</Selo>
        <H2 ref={guardar(1)}>{risco.titulo}</H2>

        {risco.linhas.map((linha) => (
          <Linha key={linha} ref={guardar(i++)}>
            {linha}
          </Linha>
        ))}

        <Sentenca ref={guardar(i++)}>{risco.fecho}</Sentenca>

        <div ref={guardar(i++)}>
          <Rotulo>{risco.tetoTitulo}</Rotulo>
          <Teto>
            {risco.teto.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </Teto>
        </div>
      </Coluna>
    </Dobra>
  );
}
