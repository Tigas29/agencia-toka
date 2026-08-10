/**
 * Formulário de qualificação · Blefaroplastia (B2B)
 *
 * Tradução do spec normativo em
 * Projects/TOKA COMPANY/toka-blefaroplastia-form-spec.json
 *
 * O spec vive aqui como DADO, não como código. Ajuste de corte de
 * faturamento, de volume mínimo ou de opção é uma linha neste arquivo.
 *
 * Compliance: Resolução CFM 2.336/2023. Toda a copy fala de gestão,
 * agenda e faturamento. Nunca de resultado estético.
 */

export const WELCOME = {
  kicker: "Marketing · Vendas · Operação para médicos especialistas",
  title: "A sua técnica não é o gargalo. A sua operação comercial é.",
  description:
    "A Toka trabalha com médicos que já operam blefaroplastia e querem agenda cirúrgica previsível, sem depender de indicação e sem competir por preço.",
  body: "Nós não atendemos todo mundo. Trabalhamos com um número limitado de médicos por região, porque o método exige entrar dentro da operação, não entregar relatório de tráfego.\n\nAs perguntas a seguir levam menos de três minutos. Responda com precisão: é a partir delas que montamos o seu diagnóstico.",
  buttonText: "Aplicar para uma vaga",
};

/**
 * Prova social. Os cinco depoimentos ainda não foram gravados, então as
 * telas nascem com enabled: false e o motor as pula. Quando o vídeo
 * existir, colar a URL e virar a flag. Nenhuma outra mudança é necessária.
 *
 * Obrigatório: médico falando de gestão e faturamento. Nunca paciente
 * falando de resultado estético (CFM 2.336/2023).
 */
const PROVA_SOCIAL = [
  {
    id: "prova_social_1",
    objecao: "Agência é tudo promessa",
    title:
      "O médico que queria parceria de verdade, não relatório de tráfego. Hoje recebe paciente que chega pré-qualificado.",
    buttonText: "É isso que eu quero",
  },
  {
    id: "prova_social_2",
    objecao: "Já faturo bem, meu problema é preço",
    title:
      "O cirurgião que competia por preço no procedimento isolado. Hoje vende o protocolo completo do olhar.",
    buttonText: "É isso que eu preciso também",
  },
  {
    id: "prova_social_3",
    objecao: "Minha agenda é instável",
    title:
      "A agenda cirúrgica que furava todo mês baixo. Hoje tem previsibilidade mês a mês.",
    buttonText: "Estou pronto para crescer",
  },
  {
    id: "prova_social_4",
    objecao: "Já tentei várias agências e cursos",
    title:
      "Passou por várias agências e o gargalo continuava no mesmo lugar. Hoje tem operação da captação ao pós-operatório.",
    buttonText: "Estou pronto para crescer",
  },
  {
    id: "prova_social_5",
    objecao: "Vivo de indicação, não preciso de tráfego",
    title:
      "Faturava alto só com indicação e nunca teve resultado com tráfego. Escalou com método de venda de alto ticket.",
    buttonText: "Quero resultados como esse",
  },
].map((caso) => ({
  ...caso,
  block: "prova_social",
  type: "statement_video",
  enabled: false,
  videoUrl: null,
}));

