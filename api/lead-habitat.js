/**
 * Recebe o lead da página /habitat e entrega no Kommo da Toka.
 *
 * Por que não reaproveitar api/lead.js: aquele endpoint é o do
 * formulário longo de blefaroplastia. Ele carrega score, quinze campos
 * personalizados, tag `aplicacao-blefaro` e a mecânica de parcial /
 * completo. Parametrizá-lo mexeria em código que roda em produção no
 * /aplicacao, e uma falha ali é silenciosa por desenho: a função sempre
 * responde 200 para não derrubar a tela de quem preencheu.
 *
 * Aqui o formulário tem quatro campos e um envio só.
 *
 * ⚠️ status_id: usar SEMPRE a etapa comum `Lead de entrada` (107774835).
 * A coluna homónima `Leads de entrada` (106373283) é a caixa nativa de
 * não organizados do Kommo e recusa POST /leads com 400
 * NotSupportedChoice.
 */

const SUBDOMAIN = process.env.KOMMO_SUBDOMAIN;
const TOKEN = process.env.KOMMO_ACCESS_TOKEN;
const PIPELINE = Number(process.env.KOMMO_PIPELINE_ID || 13786499);
const STATUS_ENTRADA = Number(process.env.KOMMO_STATUS_ENTRADA || 107774835);

/** Espelho opcional: se existir, recebe uma cópia crua do payload. */
const WEBHOOK_ESPELHO = process.env.TOKA_WEBHOOK_ESPELHO || "";

const CONTATO_TELEFONE = 1649748;

/** Campos de tracking que já existiam na conta. */
const UTM = {
  utm_source: 1649762,
  utm_medium: 1649758,
  utm_campaign: 1649760,
  utm_term: 1649764,
  utm_content: 1649756,
  gclid: 1649772,
  fbclid: 1649774,
};

/** Guarda o id da aplicação, para achar o card se precisar auditar. */
const LEAD_ID = 2448208;

const kommo = async (caminho, opcoes = {}) => {
  const r = await fetch(`https://${SUBDOMAIN}.kommo.com/api/v4${caminho}`, {
    ...opcoes,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...opcoes.headers,
    },
  });
  if (r.status === 204) return null;
  const corpo = await r.json().catch(() => null);
  if (!r.ok) {
    throw new Error(`Kommo ${r.status} em ${caminho}: ${JSON.stringify(corpo)}`);
  }
  return corpo;
};

const texto = (id, valor) =>
  id && valor ? { field_id: id, values: [{ value: String(valor) }] } : null;

const criarContato = async (p) => {
  const campos = p.telefone
    ? [
        {
          field_id: CONTATO_TELEFONE,
          values: [{ value: p.telefone, enum_code: "WORK" }],
        },
      ]
    : undefined;

  const r = await kommo("/contacts", {
    method: "POST",
    body: JSON.stringify([
      { name: p.nome || "Sem nome", custom_fields_values: campos },
    ]),
  });
  return r?._embedded?.contacts?.[0]?.id || null;
};

/**
 * Especialidade e cidade ainda não existem como campo personalizado
 * nesta conta. Vão no nome do card, que é o que a equipe lê primeiro na
 * régua, e repetidos na nota para não se perderem se alguém renomear.
 */
const nomeDoCard = (p) =>
  ["Habitat", p.nome, p.especialidade, p.cidade]
    .filter(Boolean)
    .join(" · ")
    .slice(0, 250);

const notaDoLead = (p) =>
  [
    `Origem: página /habitat`,
    `Especialidade: ${p.especialidade || "não informada"}`,
    `Cidade: ${p.cidade || "não informada"}`,
    `WhatsApp: ${p.whatsapp || p.telefone || "não informado"}`,
  ].join("\n");

const criarLead = async (p) => {
  const contatoId = await criarContato(p);

  const campos = [texto(LEAD_ID, p.lead_id)];
  for (const [chave, id] of Object.entries(UTM)) {
    campos.push(texto(id, p[chave]));
  }

  const lead = {
    name: nomeDoCard(p),
    pipeline_id: PIPELINE,
    status_id: STATUS_ENTRADA,
    custom_fields_values: campos.filter(Boolean),
    _embedded: {
      tags: [{ name: "lp-habitat" }],
      ...(contatoId ? { contacts: [{ id: contatoId }] } : {}),
    },
  };

  const r = await kommo("/leads", {
    method: "POST",
    body: JSON.stringify([lead]),
  });
  return r?._embedded?.leads?.[0]?.id || null;
};

/** A nota é acessório: se falhar, o card já existe e isso basta. */
const anotar = async (leadId, p) => {
  if (!leadId) return;
  try {
    await kommo(`/leads/${leadId}/notes`, {
      method: "POST",
      body: JSON.stringify([
        { note_type: "common", params: { text: notaDoLead(p) } },
      ]),
    });
  } catch (erro) {
    console.error("[toka/habitat] nota falhou:", erro.message);
  }
};

const espelhar = async (payload) => {
  if (!WEBHOOK_ESPELHO) return;
  try {
    await fetch(WEBHOOK_ESPELHO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (erro) {
    console.error("[toka/habitat] espelho falhou:", erro.message);
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ erro: "método não permitido" });
    return;
  }

  const p =
    typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Resposta imediata: o front nunca espera pelo CRM para seguir.
  const responder = (extra = {}) => {
    if (!res.headersSent) res.status(200).json({ ok: true, ...extra });
  };

  if (!SUBDOMAIN || !TOKEN) {
    console.error("[toka/habitat] Kommo não configurado. Lead:", p.lead_id);
    responder({ kommo: "nao_configurado" });
    await espelhar(p);
    return;
  }

  try {
    const kommoLeadId = await criarLead(p);
    await anotar(kommoLeadId, p);
    responder({ kommo_lead_id: kommoLeadId });
  } catch (erro) {
    // A pessoa já preencheu. Ela não pode ver erro porque o CRM falhou.
    console.error(
      "[toka/habitat] falha ao gravar no Kommo:",
      erro.message,
      "lead:",
      p.lead_id
    );
    responder({ kommo: "falhou" });
  }

  await espelhar(p);
}
