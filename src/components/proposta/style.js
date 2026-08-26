import styled, { css } from "styled-components";
import { Inner as InnerDS, Media, Section } from "../../estilo/ds";

/**
 * Estilo próprio da rota de proposta.
 *
 * Quase nada mora aqui. A página é escrita contra `src/estilo/ds.js`,
 * como o resto do site: nenhum componente deste arquivo escolhe cor, ele
 * pergunta qual é a tinta da faixa. Trocar o tema de uma dobra inteira
 * continua sendo trocar a classe `.faixa-clara` por `.faixa-escura`.
 *
 * A diferença desta página para a /habitat é o registro: lá a cor é
 * narrativa e a rolagem é uma cena. Aqui a pessoa lê um documento no
 * telemóvel, sozinha, decidindo sobre dinheiro. Faixas alternadas dão o
 * que uma leitura assim precisa: um lugar visível para descansar entre
 * um argumento e o seguinte.
 */

export { Media, InnerDS as Inner };

/** Área de leitura mais estreita que a do site: aqui é texto, não vitrine. */
export const Coluna = styled.div`
  width: 90%;
  max-width: 860px;
  margin: 0 auto;
  position: relative;

  ${Media.PhoneLarge} {
    width: 100%;
    padding: 0 22px;
  }
`;

export const Dobra = styled(Section)`
  padding: var(--respiro-curto) 0;
`;

/**
 * Parágrafo de argumento. Maior que o `Texto` do DS e na tinta de corpo,
 * porque nesta página o parágrafo é o conteúdo e não o apoio de um
 * gráfico. As linhas vêm em sequência e cada uma é um passo do
 * raciocínio, então elas respiram entre si mais do que num texto comum.
 */
export const Linha = styled.p`
  font-size: clamp(1.02rem, 1.5vw, 1.14rem);
  line-height: 1.62;
  color: var(--tinta-corpo);
  margin: 0 0 22px;
  max-width: 56ch;

  strong {
    color: var(--tinta);
    font-weight: 600;
  }
`;

/**
 * Caixa que sobe da faixa sem ganhar contorno pesado. Em papel o que
 * sobe é o mais claro, e sobre navy o mais claro também: por isso o
 * fundo é `--superficie` e não um branco fixo.
 */
export const Caixa = styled.div`
  background: var(--superficie);
  border: 1px solid var(--linha);
  border-radius: 16px;
  padding: clamp(22px, 3.4vw, 34px);

  ${Media.PhoneLarge} {
    border-radius: 13px;
    padding: 20px 18px;
  }
`;

/** Número grande de destaque. Poppins porque é cifra, não prosa. */
export const Numero = styled.strong`
  display: block;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-variant-numeric: lining-nums proportional-nums;
  line-height: 1;
  color: var(--tinta);
  font-size: ${(p) =>
    p.$tamanho === "grande"
      ? "clamp(2.6rem, 7vw, 4rem)"
      : "clamp(1.5rem, 3.4vw, 2rem)"};

  ${(p) =>
    p.$acento &&
    css`
      color: var(--acento);
    `};
`;

export const Rotulo = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--tinta-fraca);
  margin: 0 0 10px;
`;

/**
 * Tabela de números.
 *
 * Ela rola dentro de si mesma quando de fato não cabe, e a página nunca
 * rola no eixo horizontal por causa dela. Mas a largura mínima é 0 e
 * não um valor confortável de leitura: numa proposta o valor É o
 * conteúdo, e uma coluna de cifras empurrada para fora da tela lê como
 * ausência, não como "role para o lado". Quem aperta é o rótulo, que
 * quebra em duas linhas sem prejuízo nenhum.
 */
export const Tabela = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  table {
    width: 100%;
    border-collapse: collapse;
    font-variant-numeric: lining-nums tabular-nums;
  }

  th,
  td {
    text-align: right;
    padding: 13px 10px;
    font-size: 0.95rem;
    border-bottom: 1px solid var(--linha);
  }

  td:last-child,
  th:last-child {
    padding-right: 0;
    white-space: nowrap;
  }

  td:first-child,
  th:first-child {
    padding-left: 0;
  }

  ${Media.PhoneLarge} {
    th,
    td {
      padding: 12px 8px;
      font-size: 0.9rem;
    }
  }

  th:first-child,
  td:first-child {
    text-align: left;
    color: var(--tinta-corpo);
  }

  thead th {
    font-family: "Poppins", sans-serif;
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
  }

  td {
    color: var(--tinta);
  }

  tr.total td {
    border-bottom: 0;
    padding-top: 18px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: var(--acento);
  }

  tr.total td:first-child {
    color: var(--tinta);
  }
`;
