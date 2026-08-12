import { useRef } from "react";
import styled from "styled-components";
import {
  Bullets,
  Cta,
  Fecho,
  Inner,
  Media,
  Microcopy,
  Numeral,
  SectionTela,
} from "../style";
import { Seta } from "../icones";
import {
  EASE,
  gsap,
  useContextoGsap,
  useMenosMovimento,
  useParallaxNumeral,
} from "../animacao";

/**
 * Dobra 3 (antigo `04.Risco.jsx` — o nome do arquivo ficou, a posição na
 * página mudou depois da fusão de `02.Cena.jsx`). O bloco mais curto da
 * página, e o de maior contraste, porque é o que quebra a objeção
 * "mais uma promessa". Vem depois do mecanismo, de propósito: primeiro
 * a pessoa entende o que é, depois descobre que quem oferece topa ser
 * pago por ele.
 */

/**
 * Sem faixa e sem borda. Uma linha de corte horizontal aqui devolveria à
 * página exatamente o que a reforma veio tirar: o olho encontra o limite
 * e conclui "acabou uma coisa, começou outra", e a narrativa contínua
 * vira de novo uma pilha de blocos. O destaque deste momento vem de um
 * halo dourado que nasce e morre dentro da própria seção, sem tocar as
 * vizinhas.
 */
const Faixa = styled(SectionTela)`
  padding: var(--respiro-curto) 0;
  background: radial-gradient(
    70% 100% at 12% 0%,
    rgba(224, 182, 90, 0.09),
    transparent 72%
  );
`;

const Bloco = styled.div`
  max-width: 46rem;
  position: relative;

  h2 {
    font-family: "Poppins", sans-serif;
    font-size: clamp(1.6rem, 3.2vw, 2.35rem);
    font-weight: 600;
    line-height: 1.16;
    letter-spacing: -0.02em;
    color: var(--white);
    margin: 0 0 22px;
  }

  p {
    font-size: 1.02rem;
    color: var(--off-white);
    margin: 0 0 16px;
  }

  .fecho {
    color: var(--gold);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
  }

  .acao {
    margin-top: 30px;
  }

  ${Media.PhoneLarge} {
    p {
      font-size: 0.98rem;
    }
  }
`;

export default function Risco({ aoClicar }) {
  const menosMovimento = useMenosMovimento();
  const numeralRef = useRef(null);
  const itensRef = useRef([]);

  useParallaxNumeral(numeralRef, menosMovimento);

  const escopo = useContextoGsap(() => {
    if (menosMovimento) return;

    // Amarrado à rolagem, não ao relógio: cada peça entra conforme a
    // pessoa rola, e parar de rolar congela a revelação. É o que
    // diferencia ler rolando de parar para ler.
    gsap.fromTo(
      itensRef.current.filter(Boolean),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        duration: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: escopo.current,
          start: "top 72%",
          end: "bottom 62%",
          scrub: 0.5,
        },
      }
    );

  }, [menosMovimento]);

  const registrar = (i) => (el) => {
    itensRef.current[i] = el;
  };

  return (
    <Faixa ref={escopo}>
      <Inner>
        <Bloco>
          <Numeral ref={numeralRef}>03</Numeral>

          <h2 ref={registrar(0)}>
            Se a sua clínica não crescer, nós não&nbsp;ganhamos.
          </h2>

          <p ref={registrar(1)}>
            Toda agência promete resultado. Poucas topam ser pagas por ele.
          </p>

          <Bullets>
            <li ref={registrar(2)}>
              A nossa remuneração é atrelada ao seu crescimento
            </li>
            <li ref={registrar(3)}>
              Tudo que não vira procedimento sai da mesa por conta própria
            </li>
            <li ref={registrar(4)}>
              Você não paga para testar, você paga pelo que funcionou
            </li>
          </Bullets>

          <Fecho ref={registrar(5)}>
            Antes de existir resultado, a única prova que vale é onde a agência
            coloca o próprio&nbsp;dinheiro.
          </Fecho>

          <div className="acao" ref={registrar(6)}>
            <Cta onClick={aoClicar}>
              Quero entender o modelo
              <Seta />
            </Cta>
            <Microcopy>
              Conversa direta, sem proposta genérica de gaveta.
            </Microcopy>
          </div>
        </Bloco>
      </Inner>
    </Faixa>
  );
}