export const FIELDS = [
  // ── Bloco A · Qualificação dura ────────────────────────────────────
  {
    id: "procedimento_principal",
    block: "qualificacao",
    type: "multiple_choice",
    required: true,
    title: "Qual procedimento representa a maior parte do seu faturamento hoje?",
    choices: [
      { id: "proc_blefaro", label: "Blefaroplastia", qualifies: true },
      {
        id: "proc_facial_cirurgica",
        label: "Outras cirurgias faciais (rinoplastia, lifting, otoplastia)",
        qualifies: true,
      },
      {
        id: "proc_periorbital_nao_cirurgico",
        label:
          "Rejuvenescimento periorbital não cirúrgico (toxina, preenchimento, laser)",
        qualifies: true,
      },
      { id: "proc_corporal", label: "Cirurgia plástica corporal", qualifies: false },
      { id: "proc_harmonizacao", label: "Harmonização facial injetável", qualifies: false },
      { id: "proc_outro", label: "Outro", qualifies: false },
    ],
  },
  {
    id: "registro_profissional",
    block: "qualificacao",
    type: "multiple_choice",
    required: true,
    title: "Qual é a sua formação e o seu registro?",
    choices: [
      { id: "reg_rqe_plastica", label: "Médico com RQE em Cirurgia Plástica", qualifies: true },
      {
        id: "reg_oftalmo_oculoplastica",
        label: "Médico oftalmologista com atuação em oculoplástica",
        qualifies: true,
      },
      {
        id: "reg_medico_outra",
        label: "Médico de outra especialidade que realiza blefaroplastia",
        qualifies: true,
      },
      { id: "reg_nao_medico", label: "Não sou médico", qualifies: false },
    ],
  },
  {
    id: "urgencia",
    block: "qualificacao",
    type: "multiple_choice",
    required: true,
    affectsRouting: false,
    title:
      "O quanto é urgente resolver a captação de pacientes e a lucratividade da sua agenda cirúrgica?",
    // Não desqualifica ninguém, nem "só pesquisando". Define a prioridade
    // do lead na fila do SDR e, na fase 2, a janela de agendamento.
    choices: [
      { id: "urg_imediato", label: "🔴 Quero resolver imediatamente", qualifies: true, sdrPriority: 1 },
      { id: "urg_dias", label: "🟠 Quero resolver nos próximos dias", qualifies: true, sdrPriority: 2 },
      { id: "urg_semanas", label: "🟡 Quero resolver nas próximas semanas", qualifies: true, sdrPriority: 3 },
      { id: "urg_pesquisando", label: "🟢 Estou só pesquisando", qualifies: true, sdrPriority: 4 },
    ],
  },
  {
    id: "investimento_marketing",
    block: "qualificacao",
    type: "multiple_choice",
    required: true,
    affectsRouting: false,
    title: "Quanto você investe por mês em marketing, captação e vendas, somando tudo?",
    // Não desqualifica. É ancoragem de preço para o closer.
    choices: [
      { id: "mkt_ate_2k", label: "Menos de R$2.000", qualifies: true },
      { id: "mkt_2_5k", label: "R$2.000 a R$5.000", qualifies: true },
      { id: "mkt_5_10k", label: "R$5.000 a R$10.000", qualifies: true },
      { id: "mkt_10_20k", label: "R$10.000 a R$20.000", qualifies: true },
      { id: "mkt_mais_20k", label: "Mais de R$20.000", qualifies: true },
    ],
  },
  {
    id: "faturamento_mensal",
    block: "qualificacao",
    type: "multiple_choice",
    required: true,
    title: "Qual foi o seu faturamento médio no último mês?",
    // Corte em R$10 mil/mês, decisão do Tiago em 10/ago/2026.
    // Para mexer no corte: virar o `qualifies` da faixa e ajustar a
    // lista `faturamento_abaixo_do_corte` em engine.js.
    choices: [
      { id: "fat_zero", label: "Ainda não faturo", qualifies: false, score: 0 },
      { id: "fat_ate_10", label: "Até R$10 mil", qualifies: false, score: 0 },
      { id: "fat_10_15", label: "R$10 mil a R$15 mil", qualifies: true, score: 1 },
      { id: "fat_15_30", label: "R$15 mil a R$30 mil", qualifies: true, score: 2 },
      { id: "fat_30_50", label: "R$30 mil a R$50 mil", qualifies: true, score: 3 },
      { id: "fat_50_100", label: "R$50 mil a R$100 mil", qualifies: true, score: 4 },
      { id: "fat_100_200", label: "R$100 mil a R$200 mil", qualifies: true, score: 5 },
      { id: "fat_200_500", label: "R$200 mil a R$500 mil", qualifies: true, score: 6 },
      { id: "fat_mais_500", label: "Mais de R$500 mil", qualifies: true, score: 7 },
    ],
  },
  {
    id: "volume_blefaro_mes",
    block: "qualificacao",
    type: "multiple_choice",
    required: true,
    title: "Quantas blefaroplastias você realiza por mês, em média?",
    choices: [
      { id: "vol_zero", label: "Nenhuma ainda", qualifies: false, score: 0 },
      { id: "vol_1_2", label: "1 a 2", qualifies: false, score: 1 },
      { id: "vol_3_5", label: "3 a 5", qualifies: true, score: 2 },
      { id: "vol_6_10", label: "6 a 10", qualifies: true, score: 3 },
      { id: "vol_mais_10", label: "Mais de 10", qualifies: true, score: 4 },
    ],
  },

  // ── Bloco B · Prova social ─────────────────────────────────────────
  ...PROVA_SOCIAL,

  // ── Bloco C · Contato ──────────────────────────────────────────────
  {
    id: "nome",
    block: "contato",
    type: "short_text",
    required: true,
    title: "Qual é o seu nome?",
    placeholder: "Nome e sobrenome",
  },
  {
    id: "telefone",
    block: "contato",
    type: "phone",
    required: true,
    title: "Qual o melhor número de WhatsApp para falarmos com você?",
    placeholder: "(11) 99999-9999",
  },
  {
    id: "email",
    block: "contato",
    type: "email",
    required: true,
    title: "Qual é o seu melhor e-mail?",
    description: "Fique tranquilo. Também odiamos spam.",
    placeholder: "voce@clinica.com.br",
  },
  {
    id: "instagram",
    block: "contato",
    type: "short_text",
    required: true,
    isMilestone: true, // ← ponto de captura do lead
    title: "Qual é o @ do seu Instagram, para os nossos especialistas analisarem o seu perfil?",
    description: "Por exemplo: @toka.med",
    placeholder: "@seuperfil",
  },
  {
    id: "site_atual",
    block: "contato",
    type: "short_text",
    required: false,
    title: "Você tem site ou landing page hoje? Cole o link.",
    description: "Opcional. Serve de matéria-prima para o diagnóstico.",
    placeholder: "https://",
  },

  // ── Bloco D · Gates ────────────────────────────────────────────────
  // Aqui, e só aqui, os filtros duros são avaliados de forma retroativa.
  // O contato já está na base antes de qualquer eliminação.
  {
    id: "estrutura_atendimento",
    block: "gate",
    type: "multiple_choice",
    required: true,
    isGate: true,
    warning: "Atenção",
    title:
      "A Toka atende médicos que operam com estrutura própria ou parceira. Não atendemos redes e franquias.",
    choices: [
      { id: "estr_propria", label: "Opero em centro cirúrgico ou clínica própria", qualifies: true },
      { id: "estr_parceira", label: "Opero em hospital ou clínica parceira", qualifies: true },
      { id: "estr_contratado_rede", label: "Sou médico contratado de uma rede ou franquia", qualifies: true },
      { id: "estr_dono_rede", label: "Sou dono de uma rede ou franquia de clínicas", qualifies: false },
    ],
  },
  {
    id: "vende_protocolo_completo",
    block: "gate",
    type: "multiple_choice",
    required: true,
    isGate: true,
    warning: "Atenção",
    title:
      "O programa é para médicos que já vendem o protocolo completo do olhar, não procedimentos isolados.",
    choices: [
      { id: "prot_sim", label: "Já vendo o protocolo completo com regularidade", qualifies: true },
      { id: "prot_nao", label: "Ainda vendo só a blefaroplastia isolada", qualifies: false },
    ],
  },

  // ── Bloco E · Finalização ──────────────────────────────────────────
  {
    id: "desafio_principal",
    block: "final",
    type: "long_text",
    required: false,
    title: "Descreva o principal desafio que você quer resolver com a Toka.",
    description: "Opcional. É o que o nosso time lê antes de falar com você.",
    placeholder: "Escreva aqui",
  },
];

