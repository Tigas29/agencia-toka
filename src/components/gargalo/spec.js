/**
 * Trilha da /gargalo: a aplicação da Toka em formato de conversa.
 *
 * Tudo o que o médico lê está aqui, como dado. Mudar uma pergunta, uma
 * fala, um corte ou a ordem é editar este arquivo; o motor em index.jsx
 * não conhece nenhum passo pelo nome.
 *
 * Cada passo tem:
 *   falas      o que o Tiago diz antes de abrir a resposta. `{nome}` e
 *              `{instagram}` são trocados pelo que o médico respondeu.
 *   tipo       texto | telefone | email | instagram | chips | longo
 *   depois     falas soltas logo após a resposta, antes do próximo passo
 *   isMilestone o lead nasce no CRM aqui, antes de qualquer corte
 *   isGate     depois deste passo os cortes são avaliados
 *
 * Os rótulos dos chips são os mesmos do enum no Kommo
 * (api/_kommo-campos.json). Mudar um rótulo aqui exige criar o enum lá.
 *
 * Copy: Workspace/site-toka/04-copy-gargalo.md (gate copy-masters-style).
 * Compliance: CFM 2.336/2023. Fala de agenda, operação e faturamento,
 * nunca de resultado clínico.
 */

export const TOPO = {
  titulo: "Onde está o seu gargalo",
  lgpd: "Ao continuar, você concorda que eu use esses dados para falar com você sobre a sua operação. Nada é repassado a terceiros.",
};

/** Quem fala. A foto entra por aqui quando existir. */
export const AUTOR = {
  nome: "Tiago",
  inicial: "T",
  foto: null,
};

export const ABERTURA = [
  "Oi. Aqui é o Tiago, da Toka.",
  "Se você chegou até aqui, a sua agenda provavelmente depende mais de sorte do que deveria. E eu tenho uma tese sobre isso: **a sua técnica não é o gargalo.** O gargalo está em algum ponto entre quem te procura e quem entra na sua agenda.",
];

