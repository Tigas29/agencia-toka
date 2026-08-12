import { useRef } from "react";
import styled from "styled-components";
import {
  Bullets,
  Fecho,
  H2,
  Inner,
  Numeral,
  SectionTela,
} from "../style";
import {
  EASE,
  gsap,
  useContextoGsap,
  useMenosMovimento,
  useParallaxNumeral,
} from "../animacao";

/**
 * Dobra 6 (arquivo `07.Exclusividade.jsx`). Escassez com motivo.
 * Urgência sem motivo soa a truque, e em B2B o médico fareja truque de
 * longe. Aqui a exclusividade é explicada pela mecânica da oferta: o
 * mesmo habitat montado para dois concorrentes da mesma região anula os
 * dois.
 *
 * O `id="fio-contrai"` é a marca que `FioCondutor.jsx` procura para
 * afinar o traço enquanto esta seção atravessa a tela — o fio literalmente
 * aperta a cintura no trecho que fala em "uma clínica por região".
 */

/** Sem faixa nem borda: o fundo contínuo da página atravessa aqui. */
const Faixa = styled(SectionTela)`
  padding: var(--respiro-curto) 0;
`;

const Bloco = styled.div`
  max-width: 44rem;
  position: relative;
`;

export default function Exclusividade() {
  const menosMovimento = useMenosMovimento();
  const numeralRef = useRef(null);
  const itensRef = useRef([]);

  useParallaxNumeral(numeralRef, menosMovimento);

  const escopo = useContextoGsap(() => {
    if (menosMovimento) return;

    // Ritmo dado pela rolagem, como no resto da página.
    gsap.fromTo(
      itensRef.current.filter(Boolean),
      { opacity: 0, y: 18 },
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
    <Faixa ref={escopo} id="fio-contrai">
      <Inner>
        <Bloco>
          <Numeral ref={numeralRef}>06</Numeral>

          <H2 ref={registrar(0)}>Uma clínica por região.</H2>

          <Bullets>
            <li ref={registrar(1)}>
              O mesmo Habitat montado para você e para o concorrente da rua de
              cima <strong>anula os dois</strong>
            </li>
            <li ref={registrar(2)}>
              Vocês disputariam o mesmo paciente com a mesma estratégia, e o
              custo de aquisição subiria para ambos
            </li>
            <li ref={registrar(3)}>
              Por isso é exclusividade regional por especialidade, e não por
              cliente
            </li>
          </Bullets>

          <Fecho ref={registrar(4)}>
            Quando uma região fecha, ela sai da lista. Quem chegou antes ficou
            com&nbsp;ela.
          </Fecho>
        </Bloco>
      </Inner>
    </Faixa>
  );
}
