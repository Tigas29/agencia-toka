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

/**
 * `utmContent` e o utm_content padrao, usado so quando a entrada nao trouxe
 * um (na demo, o handle da DM vem na query e passa adiante). Sem o terceiro
 * argumento o comportamento e o da landing: lp-protocolo-<nicho>.
 */
export function linkCheckout(base, nicho, utmContent = `lp-protocolo-${nicho}`) {
  try {
    const url = new URL(base);
    const utm = capturarUtm();
    Object.entries(utm).forEach(([chave, valor]) => {
      if (valor) url.searchParams.set(chave, valor);
    });
    if (!url.searchParams.get("utm_content")) {
      url.searchParams.set("utm_content", utmContent);
    }
    return url.toString();
  } catch {
    return base;
  }
}

/** `origem` so vai no evento quando informada (a demo manda "demo"). */
export function cliqueComprar(nicho, origem) {
  try {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", "CliqueComprarProtocolo", origem ? { nicho, origem } : { nicho });
    }
  } catch {
    /* rastreio nunca trava a compra */
  }
  try {
    if (typeof window.clarity === "function") window.clarity("event", "clique_comprar");
  } catch {
    /* silencioso */
  }
}

/**
 * Microsoft Clarity (mapa de calor), so nas rotas /protocolo/*. O snippet
 * oficial entra ao montar a pagina, sem duplicar se ja existir
 * window.clarity. Tudo silencioso: adblock derruba o Clarity e isso nao
 * pode quebrar o botao. A pagina nao tem formulario, entao nao ha dado
 * pessoal para vazar.
 */
const CLARITY_ID = "yqj8anl35r";

export function iniciarClarity(nicho, pagina = "protocolo") {
  try {
    if (typeof window.clarity !== "function") {
      (function (c, l, a, r, i) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        const t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        const y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", CLARITY_ID);
    }
    window.clarity("set", "nicho", nicho);
    window.clarity("set", "pagina", pagina);
  } catch {
    /* silencioso */
  }
}

/** Evento Clarity avulso (a demo usa `demo_editou`). Silencioso. */
export function eventoClarity(nome) {
  try {
    if (typeof window.clarity === "function") window.clarity("event", nome);
  } catch {
    /* silencioso */
  }
}
