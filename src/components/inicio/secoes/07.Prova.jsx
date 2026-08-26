import { useRef } from "react";
import styled from "styled-components";
import { H2, Inner, Lead, Media, Section, Selo } from "../../../estilo/ds";
import { Agenda, Estabiliza } from "../grafismos";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";

/**
 * Prova e resultado.
 *
 * Aqui não entra número nenhum, e não é só por causa do CFM: os números
 * da casa (quanto a Toka já gerou, há quantos anos opera) puxavam a
 * leitura para o passado dela justo na dobra que precisa falar do futuro
 * da clínica dele. O que ficou é o que passa a existir na operação,
 * escrito em frase grande, uma por linha.
 *
 * A nota de rodapé é curta e não é jurídica por acaso: é ela que impede
 * que estas cinco frases sejam lidas como promessa de desempenho.
 */

const GANHOS = [
  { numero: "01", frase: ["Mais previsibilidade", "na entrada."], Arte: Estabiliza },
  { numero: "02", frase: ["Mais consistência", "na agenda."], Arte: Agenda },
  { numero: "03", frase: ["Mais clareza no custo", "por procedimento."] },
  { numero: "04", frase: ["Mais autonomia", "da equipe."] },
  { numero: "05", frase: ["Mais decisão", "por dado."] },
];

const Lista = styled.div`
  margin-top: 70px;
  border-top: 1px solid var(--linha);
`;

const Ganho = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 30px 0;
  border-bottom: 1px solid var(--linha);

  p {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.7rem, 3.2vw, 2.6rem);
    font-weight: 400;
    line-height: 1.14;
    color: var(--tinta);
    margin: 0;
    max-width: 18ch;
  }

  .numero {
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    color: var(--tinta-fraca);
    padding-top: 10px;
    flex: none;
  }

  /* Só dois dos cinco ganham desenho, de propósito: com os cinco, a
     dobra viraria catálogo de ícone e perderia o ar limpo. */
  .arte {
    margin-left: auto;
    margin-right: 40px;
    color: var(--tinta-corpo);
    opacity: 0.7;
    flex: none;
  }

  ${Media.Tablet} {
    .arte {
      display: none;
    }
  }

  ${Media.PhoneLarge} {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 10px;

    .numero {
      padding-top: 0;
    }

    /* Aqui o desenho volta como fecho do item, e não como coluna: em
       tela estreita ele fica sob a frase, alinhado à esquerda. */
    .arte {
      display: block;
      order: 3;
      margin: 4px 0 0;

      svg {
        width: 104px;
        height: auto;
      }
    }
  }
`;

const Nota = styled.p`
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--tinta-fraca);
  margin: 40px 0 0;
  max-width: 56ch;

  ${Media.PhoneLarge} {
    margin-top: 30px;
  }
`;

export default function Prova() {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, { menosMovimento, folga: 32, distancia: 34 });

  const guardar = (i) => (el) => (pecas.current[i] = el);

  return (
    <Section id="resultados" className="faixa-clara" ref={escopo}>
      <Inner>
        <Selo ref={guardar(0)}>Prova e resultado</Selo>
        <H2 ref={guardar(1)}>
          Resultado é quando a operação <em>responde sozinha</em>.
        </H2>
        <Lead ref={guardar(2)}>
          Não vamos prometer número. Vamos dizer o que passa a existir na sua
          clínica quando o método entra.
        </Lead>

        <Lista>
          {GANHOS.map((g, i) => (
            <Ganho key={g.numero} ref={guardar(3 + i)}>
              <p>
                {g.frase[0]}
                <br />
                {g.frase[1]}
              </p>
              {g.Arte ? (
                <div className="arte">
                  <g.Arte />
                </div>
              ) : null}
              <span className="numero">{g.numero}</span>
            </Ganho>
          ))}
        </Lista>

        <Nota ref={guardar(8)}>
          O que cada clínica alcança depende de mercado, procedimento, verba e
          execução. Não prometemos número. Prometemos método e transparência.
        </Nota>
      </Inner>
    </Section>
  );
}
