import { useRef } from "react";
import styled from "styled-components";
import { H2, Inner, Lead, Media, Section, Selo } from "../../../estilo/ds";
import { Etapas, Filtro, Mostrador, Sinal, TimeFora } from "../../inicio/grafismos";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";

/**
 * O que entregamos, encaixado no momento que cada coisa sustenta.
 *
 * As cinco entregas são as mesmas da home em `/`. O que mudou é que lá
 * elas viviam lado a lado, numeradas de 01 a 05, e isso é um cardápio —
 * exatamente o que dá razão a quem responde "quem faz tudo não faz nada
 * bem feito". Aqui cada uma aparece embaixo do momento que ela resolve,
 * então a lista deixa de ser prova de tamanho e vira resposta a um
 * problema que a dobra anterior já nomeou.
 *
 * O desequilíbrio é de propósito e é honesto: "ser escolhido" carrega
 * três das cinco entregas porque o comercial é onde a casa é mais forte.
 *
 * É a segunda ilha de navy da página. Serve como respiro escuro no meio
 * de dobras claras seguidas e marca que aqui começa o "o que você
 * contrata", separado do "como a gente pensa".
 */

const GRUPOS = [
  {
    numero: "01",
    momento: "Ser encontrado",
    entregas: [
      {
        nome: "Geração de demanda de alto ticket",
        texto: "Mídia desenhada para atrair quem paga o preço cheio.",
        Arte: Filtro,
      },
    ],
  },
  {
    numero: "02",
    momento: "Ser entendido",
    entregas: [
      {
        nome: "Marketing",
        texto: "Posicionamento e marca sustentando o preço antes da conversa.",
        Arte: Sinal,
      },
    ],
  },
  {
    numero: "03",
    momento: "Ser escolhido",
    entregas: [
      {
        nome: "Terceirização comercial",
        texto:
          "Um time comercial inteiro operando para você, sem contratar ninguém.",
        Arte: TimeFora,
      },
      {
        nome: "Estruturação comercial",
        texto:
          "Organização do atendimento: onde cada paciente está, quem responde e o que dizer.",
        Arte: Etapas,
      },
      {
        nome: "Gestão comercial",
        texto: "Consultoria contínua sobre o time que você já tem.",
        Arte: Mostrador,
      },
    ],
  },
];

const Lista = styled.div`
  margin-top: 68px;
  border-top: 1px solid var(--linha);
`;

/**
 * O momento é o cabeçalho da faixa e as entregas moram dentro dele. A
 * hierarquia visual precisa dizer isso sozinha: o nome do momento é
 * serifado e grande, o da entrega é sans e menor. Se os dois tiverem o
 * mesmo peso, a dobra volta a ler como lista de cinco.
 */
const Grupo = styled.div`
  padding: 40px 0;
  border-bottom: 1px solid var(--linha);

  .cabeca {
    display: grid;
    grid-template-columns: 54px minmax(0, 1fr);
    align-items: baseline;
    gap: 0 36px;
  }

  .numero {
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.16em;
    color: var(--tinta-fraca);
  }

  .momento {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.7rem, 2.7vw, 2.25rem);
    font-weight: 400;
    line-height: 1.14;
    color: var(--tinta);
    margin: 0;
  }

  ${Media.Tablet} {
    .cabeca {
      grid-template-columns: 46px 1fr;
      gap: 0 20px;
    }
  }

  ${Media.PhoneLarge} {
    padding: 32px 0;

    .cabeca {
      grid-template-columns: 1fr;
      gap: 10px 0;
    }
  }
`;

/**
 * Recuada na mesma medida da coluna do número, para a entrega ficar
 * visivelmente pendurada no momento e não ao lado dele.
 */
const Entrega = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 120px;
  align-items: center;
  gap: 0 36px;
  margin: 26px 0 0 90px;

  .nome {
    font-family: "Poppins", sans-serif;
    font-size: 0.98rem;
    font-weight: 500;
    line-height: 1.35;
    color: var(--tinta);
    margin: 0;
  }

  .texto {
    font-size: 0.94rem;
    line-height: 1.6;
    color: var(--tinta-fraca);
    margin: 0;
  }

  svg {
    /* Sobre navy a tinta do corpo já aparece; a opacidade só tira o peso
       para o desenho não brigar com o nome da entrega. */
    color: var(--tinta-corpo);
    opacity: 0.72;
    justify-self: end;
  }

  ${Media.Desktop} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

    svg {
      display: none;
    }
  }

  ${Media.Tablet} {
    grid-template-columns: 1fr;
    gap: 8px 0;
    margin-left: 66px;
  }

  ${Media.PhoneLarge} {
    margin-left: 0;
    margin-top: 22px;
    padding-left: 16px;
    border-left: 1px solid var(--linha);
  }
`;

export default function Entregas() {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, { menosMovimento, folga: 32, distancia: 34 });

  const guardar = (i) => (el) => (pecas.current[i] = el);

  return (
    <Section id="entregas" className="faixa-escura" ref={escopo}>
      <Inner>
        <Selo ref={guardar(0)}>O que entregamos</Selo>
        <H2 ref={guardar(1)}>
          A gente faz tudo. Mas não é <em>tudo</em> que você precisa.
        </H2>
        <Lead ref={guardar(2)}>
          Você não precisa saber o que está faltando. O diagnóstico aponta qual
          dos três momentos está quebrado, e a gente monta só o que a sua
          operação precisa.
        </Lead>

        <Lista>
          {GRUPOS.map((g, i) => (
            <Grupo key={g.numero} ref={guardar(3 + i)}>
              <div className="cabeca">
                <span className="numero">{g.numero}</span>
                <p className="momento">{g.momento}</p>
              </div>

              {/* `<e.Arte />`, e não uma variável desestruturada: a config
                  de eslint do projeto não carrega `react/jsx-uses-vars`, e
                  um componente usado só dentro do JSX seria acusado como
                  variável morta. */}
              {g.entregas.map((e) => (
                <Entrega key={e.nome}>
                  <p className="nome">{e.nome}</p>
                  <p className="texto">{e.texto}</p>
                  <e.Arte />
                </Entrega>
              ))}
            </Grupo>
          ))}
        </Lista>
      </Inner>
    </Section>
  );
}
