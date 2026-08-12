import { useRef } from "react";
import styled from "styled-components";
import { gsap, useContextoGsap, useMenosMovimento } from "./animacao";

/**
 * A cor do fundo responde à narrativa.
 *
 * Um gradiente fixo trata todos os momentos da página como iguais, e
 * eles não são: o trecho em que a pessoa reconhece a própria confusão
 * deveria pesar diferente do trecho em que o Habitat se fecha. Esta
 * camada muda de temperatura conforme a rolagem, e é o que dá à página
 * a sensação de ser levada a lugares diferentes em vez de rolar dentro
 * de um lugar só.
 *
 * São três véus sobrepostos, todos `position: fixed`, cada um com sua
 * própria opacidade animada:
 *
 *   frio      → o desconforto do diagnóstico, um vermelho baixo
 *   dourado   → o Habitat se formando, brilho contido crescendo
 *   fecho     → a prova e o convite, o dourado assentado
 *
 * Fixos e sem imagem: nenhum download, e nenhum repaint de layout —
 * só opacidade, que a GPU compõe sozinha.
 */

const Camada = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  div {
    position: absolute;
    inset: 0;
    opacity: 0;
  }

  .frio {
    background: radial-gradient(
        90% 60% at 20% 78%,
        rgba(233, 150, 122, 0.14),
        transparent 62%
      ),
      radial-gradient(
        70% 50% at 85% 20%,
        rgba(120, 130, 190, 0.12),
        transparent 60%
      );
  }

  .dourado {
    background: radial-gradient(
        80% 55% at 50% 45%,
        rgba(224, 182, 90, 0.16),
        transparent 65%
      ),
      radial-gradient(
        60% 40% at 15% 15%,
        rgba(224, 182, 90, 0.08),
        transparent 60%
      );
  }

  .fecho {
    background: radial-gradient(
      100% 70% at 80% 90%,
      rgba(224, 182, 90, 0.12),
      transparent 68%
    );
  }
`;

export default function Atmosfera() {
  const menosMovimento = useMenosMovimento();
  const frioRef = useRef(null);
  const douradoRef = useRef(null);
  const fechoRef = useRef(null);

  const escopo = useContextoGsap(() => {
    // Sem movimento, a atmosfera fica num tom só: um fundo que muda de
    // cor enquanto a pessoa rola é justamente o tipo de movimento
    // ambiente que incomoda quem pediu para reduzi-lo.
    if (menosMovimento) {
      gsap.set([frioRef.current, douradoRef.current], { opacity: 0 });
      gsap.set(fechoRef.current, { opacity: 0.5 });
      return;
    }

    const alvo = document.documentElement;

    /** Liga a opacidade de um véu a uma faixa da página inteira, em %. */
    const veu = (ref, deQuando, ateQuando, pico) => {
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        {
          opacity: pico,
          ease: "none",
          scrollTrigger: {
            trigger: alvo,
            start: `${deQuando}% top`,
            end: `${ateQuando}% top`,
            scrub: 1,
          },
        }
      );
    };

    // O frio entra no diagnóstico e se apaga na virada. Ele é o
    // desconforto, e desconforto que não passa vira ruído.
    gsap.fromTo(
      frioRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        keyframes: {
          "0%": { opacity: 0 },
          "25%": { opacity: 1 },
          "70%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        scrollTrigger: {
          trigger: alvo,
          start: "3% top",
          end: "32% top",
          scrub: 1,
        },
      }
    );

    veu(douradoRef, 30, 55, 1);
    veu(fechoRef, 62, 88, 1);

  }, [menosMovimento]);

  return (
    <Camada ref={escopo} aria-hidden="true">
      <div className="frio" ref={frioRef} />
      <div className="dourado" ref={douradoRef} />
      <div className="fecho" ref={fechoRef} />
    </Camada>
  );
}
