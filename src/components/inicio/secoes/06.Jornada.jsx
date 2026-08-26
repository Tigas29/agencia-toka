import { useRef } from "react";
import styled from "styled-components";
import { H2, Inner, Media, Section, Selo } from "../style";
import { useMenosMovimento, useRevelacaoPorScroll } from "../../habitat/animacao";

/**
 * A jornada, da presença digital à agenda cheia.
 *
 * O método (dobra 4) diz como a Toka pensa; esta diz o que acontece na
 * clínica, mês a mês, na ordem em que acontece. São coisas diferentes e
 * por isso o desenho é diferente: lá é uma lista com painel, aqui é uma
 * trilha vertical com um fio contínuo ligando os cinco momentos.
 *
 * O fio é um `::before` da lista inteira, e não um pedaço por item: em
 * item a item, cada borda acaba e recomeça, e o olho enxerga cinco
 * traços em vez de um caminho.
 */

const MOMENTOS = [
  {
    numero: "01",
    nome: "Diagnóstico",
    texto: "Onde a operação está: oferta, público, canais e quem conduz cada conversa.",
  },
  {
    numero: "02",
    nome: "Posicionamento",
    texto: "A marca passa a sustentar o preço antes de a conversa chegar no valor.",
  },
  {
    numero: "03",
    nome: "Demanda",
    texto: "A verba entra concentrada e o paciente certo começa a chegar com origem conhecida.",
  },
  {
    numero: "04",
    nome: "Conversão",
    texto:
      "Organização, cadência e time treinado transformam interesse em procedimento marcado.",
  },
  {
    numero: "05",
    nome: "Evolução",
    texto: "O painel mostra o que anda. A verba segue o dado, e o ciclo recomeça mais forte.",
  },
];

const Cabeca = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 0 70px;
  align-items: end;

  p {
    font-size: 1rem;
    line-height: 1.62;
    color: var(--tinta-fraca);
    margin: 0 0 8px;
  }

  ${Media.Tablet} {
    grid-template-columns: 1fr;
    gap: 22px;

    p {
      margin-bottom: 0;
    }
  }
`;

const Trilha = styled.ol`
  list-style: none;
  margin: 76px 0 0;
  padding: 0 0 0 46px;
  position: relative;

  /* O fio percorre a lista inteira, de uma ponta à outra. */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 12px;
    bottom: 12px;
    width: 1px;
    background: var(--linha);
  }

  /* No telemóvel a trilha inteira sai de cena.
     Com 22px de margem da página, o fio e os marcos ficavam colados na
     borda esquerda e ainda empurravam o texto contra a direita: as duas
     margens ficavam desiguais e o bloco lia como se estivesse saindo da
     tela. Sem a trilha, a numeração de cada momento já dá a sequência. */
  ${Media.PhoneLarge} {
    padding-left: 0;

    &::before {
      display: none;
    }
  }
`;

const Momento = styled.li`
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr) minmax(0, 1.15fr);
  align-items: baseline;
  gap: 0 40px;
  padding: 32px 0;
  border-bottom: 1px solid var(--linha);
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  /* O ponto que ancora o momento no fio. */
  &::before {
    content: "";
    position: absolute;
    left: -50px;
    top: 42px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--fundo);
    border: 1px solid var(--acento);
  }

  .numero {
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    color: var(--tinta-fraca);
  }

  .nome {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(1.55rem, 2.4vw, 2rem);
    font-weight: 300;
    color: var(--tinta);
    margin: 0;
  }

  .texto {
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--tinta-fraca);
    margin: 0;
  }

  ${Media.Tablet} {
    grid-template-columns: 46px 1fr;
    gap: 0 18px;

    .texto {
      grid-column: 2;
      margin-top: 10px;
    }
  }

  ${Media.PhoneLarge} {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 28px 0;

    &::before {
      display: none;
    }

    .numero {
      display: block;
      margin-bottom: 10px;
    }

    .texto {
      grid-column: 1;
      margin-top: 10px;
    }
  }
`;

export default function Jornada() {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);
  const escopo = useRevelacaoPorScroll(pecas, { menosMovimento, folga: 34, distancia: 34 });

  const guardar = (i) => (el) => (pecas.current[i] = el);

  return (
    <Section id="jornada" className="faixa-clara" ref={escopo}>
      <Inner>
        <Selo ref={guardar(0)}>A jornada</Selo>
        <Cabeca>
          <H2 ref={guardar(1)}>
            Da presença digital à <em>agenda cheia</em>.
          </H2>
          <p ref={guardar(2)}>
            Cinco momentos que transformam autoridade dispersa em uma operação
            que responde, conduz e evolui.
          </p>
        </Cabeca>

        <Trilha>
          {MOMENTOS.map((m, i) => (
            <Momento key={m.numero} ref={guardar(3 + i)}>
              <span className="numero">{m.numero}</span>
              <p className="nome">{m.nome}</p>
              <p className="texto">{m.texto}</p>
            </Momento>
          ))}
        </Trilha>
      </Inner>
    </Section>
  );
}
