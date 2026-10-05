/**
 * Copy da /protocolo/:nicho/demo (v3, tour guiado em 5 passos), um objeto por
 * nicho. Texto vindo de Workspace/ana/lowticket-saude/demo/copy-demo-v3.md
 * (Teo, 02/out/2026), verbatim. So os hex das paletas, o selo do bloco do
 * guia e os rotulos "Pagina n" da abertura (canvas E1) sao nossos.
 *
 * Fichas por nicho sao lidas tambem pelo servidor (api/og-protocolo.js, que
 * usa so seo.title e og.description): este arquivo nao pode importar nada do
 * navegador. seo/og vem da v2 e nao mudam (o card de previa nao se mexe).
 */

const COMUM = {
  proximo: "Próximo",
  voltar: "Voltar",
  pular: "Ir direto ao resultado",
  abertura: { cta: "Começar o passo a passo" },
  pronta: {
    baixar: "Baixar PDF de demonstração",
    baixarNota: "O PDF sai com a marca DEMONSTRAÇÃO em todas as páginas.",
    guiaSelo: "Exemplo · das mensagens prontas do protocolo",
  },
  exportar: {
    marcaDagua: "DEMONSTRAÇÃO",
    faixa: "Demonstração. A versão editável, sem marca, está no Protocolo de Proposta (tokacompany.com.br/protocolo)",
    avisoInstagram: "O navegador do Instagram não baixa PDF. Toque em ⋯ e abra no Safari ou no Chrome.",
  },
  oferta: {
    titulo: "A versão editável, sem marca, de R$ 47 por R$ 27",
    itens: [
      "Google Slides, PPTX para Canva e PDF, mensagens prontas e aula de 30 min em gravação, liberada em até 5 dias após a compra.",
    ],
    cta: "Quero o protocolo por R$ 27",
    micro: "7 dias de garantia · De R$ 47 por R$ 27",
  },
};

