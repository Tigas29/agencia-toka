/**
 * Regras do funil. Funções puras, sem React e sem efeito colateral.
 *
 * O ponto central: os filtros duros só são avaliados no gate
 * `estrutura_atendimento`, que vem DEPOIS dos campos de contato.
 * Ninguém é eliminado antes de o telefone estar na base. Isso é
 * intencional e está marcado como tal no spec normativo.
 */

import { FIELDS } from "./spec";

const fieldById = (id) => FIELDS.find((f) => f.id === id);

/** Objeto da opção escolhida, para ler label, score e prioridade. */
export const choiceOf = (fieldId, choiceId) =>
  fieldById(fieldId)?.choices?.find((c) => c.id === choiceId) || null;

export const labelOf = (fieldId, choiceId) =>
  choiceOf(fieldId, choiceId)?.label || "";

/**
 * Condições de reprovação, na ordem em que aparecem no spec.
 * Cada uma carrega o motivo, que vai no payload do CRM.
 */
const REPROVACOES = [
  {
    motivo: "nao_e_medico",
    testa: (r) => r.registro_profissional === "reg_nao_medico",
  },
  {
    motivo: "nicho_incompativel",
    testa: (r) =>
      ["proc_corporal", "proc_harmonizacao", "proc_outro"].includes(
        r.procedimento_principal
      ),
  },
  {
    // corte em R$10 mil/mês
    motivo: "faturamento_abaixo_do_corte",
    testa: (r) => ["fat_zero", "fat_ate_10"].includes(r.faturamento_mensal),
  },
  {
    motivo: "volume_abaixo_do_corte",
    testa: (r) => ["vol_zero", "vol_1_2"].includes(r.volume_blefaro_mes),
  },
  {
    motivo: "dono_de_rede",
    testa: (r) => r.estrutura_atendimento === "estr_dono_rede",
  },
];

/**
 * Gate de estrutura: uma única condição OR que reavalia respostas
 * dadas lá atrás. Todos os filtros duros convergem aqui.
 */
export function avaliarGateEstrutura(respostas) {
  const falha = REPROVACOES.find((r) => r.testa(respostas));
  return falha
    ? { aprovado: false, motivo: falha.motivo }
    : { aprovado: true, motivo: null };
}

/** Gate de maturidade de oferta. Último critério. */
export function avaliarGateProtocolo(respostas) {
  return respostas.vende_protocolo_completo === "prot_sim"
    ? { aprovado: true, motivo: null }
    : { aprovado: false, motivo: "nao_vende_protocolo_completo" };
}

/**
 * Score informativo. NÃO decide aprovação: serve para priorizar a fila
 * do closer e segmentar campanha.
 */
export function calcularScore(respostas) {
  const soma =
    (choiceOf("faturamento_mensal", respostas.faturamento_mensal)?.score || 0) +
    (choiceOf("volume_blefaro_mes", respostas.volume_blefaro_mes)?.score || 0);

  // escala vai de 0 a 11 (faturamento 0-7 + volume 0-4)
  const rotulo = soma <= 3 ? "frio" : soma <= 7 ? "morno" : "quente";
  return { score: soma, scoreRotulo: rotulo };
}

export function sdrPriority(respostas) {
  return choiceOf("urgencia", respostas.urgencia)?.sdrPriority || 4;
}

/** Validação de um campo antes de avançar. */
export function validarCampo(field, valor) {
  const preenchido = typeof valor === "string" ? valor.trim() : valor;

  if (!field.required) return null;
  if (!preenchido) {
    return field.type === "multiple_choice"
      ? "Selecione uma opção para continuar."
      : "Preencha o campo para continuar.";
  }
  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(preenchido)) {
    return "Confira o e-mail. Parece que falta alguma coisa.";
  }
  if (field.type === "phone" && preenchido.replace(/\D/g, "").length < 10) {
    return "Informe o número com DDD.";
  }
  return null;
}

/** Máscara de telefone brasileiro, fixo ou celular. */
export function mascaraTelefone(valor) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.replace(/(\d{0,2})/, "($1");
  if (d.length <= 6) return d.replace(/(\d{2})(\d{0,4})/, "($1) $2");
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

/**
 * Payload do CRM. Envia o id da escolha e o label legível, para o n8n
 * não precisar conhecer o spec.
 */
export function montarPayload({ respostas, leadId, utm, qualificado, motivo, parcial }) {
  const { score, scoreRotulo } = calcularScore(respostas);

  const escolhas = {};
  FIELDS.filter((f) => f.type === "multiple_choice").forEach((f) => {
    const id = respostas[f.id];
    escolhas[f.id] = id || null;
    escolhas[`${f.id}_label`] = id ? labelOf(f.id, id) : null;
  });

  return {
    evento: parcial ? "lead_partial" : "lead_complete",
    lead_id: leadId,
    origem: "form-aplicacao-blefaroplastia",

    nome: respostas.nome || null,
    email: respostas.email || null,
    telefone: respostas.telefone || null,
    instagram: respostas.instagram || null,
    site_atual: respostas.site_atual || null,
    desafio_principal: respostas.desafio_principal || null,

    ...escolhas,

    qualificado: parcial ? null : qualificado,
    motivo_reprovacao: parcial ? null : motivo,
    score,
    score_rotulo: scoreRotulo,
    sdr_priority: sdrPriority(respostas),

    ...utm,
    enviado_em: new Date().toISOString(),
  };
}
