import { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { ScrollTrigger, gsap, useMenosMovimento } from "./animacao";
import { Media } from "./style";

/**
 * O fio dourado que atravessa a página inteira e se desenha conforme a
 * rolagem. É o que costura as dobras: sem ele, cada seção volta a ler
 * como um bloco isolado, que era exatamente o problema que a página
 * tinha antes desta reforma.
 *
 * `pathLength="1"` deixa o traço em unidades relativas: o dash funciona
 * igual não importa a altura real da página, que muda toda vez que uma
 * seção troca de conteúdo.
 *
 * O padrão aqui é o mesmo da cena central: o valor de repouso
 * (`strokeDashoffset="0"`, traço inteiro) é o que aparece sem nenhum
 * JavaScript. O GSAP, quando roda, "apaga" o traço de volta ao início
 * antes de desenhá-lo de novo pela rolagem — nunca o contrário.
 */
const Camada = styled.div`
  position: absolute;
  top: 0;
  left: 6%;
  width: 2px;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    overflow: visible;
  }

  ${Media.TabletSmall} {
    left: 5%;
  }
`;

export default function FioCondutor() {
  const menosMovimento = useMenosMovimento();
  const linhaRef = useRef(null);

  useLayoutEffect(() => {
    if (menosMovimento || !linhaRef.current) return undefined;

    const desenho = gsap.fromTo(
      linhaRef.current,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, ease: "none" }
    );

    const trilha = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      animation: desenho,
    });

    // A "cintura": o fio afina ao atravessar a seção de exclusividade,
    // marcando no traço a mesma ideia que o texto carrega ali, "uma
    // clínica por região". Só existe se a seção estiver montada.
    const marca = document.getElementById("fio-contrai");
    let cintura;
    if (marca) {
      cintura = gsap
        .timeline({
          scrollTrigger: {
            trigger: marca,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        })
        .fromTo(
          linhaRef.current,
          { strokeWidth: 2 },
          { strokeWidth: 0.6, ease: "none" }
        )
        .to(linhaRef.current, { strokeWidth: 2, ease: "none" });
    }

    return () => {
      trilha.kill();
      cintura?.scrollTrigger?.kill();
      cintura?.kill();
    };
  }, [menosMovimento]);

  return (
    <Camada aria-hidden="true">
      <svg viewBox="0 0 2 1000" preserveAspectRatio="none">
        <line
          ref={linhaRef}
          x1="1"
          y1="0"
          x2="1"
          y2="1000"
          stroke="var(--gold-linha)"
          strokeWidth="2"
          pathLength="1"
          strokeDasharray="1 1"
          strokeDashoffset="0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Camada>
  );
}
