import { useRef } from "react";
import styled from "styled-components";
import { H2, Inner, Lead, Media, Section, Selo } from "../style";
import { Cadencia, Caminho, Estrutura, Percepcao } from "../grafismos";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";

/**
 * O que a Toka resolve.
 *
 * Cada ruptura é um nome curto do problema com uma linha de explicação.
 *
 * Os quatro nomes dizem a mesma classe de coisa, e mesmo assim são
 * construídos diferente de propósito ("Falta de visibilidade",
 * "Posicionamento que...", "Atendimento sem...", "Decisão sem..."). A
 * versão anterior repetia a fórmula "Não falta X. Falta Y." quatro vezes
 * seguidas, e a atenção passava a ouvir o padrão em vez do conteúdo.
 * Quatro "Falta de X" cairiam no mesmo problema.
 *
 * Por isso aqui não se fala do que a Toka FAZ. O que ela faz vem depois,
 * na dobra de entregas: dizer a solução antes de a pessoa reconhecer o
 * problema é o que faz página de agência soar toda igual.
 */

const RUPTURAS = [
  {
    numero: "01",
    titulo: "Falta de visibilidade",
    texto:
      "A demanda pelo seu procedimento já existe. Ela chega primeiro em quem aparece na busca.",
    Arte: Caminho,
  },
  {
    numero: "02",
    titulo: "Posicionamento que não sustenta o preço",
    texto:
      "Sem ele, a conversa trava no valor e o ticket que você quer cobrar não para de pé.",
    Arte: Percepcao,
  },
  {
    numero: "03",
    titulo: "Atendimento sem cadência",
    texto:
      "O paciente chega quente, aguarda resposta e marca com outro. Ninguém errou, e ele foi embora.",
    Arte: Cadencia,
  },
  {
    numero: "04",
    titulo: "Decisão sem dado",
    texto:
      "Sem número confiável, a verba segue palpite e ninguém sabe o que valeu a pena repetir.",
    Arte: Estrutura,
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
const Ruptura = styled.div`
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
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(1.6rem, 2.6vw, 2.15rem);
    font-weight: 300;
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
  /* No telemóvel o desenho volta, menor, dividindo a primeira linha com
     o número. Ele tinha sumido junto com a coluna que o abrigava, e é
     justamente no telemóvel que a explicação visual mais ajuda: a tela
     é estreita e o texto precisa ser curto. */
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

export default function Resolve() {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, { menosMovimento, folga: 34, distancia: 34 });

  const guardar = (i) => (el) => (pecas.current[i] = el);

  return (
    <Section id="resolve" className="faixa-clara" ref={escopo}>
      <Inner>
        <Selo ref={guardar(0)}>O que resolvemos</Selo>
        <H2 ref={guardar(1)}>
          O que trava uma operação na área da saúde <em>quase nunca</em> é o que
          parece.
        </H2>
        <Lead ref={guardar(2)}>
          Quatro rupturas aparecem em quase toda operação que cresceu por
          indicação, volume e esforço, sem estrutura por trás.
        </Lead>

        <Lista>
          {/* `<r.Arte />`, e não uma variável desestruturada: a config de
              eslint do projeto não carrega `react/jsx-uses-vars`, então um
              componente usado só dentro do JSX é acusado como variável
              morta. Acessar pelo objeto mantém o lint limpo sem mexer na
              configuração de um repo que também serve as LPs antigas. */}
          {RUPTURAS.map((r, i) => (
            <Ruptura key={r.numero} ref={guardar(3 + i)}>
              <span className="numero">{r.numero}</span>
              <p className="titulo">{r.titulo}</p>
              <p className="apoio">{r.texto}</p>
              <r.Arte />
            </Ruptura>
          ))}
        </Lista>
      </Inner>
    </Section>
  );
}
