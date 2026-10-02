/**
 * Conteudo da proposta de 4 paginas e o exemplo ficticio de cada nicho.
 * Texto de Workspace/ana/lowticket-saude/produto/{fisio,pilates,estetica}.md,
 * secoes 1 e 1b, sem reescrita. Onde o original deixa um campo entre
 * colchetes numa regra da pagina 4, entra o valor-padrao que o proprio
 * documento sugere (24 horas, 30 dias, 12 horas...). Os tres que o
 * documento nao fixa (forma de pagamento, sessao da reavaliacao, mes do
 * reajuste) estao marcados com INFERIDO e listados no relatorio da entrega.
 *
 * "{qtd}" nos textos das opcoes vira o campo editavel da quantidade.
 */

const FISIO = {
  tituloCapa: "Proposta do seu plano",
  pessoa: "Paciente",
  dataRotulo: "Avaliação feita em",
  data: "24/set",
  profissao: "Fisioterapeuta",
  registro: "CREFITO 00000-F",
  contato: "Endereço do atendimento · (00) 00000-0000",
  avulsaRotulo: "sessão",
  avaliacao: {
    titulo: "O que eu vi na sua avaliação",
    trouxe: "Dor nas costas que piora no fim do dia e já me fez desistir da caminhada.",
    achadosRotulo: "O que eu encontrei",
    achados: [
      "A musculatura que sustenta a sua lombar cansa antes do fim do dia.",
      "Dobrar o tronco dói a partir da metade do movimento.",
      "O quadril direito está mais rígido que o esquerdo.",
    ],
    trabalhar: [
      "Ganhar resistência nas costas para aguentar o dia de trabalho.",
      "Voltar a abaixar para pegar coisas do chão com segurança.",
      "Retomar a caminhada com acompanhamento.",
    ],
    fecho: "Cada corpo responde no seu tempo. Na reavaliação a gente confere o que mudou e ajusta o plano.",
  },
  plano: {
    titulo: "O seu plano",
    modo: "parcelado",
    rodape: "Nos planos, a sessão sai por menos porque você se compromete com o plano inteiro.",
    avulsaPrefixo: "A sessão avulsa custa",
    opcoes: [
      { titulo: "2x por semana", detalhe: ["8 semanas", "{qtd} sessões"], quem: "Para quem pode vir duas vezes por semana.", qtd: "16", valor: "2080", parcelas: "4" },
      { titulo: "3x por semana", detalhe: ["8 semanas", "{qtd} sessões"], quem: "A dor aparece no fim do dia, e três encontros por semana dão à musculatura o estímulo que ela precisa para aguentar o dia inteiro.", qtd: "24", valor: "2880", parcelas: "6", recomendada: true },
      { titulo: "1x por semana", detalhe: ["12 semanas", "{qtd} sessões"], quem: "Para quem só consegue vir uma vez por semana. O ritmo é mais lento.", qtd: "12", valor: "1620", parcelas: "3" },
    ],
    avulsa: "150",
  },
  regras: {
    titulo: "Como funciona e o próximo passo",
    itens: [
      ["Remarcação.", "Se precisar remarcar, me avise com 24 horas de antecedência pelo WhatsApp. A sessão é reposta dentro do período do plano."],
      ["Falta sem aviso.", "Conta como sessão feita. Imprevisto sério a gente conversa."],
      ["Pausa.", "Se você precisar parar por motivo de saúde, com atestado, o plano pausa por até 30 dias."],
      /* INFERIDO: o original deixa a forma de pagamento entre colchetes. */
      ["Pagamento.", "Pix à vista ou cartão em até 6 vezes."],
      /* INFERIDO: o numero da sessao da reavaliacao. */
      ["Reavaliação.", "Na sessão 12 eu refaço a avaliação e a gente decide junto os próximos passos."],
    ],
    proximo: "É só me dizer qual opção faz sentido para você. Tenho horário para começar em segunda 28/set às 8h ou em quarta 30/set às 18h, e seguro esses horários até sábado 26/set.",
  },
};

const ESTETICA = {
  tituloCapa: "Proposta do seu protocolo",
  pessoa: "Cliente",
  dataRotulo: "Avaliação feita em",
  data: "24/set",
  profissao: "Esteticista",
  registro: "",
  contato: "Endereço do estúdio · (00) 00000-0000",
  avaliacao: {
    titulo: "O que eu vi na sua avaliação",
    trouxe: "Manchas no rosto que aparecem mais no verão e não saem com nada que eu já usei em casa.",
    achadosRotulo: "O que eu encontrei",
    achados: [
      "A oleosidade está mais concentrada na testa, no nariz e no queixo.",
      "As manchas ficam mais visíveis com luz natural, na região das maçãs do rosto.",
      "A textura está irregular ao toque, com os poros mais dilatados nas laterais do nariz.",
    ],
    trabalhar: [
      "Uniformizar o aspecto da pele nas áreas de mancha.",
      "Reduzir a oleosidade da região central do rosto.",
      "Deixar a pele mais macia ao toque.",
    ],
    fecho: "Cada pele responde no seu tempo. Na reavaliação a gente confere o que mudou e ajusta o protocolo.",
  },
  plano: {
    titulo: "O seu protocolo",
    modo: "parcelado",
    rodape: "No pacote, a sessão sai por menos porque você se compromete com o protocolo inteiro.",
    avulsaPrefixo: "A sessão avulsa custa",
    opcoes: [
      { titulo: "{qtd} sessões", detalhe: ["Intervalo de 15 dias", "3 meses", "Home care: não incluso"], quem: "Para quem quer o protocolo no ritmo padrão.", qtd: "6", valor: "1080", parcelas: "6" },
      { titulo: "{qtd} sessões", detalhe: ["Intervalo de 15 dias", "4 meses", "Home care: incluso"], quem: "A pele se renova em ciclos de cerca de 28 dias, e o home care é o que sustenta o protocolo entre uma sessão e outra.", qtd: "8", valor: "1920", parcelas: "4", recomendada: true },
      { titulo: "{qtd} sessões", detalhe: ["Intervalo de 21 dias", "4 meses", "Home care: não incluso"], quem: "Para quem prefere um intervalo mais espaçado. O ritmo é mais lento.", qtd: "6", valor: "990", parcelas: "3" },
    ],
    avulsa: "220",
  },
  regras: {
    titulo: "Como funciona e o próximo passo",
    itens: [
      ["Remarcação.", "Se precisar remarcar, me avise com 24 horas de antecedência pelo WhatsApp. A sessão é reposta dentro do período do pacote."],
      ["Falta sem aviso.", "Conta como sessão feita. Imprevisto sério a gente conversa."],
      ["Pausa.", "Se a sua pele reagir a alguma sessão, ou por outro motivo de saúde, o pacote pausa por até 30 dias."],
      /* INFERIDO */
      ["Pagamento.", "Pix à vista ou cartão em até 6 vezes."],
      /* INFERIDO */
      ["Reavaliação.", "Na sessão 4 eu refaço a avaliação e a gente decide junto os próximos passos."],
    ],
    proximo: "É só me dizer qual opção faz sentido para você. Tenho horário para começar em quarta 30/set às 10h ou em sexta 2/out às 15h, e seguro esses horários até sábado 26/set.",
  },
};

