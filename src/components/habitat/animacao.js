import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Base de animação da página. GSAP + ScrollTrigger + Lenis ficam
 * registrados um vez só, aqui, para nenhuma seção repetir o registro nem
 * puxar `gsap/all` (que traria plugins que a página não usa).
 */
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Enjoo de movimento é problema real, e mais ainda numa página de saúde.
 * Quem pediu menos movimento recebe a página inteira no estado final,
 * sem nada se mexendo.
 *
 * Lê a preferência de forma reativa: quem muda o ajuste do sistema com a
 * aba aberta não fica preso na resposta da primeira renderização.
 */
export function useMenosMovimento() {
  const [menos, setMenos] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => setMenos(mq.matches);
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);

  return menos;
}

/** Saída de desaceleração. Entra rápido, assenta devagar. */
export const SUAVE = [0.22, 1, 0.36, 1];

/**
 * Resolve a curva cúbica de Bézier acima numa função de easing que o
 * GSAP consome nativamente (progresso 0..1 → progresso 0..1). Sem isso
 * precisaríamos do plugin CustomEase só para repetir uma curva que já
 * temos em quatro números.
 */
function easeDeBezier(x1, y1, x2, y2) {
  const a = (u, v) => 1 - 3 * v + 3 * u;
  const b = (u, v) => 3 * v - 6 * u;
  const c = (u) => 3 * u;

  const bezX = (t) => ((a(x1, x2) * t + b(x1, x2)) * t + c(x1)) * t;
  const bezY = (t) => ((a(y1, y2) * t + b(y1, y2)) * t + c(y1)) * t;
  const derivX = (t) => 3 * a(x1, x2) * t * t + 2 * b(x1, x2) * t + c(x1);

  const tParaX = (x) => {
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const diferenca = bezX(t) - x;
      if (Math.abs(diferenca) < 1e-4) return t;
      const derivada = derivX(t);
      if (Math.abs(derivada) < 1e-6) break;
      t -= diferenca / derivada;
    }
    return t;
  };

  return (x) => bezY(tParaX(x));
}

/** A mesma curva de `SUAVE`, em formato de easing para o GSAP. */
export const EASE = easeDeBezier(...SUAVE);

/**
 * Mapeia um progresso 0..1 para o trecho [de, ate], também em 0..1. É o
 * que permite escrever "esta parte da cena acontece entre 30% e 60% da
 * rolagem" sem espalhar contas de regra de três pelos componentes.
 */
export const fatia = (p, de, ate) =>
  Math.min(1, Math.max(0, (p - de) / (ate - de)));

/**
 * Rolagem suave da página inteira, via Lenis, integrada ao ticker do
 * GSAP para o ScrollTrigger ler a posição real a cada frame. Nunca
 * assume o controle da rolagem: só suaviza o que o usuário já está
 * fazendo. Desligada por completo quando a pessoa pediu menos movimento.
 */
export function useRolagemSuave(menosMovimento) {
  useEffect(() => {
    if (menosMovimento) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });

    const aoRolar = () => ScrollTrigger.update();
    lenis.on("scroll", aoRolar);

    const tick = (tempoMs) => lenis.raf(tempoMs * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [menosMovimento]);
}

/**
 * GSAP escopado a um container, com reversão automática no unmount.
 * `gsap.context` já revoga qualquer ScrollTrigger criado dentro dele
 * (desde a 3.11), então cada seção que usa este hook limpa depois de si
 * sem precisar guardar uma lista manual de triggers.
 */
export function useContextoGsap(configurar, dependencias = []) {
  const escopo = useRef(null);

  useLayoutEffect(() => {
    if (!escopo.current) return undefined;
    const ctx = gsap.context(configurar, escopo);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencias);

  return escopo;
}

/**
 * Revela uma lista de elementos **amarrada à rolagem**, um por vez.
 *
 * A diferença para o padrão antigo é o que define o ritmo de leitura da
 * página inteira. Com `scrollTrigger: { once: true }`, a seção entra na
 * tela, a cascata dispara e daí em diante ela roda no relógio, alheia a
 * quem lê: o texto chega todo junto e a pessoa tem que **parar de rolar
 * para ler**. Com `scrub`, o mesmo `stagger` deixa de ser temporal e
 * passa a ser espacial, e cada elemento entra conforme a rolagem avança.
 * Parar de rolar congela a revelação. É a diferença entre parar para ler
 * e ler rolando.
 *
 * `folga` é quanta rolagem além da própria altura do gatilho a cascata
 * ocupa, em porcentagem da tela. Mais folga espalha as peças por mais
 * rolagem, e é o que se ajusta quando um bloco tem texto demais para
 * caber confortavelmente no espaço que ele mesmo ocupa.
 */
export function useRevelacaoPorScroll(
  refs,
  { menosMovimento, folga = 40, distancia = 22 } = {}
) {
  const escopo = useRef(null);

  useLayoutEffect(() => {
    if (!escopo.current) return undefined;

    const alvos = (Array.isArray(refs) ? refs : refs.current || []).filter(
      Boolean
    );
    if (!alvos.length) return undefined;

    // Quem pediu menos movimento recebe tudo pronto, sem tween nenhum.
    if (menosMovimento) {
      gsap.set(alvos, { opacity: 1, y: 0, clearProps: "all" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        alvos,
        { opacity: 0, y: distancia },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          // `duration` igual ao `stagger` encosta uma peça na outra: a
          // seguinte começa exatamente quando a anterior termina. Com
          // stagger maior que a duração sobrariam vãos mortos de rolagem
          // em que nada acontece, e a página pareceria travada.
          duration: 1,
          stagger: 1,
          scrollTrigger: {
            trigger: escopo.current,
            start: "top 78%",
            end: `bottom bottom-=${folga}%`,
            scrub: 0.5,
          },
        }
      );
    }, escopo);

    return () => ctx.revert();
  }, [refs, menosMovimento, folga, distancia]);

  return escopo;
}

/**
 * Parallax lento do numeral de fundo de cada dobra. Só desktop (guarda
 * de escopo: no telemóvel o numeral já ocupa espaço demais para se
 * mexer sem atropelar o texto). `matchMedia` do próprio GSAP cuida de
 * criar e destruir o tween conforme o viewport cruza o breakpoint.
 */
export function useParallaxNumeral(ref, menosMovimento) {
  useLayoutEffect(() => {
    if (menosMovimento || !ref.current) return undefined;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1001px)", () => {
      const tween = gsap.to(ref.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      return () => tween.kill();
    });

    return () => mm.revert();
  }, [menosMovimento, ref]);
}
