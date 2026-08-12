import { useRef } from "react";
import styled from "styled-components";
import { Inner, Media } from "../style";
import Legenda, { CaixaDeLegendas } from "../Legenda";
import {
  EASE,
  alturaDaCena,
  gatilhoDeCena,
  gsap,
  useContextoGsap,
  useMenosMovimento,
} from "../animacao";

/**
 * Dobra 6. Escassez com motivo.
 *
 * Urgência sem motivo soa a truque, e em B2B o médico fareja truque de
 * longe. Aqui a exclusividade é explicada pela mecânica da oferta, uma
 * frase por vez, e a última é a que fecha.
 *
 * O `id="fio-contrai"` é a marca que `FioCondutor.jsx` procura para
 * afinar o traço enquanto esta seção atravessa a tela.
 */

const FRASES = [
  { texto: "O mesmo Habitat montado para você e para o seu concorrente." },
  { texto: "Os dois disputando o mesmo paciente, com a mesma estratégia." },
  { texto: "O custo de aquisição sobe para ambos, e ninguém ganha.", peso: "virada" },
  { texto: "Por isso é exclusividade regional por especialidade." },
  {
    texto: "Quando uma região fecha, ela sai da lista.",
    peso: "marca",
  },
];

const CenaAlta = styled.section`
  position: relative;
  height: ${(p) => (p.$estatico ? "auto" : alturaDaCena(FRASES.length + 1, 32))};
  z-index: 1;

  ${Media.TabletSmall} {
    height: ${(p) => (p.$estatico ? "auto" : alturaDaCena(FRASES.length + 1, 28))};
  }
`;

const Palco = styled.div`
  position: ${(p) => (p.$estatico ? "static" : "sticky")};
  top: 0;
  min-height: ${(p) => (p.$estatico ? "0" : "100dvh")};
  display: flex;
  align-items: center;
  padding: ${(p) => (p.$estatico ? "var(--respiro) 0" : "0")};
  overflow: hidden;
`;

const Bloco = styled.div`
  max-width: 46rem;
  position: relative;
`;

const Titulo = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: clamp(1.7rem, 3.6vw, 2.7rem);
  font-weight: 600;
  line-height: 1.14;
  letter-spacing: -0.025em;
  color: var(--white);
  margin: 0 0 40px;
`;

export default function Exclusividade() {
  const menosMovimento = useMenosMovimento();
  const cenaAltaRef = useRef(null);
  const tituloRef = useRef(null);
  const frasesRefs = useRef([]);

  const escopo = useContextoGsap(() => {
    if (menosMovimento || !cenaAltaRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: gatilhoDeCena(cenaAltaRef.current, 0.5),
    });

    tl.fromTo(
      tituloRef.current,
      { opacity: 0, y: 26, filter: "blur(7px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4 },
      0
    );

    // Cruzamento, não sequência: a frase sai no mesmo instante em que a
    // seguinte entra. Deixar um vão entre as duas é o que faz a tela
    // parecer vazia no meio da rolagem.
    frasesRefs.current.filter(Boolean).forEach((frase, i) => {
      const t = 0.7 + i;
      tl.fromTo(
        frase,
        { opacity: 0, y: 30, filter: "blur(9px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3 },
        t
      );
      if (i < FRASES.length - 1) {
        tl.to(
          frase,
          { opacity: 0, y: -26, filter: "blur(9px)", duration: 0.3 },
          t + 1
        );
      }
    });

  }, [menosMovimento]);

  return (
    <CenaAlta ref={cenaAltaRef} $estatico={menosMovimento} id="fio-contrai">
      <Palco ref={escopo} $estatico={menosMovimento}>
        <Inner>
          <Bloco>
            <Titulo ref={tituloRef}>Uma clínica por região.</Titulo>

            <CaixaDeLegendas $estatico={menosMovimento}>
              {FRASES.map((frase, i) => (
                <Legenda
                  key={frase.texto}
                  peso={frase.peso}
                  estatico={menosMovimento}
                  ref={(el) => {
                    frasesRefs.current[i] = el;
                  }}
                >
                  {frase.texto}
                </Legenda>
              ))}
            </CaixaDeLegendas>
          </Bloco>
        </Inner>
      </Palco>
    </CenaAlta>
  );
}
