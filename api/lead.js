/**
 * Recebe o lead de /aplicacao e entrega no Kommo da Toka.
 *
 * Roda no servidor da Vercel, e não no navegador, porque a chamada ao
 * Kommo carrega o token. Do lado do cliente ele ficaria legível no
 * código da página.
 *
 * Dois eventos:
 *   lead_partial  → nasce o card, no milestone do Instagram
 *   lead_complete → o MESMO card é atualizado e roteado
 *
 * Princípio: erro do CRM nunca derruba a tela de quem preencheu. A
 * função responde 200 e registra a falha no log da Vercel.
 */

import MAPA from "./_kommo-campos.json" with { type: "json" };

const SUBDOMAIN = process.env.KOMMO_SUBDOMAIN;
const TOKEN = process.env.KOMMO_ACCESS_TOKEN;
const PIPELINE = Number(process.env.KOMMO_PIPELINE_ID || 13786499);
const STATUS_ENTRADA = Number(process.env.KOMMO_STATUS_ENTRADA || 106373283);
const STATUS_INVALIDO = Number(process.env.KOMMO_STATUS_INVALIDO || 109098891);

/** Espelho opcional: se existir, recebe uma cópia crua do payload. */
const WEBHOOK_ESPELHO = process.env.TOKA_WEBHOOK_ESPELHO || "";

const CAMPOS = MAPA.campos;
const ENUMS = MAPA.enums;

// Campos de tracking que já existiam na conta.
const UTM = {
  utm_source: 1649762,
  utm_medium: 1649758,
  utm_campaign: 1649760,
  utm_term: 1649764,
  utm_content: 1649756,
  gclid: 1649772,
  fbclid: 1649774,
};

const CONTATO_TELEFONE = 1649748;
const CONTATO_EMAIL = 1649750;

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

/** Select do Kommo aceita o enum_id, então traduzimos o rótulo. */
const selecao = (chave, rotulo) => {
  const id = CAMPOS[chave];
  const enumId = ENUMS[chave]?.[rotulo];
  if (!id || !enumId) return null;
  return { field_id: id, values: [{ enum_id: enumId }] };
};

/**
 * Urgência e temperatura chegam com emoji do formulário. O Kommo guarda
 * o rótulo limpo, então normalizamos antes de casar com o enum.
 */
const semEmoji = (s) => (s || "").replace(/[^\p{L}\p{N}$.,\s-]/gu, "").trim();

const camposDoLead = (p) => {
  const lista = [
    selecao("procedimento_principal", p.procedimento_principal_label),
    selecao("registro_profissional", p.registro_profissional_label),
    selecao("urgencia", semEmoji(p.urgencia_label)),
    selecao("faturamento_mensal", p.faturamento_mensal_label),
    selecao("volume_blefaro_mes", p.volume_blefaro_mes_label),
    selecao("estrutura_atendimento", p.estrutura_atendimento_label),
    selecao("vende_protocolo_completo", p.vende_protocolo_completo_label),
    selecao("score_rotulo", p.score_rotulo),
    selecao("motivo_reprovacao", p.motivo_reprovacao),
    texto(CAMPOS.investimento_marketing, p.investimento_marketing_label),
    texto(CAMPOS.score, p.score),
    texto(CAMPOS.instagram, p.instagram),
    texto(CAMPOS.site_atual, p.site_atual),
    texto(CAMPOS.desafio_principal, p.desafio_principal),
    texto(CAMPOS.lead_id, p.lead_id),
  ];

  for (const [chave, id] of Object.entries(UTM)) {
    lista.push(texto(id, p[chave]));
  }

  return lista.filter(Boolean);
};

const criarContato = async (p) => {
  const campos = [];
  if (p.telefone) {
    campos.push({
      field_id: CONTATO_TELEFONE,
      values: [{ value: p.telefone, enum_code: "WORK" }],
    });
  }
  if (p.email) {
    campos.push({
      field_id: CONTATO_EMAIL,
      values: [{ value: p.email, enum_code: "WORK" }],
    });
  }

  const r = await kommo("/contacts", {
    method: "POST",
    body: JSON.stringify([
      { name: p.nome || "Sem nome", custom_fields_values: campos.length ? campos : undefined },
    ]),
  });
  return r?._embedded?.contacts?.[0]?.id || null;
};

/** Fallback de dedupe: acha o card pelo ID da aplicação. */
const buscarPorLeadId = async (leadId) => {
  if (!leadId) return null;
  const r = await kommo(`/leads?query=${encodeURIComponent(leadId)}&limit=5`);
  const achados = r?._embedded?.leads || [];
  const certo = achados.find((l) =>
    (l.custom_fields_values || []).some(
      (c) => c.field_id === CAMPOS.lead_id && c.values?.[0]?.value === leadId
    )
  );
  return certo?.id || achados[0]?.id || null;
};

const criarLead = async (p, { aprovado, incompleto }) => {
  const contatoId = await criarContato(p);

  const tags = [{ name: "aplicacao-blefaro" }];
  tags.push({ name: incompleto ? "incompleto" : aprovado ? "qualificado" : "reprovado" });

  const lead = {
    name: `Aplicação blefaro · ${p.nome || "sem nome"}`,
    pipeline_id: PIPELINE,
    status_id: !incompleto && !aprovado ? STATUS_INVALIDO : STATUS_ENTRADA,
    custom_fields_values: camposDoLead(p),
    _embedded: {
      tags,
      ...(contatoId ? { contacts: [{ id: contatoId }] } : {}),
    },
  };

  const r = await kommo("/leads", { method: "POST", body: JSON.stringify([lead]) });
  return r?._embedded?.leads?.[0]?.id || null;
};

const atualizarLead = async (id, p, { aprovado }) => {
  await kommo(`/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: `Aplicação blefaro · ${p.nome || "sem nome"}`,
      status_id: aprovado ? STATUS_ENTRADA : STATUS_INVALIDO,
      custom_fields_values: camposDoLead(p),
      _embedded: {
        // substitui as tags: sai 'incompleto', entra o veredito
        tags: [
          { name: "aplicacao-blefaro" },
          { name: aprovado ? "qualificado" : "reprovado" },
        ],
      },
    }),
  });
  return id;
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
    console.error("[toka/lead] espelho falhou:", erro.message);
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ erro: "método não permitido" });
    return;
  }

  const p = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Resposta imediata para o front nunca esperar pelo CRM.
  const responder = (extra = {}) => {
    if (!res.headersSent) res.status(200).json({ ok: true, ...extra });
  };

  if (!SUBDOMAIN || !TOKEN) {
    console.error("[toka/lead] Kommo não configurado. Payload recebido:", p.lead_id);
    responder({ kommo: "nao_configurado" });
    await espelhar(p);
    return;
  }

  try {
    const parcial = p.evento === "lead_partial";
    const aprovado = p.qualificado === true;

    let kommoLeadId = p.kommo_lead_id || null;

    if (parcial) {
      kommoLeadId = await criarLead(p, { aprovado: false, incompleto: true });
    } else {
      if (!kommoLeadId) kommoLeadId = await buscarPorLeadId(p.lead_id);

      kommoLeadId = kommoLeadId
        ? await atualizarLead(kommoLeadId, p, { aprovado })
        : await criarLead(p, { aprovado, incompleto: false });
    }

    responder({ kommo_lead_id: kommoLeadId });
  } catch (erro) {
    // O lead já preencheu tudo. Ele não pode ver erro porque o CRM falhou.
    console.error("[toka/lead] falha ao gravar no Kommo:", erro.message, "lead:", p.lead_id);
    responder({ kommo: "falhou" });
  }

  await espelhar(p);
}
