import styled from "styled-components";
import { H2, Lead, Selo } from "../../../estilo/ds";
import { brl } from "../dados";
import Exemplo from "../exemplo";
import { Coluna, Dobra, Media, Numero, Rotulo } from "../style";

/**
 * As dobras de número não animam a entrada.
 *
 * A revelação por rolagem funciona onde o conteúdo é argumento: a frase
 * chegar no ritmo da leitura ajuda. Aqui o conteúdo é cifra, e cifra que
 * chega atrasada num scroll rápido lê como página quebrada. Numa dobra
 * alta a cascata ainda abre um vão de tela vazia entre o que já apareceu
 * e o que falta.
 */

/**
 * Dobra 4, o empilhamento. O mecanismo inteiro da página está aqui: o
 * valor precisa ser visto item a item, com o acumulado subindo, antes
 * de qualquer preço aparecer.
 *
 * O acumulado é calculado a partir da própria lista, nunca escrito à
 * mão. Um total digitado num lugar e itens editados em outro é como
 * duas telas passam a mostrar números diferentes para a mesma coisa.
 */

const Grupo = styled.div`
  margin-top: 46px;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px 24px;
  align-items: baseline;
  padding: 22px 0;
  border-bottom: 1px solid var(--linha);

  h3 {
    font-family: "Poppins", sans-serif;
    font-size: 1.02rem;
    font-weight: 500;
    color: var(--tinta);
    margin: 0 0 6px;
  }

  .promessa {
    font-size: 0.97rem;
    line-height: 1.5;
    color: var(--tinta-corpo);
    margin: 0 0 8px;
    max-width: 48ch;
  }

  .detalhe {
    font-size: 0.89rem;
    line-height: 1.55;
    color: var(--tinta-fraca);
    margin: 0;
    max-width: 52ch;
  }

  .valor {
    font-family: "Poppins", sans-serif;
    font-size: 0.98rem;
    font-weight: 500;
    font-variant-numeric: lining-nums tabular-nums;
    color: var(--acento);
    white-space: nowrap;
    text-align: right;
  }

  /* A prova atravessa as duas colunas: miniatura de arte e bolhas de
     conversa não cabem na largura reservada ao texto, e espremê-las ali
     devolveria imagens pequenas demais para provar coisa alguma. */
  .prova {
    grid-column: 1 / -1;
  }

  .prova:empty {
    display: none;
  }

  ${Media.PhoneLarge} {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 18px 0;

    .valor {
      text-align: left;
    }
  }
`;

/** Acumulado ao fim de cada grupo. É o número que a pessoa vê subir. */
const Acumulado = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px 0 0;

  p {
    font-size: 0.92rem;
    color: var(--tinta-fraca);
    margin: 0;
  }

  strong {
    font-family: "Poppins", sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    font-variant-numeric: lining-nums tabular-nums;
    color: var(--tinta);
  }
`;

const Total = styled.div`
  margin-top: 56px;
  padding-top: 34px;
  border-top: 1px solid var(--linha);

  p {
    font-size: 1.02rem;
    color: var(--tinta-corpo);
    margin: 0 0 10px;
  }
`;

export default function Entrega({ dados }) {
  const { entrega, economia } = dados;

  let acumulado = 0;

  return (
    <Dobra className="faixa-escura">
      <Coluna>
        <Selo>{entrega.selo}</Selo>
        <H2>{entrega.titulo}</H2>
        <Lead>{entrega.abertura}</Lead>

        {entrega.grupos.map((grupo, iGrupo) => {
          const ultimo = iGrupo === entrega.grupos.length - 1;
          return (
            <Grupo key={grupo.rotulo}>
              <Rotulo>{grupo.rotulo}</Rotulo>

              {grupo.itens.map((item) => {
                acumulado += item.valor;
                return (
                  <Item key={item.nome}>
                    <div>
                      <h3>{item.nome}</h3>
                      <p className="promessa">{item.promessa}</p>
                      <p className="detalhe">{item.detalhe}</p>
                    </div>
                    <span className="valor">{brl(item.valor)}</span>
                    <div className="prova">
                      <Exemplo
                        exemplo={item.exemplo}
                        amostras={dados.amostras}
                      />
                    </div>
                  </Item>
                );
              })}

              {/* O último grupo não mostra parcial: o acumulado dele é o
                  total, e o total já vem logo abaixo em corpo grande.
                  Repetir a mesma cifra em duas linhas seguidas gasta o
                  efeito do número que a dobra inteira construiu. */}
              {!ultimo && (
                <Acumulado>
                  <p>Somando até aqui</p>
                  <strong>{brl(acumulado)}</strong>
                </Acumulado>
              )}
            </Grupo>
          );
        })}

        <Total>
          <p>
            {entrega.fecho}, ao longo dos {economia.meses} meses:
          </p>
          <Numero $tamanho="grande" $acento>
            {brl(acumulado)}
          </Numero>
        </Total>
      </Coluna>
    </Dobra>
  );
}
