import { useState } from "react";
import styled from "styled-components";
import { H2, Lead, Selo } from "../../../estilo/ds";
import {
  brl,
  contribuicao,
  custoMensal,
  custoSemestre,
  procedimentosParaEmpatar,
} from "../dados";
import Grafico from "../grafico";
import { Caixa, Coluna, Dobra, Media, Numero, Rotulo, Tabela } from "../style";

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
 * Dobra 6, a conta.
 *
 * Ela abre admitindo o custo operacional do médico. Uma conta sem esse
 * custo fecharia mais bonita e não seria a realidade dele, e é
 * justamente admitir isso que compra credibilidade para tudo que veio
 * antes e para o que vem depois.
 *
 * A mecânica que a página precisa deixar visível: custo operacional,
 * mídia e comissão são variáveis e repetem a cada procedimento; a
 * assessoria é fixa e não repete. Por isso o primeiro procedimento do
 * mês carrega a estrutura e cada procedimento seguinte deixa a
 * contribuição quase inteira.
 *
 * O controle de ticket existe porque este é o único número da conta que
 * é dele e não meu. Quem não se reconhece no ticket de referência
 * descarta a conta inteira, e aqui ele refaz na hora em vez de fechar a
 * página.
 */

const Controle = styled.div`
  margin: 38px 0 34px;

  .topo {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }

  label {
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
  }

  output {
    font-family: "Poppins", sans-serif;
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 600;
    font-variant-numeric: lining-nums proportional-nums;
    color: var(--acento);
    line-height: 1;
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 3px;
    border-radius: 999px;
    background: var(--linha);
    outline: none;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--acento);
    border: 0;
    cursor: grab;
  }

  input[type="range"]::-moz-range-thumb {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--acento);
    border: 0;
    cursor: grab;
  }

  input[type="range"]:focus-visible {
    outline: 1px solid var(--tinta);
    outline-offset: 6px;
  }

  .legenda {
    font-size: 0.86rem;
    color: var(--tinta-fraca);
    margin: 12px 0 0;
  }
`;

const Par = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 26px;

  ${Media.PhoneLarge} {
    grid-template-columns: 1fr;
  }
`;

const Veredito = styled(Caixa)`
  margin-top: 30px;
  border-color: var(--acento-borda);
  background: var(--acento-veu);

  p.leitura {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.35rem, 3.2vw, 1.9rem);
    line-height: 1.24;
    color: var(--tinta);
    margin: 12px 0 0;
    max-width: 28ch;
  }
`;

const Desenho = styled.div`
  margin-top: 34px;
  padding: clamp(20px, 3vw, 28px) clamp(18px, 3vw, 26px);
  border: 1px solid var(--linha);
  border-radius: 16px;
  background: var(--superficie);
`;

const Fecho = styled.p`
  font-size: 1.02rem;
  line-height: 1.62;
  color: var(--tinta-corpo);
  margin: 34px 0 0;
  max-width: 56ch;
`;

export default function Conta({ dados }) {
  const { conta, economia } = dados;
  const [ticket, setTicket] = useState(economia.ticket);

  const atual = { ...economia, ticket };
  const custoOp = ticket * economia.custoOperacional;
  const comissao = ticket * economia.comissao;
  const sobra = contribuicao(atual);
  const mensal = custoMensal(economia, economia.fixoMes);
  const semestre = custoSemestre(economia, economia.fixoMes);
  const empate = procedimentosParaEmpatar(atual, economia.fixoMes);

  /**
   * A leitura do ritmo acompanha o controle de ticket. Num ticket alto
   * o ponto de equilíbrio cabe em menos de um procedimento por mês; num
   * ticket baixo não cabe, e afirmar que cabe seria contradizer o
   * número que está na tela logo acima desta frase.
   */
  const porMes = empate / economia.meses;
  const ritmo =
    porMes <= 1
      ? "Menos de um procedimento por mês paga a estrutura inteira."
      : `São ${Math.ceil(porMes)} procedimentos por mês para pagar a estrutura.`;

  return (
    <Dobra className="faixa-escura">
      <Coluna>
        <Selo>{conta.selo}</Selo>
        <H2>{conta.titulo}</H2>
        <Lead>{conta.abertura}</Lead>

        <Controle>
          <div className="topo">
            <label htmlFor="ticket">Seu ticket por procedimento</label>
            <output htmlFor="ticket">{brl(ticket)}</output>
          </div>
          <input
            id="ticket"
            type="range"
            min={economia.ticketMin}
            max={economia.ticketMax}
            step={economia.ticketPasso}
            value={ticket}
            onChange={(e) => setTicket(Number(e.target.value))}
          />
          <p className="legenda">{conta.legendaCalculadora}</p>
        </Controle>

        <Par>
          <Caixa>
            <Rotulo>Em cada procedimento</Rotulo>
            <Tabela>
              <table>
                <tbody>
                  <tr>
                    <td>Ticket</td>
                    <td>{brl(ticket)}</td>
                  </tr>
                  <tr>
                    <td>
                      Seu custo operacional ({economia.custoOperacional * 100}%)
                    </td>
                    <td>{brl(-custoOp)}</td>
                  </tr>
                  <tr>
                    <td>Minha comissão ({economia.comissao * 100}%)</td>
                    <td>{brl(-comissao)}</td>
                  </tr>
                  <tr className="total">
                    <td>Sobra para você</td>
                    <td>{brl(sobra)}</td>
                  </tr>
                </tbody>
              </table>
            </Tabela>
          </Caixa>

          <Caixa>
            <Rotulo>Todo mês, você paga</Rotulo>
            <Tabela>
              <table>
                <tbody>
                  <tr>
                    <td>Assessoria</td>
                    <td>{brl(economia.fixoMes)}</td>
                  </tr>
                  <tr>
                    <td>Plataformas</td>
                    <td>{brl(economia.plataformas)}</td>
                  </tr>
                  <tr>
                    <td>Verba de anúncio</td>
                    <td>{brl(economia.verba)}</td>
                  </tr>
                  <tr className="total">
                    <td>Total por mês</td>
                    <td>{brl(mensal)}</td>
                  </tr>
                </tbody>
              </table>
            </Tabela>
          </Caixa>
        </Par>

        <Desenho>
          <Grafico
            sobra={sobra}
            custo={semestre}
            empate={empate}
            titulo="Ponto de equilíbrio do semestre"
            legenda={`Cada barra é um procedimento, e a altura dela é o quanto sobrou somando os anteriores. A linha tracejada é o que o semestre inteiro custa: ${brl(
              semestre
            )}.`}
          />
        </Desenho>

        <Veredito>
          <Rotulo>
            {brl(semestre)} no semestre inteiro, dividido pela sobra de{" "}
            {brl(sobra)}
          </Rotulo>
          <Numero $tamanho="grande" $acento>
            {empate}
          </Numero>
          <p className="leitura">
            procedimento{empate > 1 ? "s" : ""} no semestre inteiro pagam a
            assessoria, a plataforma e a verba de anúncio dos {economia.meses}{" "}
            meses.
          </p>
        </Veredito>

        <Fecho>
          {ritmo} {conta.fechoMecanica}
        </Fecho>
      </Coluna>
    </Dobra>
  );
}
