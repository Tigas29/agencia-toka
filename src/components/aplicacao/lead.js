/**
 * Captura e envio do lead.
 *
 * Regra que não pode quebrar: se o webhook não estiver configurado, o
 * formulário NÃO trava. Registra no console e segue o fluxo. Lead
 * nenhum fica preso por falta de variável de ambiente.
 */

/**
 * Endpoint próprio, no mesmo domínio: a função em api/lead.js entrega
 * no Kommo. O token do CRM fica lá, nunca aqui.
 */
const ENDPOINT = "/api/lead";

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
 * Id do card no Kommo, devolvido pelo envio parcial e reenviado no
 * final, para o mesmo card ser atualizado em vez de duplicado.
 */
let kommoLeadId = null;

export const getKommoLeadId = () => kommoLeadId;
export const setKommoLeadId = (id) => {
  if (id) kommoLeadId = id;
};

/**
 * `keepalive` é o que faz o disparo sobreviver ao fechamento da aba,
 * sem abrir mão de ler a resposta. É por isso que aqui não há
 * `sendBeacon`: ele entregaria igual, mas devolveria só um booleano, e
 * o envio parcial precisa do id do card que a resposta traz.
 */
export async function enviarLead(payload) {
  const corpo = JSON.stringify({ ...payload, kommo_lead_id: kommoLeadId });

  try {
    const resposta = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: corpo,
      keepalive: true,
    });
    const dados = await resposta.json().catch(() => null);
    setKommoLeadId(dados?.kommo_lead_id);
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
