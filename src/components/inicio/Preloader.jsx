import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { EASE, gsap, useMenosMovimento } from "../habitat/animacao";

/**
 * Cortina de abertura da home.
 *
 * Ela existe por dois motivos, nesta ordem: a primeira coisa que a
 * pessoa vê passa a ser a marca, e não um layout remontando enquanto as
 * fontes chegam. A página é longa e cheia de `ScrollTrigger`, então o
 * primeiro quadro sem a cortina é o pior quadro do site inteiro.
 *
 * Três regras de tempo que não podem quebrar:
 *
 *   piso   ~900ms  para a marca não piscar em conexão rápida
 *   teto   2200ms  a cortina NUNCA prende a página, mesmo se uma fonte
 *                  ou um asset travar. `document.fonts.ready` é uma
 *                  promessa que, em alguns navegadores, simplesmente não
 *                  resolve quando o Google Fonts falha.
 *   saída  520ms   fade e subida, com a página já montada por baixo
 *
 * Enquanto ela está na tela o `body` fica sem rolagem: a página por
 * baixo já existe, e deixar rolar por trás de uma cortina opaca faz a
 * pessoa chegar no meio da página sem ter visto o herói.
 */

const PISO_MS = 900;
const TETO_MS = 2200;
const SAIDA_MS = 520;

const pulsar = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
`;

const Wordmark = styled.p`
  /* O wordmark do logo da Toka é uma Garamond, e é essa a letra que a
     página inteira usa nos títulos. Escrever "TOKA" aqui em Garamond,
     em vez de carregar o PNG do logo, faz a cortina abrir com a própria
     assinatura da marca e não custa uma requisição. */
  font-family: "EB Garamond", Georgia, serif;
  font-size: clamp(2.6rem, 7vw, 3.6rem);
  font-weight: 400;
  letter-spacing: 0.26em;
  /* A entreletras empurra o texto para a direita e desalinha o centro
     óptico. O recuo devolve metade dela. */
  text-indent: 0.26em;
  color: #16203a;
  margin: 0;
  line-height: 1;
`;

const Cortina = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 26px;
  /* A cortina veste a cor da dobra que ela abre. O herói passou a ser
     papel claro, e uma cortina navy abrindo para creme dá um susto de
     meio segundo justo no primeiro contato com a marca. */
  background: #efede6;
  background-image: radial-gradient(
    62% 40% at 50% 46%,
    rgba(122, 92, 18, 0.07),
    transparent 70%
  );

`;

const Trilho = styled.div`
  width: clamp(140px, 22vw, 190px);
  height: 2px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;

  span {
    display: block;
    width: 100%;
    height: 100%;
    transform: scaleX(0);
    transform-origin: left center;
    background: linear-gradient(90deg, rgba(122, 92, 18, 0.35), #7a5c12);
  }

  /* Sem movimento, o traço não corre: fica aceso e discreto. */
  &[data-parado="true"] span {
    transform: scaleX(1);
    animation: ${pulsar} 1.4s ease-in-out infinite;
  }
`;

const Assinatura = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(22, 32, 58, 0.5);
  margin: 0;
`;

export default function Preloader() {
  const menosMovimento = useMenosMovimento();
  const [saiu, setSaiu] = useState(false);
  const cortinaRef = useRef(null);
  const barraRef = useRef(null);

  useEffect(() => {
    const inicio = performance.now();
    let encerrado = false;
    let idTeto;

    const encerrar = () => {
      if (encerrado) return;
      encerrado = true;
      clearTimeout(idTeto);

      const decorrido = performance.now() - inicio;
      const espera = Math.max(0, PISO_MS - decorrido);

      setTimeout(() => {
        const cortina = cortinaRef.current;
        if (!cortina) return setSaiu(true);

        if (menosMovimento) return setSaiu(true);

        gsap.to(cortina, {
          opacity: 0,
          y: -26,
          duration: SAIDA_MS / 1000,
          ease: EASE,
          onComplete: () => setSaiu(true),
        });
      }, espera);
    };

    // O teto é a rede de segurança, e é ele que garante que a página
    // aparece mesmo quando nada mais resolve.
    idTeto = setTimeout(encerrar, TETO_MS);

    const pronto = () => {
      // `document.fonts.ready` pode nunca resolver; o teto cobre isso.
      const fontes = document.fonts?.ready ?? Promise.resolve();
      fontes.then(encerrar).catch(encerrar);
    };

    if (document.readyState === "complete") pronto();
    else window.addEventListener("load", pronto, { once: true });

    return () => {
      clearTimeout(idTeto);
      window.removeEventListener("load", pronto);
    };
  }, [menosMovimento]);

  // A barra corre no relógio, não no progresso real: não existe medida
  // honesta de "quanto falta" numa SPA, e uma barra que finge precisão
  // é pior que uma que só marca passagem de tempo.
  useEffect(() => {
    if (menosMovimento || !barraRef.current) return undefined;
    const tween = gsap.fromTo(
      barraRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: TETO_MS / 1000, ease: "power1.out" }
    );
    return () => tween.kill();
  }, [menosMovimento]);

  // A rolagem volta junto com a saída da cortina, e volta sempre: o
  // `return` do efeito é o que impede a página de ficar travada se o
  // componente sair de cena por qualquer outro motivo.
  useEffect(() => {
    if (saiu) return undefined;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [saiu]);

  if (saiu) return null;

  return (
    <Cortina ref={cortinaRef} role="status" aria-live="polite">
      <Wordmark>TOKA</Wordmark>
      <Trilho data-parado={String(menosMovimento)}>
        <span ref={barraRef} />
      </Trilho>
      <Assinatura>Marketing Médico</Assinatura>
    </Cortina>
  );
}
