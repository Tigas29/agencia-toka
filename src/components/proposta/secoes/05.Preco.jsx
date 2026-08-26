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
 * Ordem que não se inverte: o comparativo de quanto custaria contratar
 * separado já passou na dobra anterior como valor de entrega, e o preço
 * vem agora. Mostrar o total avulso depois do preço seria justificar;
 * antes dele seria ancorar a cabeça da pessoa num número que não é o que
 * ela vai pagar.
 *
 * 🔑 A comparação aqui é de ESCOPO, não de preço. A versão anterior
 * punha R$ 2.500 ao lado de R$ 2.700 contando a história da conversa
 * ("a gente tinha combinado"), e lida sozinha, sem ninguém conduzindo,
 * ela vira um aumento sendo justificado. Agora as duas colunas mostram
 * quanta coisa cabe em cada valor: o olho compara a altura das listas
 * antes de ler qualquer cifra, e a diferença de R$ 200 aparece como
 * detalhe, que é o que ela é.
 */

const Colunas = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 38px 0 30px;
  align-items: start;

  ${Media.PhoneLarge} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Cartao = styled.div`
  border: 1px solid
    ${(p) => (p.$destaque ? "var(--acento-borda)" : "var(--linha)")};
  background: ${(p) =>
    p.$destaque ? "var(--acento-veu)" : "var(--superficie)"};
  border-radius: 16px;
  padding: clamp(20px, 2.6vw, 28px);

  .valor {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-variant-numeric: lining-nums proportional-nums;
    line-height: 1;
    font-size: clamp(1.9rem, 5vw, 2.6rem);
    color: ${(p) => (p.$destaque ? "var(--acento)" : "var(--tinta-fraca)")};
    margin: 0 0 4px;
  }

  .por-mes {
    font-size: 0.84rem;
    color: var(--tinta-fraca);
    margin: 0 0 6px;
  }

  .rotulo {
    font-family: "Poppins", sans-serif;
    font-size: 0.94rem;
    font-weight: 500;
    color: var(--tinta);
    margin: 0 0 18px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 18px;
  }

  li {
    position: relative;
    padding-left: 22px;
    margin-bottom: 9px;
    font-size: 0.93rem;
    line-height: 1.45;
    color: var(--tinta-corpo);

    /* Marca de conferido desenhada com duas bordas giradas: um caractere
       de visto muda de forma conforme a fonte que o sistema tiver. */
    &::before {
      content: "";
      position: absolute;
      left: 2px;
      top: 0.42em;
      width: 5px;
      height: 9px;
      border-right: 1.5px solid var(--acento);
      border-bottom: 1.5px solid var(--acento);
      transform: rotate(42deg);
    }
  }

  .nota {
    font-size: 0.86rem;
    color: var(--tinta-fraca);
    margin: 0;
    padding-top: 14px;
    border-top: 1px solid var(--linha);
  }

  ${Media.PhoneLarge} {
    padding: 18px 17px;
  }
`;

const Bloco = styled(Caixa)`
  margin-top: 30px;

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
  const { preco, entrega } = dados;

  /**
   * As listas das duas colunas saem dos próprios grupos de entregáveis:
   * a primeira mostra o grupo de cinco, a segunda mostra as dez. Digitar
   * de novo aqui abriria a porta para a dobra do preço prometer uma
   * coisa e a dos entregáveis listar outra.
   */
  const primeiroGrupo = entrega.grupos[0].itens.map((i) => i.nome);
  const todas = entrega.grupos.flatMap((g) => g.itens.map((i) => i.nome));
  const listas = [primeiroGrupo, todas];

  return (
    <Dobra className="faixa-clara">
      <Coluna>
        <Selo>{preco.selo}</Selo>
        <H2>{preco.titulo}</H2>

        {preco.linhasAbertura.map((linha) => (
          <Linha key={linha}>{linha}</Linha>
        ))}

        <Colunas>
          {preco.colunas.map((coluna, i) => (
            <Cartao key={coluna.valor} $destaque={coluna.destaque}>
              <p className="valor">{brl(coluna.valor)}</p>
              <p className="por-mes">por mês</p>
              <p className="rotulo">{coluna.rotulo}</p>
              <ul>
                {listas[i].map((nome) => (
                  <li key={nome}>{nome}</li>
                ))}
              </ul>
              <p className="nota">{coluna.nota}</p>
            </Cartao>
          ))}
        </Colunas>

        {preco.linhasPreco.map((linha) => (
          <Linha key={linha}>{linha}</Linha>
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
