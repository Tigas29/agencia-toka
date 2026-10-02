/**
 * Copy da /protocolo/:nicho/demo, um objeto por nicho.
 * Texto vindo de Workspace/ana/lowticket-saude/demo/copy-demo.md (Teo,
 * 02/out/2026), sem reescrita. So `alemTitulo` e o rotulo das folhas
 * ("Pagina N de 4") sao nossos: vieram do briefing, nao da copy.
 */
const DEMO = {
  fisio: {
    kicker: "Demo · fisioterapeutas",
    titulo: "A proposta por dentro, para você testar com os seus números",
    sub: "Troque o seu nome, o da paciente, a sessão avulsa e os valores das três opções. As quatro páginas se refazem com o que você digitou.",
    dica: "Toque no campo marcado e digite o seu.",
    etiqueta: "Exemplo fictício",
    reset: "Voltar ao exemplo",
    alemDaProposta: [
      "Mensagens prontas para o “vou pensar”, as objeções e a renovação",
      "Guia de uma página para usar na próxima avaliação",
      "Aula de 30 minutos, em gravação, liberada até 6 de outubro",
    ],
    final: {
      titulo: "Para usar na sua próxima avaliação, leve a versão editável",
      cta: "Quero o protocolo por R$ 27",
      micro: "Google Slides, PPTX para Canva e PDF · 7 dias de garantia",
    },
    seo: { title: "Proposta de plano para fisioterapeutas: veja por dentro" },
    og: { description: "Abra as 4 páginas da proposta e teste com o seu nome e os seus valores. Modelo de plano para fisioterapeutas." },
  },
  pilates: {
    kicker: "Demo · instrutoras de pilates",
    titulo: "A proposta por dentro, para você testar com os seus números",
    sub: "Troque o seu nome, o da aluna, a aula avulsa e a mensalidade das três opções. As quatro páginas se refazem com o que você digitou.",
    dica: "Toque no campo marcado e digite o seu.",
    etiqueta: "Exemplo fictício",
    reset: "Voltar ao exemplo",
    alemDaProposta: [
      "Mensagens prontas para o “vou ver minha agenda”, as objeções e a renovação",
      "Guia de uma página para usar na próxima aula experimental",
      "Aula de 30 minutos, em gravação, liberada até 6 de outubro",
    ],
    final: {
      titulo: "Para usar na sua próxima aula experimental, leve a versão editável",
      cta: "Quero o protocolo por R$ 27",
      micro: "Google Slides, PPTX para Canva e PDF · 7 dias de garantia",
    },
    seo: { title: "Proposta de plano para instrutoras de pilates: por dentro" },
    og: { description: "Abra as 4 páginas da proposta e teste com o seu nome e a sua mensalidade. Modelo de plano para pilates." },
  },
  estetica: {
    kicker: "Demo · esteticistas",
    titulo: "A proposta por dentro, para você testar com os seus números",
    sub: "Troque o seu nome, o da cliente, a sessão avulsa e os valores das três opções. As quatro páginas se refazem com o que você digitou.",
    dica: "Toque no campo marcado e digite o seu.",
    etiqueta: "Exemplo fictício",
    reset: "Voltar ao exemplo",
    alemDaProposta: [
      "Mensagens prontas para o “vou pensar”, as objeções e a renovação",
      "Guia de uma página para usar na próxima avaliação",
      "Aula de 30 minutos, em gravação, liberada até 6 de outubro",
    ],
    final: {
      titulo: "Para usar na sua próxima avaliação, leve a versão editável",
      cta: "Quero o protocolo por R$ 27",
      micro: "Google Slides, PPTX para Canva e PDF · 7 dias de garantia",
    },
    seo: { title: "Proposta de pacote para esteticistas: veja por dentro" },
    og: { description: "Abra as 4 páginas da proposta e teste com o seu nome e os seus valores. Modelo de pacote para esteticistas." },
  },
};

export const ALEM_TITULO = "Além da proposta";

export function buscarDemo(nicho) {
  return Object.hasOwn(DEMO, nicho) ? DEMO[nicho] : null;
}

/* O OG roda no servidor (api/og-protocolo.js) e le este mesmo objeto. */
export default DEMO;
