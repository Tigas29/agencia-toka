import styled from "styled-components";
import { brl } from "./dados";
import { Media } from "./style";

/**
 * O ponto de equilíbrio, desenhado.
 *
 * A mesma conta que a tabela ao lado mostra em quatro linhas, dita em
 * dois segundos: cada barra é um procedimento, a altura dela é a sobra
 * acumulada, e a linha tracejada é o que o semestre custa. Onde a barra
 * ultrapassa a linha, a conta virou.
 *
 * SVG escrito à mão, sem biblioteca de gráfico. Duas barras verticais e
 * uma reta não justificam trazer um pacote de 100kB para o bundle, e a
 * régua de cor aqui é a mesma do resto da página: a barra pergunta qual
 * é a tinta da faixa (`--tinta-fraca`, `--acento`) em vez de escolher um
 * hexadecimal próprio, senão ela erraria a cor em uma das duas faixas.
 *
 * `viewBox` com `preserveAspectRatio` padrão: o desenho escala com a
 * largura disponível e nunca abre rolagem horizontal no telemóvel, que é
 * onde esta página é lida.
 */

const Moldura = styled.figure`
  margin: 0;

  svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  figcaption {
    font-size: 0.86rem;
    line-height: 1.5;
    color: var(--tinta-fraca);
    margin-top: 14px;
  }

  ${Media.PhoneLarge} {
    figcaption {
      font-size: 0.82rem;
    }
  }
`;

const L = 320; // largura do desenho, em unidades do viewBox
const A = 150; // altura da área das barras
const BASE = 22; // faixa de baixo, onde ficam os números dos procedimentos

export default function Grafico({
  sobra,
  custo,
  empate,
  titulo,
  legenda,
  destacado = true,
  barrasFixas,
}) {
  /**
   * Quantas barras desenhar: o suficiente para mostrar o empate e mais
   * duas depois dele, que é o que faz ver que a partir dali a barra
   * continua subindo sozinha. Nunca menos de cinco, senão um empate de
   * dois procedimentos vira um desenho de duas barras que não conta
   * história nenhuma.
   *
   * 🔴 E nunca menos que o empate. Havia um teto de doze barras aqui, e
   * com ticket baixo (onde o equilíbrio passa de doze procedimentos) o
   * desenho saía com todas as barras cinzas, abaixo da linha, sem o
   * rótulo do empate: dizia exatamente o oposto da conta, que a coisa
   * nunca fecha. Melhor a barra ficar fina do que mentir.
   *
   * `barrasFixas` existe para os dois gráficos do plano de indicação.
   * Como o teto da escala deriva da quantidade de barras, deixar cada um
   * escolher a sua fazia a mesma sobra por procedimento ser desenhada em
   * alturas diferentes nos dois desenhos, e a comparação lado a lado,
   * que é a razão de eles existirem, deixava de valer.
   */
  const barras = barrasFixas || Math.max(5, empate + 2);

  /**
   * Passando de catorze barras, os números embaixo viram uma faixa
   * ilegível de algarismos colados. Aí só marcamos o empate e os
   * múltiplos de cinco, que é o bastante para o eixo ter escala.
   */
  const rotularTudo = barras <= 14;

  /**
   * O topo da escala é o maior entre a última barra e a linha de custo,
   * com folga. Sem incluir a linha no cálculo, um custo alto demais sairia
   * desenhado fora da moldura.
   */
  const teto = Math.max(sobra * barras, custo) * 1.12;
  const altura = (v) => (v / teto) * A;

  const vao = L / barras;
  const larguraBarra = Math.max(Math.min(vao * 0.56, 34), 3);
  const yCusto = A - altura(custo);

  return (
    <Moldura>
      <svg
        viewBox={`0 0 ${L} ${A + BASE}`}
        role="img"
        aria-label={`${titulo}. ${legenda}`}
      >
        {/* Linha de base */}
        <line
          x1="0"
          y1={A}
          x2={L}
          y2={A}
          stroke="var(--linha)"
          strokeWidth="1"
        />

        {/* A linha do custo do semestre. Tracejada porque é uma meta, não
            um valor medido: linha cheia leria como mais uma série. */}
        <line
          x1="0"
          y1={yCusto}
          x2={L}
          y2={yCusto}
          stroke={destacado ? "var(--acento)" : "var(--tinta-fraca)"}
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.85"
        />
        {/* Só a cifra: a frase inteira ("o que o semestre custa") corria
            por baixo das barras quando a linha ficava baixa, e quem
            explica o que a linha é já é a legenda embaixo do desenho. */}
        <text
          x="0"
          y={yCusto - 6}
          fill={destacado ? "var(--acento)" : "var(--tinta-fraca)"}
          fontSize="9"
          fontFamily="Poppins, sans-serif"
          fontWeight="600"
        >
          {brl(custo)}
        </text>

        {Array.from({ length: barras }, (_, i) => {
          const n = i + 1;
          const acumulado = sobra * n;
          const h = altura(acumulado);
          const pagou = n >= empate;
          const x = i * vao + (vao - larguraBarra) / 2;

          return (
            <g key={n}>
              <rect
                x={x}
                y={A - h}
                width={larguraBarra}
                height={h}
                rx="2"
                fill={
                  pagou && destacado ? "var(--acento)" : "var(--tinta-fraca)"
                }
                opacity={pagou ? 1 : 0.42}
              />
              {(rotularTudo || n === empate || n % 5 === 0) && (
                <text
                  x={x + larguraBarra / 2}
                  y={A + 14}
                  textAnchor="middle"
                  fill={n === empate ? "var(--tinta)" : "var(--tinta-fraca)"}
                  fontSize="9"
                  fontFamily="Poppins, sans-serif"
                  fontWeight={n === empate ? 600 : 400}
                >
                  {n}
                </text>
              )}
            </g>
          );
        })}

        {/* O rótulo do empate acompanha a barra e some quando ela é a
            última desenhada, para não sair pela borda direita. */}
        {empate <= barras - 1 && (
          <text
            x={(empate - 1) * vao + vao / 2}
            y={A - altura(sobra * empate) - 7}
            textAnchor="middle"
            fill="var(--tinta)"
            fontSize="9"
            fontFamily="Poppins, sans-serif"
            fontWeight="600"
          >
            aqui empata
          </text>
        )}
      </svg>

      <figcaption>{legenda}</figcaption>
    </Moldura>
  );
}
