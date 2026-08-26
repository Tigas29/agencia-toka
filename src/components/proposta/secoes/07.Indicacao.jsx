import styled from "styled-components";
import { Fecho, H2, Lead, Selo } from "../../../estilo/ds";
import {
  brl,
  custoMensal,
  custoSemestre,
  procedimentosParaEmpatar,
} from "../dados";
import Grafico from "../grafico";
import { contribuicao } from "../dados";
import { Coluna, Dobra, Media, Rotulo } from "../style";

/** Nomes das duas colunas do confronto, em um lugar só. */
const COLUNAS = ["Hoje", "Com 3 indicações"];

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
 * Dobra 7, o plano de indicação.
 *
 * Vem depois da conta de propósito. Antes dela seria desconto, e
 * desconto oferecido antes do valor ser aceito só confirma que o preço
 * estava alto. Depois da conta é outra coisa: a pessoa já sabe quanto
 * precisa vender para empatar, e o que esta dobra faz é mostrar o mesmo
 * cálculo com o fixo menor.
 *
 * Os dois cenários saem das mesmas funções que a dobra anterior usou.
 * Repetir a fórmula aqui seria garantir que os dois números divergissem
 * na primeira vez que alguém mexesse na verba ou no prazo.
 */

const Escada = styled.ol`
  list-style: none;
  padding: 0;
  margin: 40px 0 34px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  ${Media.TabletSmall} {
    grid-template-columns: repeat(2, 1fr);
  }

  li {
    border: 1px solid var(--linha);
    border-radius: 14px;
    padding: 20px 16px;
    background: var(--superficie);

    /* O degrau final é o único que ganha a cor do acento: quatro caixas
       douradas lado a lado não seriam uma escada, seriam um cartaz. */
    &.destaque {
      border-color: var(--acento-borda);
      background: var(--acento-veu);

      .fixo {
        color: var(--acento);
      }
    }
  }

  .passo {
    font-family: "Poppins", sans-serif;
    font-size: 0.66rem;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
    margin: 0 0 12px;
    min-height: 2.4em;
    line-height: 1.35;
  }

  .fixo {
    display: block;
    font-family: "Poppins", sans-serif;
    font-size: clamp(1.3rem, 3.4vw, 1.7rem);
    font-weight: 600;
    font-variant-numeric: lining-nums proportional-nums;
    line-height: 1;
    color: var(--tinta);
  }

  .unidade {
    font-size: 0.8rem;
    color: var(--tinta-fraca);
    margin: 8px 0 0;
  }
`;

const Regras = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 44px;

  li {
    position: relative;
    padding-left: 24px;
    margin-bottom: 12px;
    font-size: 0.98rem;
    line-height: 1.55;
    color: var(--tinta-corpo);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.7em;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--acento);
    }
  }
`;

/**
 * Confronto de dois cenários.
 *
 * Não é uma tabela de três colunas, e a razão é o telemóvel: rótulo mais
 * dois valores em 390px de largura empurra a terceira coluna para fora
 * da tela, e a coluna que sai é justamente a que esta dobra existe para
 * mostrar. Aqui cada métrica é um bloco: no desktop o rótulo fica à
 * esquerda dos dois valores, no telemóvel ele sobe para cima deles e os
 * valores dividem a linha ao meio, cada um carregando o próprio nome.
 */
const Confronto = styled.div`
  border: 1px solid var(--linha);
  border-radius: 16px;
  padding: clamp(20px, 3vw, 30px);
  margin-bottom: 36px;

  ${Media.PhoneLarge} {
    padding: 18px 16px;
  }

  .cabecalho,
  .linha {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 10px 16px;
    align-items: baseline;
  }

  .cabecalho {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--linha);

    span {
      font-family: "Poppins", sans-serif;
      font-size: 0.66rem;
      font-weight: 400;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--tinta-fraca);
      text-align: right;
    }
  }

  .linha {
    padding: 15px 0;
    border-bottom: 1px solid var(--linha);

    &:last-child {
      border-bottom: 0;
    }
  }

  .metrica {
    font-size: 0.95rem;
    color: var(--tinta-corpo);
  }

  .valor {
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-variant-numeric: lining-nums tabular-nums;
    color: var(--tinta);
    text-align: right;
    white-space: nowrap;
  }

  /* O nome da coluna só existe no telemóvel, onde o cabeçalho sai. */
  .valor .de-quem {
    display: none;
  }

  .linha.destaque {
    .valor {
      font-weight: 600;
      color: var(--acento);
    }

    .metrica {
      color: var(--tinta);
      font-weight: 600;
    }
  }

  ${Media.PhoneLarge} {
    .cabecalho {
      display: none;
    }

    .linha {
      grid-template-columns: 1fr 1fr;
    }

    .metrica {
      grid-column: 1 / -1;
      font-size: 0.9rem;
      color: var(--tinta-fraca);
    }

    .valor {
      text-align: left;
    }

    .valor .de-quem {
      display: block;
      font-family: "Poppins", sans-serif;
      font-size: 0.6rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--tinta-fraca);
      margin-bottom: 4px;
      white-space: normal;
    }
  }