export const TRILHA = [
  // ── Contato ────────────────────────────────────────────────────────
  {
    id: "nome",
    tipo: "texto",
    required: true,
    falas: ["Em três minutos eu descubro onde. Vamos lá: como você se chama?"],
    rotulo: "Seu nome",
    placeholder: "Nome e sobrenome",
    erro: "Preciso do nome e do sobrenome.",
  },
  {
    id: "telefone",
    tipo: "telefone",
    required: true,
    falas: [
      "Prazer, **{nome}**. Antes das perguntas, o seu WhatsApp. É por ele que eu te devolvo o que encontrar.",
    ],
    rotulo: "WhatsApp",
    placeholder: "(11) 99999-9999",
    erro: "Coloca o número com DDD.",
  },
  {
    id: "email",
    tipo: "email",
    required: true,
    falas: ["E o seu e-mail. Fica tranquilo: eu também odeio spam."],
    rotulo: "E-mail",
    placeholder: "voce@clinica.com.br",
    erro: "Confere o e-mail, parece que falta alguma coisa.",
  },
  {
    id: "instagram",
    tipo: "instagram",
    required: true,
    isMilestone: true,
    falas: [
      "Agora o @ do seu Instagram. É por ele que eu vou olhar como o paciente te encontra hoje.",
    ],
    rotulo: "Seu @",
    prefixo: "@",
    placeholder: "seuperfil",
    erro: "Só o @, sem o link.",
    depois: ["Anotado. Agora as perguntas que importam."],
  },

  // ── Contexto ───────────────────────────────────────────────────────
  {
    id: "especialidade",
    tipo: "chips",
    required: true,
    falas: ["Qual é a sua especialidade?"],
    choices: [
      { id: "esp_plastica", label: "Cirurgia Plástica", qualifies: true },
      { id: "esp_oftalmo", label: "Oftalmologia", qualifies: true },
      { id: "esp_dermato", label: "Dermatologia", qualifies: true },
      { id: "esp_odonto", label: "Odontologia", qualifies: true },
      { id: "esp_ortopedia", label: "Ortopedia", qualifies: true },
      { id: "esp_gineco", label: "Ginecologia", qualifies: true },
      { id: "esp_outra_medica", label: "Outra especialidade médica", qualifies: true },
      { id: "esp_outra_saude", label: "Outra área da saúde", qualifies: true },
      { id: "esp_nao_saude", label: "Não sou da área da saúde", qualifies: false },
    ],
  },
  {
    id: "faturamento_mensal",
    tipo: "chips",
    required: true,
    falas: [
      "Uma pergunta direta, porque a resposta muda tudo o que vem depois: quanto você faturou no último mês?",
    ],
    // Corte em R$10 mil/mês, o mesmo da /aplicacao (decisão de 10/ago).
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
    id: "origem_paciente",
    tipo: "chips",
    required: true,
    falas: ["Hoje, de onde vem a maior parte dos seus pacientes?"],
    choices: [
      { id: "orig_indicacao", label: "Indicação de paciente ou colega", qualifies: true },
      { id: "orig_instagram", label: "Instagram, sem anúncio", qualifies: true },
      { id: "orig_anuncio", label: "Anúncio (Meta ou Google)", qualifies: true },
      { id: "orig_google", label: "Google, busca e ficha", qualifies: true },
      { id: "orig_convenio", label: "Convênio", qualifies: true },
      { id: "orig_nao_sei", label: "Não sei dizer", qualifies: true },
    ],
  },
  {
    id: "investimento_marketing",
    tipo: "chips",
    required: true,
    falas: [
      "E quanto você investe por mês em marketing, captação e vendas, somando tudo?",
    ],
    // Não corta ninguém. É ancoragem de preço para a conversa.
    choices: [
      { id: "mkt_ate_2k", label: "Menos de R$2.000", qualifies: true, score: 0 },
      { id: "mkt_2_5k", label: "R$2.000 a R$5.000", qualifies: true, score: 1 },
      { id: "mkt_5_10k", label: "R$5.000 a R$10.000", qualifies: true, score: 2 },
      { id: "mkt_10_20k", label: "R$10.000 a R$20.000", qualifies: true, score: 3 },
      { id: "mkt_mais_20k", label: "Mais de R$20.000", qualifies: true, score: 4 },
    ],
  },
  {
    id: "urgencia",
    tipo: "chips",
    required: true,
    falas: ["O quanto isso é urgente pra você?"],
    choices: [
      { id: "urg_imediato", label: "Quero resolver imediatamente", qualifies: true, sdrPriority: 1 },
      { id: "urg_dias", label: "Quero resolver nos próximos dias", qualifies: true, sdrPriority: 2 },
      { id: "urg_semanas", label: "Quero resolver nas próximas semanas", qualifies: true, sdrPriority: 3 },
      { id: "urg_pesquisando", label: "Estou só pesquisando", qualifies: true, sdrPriority: 4 },
    ],
  },
  {
    id: "estrutura_atendimento",
    tipo: "chips",
    required: true,
    isGate: true,
    falas: ["Última pergunta de contexto: como você atende hoje?"],
    choices: [
      { id: "estr_propria", label: "Opero em centro cirúrgico ou clínica própria", qualifies: true },
      { id: "estr_parceira", label: "Opero em hospital ou clínica parceira", qualifies: true },
      { id: "estr_contratado_rede", label: "Sou médico contratado de uma rede ou franquia", qualifies: true },
      { id: "estr_dono_rede", label: "Sou dono de uma rede ou franquia de clínicas", qualifies: false },
    ],
  },

  // ── Fecho ──────────────────────────────────────────────────────────
  {
    id: "desafio_principal",
    tipo: "longo",
    required: false,
    falas: [
      "Pra fechar: se você pudesse resolver uma coisa só na sua operação nos próximos 90 dias, qual seria?",
    ],
    rotulo: "Em uma frase",
    placeholder: "Escreve aqui",
    pular: "Prefiro pular",
  },
];

export const FECHO = {
  aprovado: {
    falas: [
      "**{nome}**, pelo que você me contou, o gargalo não está na sua técnica. Está no caminho entre o paciente e a sua agenda. E isso se resolve em conversa, não em relatório.",
      "O próximo passo é uma conversa curta comigo no WhatsApp. Não é a consultoria: é a conversa que define se ela acontece.",
    ],
    botao: "Continuar no WhatsApp",
  },
  reprovado: {
    falas: [
      "**{nome}**, vou ser direto: hoje a Toka não é o próximo passo certo pra você. Forçar isso não ajudaria, e você perceberia rápido.",
      "Mas tem uma coisa que vale os seus próximos dois minutos.",
    ],
    botao: "Ver o próximo passo",
  },
};

export const WHATSAPP = {
  numero: "5511996865057",
  mensagem: (nome) =>
    `Oi Tiago, sou ${nome || "médico"} e acabei de responder sobre o meu gargalo no site da Toka.`,
};
