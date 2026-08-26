import { useRef } from "react";
import { Fecho, H2 } from "../../../estilo/ds";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";
import { Coluna, Dobra, Linha } from "../style";

/**
 * Dobra 2, o bloco de afinidade. É o mais fácil de subestimar e o que
 * decide o resto: enquanto a pessoa achar que o fracasso anterior foi
 * culpa dela, ela lê tudo depois disto na defensiva.
 *
 * A ordem das linhas é a do framework e não é decorativa: tira a culpa,
 * reconhece o esforço que existiu, nomeia o inimigo (o mercado que
 * vendeu pedaço) e só então diz o que ela de fato quer.
 */

export default function Culpa({ dados }) {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, { menosMovimento, folga: 30 });
  const guardar = (i) => (el) => (pecas.current[i] = el);

  const { culpa } = dados;

  return (
    <Dobra className="faixa-escura" id="leitura" ref={escopo}>
      <Coluna>
        <H2 ref={guardar(0)}>{culpa.titulo}</H2>

        {culpa.linhas.map((linha, i) => (
          <Linha key={linha} ref={guardar(1 + i)}>
            {linha}
          </Linha>
        ))}

        <Fecho ref={guardar(1 + culpa.linhas.length)}>{culpa.fecho}</Fecho>
      </Coluna>
    </Dobra>
  );
}
