import { useRef } from "react";
import styled from "styled-components";
import { H2, Inner, Lead, Media, Section, Selo } from "../../../estilo/ds";
import { Etapas, Filtro, Mostrador, Sinal, TimeFora } from "../grafismos";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";

/**
 * O que entregamos.
 *
 * Vem depois das rupturas e do método de propósito: a essa altura a
 * pessoa já sabe o que está quebrado e como a Toka pensa, então a lista
 * de produtos lê como resposta, e não como cardápio de agência.
 *
 * É a segunda ilha de navy da página. Serve como respiro escuro no meio
 * de quatro dobras claras seguidas e marca que aqui começa o "o que você
 * contrata", separado do "como a gente pensa".
 */

const ENTREGAS = [
  {
    numero: "01",
    nome: "Terceirização comercial",
    texto: "Um time comercial inteiro operando para você, sem contratar ninguém.",
    Arte: TimeFora,
  },
  {
    numero: "02",
    nome: "Geração de demanda de alto ticket",
    texto: "Mídia desenhada para atrair quem paga o preço cheio.",
    Arte: Filtro,
  },
  {
    numero: "03",
    nome: "Estruturação comercial",
    texto:
      "Organização do atendimento: onde cada paciente está, quem responde e o que dizer.",
    Arte: Etapas,
  },
  {
    numero: "04",
    nome: "Gestão comercial",
    texto: "Consultoria contínua sobre o time que você já tem.",
    Arte: Mostrador,
  },
  {
    numero: "05",
    nome: "Marketing",
    texto: "Posicionamento e marca sustentando o preço antes da conversa.",
    Arte: Sinal,
  },
];

const Lista = styled.div`
  margin-top: 68px;
  border-top: 1px solid var(--linha);
`;

const Entrega = styled.div`
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr) minmax(0, 1fr) 120px;
  align-items: center;
  gap: 0 36px;
  padding: 34px 0;
  border-bottom: 1px solid var(--linha);
  transition: opacity 300ms ease;

  .numero {
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.16em;
    color: var(--tinta-fraca);
  }

  .nome {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.6rem, 2.5vw, 2.05rem);
    font-weight: 400;
    line-height: 1.16;
    color: var(--tinta);
    margin: 0;
  }

  .texto {
    font-size: 0.98rem;
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
    grid-template-columns: 54px minmax(0, 1fr) minmax(0, 1fr);

    svg {
      display: none;
    }
  }

  ${Media.Tablet} {
    grid-template-columns: 46px 1fr;
    gap: 0 20px;
    align-items: baseline;

    .texto {
      grid-column: 2;
      margin-top: 12px;
    }
  }

  ${Media.PhoneLarge} {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 30px 0;

    .numero {
      margin-bottom: 12px;
    }

    .texto {
      grid-column: 1;
    }

    /* O desenho volta no telemóvel, acima do nome da entrega. */
    svg {
      display: block;
      justify-self: start;
      order: -1;
      width: 104px;
      height: auto;
      margin-bottom: 6px;
      opacity: 0.85;
    }
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
          Cinco frentes. O desenho é <em>sob medida</em>.
        </H2>
        <Lead ref={guardar(2)}>
          Você não precisa saber o que está faltando. O diagnóstico aponta, e a
          gente monta só o que a sua operação precisa.
        </Lead>

        <Lista>
          {ENTREGAS.map((e, i) => (
            <Entrega key={e.numero} ref={guardar(3 + i)}>
              <span className="numero">{e.numero}</span>
              <p className="nome">{e.nome}</p>
              <p className="texto">{e.texto}</p>
              <e.Arte />
            </Entrega>
          ))}
        </Lista>
      </Inner>
    </Section>
  );
}
