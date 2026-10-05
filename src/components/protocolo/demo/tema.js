/**
 * Tema de cor da proposta. A cor escolhida vira o acento das folhas, e dela
 * saem a tinta dos titulos (a mesma cor escurecida) e os fundos suaves, como
 * na miniatura da direcao B (canvas B3): acento #5B7F6B, titulo #2C3E35.
 */

function paraRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function paraHex(rgb) {
  return `#${rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("")}`;
}

/** Mistura `hex` com `outro` (0 = so hex, 1 = so outro). */
export function misturar(hex, outro, t) {
  const a = paraRgb(hex);
  const b = paraRgb(outro);
  return paraHex(a.map((v, i) => v + (b[i] - v) * t));
}

export const TINTA_PADRAO = "#16203A";
export const ACENTO_PADRAO = "#8A6A2A";

/** Variaveis CSS lidas por `Folha`. Sem cor escolhida, o dourado do site. */
export function varsTema(cor) {
  if (!cor) return {};
  return {
    "--f-acento": cor,
    "--f-tinta": misturar(cor, "#0B100D", 0.62),
    "--f-suave": misturar(cor, "#FFFFFF", 0.93),
    "--f-linha": misturar(cor, "#FFFFFF", 0.78),
  };
}
