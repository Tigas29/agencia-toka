/**
 * Captura e envio do lead.
 *
 * Regra que não pode quebrar: se o webhook não estiver configurado, o
 * formulário NÃO trava. Registra no console e segue o fluxo. Lead
 * nenhum fica preso por falta de variável de ambiente.
 */

const WEBHOOK_URL = import.meta.env.VITE_TOKA_WEBHOOK_URL || "";

/** Destino dos reprovados. Enquanto a live não existir, cai na home. */
export const URL_LIVE = import.meta.env.VITE_TOKA_URL_LIVE || "/";

const WHATSAPP = "5511996865057";

export const linkWhatsApp = (nome) => {
  const texto = `Olá! Sou ${
    nome || "médico"
  } e acabei de preencher a aplicação de blefaroplastia no site da Toka.`;
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP}&text=${encodeURIComponent(
    texto
  )}&type=phone_number&app_absent=0`;
};

// ── Campos ocultos ───────────────────────────────────────────────────

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

const UTM_STORAGE = "toka-aplicacao-utm";

/**
 * Lê os parâmetros da URL na primeira visita e persiste em sessão, para
 * sobreviver a recarga e navegação interna.
 */
export function capturarUtm() {
  const vazio = Object.fromEntries(UTM_KEYS.map((k) => [k, null]));

  try {
    const query = new URLSearchParams(window.location.search);
    const daUrl = {};
    UTM_KEYS.forEach((k) => {
      const v = query.get(k);
      if (v) daUrl[k] = v;
    });

    const salvo = JSON.parse(sessionStorage.getItem(UTM_STORAGE) || "{}");
    const merged = { ...vazio, ...salvo, ...daUrl };
    sessionStorage.setItem(UTM_STORAGE, JSON.stringify(merged));
    return merged;
  } catch {
    return vazio;
  }
}

export const gerarLeadId = () =>
  `toka-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// ── Envio ────────────────────────────────────────────────────────────

/**
 * @param {object} payload
 * @param {boolean} usarBeacon  true no envio parcial, para o disparo
 *                              sobreviver ao fechamento da aba.
 */
export async function enviarLead(payload, usarBeacon = false) {
  if (!WEBHOOK_URL) {
    console.warn(
      "[toka/aplicacao] VITE_TOKA_WEBHOOK_URL não configurada. Payload não enviado:",
      payload
    );
    return false;
  }

  const corpo = JSON.stringify(payload);

  if (usarBeacon && typeof navigator?.sendBeacon === "function") {
    const enviou = navigator.sendBeacon(
      WEBHOOK_URL,
      new Blob([corpo], { type: "application/json" })
    );
    if (enviou) return true;
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: corpo,
      keepalive: true,
    });
    return true;
  } catch (erro) {
    console.error("[toka/aplicacao] falha ao enviar lead:", erro);
    return false;
  }
}

// ── Tracking ─────────────────────────────────────────────────────────

/**
 * Pixel e GTM ainda estão pendentes de ID. A camada fica pronta e
 * silenciosa até os scripts existirem na página.
 */
export function track(evento, dados = {}) {
  try {
    if (typeof window.fbq === "function") window.fbq("track", evento, dados);
    if (Array.isArray(window.dataLayer))
      window.dataLayer.push({ event: `toka_${evento}`, ...dados });
  } catch {
    /* tracking nunca derruba o formulário */
  }
}

// ── Autosave ─────────────────────────────────────────────────────────

const PROGRESSO = "toka-aplicacao-progresso-v1";

export function salvarProgresso(estado) {
  try {
    localStorage.setItem(PROGRESSO, JSON.stringify(estado));
  } catch {
    /* modo privado do Safari, por exemplo */
  }
}

export function carregarProgresso() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESSO) || "null");
  } catch {
    return null;
  }
}

export function limparProgresso() {
  try {
    localStorage.removeItem(PROGRESSO);
  } catch {
    /* idem */
  }
}
