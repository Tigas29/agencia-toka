/**
 * Link do checkout e rastreio da /protocolo/:nicho.
 *
 * A pagina fica entre o anuncio e o checkout da Hubla, entao a query de
 * entrada (utm_*, fbclid, gclid) precisa viajar junto. A leitura reaproveita
 * capturarUtm() da /habitat, que tambem guarda em sessionStorage.
 *
 * O Pixel Toka entra pelo GTM (GTM-KBB2B4QK faz init e PageView), nunca
 * aqui. Nesta pagina so sai um evento personalizado no clique. ViewContent,
 * AddToCart, InitiateCheckout e Purchase ficam com o checkout da Hubla,
 * porque a campanha otimiza por InitiateCheckout.
 */
import { capturarUtm } from "../habitat/lead";

export function linkCheckout(base, nicho) {
  try {
    const url = new URL(base);
    const utm = capturarUtm();
    Object.entries(utm).forEach(([chave, valor]) => {
      if (valor) url.searchParams.set(chave, valor);
    });
    if (!url.searchParams.get("utm_content")) {
      url.searchParams.set("utm_content", `lp-protocolo-${nicho}`);
    }
    return url.toString();
  } catch {
    return base;
  }
}

export function cliqueComprar(nicho) {
  try {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", "CliqueComprarProtocolo", { nicho });
    }
  } catch {
    /* rastreio nunca trava a compra */
  }
}
