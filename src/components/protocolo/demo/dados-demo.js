/**
 * Copy da /protocolo/:nicho/demo (v2, formato conversa), um objeto por nicho.
 * Texto vindo de Workspace/ana/lowticket-saude/demo/copy-demo-v2.md (Teo,
 * 02/out/2026) e de lowticket-saude/guia/exemplos.md (secoes "Demo" e
 * "Oferta v3"), sem reescrita. So os nomes das cores em hex e os rotulos
 * de passo sao nossos.
 *
 * Fichas por nicho sao lidas tambem pelo servidor (api/og-protocolo.js):
 * este arquivo nao pode importar nada do navegador.
 *
 * Tokens: {nomeCaso} = primeiro nome do caso escolhido, {seuNome} = primeiro
 * nome que a pessoa digitou, {pessoa} = "a paciente" / "a cliente" /
 * "a aluna", {nome} = primeiro nome do caso (guia).
 */

const FRASES_COMUNS = {
  nome: { pergunta: "Como você assina a sua proposta?", placeholder: "Seu nome e sobrenome" },
  caso: { pergunta: "Com qual caso você quer ver a proposta montada?" },
  revelacao: {
    titulo: "Pronto: estas são as quatro páginas da sua proposta",
    mensagem:
      "Oi, {nomeCaso}, é a {seuNome}. Te mando aqui a proposta que a gente viu hoje, para você ter no celular. Se aparecer alguma dúvida em casa, me pergunta por aqui.",
    anexo: "a proposta em PDF",
  },
  exportar: {
    botao: "Baixar a proposta em PDF",
    marcaDagua: "DEMONSTRAÇÃO",
    faixa: "Demonstração. A versão editável, sem marca, está no Protocolo de Proposta (tokacompany.com.br/protocolo)",
    avisoInstagram: "O navegador do Instagram não baixa PDF. Toque em ⋯ e abra no Safari ou no Chrome.",
  },
  guia: {
    intro:
      "Na versão completa, você cola a conversa com {pessoa} ou grava um áudio, e o guia monta a condução do fechamento. Agora eu mostro num exemplo.",
    exemploRotulo: "Conversa de exemplo: {nome}",
    montando: "Montando a sua condução…",
    campoBloqueado: "Cole a conversa aqui. Disponível na versão completa.",
  },
  oferta: {
    titulo: "Gostou? A versão editável, sem marca d'água, sai por R$ 27",
    botao: "Quero o protocolo por R$ 27",
    micro: "De R$ 47 por R$ 27 · Google Slides, PPTX e PDF · 7 dias de garantia",
  },
};

const ITENS_VOU_PENSAR =
  "Vem com as mensagens prontas para o “vou pensar”, uma aula de 30 minutos (em gravação, até 6/10) e o guia de fechamento com IA para o seu caso.";

const DEMO = {
  fisio: {
    ...FRASES_COMUNS,
    slug: "fisio",
    pessoa: "a paciente",
    abertura: "Responda quatro perguntas e veja a sua proposta de plano ficar pronta em 1 minuto.",
    nome: { ...FRASES_COMUNS.nome, logo: "Quer o seu logo na capa? Ele fica só no seu aparelho." },
    avulsa: {
      pergunta: "Quanto você cobra por uma sessão avulsa?",
      apoio: "As três opções saem da avulsa. Depois você ajusta cada valor.",
    },
    cor: {
      pergunta: "Que cor combina com o seu atendimento?",
      paletas: [
        { nome: "Verde-sálvia", hex: "#5B7F6B" },
        { nome: "Azul-petróleo", hex: "#1F5A6B" },
        { nome: "Terracota", hex: "#A9553A" },
        { nome: "Grafite", hex: "#3A3D44" },
      ],
    },
    revelacao: {
      ...FRASES_COMUNS.revelacao,
      legenda: "Na mesma noite, no celular de {nomeCaso}: a mensagem pronta que acompanha a proposta.",
    },
    oferta: { ...FRASES_COMUNS.oferta, itens: ITENS_VOU_PENSAR },
    seo: { title: "Monte a sua proposta de plano em 1 minuto: fisioterapeutas" },
    og: { description: "Responda quatro perguntas e veja a proposta de plano de tratamento pronta, com o seu nome e os seus valores." },
  },
  pilates: {
    ...FRASES_COMUNS,
    slug: "pilates",
    pessoa: "a aluna",
    abertura: "Responda quatro perguntas e veja a proposta do seu plano de aulas pronta em 1 minuto.",
    nome: { ...FRASES_COMUNS.nome, logo: "Quer o logo do studio na capa? Ele fica só no seu aparelho." },
    avulsa: {
      pergunta: "Quanto você cobra por uma aula avulsa?",
      apoio: "As três mensalidades saem da avulsa. Depois você ajusta cada valor.",
    },
    cor: {
      pergunta: "Que cor combina com o seu studio?",
      /* Hex nossos: o copy so da os nomes. */
      paletas: [
        { nome: "Areia", hex: "#9A7B4F" },
        { nome: "Verde-oliva", hex: "#6B7344" },
        { nome: "Rosé", hex: "#B0646F" },
        { nome: "Grafite", hex: "#3A3D44" },
      ],
    },
    revelacao: {
      ...FRASES_COMUNS.revelacao,
      legenda: "Na mesma noite, no celular de {nomeCaso}: a mensagem pronta que acompanha a proposta.",
    },
    oferta: {
      ...FRASES_COMUNS.oferta,
      itens:
        "Vem com as mensagens prontas para o “vou ver minha agenda”, uma aula de 30 minutos (em gravação, até 6/10) e o guia de fechamento com IA para o seu caso.",
    },
    seo: { title: "Monte a sua proposta de plano em 1 minuto: instrutoras de pilates" },
    og: { description: "Responda quatro perguntas e veja a proposta do plano de aulas pronta, com o seu nome e a sua mensalidade." },
  },
  estetica: {
    ...FRASES_COMUNS,
    slug: "estetica",
    pessoa: "a cliente",
    abertura: "Responda quatro perguntas e veja a proposta do seu protocolo ficar pronta em 1 minuto.",
    nome: { ...FRASES_COMUNS.nome, logo: "Quer o logo do estúdio na capa? Ele fica só no seu aparelho." },
    avulsa: {
      pergunta: "Quanto você cobra por uma sessão avulsa?",
      apoio: "As três opções saem da avulsa. Depois você ajusta cada valor.",
    },
    cor: {
      pergunta: "Que cor combina com o seu estúdio?",
      paletas: [
        { nome: "Rosé", hex: "#B0646F" },
        { nome: "Nude", hex: "#A07C6A" },
        { nome: "Vinho", hex: "#7A2E45" },
        { nome: "Grafite", hex: "#3A3D44" },
      ],
    },
    revelacao: {
      ...FRASES_COMUNS.revelacao,
      legenda: "Na mesma noite, no celular de {nomeCaso}: a mensagem pronta que acompanha a proposta.",
    },
    oferta: { ...FRASES_COMUNS.oferta, itens: ITENS_VOU_PENSAR },
    seo: { title: "Monte a sua proposta de pacote em 1 minuto: esteticistas" },
    og: { description: "Responda quatro perguntas e veja a proposta do seu protocolo pronta, com o seu nome e os seus valores." },
  },
};

export function buscarDemo(nicho) {
  return Object.hasOwn(DEMO, nicho) ? DEMO[nicho] : null;
}

/* O OG roda no servidor (api/og-protocolo.js) e le este mesmo objeto. */
export default DEMO;
