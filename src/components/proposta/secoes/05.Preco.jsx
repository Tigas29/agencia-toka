import styled from "styled-components";
import { H2, Selo } from "../../../estilo/ds";
import { brl } from "../dados";
import { Caixa, Coluna, Dobra, Linha, Media, Rotulo } from "../style";

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
 * Dobra 5, o preço.
 *
 * Ordem que não se inverte: o comparativo de quanto custaria separado
 * já passou na dobra anterior como valor de entrega, e o preço vem
 * agora. Mostrar o total avulso depois do preço seria justificar; antes
 * dele seria ancorar a cabeça da pessoa num número que não é o que ela
 * vai pagar.
 *
 * A âncora aqui é o contrário da usual: o escopo cresce e o valor quase
 * não. É por isso que os R$ 2.500 combinados aparecem inteiros, e não
 * riscados como preço velho de vitrine.
 */

const Comparacao = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
  margin: 40px 0;

  .seta {
    font-family: "Poppins", sans-serif;
    color: var(--tinta-fraca);
    font-size: 1.4rem;
    line-height: 1;
  }

  ${Media.PhoneLarge} {
    grid-template-columns: 1fr;
    gap: 14px;

    .seta {
      transform: rotate(90deg);
      justify-self: start;
    }
  }
`;

const Lado = styled.div`
  p {
    margin: 0;
  }

  .valor {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-variant-numeric: lining-nums proportional-nums;
    line-height: 1;
    color: ${(p) => (p.$forte ? "var(--acento)" : "var(--tinta-fraca)")};
    font-size: ${(p) =>
      p.$forte ? "clamp(2.4rem, 6.4vw, 3.4rem)" : "clamp(1.6rem, 4vw, 2.1rem)"};
    margin-bottom: 8px;
  }

  .escopo {
    font-size: 0.92rem;
    color: var(--tinta-fraca);
  }
`;

const Bloco = styled(Caixa)`
  margin-top: 36px;

  h3 {
    font-family: "Poppins", sans-serif;
    font-size: 1.04rem;
    font-weight: 500;
    color: var(--tinta);
    margin: 0 0 12px;
  }

  p {
    font-size: 0.99rem;
    line-height: 1.6;
    color: var(--tinta-corpo);
    margin: 0;
    max-width: 56ch;
  }
`;

const Custos = styled.div`
  margin-top: 36px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 18px 0;
    border-bottom: 1px solid var(--linha);

    &:last-child {
      border-bottom: 0;
    }
  }

  .cabeca {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 7px;
  }

  .nome {
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--tinta);
  }

  .cifra {
    font-family: "Poppins", sans-serif;
    font-size: 0.94rem;
    font-variant-numeric: lining-nums proportional-nums;
    color: var(--acento);
  }

  .texto {
    font-size: 0.91rem;
    line-height: 1.55;
    color: var(--tinta-fraca);
    margin: 0;
    max-width: 56ch;
  }
`;

export default function Preco({ dados }) {
  const { preco, economia, entrega } = dados;
  const quantasCombinadas = entrega.grupos[0].itens.length;
  const quantasTotal = entrega.grupos.reduce((s, g) => s + g.itens.length, 0);


  return (
    <Dobra className="faixa-clara">
      <Coluna>
        <Selo>{preco.selo}</Selo>
        <H2>{preco.tituloAncora}</H2>

        {preco.linhasAncora.map((linha) => (
          <Linha key={linha}>
            {linha}
          </Linha>
        ))}

        <Comparacao>
          <Lado>
            <p className="valor">{brl(preco.ancora)}</p>
            <p className="escopo">
              por mês, {quantasCombinadas} linhas
            </p>
          </Lado>
          <span className="seta" aria-hidden="true">
            &rarr;
          </span>
          <Lado $forte>
            <p className="valor">{brl(economia.fixoMes)}</p>
            <p className="escopo">
              por mês, as {quantasTotal} linhas
            </p>
          </Lado>
        </Comparacao>

        {preco.linhasPreco.map((linha) => (
          <Linha key={linha}>
            {linha}
          </Linha>
        ))}

        <Bloco>
          <h3>{preco.comissao.titulo}</h3>
          <p>{preco.comissao.texto}</p>
        </Bloco>

        <Custos>
          <Rotulo>{preco.custos.titulo}</Rotulo>
          <ul>
            {preco.custos.itens.map((item) => (
              <li key={item.nome}>
                <div className="cabeca">
                  <span className="nome">{item.nome}</span>
                  <span className="cifra">{item.valor}</span>
                </div>
                <p className="texto">{item.texto}</p>
              </li>
            ))}
          </ul>
        </Custos>
      </Coluna>
    </Dobra>
  );
}
