/**
 * Regras da /gargalo. Funções puras, sem React.
 *
 * O corte só é avaliado no gate `estrutura_atendimento`, depois de
 * nome, WhatsApp, e-mail e Instagram. Ninguém é eliminado antes de o
 * contato estar no CRM. Mesma decisão da /aplicacao, pelo mesmo motivo.
 */

import { TRILHA } from "./spec";

const passoPorId = (id) => TRILHA.find((p) => p.id === id);

export const choiceOf = (passoId, choiceId) =>
  passoPorId(passoId)?.choices?.find((c) => c.id === choiceId) || null;

export const labelOf = (passoId, choiceId) => choiceOf(passoId, choiceId)?.label || "";

/** Primeiro nome, capitalizado. "luís felipe" vira "Luís". */
export const primeiroNome = (nome) => {
  const primeiro = (nome || "").trim().split(/\s+/)[0] || "";
  return primeiro ? primeiro[0].toUpperCase() + primeiro.slice(1).toLowerCase() : "";
};

/**
 * Troca `{nome}` e `{instagram}` na fala. Sem resposta ainda, a fala
 * fica sem o nome em vez de mostrar a chave.
 */
export function preencher(fala, respostas) {
  return fala
    .replace(/\{nome\}/g, primeiroNome(respostas.nome) || "você")
    .replace(/\{instagram\}/g, respostas.instagram ? `@${respostas.instagram}` : "o seu perfil");
}

/** Condições de corte, na ordem. O motivo vai no card do CRM. */
const REPROVACOES = [
  { motivo: "nao_e_medico", testa: (r) => r.especialidade === "esp_nao_saude" },
  {
    motivo: "faturamento_abaixo_do_corte",
    testa: (r) => ["fat_zero", "fat_ate_10"].includes(r.faturamento_mensal),
  },
  { motivo: "dono_de_rede", testa: (r) => r.estrutura_atendimento === "estr_dono_rede" },
];

export function avaliarGate(respostas) {
  const falha = REPROVACOES.find((r) => r.testa(respostas));
  return falha ? { aprovado: false, motivo: falha.motivo } : { aprovado: true, motivo: null };
}

/**
 * Score informativo, escala 0 a 11 como na /aplicacao: faturamento
 * (0-7) + investimento em marketing (0-4). Prioriza a fila, não decide.
 */
export function calcularScore(respostas) {
  const soma =
    (choiceOf("faturamento_mensal", respostas.faturamento_mensal)?.score || 0) +
    (choiceOf("investimento_marketing", respostas.investimento_marketing)?.score || 0);
  const rotulo = soma <= 3 ? "frio" : soma <= 7 ? "morno" : "quente";
  return { score: soma, scoreRotulo: rotulo };
}

export const sdrPriority = (respostas) =>
  choiceOf("urgencia", respostas.urgencia)?.sdrPriority || 4;

/** Validação de um passo antes de aceitar a resposta. */
export function validar(passo, valor) {
  const v = typeof valor === "string" ? valor.trim() : valor;

  if (!passo.required && !v) return null;
  if (!v) return passo.erro || "Preenche pra continuar.";

  if (passo.tipo === "texto" && passo.id === "nome" && v.split(/\s+/).length < 2) return passo.erro;
  if (passo.tipo === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return passo.erro;
  if (passo.tipo === "telefone" && v.replace(/\D/g, "").length < 10) return passo.erro;
  if (passo.tipo === "instagram" && /[\s/]/.test(v)) return passo.erro;
  return null;
}

/** "@drluis" e "instagram.com/drluis" viram "drluis". */
export const limparInstagram = (v) =>
  (v || "")
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^@/, "")
    .replace(/[/?].*$/, "");

/**
 * Payload do CRM: id da escolha e rótulo legível lado a lado, para a
 * função serverless não precisar conhecer a trilha.
 */
export function montarPayload({ respostas, leadId, utm, qualificado, motivo, parcial }) {
  const { score, scoreRotulo } = calcularScore(respostas);

  const escolhas = {};
  TRILHA.filter((p) => p.tipo === "chips").forEach((p) => {
    const id = respostas[p.id];
    escolhas[p.id] = id || null;
    escolhas[`${p.id}_label`] = id ? labelOf(p.id, id) : null;
  });

  return {
    evento: parcial ? "lead_partial" : "lead_complete",
    lead_id: leadId,
    origem: "form-gargalo",

    nome: respostas.nome || null,
    email: respostas.email || null,
    telefone: respostas.telefone || null,
    instagram: respostas.instagram ? `@${respostas.instagram}` : null,
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
