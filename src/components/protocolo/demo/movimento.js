import { useLayoutEffect, useSyncExternalStore } from "react";
import gsap from "gsap";

/**
 * prefers-reduced-motion: quando ligado, nada daqui anima e as esperas
 * ("digitando...") caem para zero.
 */
const CONSULTA = "(prefers-reduced-motion: reduce)";

const assinar = (cb) => {
  const m = window.matchMedia(CONSULTA);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

export function reduzMovimento() {
  return typeof window !== "undefined" && window.matchMedia(CONSULTA).matches;
}

export function useReduzMovimento() {
  return useSyncExternalStore(assinar, reduzMovimento, () => false);
}

/** Sobe com fade (150 a 300 ms). So roda uma vez, na montagem. */
export function useEntrada(ref, ativo = true, { y = 12, duracao = 0.26 } = {}) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !ativo || reduzMovimento()) return undefined;
    const t = gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration: duracao, ease: "power2.out", clearProps: "transform,opacity" });
    return () => t.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const espera = (ms) => new Promise((r) => setTimeout(r, reduzMovimento() ? 0 : ms));
