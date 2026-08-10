/**
 * Cria no Kommo da Toka os campos personalizados que o formulário de
 * /aplicacao precisa, e grava o mapa de IDs em api/_kommo-campos.json.
 *
 * Roda uma vez e sai. Rodar de novo é seguro: lista o que já existe e
 * só cria o que falta.
 *
 *   KOMMO_SUBDOMAIN=toka KOMMO_ACCESS_TOKEN=... node scripts/kommo-criar-campos.mjs
 *
 * Passe --dry para ver o que seria criado sem tocar na conta.
 */

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const DESTINO = join(RAIZ, "api", "_kommo-campos.json");

const SUBDOMAIN = process.env.KOMMO_SUBDOMAIN;
const TOKEN = process.env.KOMMO_ACCESS_TOKEN;
const DRY = process.argv.includes("--dry");

if (!SUBDOMAIN || !TOKEN) {
  console.error("Faltam KOMMO_SUBDOMAIN e KOMMO_ACCESS_TOKEN no ambiente.");
  process.exit(1);
}

const api = async (caminho, opcoes = {}) => {
  const r = await fetch(`https://${SUBDOMAIN}.kommo.com/api/v4${caminho}`, {
    ...opcoes,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...opcoes.headers,
    },
  });
  if (r.status === 204) return null;
  const corpo = await r.json();
  if (!r.ok) {
    throw new Error(`${r.status} em ${caminho}: ${JSON.stringify(corpo)}`);
  }
  return corpo;
};

/**
 * Os rótulos das opções são exatamente os que o médico vê na tela, para
 * o card no Kommo falar a mesma língua do formulário. Mantidos em sincronia
 * com src/components/aplicacao/spec.js.
 */
const CAMPOS = [
  {
    chave: "procedimento_principal",
    name: "Procedimento principal",
    type: "select",
    enums: [
      "Blefaroplastia",
      "Outras cirurgias faciais (rinoplastia, lifting, otoplastia)",
      "Rejuvenescimento periorbital não cirúrgico (toxina, preenchimento, laser)",
      "Cirurgia plástica corporal",
      "Harmonização facial injetável",
      "Outro",
    ],
  },
  {
    chave: "registro_profissional",
    name: "Registro profissional",
    type: "select",
    enums: [
      "Médico com RQE em Cirurgia Plástica",
      "Médico oftalmologista com atuação em oculoplástica",
      "Médico de outra especialidade que realiza blefaroplastia",
      "Não sou médico",
    ],
  },
  {
    chave: "urgencia",
    name: "Urgência declarada",
    type: "select",
    enums: [
      "Quero resolver imediatamente",
      "Quero resolver nos próximos dias",
      "Quero resolver nas próximas semanas",
      "Estou só pesquisando",
    ],
  },
  {
    chave: "faturamento_mensal",
    name: "Faturamento mensal",
    type: "select",
    enums: [
      "Ainda não faturo",
      "Até R$10 mil",
      "R$10 mil a R$15 mil",
      "R$15 mil a R$30 mil",
      "R$30 mil a R$50 mil",
      "R$50 mil a R$100 mil",
      "R$100 mil a R$200 mil",
      "R$200 mil a R$500 mil",
      "Mais de R$500 mil",
    ],
  },
  {
    chave: "volume_blefaro_mes",
    name: "Blefaroplastias por mês",
    type: "select",
    enums: ["Nenhuma ainda", "1 a 2", "3 a 5", "6 a 10", "Mais de 10"],
  },
  {
    chave: "estrutura_atendimento",
    name: "Estrutura de atendimento",
    type: "select",
    enums: [
      "Opero em centro cirúrgico ou clínica própria",
      "Opero em hospital ou clínica parceira",
      "Sou médico contratado de uma rede ou franquia",
      "Sou dono de uma rede ou franquia de clínicas",
    ],
  },
  {
    chave: "vende_protocolo_completo",
    name: "Vende protocolo completo",
    type: "select",
    enums: [
      "Já vendo o protocolo completo com regularidade",
      "Ainda vendo só a blefaroplastia isolada",
    ],
  },
  {
    chave: "score_rotulo",
    name: "Temperatura do lead",
    type: "select",
    enums: ["frio", "morno", "quente"],
  },
  {
    chave: "motivo_reprovacao",
    name: "Motivo da reprovação",
    type: "select",
    enums: [
      "nao_e_medico",
      "nicho_incompativel",
      "faturamento_abaixo_do_corte",
      "volume_abaixo_do_corte",
      "dono_de_rede",
      "nao_vende_protocolo_completo",
    ],
  },
  { chave: "score", name: "Score da aplicação", type: "numeric" },
  { chave: "instagram", name: "Instagram", type: "text" },
  { chave: "site_atual", name: "Site atual", type: "url" },
  { chave: "desafio_principal", name: "Desafio declarado", type: "textarea" },
  { chave: "lead_id", name: "ID da aplicação", type: "text" },
];

/** Campo que já existe na conta e vamos reaproveitar. */
const REAPROVEITADOS = { investimento_marketing: 2445854 };

const main = async () => {
  const atuais = await api("/leads/custom_fields?limit=250");
  const porNome = new Map(
    (atuais?._embedded?.custom_fields || []).map((c) => [c.name, c])
  );

  const mapa = { ...REAPROVEITADOS };
  const enums = {};
  const criar = [];

  for (const campo of CAMPOS) {
    const existente = porNome.get(campo.name);
    if (existente) {
      mapa[campo.chave] = existente.id;
      if (existente.enums) {
        enums[campo.chave] = Object.fromEntries(
          existente.enums.map((e) => [e.value, e.id])
        );
      }
      console.log(`· já existe  ${campo.name} (${existente.id})`);
      continue;
    }
    criar.push(campo);
  }

  if (!criar.length) {
    console.log("\nNada a criar.");
  } else if (DRY) {
    console.log("\n--dry: seriam criados");
    criar.forEach((c) => console.log(`  + ${c.name} (${c.type})`));
    return;
  } else {
    const corpo = criar.map((c) => ({
      name: c.name,
      type: c.type,
      ...(c.enums ? { enums: c.enums.map((v) => ({ value: v })) } : {}),
    }));

    const resposta = await api("/leads/custom_fields", {
      method: "POST",
      body: JSON.stringify(corpo),
    });

    for (const criado of resposta?._embedded?.custom_fields || []) {
      const campo = criar.find((c) => c.name === criado.name);
      if (!campo) continue;
      mapa[campo.chave] = criado.id;
      if (criado.enums) {
        enums[campo.chave] = Object.fromEntries(
          criado.enums.map((e) => [e.value, e.id])
        );
      }
      console.log(`+ criado    ${criado.name} (${criado.id})`);
    }
  }

  const conteudo = {
    _gerado_por: "scripts/kommo-criar-campos.mjs",
    campos: mapa,
    enums,
  };

  if (DRY) return;
  writeFileSync(DESTINO, `${JSON.stringify(conteudo, null, 2)}\n`);
  console.log(`\nMapa gravado em api/_kommo-campos.json`);
};

main().catch((erro) => {
  console.error(erro.message);
  process.exit(1);
});