`;

/**
 * Os dois cenários lado a lado, na mesma escala.
 *
 * É a escala compartilhada que faz o desenho funcionar: as barras são
 * idênticas nos dois, porque a sobra por procedimento não muda com o
 * plano de indicação. O que muda é a altura da linha tracejada, e é
 * exatamente essa a leitura que a dobra quer entregar.
 */
const Desenhos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
  margin-bottom: 40px;

  ${Media.TabletSmall} {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export default function Indicacao({ dados }) {
  const { indicacao, economia } = dados;

  const cenario = (fixo) => ({
    fixo,
    mensal: custoMensal(economia, fixo),
    semestre: custoSemestre(economia, fixo),
    empate: procedimentosParaEmpatar(economia, fixo),
  });

  const cheio = cenario(economia.fixoMes);
  const piso = cenario(economia.fixoPiso);
  const sobra = contribuicao(economia);

  /**
   * Os dois desenhos compartilham a contagem de barras do cenário mais
   * longo. É o que mantém a escala comum: sem isso, a mesma sobra por
   * procedimento sairia com alturas diferentes de um lado para o outro.
   */
  const barrasFixas = Math.max(5, cheio.empate + 2);

  return (
    <Dobra className="faixa-clara">
      <Coluna>
        <Selo>{indicacao.selo}</Selo>
        <H2>{indicacao.titulo}</H2>
        <Lead>{indicacao.abertura}</Lead>

        <Escada>
          {indicacao.escada.map((degrau) => (
            <li
              key={degrau.indicacoes}
              className={degrau.destaque ? "destaque" : undefined}
            >
              <p className="passo">{degrau.rotulo}</p>
              <strong className="fixo">{brl(degrau.fixo)}</strong>
              <p className="unidade">por mês</p>
            </li>
          ))}
        </Escada>

        <Regras>
          {indicacao.regras.map((regra) => (
            <li key={regra}>{regra}</li>
          ))}
        </Regras>

        <Confronto>
          <Rotulo>{indicacao.tituloComparativo}</Rotulo>

          <div className="cabecalho">
            <span />
            <span>{COLUNAS[0]}</span>
            <span>{COLUNAS[1]}</span>
          </div>

          {[
            ["Assessoria por mês", brl(cheio.fixo), brl(piso.fixo)],
            ["Custo total por mês", brl(cheio.mensal), brl(piso.mensal)],
            [
              `Custo dos ${economia.meses} meses`,
              brl(cheio.semestre),
              brl(piso.semestre),
            ],
          ].map(([metrica, agora, depois]) => (
            <div className="linha" key={metrica}>
              <span className="metrica">{metrica}</span>
              <span className="valor">
                <span className="de-quem">{COLUNAS[0]}</span>
                {agora}
              </span>
              <span className="valor">
                <span className="de-quem">{COLUNAS[1]}</span>
                {depois}
              </span>
            </div>
          ))}

          <div className="linha destaque">
            <span className="metrica">
              Procedimentos para empatar o semestre
            </span>
            <span className="valor">
              <span className="de-quem">{COLUNAS[0]}</span>
              {cheio.empate}
            </span>
            <span className="valor">
              <span className="de-quem">{COLUNAS[1]}</span>
              {piso.empate}
            </span>
          </div>
        </Confronto>

        <Desenhos>
          <div>
            <Rotulo>{COLUNAS[0]}</Rotulo>
            <Grafico
              sobra={sobra}
              custo={cheio.semestre}
              empate={cheio.empate}
              destacado={false}
              barrasFixas={barrasFixas}
              titulo="Ponto de equilíbrio com o fixo cheio"
              legenda={`A linha tracejada, o custo do semestre, fica em ${brl(
                cheio.semestre
              )}.`}
            />
          </div>
          <div>
            <Rotulo>{COLUNAS[1]}</Rotulo>
            <Grafico
              sobra={sobra}
              custo={piso.semestre}
              empate={piso.empate}
              barrasFixas={barrasFixas}
              titulo="Ponto de equilíbrio com três indicações"
              legenda={`Mesmas barras, e a linha desce para ${brl(
                piso.semestre
              )}.`}
            />
          </div>
        </Desenhos>

        <Fecho>{indicacao.fecho}</Fecho>
      </Coluna>
    </Dobra>
  );
}
