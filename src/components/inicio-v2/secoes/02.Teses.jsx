import { useRef } from "react";
import styled from "styled-components";
import { Inner, Media, Onda, Section, Selo } from "../../../estilo/ds";
import { OndaFundo } from "../../inicio/grafismos";
import { gsap, useContextoGsap, useMenosMovimento } from "../../habitat/animacao";

/**
 * As quatro teses da v2. É a dobra que dá movimento à página.
 *
 * O que mudou em relação à home em `/`: caiu "Marketing não vende
 * consulta. Operação vende." Ela é boa de ouvir e brigava com o resto do
 * posicionamento, que põe a geração de demanda como o forte da casa.
 * Dizer que marketing não vende e em seguida vender marketing é a única
 * contradição de tese que a página tinha.
 *
 * A quarta tese planta os três momentos antes da dobra que os explica:
 * quando a pessoa chega lá, ela reconhece em vez de aprender.
 *
 * Só texto, de propósito. Ela chegou a ter um desenho por frase, e o
 * resultado foi redundante: a frase já é curta e concreta, e o desenho
 * ao lado repetia o que ela dizia sem acrescentar. Aqui o movimento é o
 * foco entrando (desfocado → nítido, com uma aproximação de 3%), e é
 * isso que faz o texto sozinho segurar a tela.
 *
 * Grafismo continua nas rupturas e nas entregas, onde o texto é curto e
 * o desenho carrega a explicação em vez de repeti-la.
 */

const TESES = [
  {
    linhas: ["O paciente não escolhe", "o melhor médico."],
  },
  {
    linhas: ["Escolhe o único que conseguiu", "explicar por que é melhor."],
  },
  {
    linhas: ["A demanda pelo seu procedimento", "já existe."],
  },
  {
    linhas: [
      "Ser encontrado, ser entendido, ser escolhido.",
      "Se um falha, os outros não salvam.",
    ],
  },
];

const Bloco = styled(Section)`
  padding-top: var(--respiro-curto);
  padding-bottom: var(--respiro-curto);
  overflow: hidden;
`;

const Tela = styled.div`
  /* dvh, não vh: no telemóvel a barra do navegador entra e sai, e com
     vh a dobra muda de altura no meio da rolagem. */
  min-height: 82dvh;
  display: flex;
  align-items: center;
  padding: 40px 0;

  /* Tela baixa (notebook de 13", janela dividida): a altura mínima
     empurraria a frase para fora do campo de visão. */
  @media (max-height: 720px) {
    min-height: 0;
    padding: 46px 0;
  }

  ${Media.TabletSmall} {
    min-height: 0;
    padding: 44px 0;
  }
`;

const Frase = styled.p`
  font-family: "EB Garamond", Georgia, serif;
  /* O piso de 1.9rem é o que impede a frase de estourar a caixa em
     telas de 320px, onde 6.2vw já não tem o que dar. */
  font-size: clamp(1.9rem, 6.2vw, 5rem);
  font-weight: 400;
  line-height: 1.06;
  letter-spacing: -0.01em;
  color: var(--tinta);
  /* Alinhada à esquerda, como o resto da página, e larga o bastante para
     não deixar meia tela vazia à direita. */
  margin: 0;
  max-width: 26ch;
  position: relative;
  z-index: 1;

  /* O estado de repouso é o desfocado. Quem entra sem JavaScript, ou
     antes de o GSAP montar, veria a frase ilegível, então o valor inicial
     mora no próprio componente e a animação só o desfaz. */
  filter: blur(9px);
  opacity: 0.2;

  em {
    font-style: normal;
    color: var(--acento);
  }

  ${Media.PhoneLarge} {
    max-width: 100%;
  }
`;

export default function Teses() {
  const menosMovimento = useMenosMovimento();
  const frasesRef = useRef([]);

  const escopo = useContextoGsap(() => {
    const frases = frasesRef.current.filter(Boolean);
    if (!frases.length) return;

    // Sem movimento, tudo nasce legível. Uma frase que só fica nítida se
    // a pessoa rolar é, para quem desligou animação, uma frase quebrada.
    if (menosMovimento) {
      gsap.set(frases, { filter: "blur(0px)", opacity: 1, scale: 1 });
      return;
    }

    frases.forEach((frase) => {
      gsap.fromTo(
        frase,
        { filter: "blur(9px)", opacity: 0.2, scale: 1.03 },
        {
          filter: "blur(0px)",
          opacity: 1,
          // A escala entra junto com o foco e é o que transforma
          // "apareceu" em "chegou perto". 3% é o teto: acima disso a
          // serifada fina começa a tremer durante a rolagem.
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: frase,
            // Começa quando a frase entra pela base e termina quando ela
            // chega ao meio da tela: a nitidez completa acontece no ponto
            // em que a pessoa naturalmente para para ler.
            start: "top 82%",
            end: "center 52%",
            scrub: 0.6,
          },
        }
      );
    });
  }, [menosMovimento]);

  return (
    <Bloco className="faixa-escura" ref={escopo}>
      <Onda>
        <OndaFundo />
      </Onda>

      <Inner>
        <Selo>No que acreditamos</Selo>

        {TESES.map((tese, i) => (
          <Tela key={tese.linhas[0]}>
            <Frase ref={(el) => (frasesRef.current[i] = el)}>
              {tese.linhas.map((linha, j) => (
                <span key={linha}>
                  {linha}
                  {j < tese.linhas.length - 1 ? <br /> : null}
                </span>
              ))}
            </Frase>
          </Tela>
        ))}
      </Inner>
    </Bloco>
  );
}
