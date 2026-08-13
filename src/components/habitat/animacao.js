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

/**
 * O mesmo padrão reativo acima, para a largura da tela.
 *
 * Existe porque a cena central enquadra o gráfico de forma diferente no
 * telemóvel: lá a câmera fecha em cima do desenho para ele caber grande,
 * e no desktop o `viewBox` fica parado. Ler `matchMedia` uma vez só
 * deixaria quem gira o aparelho preso no enquadramento da orientação
 * anterior, então a preferência entra como estado e a timeline se
 * remonta quando ela muda.
 *
 * 610px é o `Media.PhoneLarge` de `style.js` — mudar um exige mudar o
 * outro, senão o CSS e a câmera passam a discordar sobre o que é
 * telemóvel.
 */
export function useEhCelular() {
  const [celular, setCelular] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 610px)");
    const aplicar = () => setCelular(mq.matches);
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);

  return celular;
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
 * Altura de uma cena presa, calculada a partir de quantos tempos ela
 * tem, em vez de chutada.
 *
 * Chutar a altura foi a origem de uma queixa concreta: "a dobra 4 entra
 * e fica várias rolagens vazia". Com altura demais para os tempos que a
 * cena tem, sobra rolagem em que nada acontece e a página parece
 * travada. Com altura de menos, as peças se atropelam.
 *
 * `unidade` é quanta tela cada tempo merece. Uma frase curta pede menos
 * que um quadro com cinco peças, e é o único número a ajustar quando uma
 * cena ficar apressada ou arrastada.
 */
export const alturaDaCena = (tempos, unidade = 46) =>
  `${Math.round(tempos * unidade + 100)}vh`;

/**
 * O gatilho padrão de uma cena presa.
 *
 * 🔑 `start` em "top top": a cena só começa a contar quando o palco
 * prende, e não enquanto ele ainda está subindo. O Tiago descreveu o
 * defeito oposto assim: "vou de uma seção para outra e o scroll já
 * capta e muda antes mesmo de eu terminar de chegar".
 *
 * ⚠️ Este valor já foi "top 72%", e não por acidente: com "top top" a
 * seção subia visível e **vazia**, porque no progresso 0 todo primeiro
 * elemento está em `opacity: 0`. O que tornou "top top" seguro foi
 * outra coisa — **a primeira peça de cada cena nasce visível, fora da
 * timeline**. Quem devolver o 72% sem desfazer isso reabre a queixa de
 * a cena mudar antes de a pessoa chegar; quem puser as primeiras peças
 * de volta na timeline reabre a entrada em branco. Andam juntos.
 *
 * `end` em "bottom bottom" faz a timeline acabar no instante em que o
 * sticky solta, sem sobra morta no fim.
 */
export const gatilhoDeCena = (elemento, scrub = 0.5) => ({
  trigger: elemento,
  start: "top top",
  end: "bottom bottom",
  scrub,
});

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

