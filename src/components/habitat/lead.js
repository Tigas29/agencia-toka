/**
 * Captura e envio do lead da página /habitat.
 *
 * Espelha o padrão já validado em components/aplicacao/lead.js, com uma
 * diferença: aqui o formulário é curto e tem um envio só, então não há
 * evento parcial nem id de card a reenviar.
 *
 * Regra que não pode quebrar: falha de CRM nunca prende o lead na tela.
 * Se o endpoint cair, a pessoa segue para o WhatsApp do mesmo jeito.
 */

const ENDPOINT = "/api/lead-habitat";

const WHATSAPP = "5511996865057";

export const linkWhatsApp = ({ nome, especialidade }) => {
  const quem = especialidade ? `${especialidade}` : "médico";
  const texto = `Olá! Sou ${
    nome || "médico"
  }, ${quem}, e acabei de pedir a exclusividade regional na página do Habitat Estratégico.`;
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

const UTM_STORAGE = "toka-habitat-utm";

/**
 * Lê os parâmetros da URL na primeira visita e persiste em sessão, para
 * sobreviver a recarga e a navegação interna.
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
  `habitat-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// ── Telefone ─────────────────────────────────────────────────────────

export const somenteDigitos = (v) => (v || "").replace(/\D/g, "");

/** Máscara brasileira, tolerante a fixo de 10 dígitos. */
export function formatarTelefone(valor) {
  const d = somenteDigitos(valor).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const telefoneValido = (valor) => {
  const d = somenteDigitos(valor);
  return d.length === 10 || d.length === 11;
};

// ── Envio ────────────────────────────────────────────────────────────

/**
 * `keepalive` mantém o disparo vivo se a aba fechar durante o redirect
 * para o WhatsApp, que é exatamente o que acontece no fluxo feliz.
 */
export async function enviarLead(payload) {
  try {
    const resposta = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    return resposta.ok;
  } catch (erro) {
    console.error("[toka/habitat] falha ao enviar lead:", erro);
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