const DEMO = {
  fisio: {
    ...COMUM,
    slug: "fisio",
    pessoa: "a paciente",
    abertura: { ...COMUM.abertura, titulo: "Monte a sua proposta de plano em 5 passos", sub: "Cada passo mostra uma parte da proposta e diz por que ela ajuda a paciente a decidir. Leva cerca de 1 minuto." },
    passos: [
      { rotulo: "Capa", titulo: "Coloque o seu nome e o seu logo na capa", porque: "A paciente leva o papel para casa. A capa diz de quem é o plano, e é esse nome que ela procura para responder.", campo: "Seu nome e sobrenome", campoLogo: "Enviar o seu logo (fica só no seu aparelho)" },
      { rotulo: "A frase dela", titulo: "Escolha um caso e veja a frase da paciente", porque: "A página 2 abre com a queixa nas palavras dela. Ao ler a própria frase no papel, ela vê que foi ouvida.", campo: "Escolha um caso" },
      { rotulo: "As 3 opções", titulo: "Diga quanto você cobra por sessão avulsa", porque: "As três opções saem desse valor, e a do meio é a recomendada. A pergunta dela passa a ser qual delas.", campo: "Valor da sessão avulsa (R$)", apoio: "Depois você ajusta cada valor." },
      {
        rotulo: "Regras e cor",
        titulo: "Confira as regras por escrito e escolha a cor",
        porque: "Falta e remarcação escritas mostram cuidado com o horário dela, e o próximo passo já vem combinado.",
        campo: "Cor da proposta",
        paletas: [
        { nome: "Verde-sálvia", hex: "#5B7F6B" },
        { nome: "Azul-petróleo", hex: "#1F5A6B" },
        { nome: "Terracota", hex: "#A9553A" },
        { nome: "Grafite", hex: "#3A3D44" },
      ],
      },
    ],
    pronta: {
      ...COMUM.pronta,
      titulo: "Pronta: a sua proposta de plano, inteira",
      sub: "São 4 páginas, com o seu nome e os seus valores. Role para ver cada uma e baixe o PDF.",
      guiaTitulo: "O que dizer depois do \"vou pensar\"",
      guiaSub: "Veja um exemplo de conversa conduzida com as mensagens prontas que vêm no protocolo.",
    },
    seo: { title: "Monte a sua proposta de plano em 1 minuto: fisioterapeutas" },
    og: { description: "Responda quatro perguntas e veja a proposta de plano de tratamento pronta, com o seu nome e os seus valores." },
  },
  estetica: {
    ...COMUM,
    slug: "estetica",
    pessoa: "a cliente",
    abertura: { ...COMUM.abertura, titulo: "Monte a sua proposta de protocolo em 5 passos", sub: "Cada passo mostra uma parte da proposta e diz por que ela ajuda a cliente a decidir. Leva cerca de 1 minuto." },
    passos: [
      { rotulo: "Capa", titulo: "Coloque o seu nome e o seu logo na capa", porque: "A cliente leva o papel para casa. A capa diz de quem é o protocolo, e é esse nome que ela procura para responder.", campo: "Seu nome e sobrenome", campoLogo: "Enviar o logo do estúdio (fica só no seu aparelho)" },
      { rotulo: "A frase dela", titulo: "Escolha um caso e veja a frase da cliente", porque: "A página 2 abre com o que a trouxe até você, nas palavras dela. Ao ler a própria frase, ela vê que foi ouvida.", campo: "Escolha um caso" },
      { rotulo: "As 3 opções", titulo: "Diga quanto você cobra por sessão avulsa", porque: "As três opções saem desse valor, e a do meio é a recomendada. A pergunta dela passa a ser qual delas.", campo: "Valor da sessão avulsa (R$)", apoio: "Depois você ajusta cada valor." },
      {
        rotulo: "Regras e cor",
        titulo: "Confira as regras por escrito e escolha a cor",
        porque: "Falta e remarcação escritas mostram cuidado com o horário dela, e o próximo passo já vem combinado.",
        campo: "Cor da proposta",
        paletas: [
        { nome: "Rosé", hex: "#B0646F" },
        { nome: "Nude", hex: "#A07C6A" },
        { nome: "Vinho", hex: "#7A2E45" },
        { nome: "Grafite", hex: "#3A3D44" },
      ],
      },
    ],
    pronta: {
      ...COMUM.pronta,
      titulo: "Pronta: a sua proposta de protocolo, inteira",
      sub: "São 4 páginas, com o seu nome e os seus valores. Role para ver cada uma e baixe o PDF.",
      guiaTitulo: "O que dizer depois do \"vou pensar\"",
      guiaSub: "Veja um exemplo de conversa conduzida com as mensagens prontas que vêm no protocolo.",
    },
    seo: { title: "Monte a sua proposta de pacote em 1 minuto: esteticistas" },
    og: { description: "Responda quatro perguntas e veja a proposta do seu protocolo pronta, com o seu nome e os seus valores." },
  },
  pilates: {
    ...COMUM,
    slug: "pilates",
    pessoa: "a aluna",
    abertura: { ...COMUM.abertura, titulo: "Monte a sua proposta de plano em 5 passos", sub: "Cada passo mostra uma parte da proposta e diz por que ela ajuda a aluna a decidir. Leva cerca de 1 minuto." },
    passos: [
      { rotulo: "Capa", titulo: "Coloque o seu nome e o seu logo na capa", porque: "A aluna leva o papel para casa. A capa diz de quem é o plano, e é esse nome que ela procura para responder.", campo: "Seu nome e sobrenome", campoLogo: "Enviar o logo do studio (fica só no seu aparelho)" },
      { rotulo: "A frase dela", titulo: "Escolha um caso e veja a frase da aluna", porque: "A página 2 abre com o que a trouxe até você, nas palavras dela. Ao ler a própria frase, ela vê que foi ouvida.", campo: "Escolha um caso" },
      { rotulo: "As 3 opções", titulo: "Diga quanto você cobra por aula avulsa", porque: "As três mensalidades saem desse valor, e a do meio é a recomendada. A pergunta dela passa a ser qual delas.", campo: "Valor da aula avulsa (R$)", apoio: "Depois você ajusta cada valor." },
      {
        rotulo: "Regras e cor",
        titulo: "Confira as regras por escrito e escolha a cor",
        porque: "Reposição e trancamento escritos mostram cuidado com o horário dela, e o próximo passo já vem combinado.",
        campo: "Cor da proposta",
        paletas: [
        { nome: "Areia", hex: "#9A7B4F" },
        { nome: "Verde-oliva", hex: "#6B7344" },
        { nome: "Rosé", hex: "#B0646F" },
        { nome: "Grafite", hex: "#3A3D44" },
      ],
      },
    ],
    pronta: {
      ...COMUM.pronta,
      titulo: "Pronta: a sua proposta de plano, inteira",
      sub: "São 4 páginas, com o seu nome e a sua mensalidade. Role para ver cada uma e baixe o PDF.",
      guiaTitulo: "O que dizer depois do \"vou ver minha agenda\"",
      guiaSub: "Veja um exemplo de conversa conduzida com as mensagens prontas que vêm no protocolo.",
    },
    seo: { title: "Monte a sua proposta de plano em 1 minuto: instrutoras de pilates" },
    og: { description: "Responda quatro perguntas e veja a proposta do plano de aulas pronta, com o seu nome e a sua mensalidade." },
  },
};

export function buscarDemo(nicho) {
  return Object.hasOwn(DEMO, nicho) ? DEMO[nicho] : null;
}

/* O OG roda no servidor (api/og-protocolo.js) e le este mesmo objeto. */
export default DEMO;