export const SCREENS = {
  aprovado: {
    kicker: "Perfil aprovado",
    title: "O seu perfil passou na nossa triagem.",
    body: "As suas respostas indicam compatibilidade alta com os médicos que hoje têm os melhores resultados com a gente.\n\nO próximo passo é uma conversa curta com o nosso time. Ela não é a consultoria. É a conversa que define se a consultoria acontece.\n\nQuem passa nessa etapa tem a consultoria de uma hora agendada na hora, com um especialista em crescimento de clínicas cirúrgicas. A agenda dele é restrita, e é exatamente por isso que existe a triagem.",
    buttonText: "Falar com o time agora",
  },
  reprovado: {
    kicker: "Ainda não",
    title: "Ainda não é a hora de trabalharmos juntos.",
    body: "O nosso programa foi desenhado para quem já vende o protocolo completo do olhar com regularidade. Forçar essa etapa não ajudaria você e não seria honesto da nossa parte.\n\nPara quem ainda opera blefaroplastia como procedimento isolado, montamos um material que mostra como sair da guerra de preço do procedimento avulso e estruturar a primeira oferta de protocolo completo.\n\nImportante: não é mentoria.",
    buttonText: "Quero conhecer",
  },
};

/** Campos efetivamente exibidos. Prova social sem vídeo fica de fora. */
export const activeFields = () =>
  FIELDS.filter((f) => f.type !== "statement_video" || f.enabled);
