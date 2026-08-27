import { useRef } from "react";
import styled from "styled-components";
import { H2, Inner, Lead, Media, Section, Selo } from "../../../estilo/ds";
import { Cadencia, Caminho, Estrutura, Percepcao } from "../../inicio/grafismos";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";

/**
 * Os três momentos em que o paciente decide.
 *
 * É a dobra que substitui a "O que resolvemos" da home em `/`. O
 * conteúdo dos problemas é quase o mesmo, e a diferença é o que eles
 * formam: lá eram quatro rupturas soltas, aqui são três etapas de uma
 * decisão única, na ordem em que ela acontece.
 *
 * O motivo é comercial, não estético. A objeção que uma assessoria com
 * escopo largo sempre leva é "quem faz tudo não faz nada bem feito", e
 * ela é justa quando o escopo se justifica por lista. Aqui o escopo se
 * justifica pelo caminho do paciente: são três pontos por onde ele passa
 * e o dinheiro vaza em qualquer um. É por isso que a página nunca diz
 * "ponta a ponta" — a frase levanta a objeção em vez de responder.
 *
 * O quarto item da versão anterior ("decisão sem dado") saiu da lista
 * numerada e virou o fechamento: dado não é um momento da decisão do
 * paciente, é o que permite saber qual dos três está quebrado.
 */

const MOMENTOS = [
  {
    numero: "01",
    titulo: "Ser encontrado",
    texto:
      "A demanda pelo seu procedimento já existe. Ela chega primeiro em quem aparece na busca.",
    Arte: Caminho,
  },
  {
    numero: "02",
    titulo: "Ser entendido",
    texto:
      "Se ele não entende o que você faz de diferente, a conversa trava no valor e o ticket que você quer cobrar não para de pé.",
    Arte: Percepcao,
  },
  {
    numero: "03",
    titulo: "Ser escolhido",
    texto:
      "O paciente chega quente, aguarda resposta e marca com outro. Ninguém errou, e ele foi embora.",
    Arte: Cadencia,
  },
];

const Lista = styled.div`
  margin-top: 74px;
  border-top: 1px solid var(--linha);
`;

/**
 * Quatro colunas de largura desigual: número, a frase que carrega o
 * argumento, o texto de apoio e o desenho. A frase ganha o dobro do
 * apoio porque é ela que a pessoa lê ao passar rolando.
 */
const Momento = styled.div`
  display: grid;
  grid-template-columns: 60px minmax(0, 1.15fr) minmax(0, 1fr) 128px;
  align-items: start;
  gap: 0 40px;
  padding: 42px 0;
  border-bottom: 1px solid var(--linha);

  .numero {
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.16em;
    color: var(--tinta-fraca);
    padding-top: 12px;
  }

  .titulo {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.6rem, 2.6vw, 2.15rem);
    font-weight: 400;
    line-height: 1.16;
    color: var(--tinta);
    margin: 0;
  }

  .apoio {
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--tinta-fraca);
    margin: 6px 0 0;
  }

  svg {
    /* A 0.55 sobre o creme o desenho praticamente sumia: a tinta fraca
       já é clara, e a opacidade em cima dela apagava o traço de 1px. */
    color: var(--tinta-corpo);
    opacity: 0.8;
    justify-self: end;
    margin-top: 4px;
  }

  ${Media.Desktop} {
    grid-template-columns: 52px minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 0 30px;

    svg {
      display: none;
    }
  }

  ${Media.Tablet} {
    grid-template-columns: 46px 1fr;
    gap: 0 20px;

    .apoio {
      grid-column: 2;
      margin-top: 14px;
    }
  }

  /* Coluna única: o número sai da lateral e vira uma linha própria em
     cima. Assim o texto usa a largura inteira e as duas margens ficam
     iguais. */
  ${Media.PhoneLarge} {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 34px 0;

    .numero {
      padding-top: 0;
      margin-bottom: 14px;
    }

    .apoio {
      grid-column: 1;
    }

    svg {
      display: block;
      justify-self: start;
      order: -1;
      width: 104px;
      height: auto;
      margin-bottom: 4px;
      opacity: 0.9;
    }
  }
`;

/**
 * O fechamento carrega a frase que sustenta o escopo inteiro da casa, e
 * por isso tem peso de título e não de parágrafo. O desenho fica à
 * direita, no mesmo lugar em que esteve nos três momentos acima, para a
 * linha ler como a quarta da lista sem ser numerada como tal.
 */
const Fecho = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr) 128px;
  align-items: center;
  gap: 0 40px;
  padding: 46px 0 0;

  .frase {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.7rem, 3vw, 2.5rem);
    font-weight: 400;
    line-height: 1.14;
    color: var(--tinta);
    margin: 0;

    em {
      font-style: normal;
      color: var(--acento);
    }
  }

  .apoio {
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--tinta-fraca);
    margin: 0;
  }

  svg {
    color: var(--tinta-corpo);
    opacity: 0.8;
    justify-self: end;
  }

  ${Media.Desktop} {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 0 30px;

    svg {
      display: none;
    }
  }

  ${Media.Tablet} {
    grid-template-columns: 1fr;
    gap: 18px 0;
  }

  ${Media.PhoneLarge} {
    padding-top: 34px;
  }
`;

export default function Framework() {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, { menosMovimento, folga: 34, distancia: 34 });

  const guardar = (i) => (el) => (pecas.current[i] = el);

  return (
    <Section id="resolve" className="faixa-clara" ref={escopo}>
      <Inner>
        <Selo ref={guardar(0)}>Como o paciente decide</Selo>
        <H2 ref={guardar(1)}>
          Entre não te conhecer e marcar com você, o paciente passa por{" "}
          <em>três momentos</em>.
        </H2>
        <Lead ref={guardar(2)}>
          Cada um deles decide sozinho se ele continua ou vai embora. Acertar
          dois não resolve.
        </Lead>

        <Lista>
          {/* `<m.Arte />`, e não uma variável desestruturada: a config de
              eslint do projeto não carrega `react/jsx-uses-vars`, então um
              componente usado só dentro do JSX é acusado como variável
              morta. Acessar pelo objeto mantém o lint limpo sem mexer na
              configuração de um repo que também serve as LPs antigas. */}
          {MOMENTOS.map((m, i) => (
            <Momento key={m.numero} ref={guardar(3 + i)}>
              <span className="numero">{m.numero}</span>
              <p className="titulo">{m.titulo}</p>
              <p className="apoio">{m.texto}</p>
              <m.Arte />
            </Momento>
          ))}

          <Fecho ref={guardar(3 + MOMENTOS.length)}>
            <p className="frase">
              Se um falha, os outros <em>não salvam</em>.
            </p>
            <p className="apoio">
              E descobrir qual dos três está quebrado é questão de número, não
              de opinião. Sem isso a verba segue palpite e ninguém sabe o que
              valeu a pena repetir.
            </p>
            <Estrutura />
          </Fecho>
        </Lista>
      </Inner>
    </Section>
  );
}