const PILATES = {
  tituloCapa: "Proposta do seu plano de aulas",
  pessoa: "Aluna",
  dataRotulo: "Aula experimental em",
  data: "24/set",
  profissao: "Instrutora de pilates",
  registro: "CREF 000000-G",
  contato: "Endereço do studio · (00) 00000-0000",
  avaliacao: {
    titulo: "O que eu vi na sua aula experimental",
    trouxe: "Passo o dia sentada e sinto o corpo mais pesado. Quero voltar a ter uma rotina de exercício.",
    achadosRotulo: "O que eu vi",
    achados: [
      "Você sentiu falta de fôlego nos exercícios de respiração do começo da aula.",
      "A sua postura fica mais ereta com a correção verbal e some quando você se distrai.",
      "Você tem facilidade nos exercícios de força de braço e mais dificuldade nos de equilíbrio.",
    ],
    trabalhar: [
      "Ganhar fôlego para aguentar a aula inteira sem pausa.",
      "Fortalecer o centro do corpo para a postura se manter sem correção.",
      "Criar uma rotina de exercício que caiba na sua semana.",
    ],
    fecho: "Cada corpo se adapta no seu tempo. No acompanhamento mensal a gente confere o que mudou e ajusta o plano.",
  },
  plano: {
    titulo: "O seu plano",
    modo: "mensal",
    rodape: "Nos planos, a aula sai por menos porque você se compromete com a frequência combinada.",
    avulsaPrefixo: "A aula avulsa custa",
    opcoes: [
      { titulo: "2x por semana", detalhe: ["Plano mensal", "{qtd} aulas por mês"], quem: "Para quem quer testar o ritmo primeiro.", qtd: "8", valor: "520" },
      { titulo: "3x por semana", detalhe: ["Plano trimestral", "{qtd} aulas por mês"], quem: "Três aulas por semana dão ao seu corpo mais estímulo para a postura se manter, e o trimestral segura o valor da mensalidade.", qtd: "12", valor: "660", recomendada: true },
      { titulo: "2x por semana", detalhe: ["Plano semestral", "{qtd} aulas por mês"], quem: "Para quem já decidiu que vai continuar. A mensalidade sai menor.", qtd: "8", valor: "460" },
    ],
    avulsa: "90",
  },
  regras: {
    titulo: "Como funciona e o próximo passo",
    itens: [
      ["Reposição.", "Se precisar faltar, me avise com 12 horas de antecedência pelo WhatsApp. Você tem direito a repor até 2 aulas por mês, dentro de 7 dias da falta."],
      ["Trancamento.", "Se precisar parar por um tempo, o plano tranca por até 30 dias por ano, com aviso de 7 dias de antecedência."],
      ["Atestado médico.", "Atestado médico pausa o plano pelo tempo do atestado, sem contar como falta nem correr o prazo."],
      /* INFERIDO: o original deixa o mes e o indice entre colchetes. */
      ["Reajuste.", "A mensalidade reajusta uma vez por ano, em janeiro, pelo percentual combinado."],
      /* INFERIDO */
      ["Pagamento.", "Cartão recorrente ou Pix até o dia 10."],
    ],
    proximo: "É só me dizer qual plano faz sentido para você. Tenho horário para começar em segunda 28/set às 8h ou em quarta 30/set às 18h, e seguro esses horários até sábado 26/set.",
  },
};

export const PROPOSTAS = { fisio: FISIO, estetica: ESTETICA, pilates: PILATES };

/** Estado inicial (strings, porque o usuario esta no meio da digitacao). */
export function estadoInicial(nicho) {
  const p = PROPOSTAS[nicho];
  return {
    prof: "Seu nome",
    pessoa: nicho === "pilates" ? "Beatriz Lima" : nicho === "estetica" ? "Camila Duarte" : "Marina Alves",
    avulsa: p.plano.avulsa,
    qtd: p.plano.opcoes.map((o) => o.qtd),
    valor: p.plano.opcoes.map((o) => o.valor),
    parcelas: p.plano.opcoes.map((o) => o.parcelas ?? ""),
  };
}
