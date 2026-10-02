/**
 * Conteudo da proposta de 4 paginas e os tres casos ficticios de cada nicho.
 * Texto de Workspace/ana/lowticket-saude/produto/gerador/conteudo_fisio.py e
 * conteudo_outros.py (EX_*), sem reescrita. Onde o gerador deixa um campo
 * entre colchetes numa regra da pagina 4, entra o valor-padrao que o proprio
 * documento sugere (24 horas, 30 dias, 12 horas...). Os que o gerador nao fixa
 * estao marcados com INFERIDO.
 *
 * "{qtd}" nos textos das opcoes vira a quantidade do caso.
 * Idades dos chips sao nossas (INFERIDO): o gerador nao as traz, so os nomes.
 */

/* ---------- estrutura comum de cada nicho ---------- */

const BASE = {
  fisio: {
    tituloCapa: "Proposta do seu plano de tratamento",
    pessoa: "Paciente",
    dataRotulo: "Avaliação feita em",
    profissao: "Fisioterapeuta",
    registro: "CREFITO 00000-F",
    contato: "Endereço do atendimento · (00) 00000-0000",
    avaliacaoTitulo: "O que eu vi na sua avaliação",
    achadosRotulo: "O que eu encontrei",
    fecho: "Cada corpo responde no seu tempo. Na reavaliação a gente confere o que mudou e ajusta o plano.",
    planoTitulo: "O seu plano",
    avulsaPrefixo: "A sessão avulsa custa",
    rodape: "Nos planos, a sessão sai por menos porque você se compromete com o plano inteiro.",
    incluidoTitulo: "Incluído nos três",
  },
  estetica: {
    tituloCapa: "Proposta do seu protocolo",
    pessoa: "Cliente",
    dataRotulo: "Avaliação feita em",
    profissao: "Esteticista",
    registro: "",
    contato: "Endereço do estúdio · (00) 00000-0000",
    avaliacaoTitulo: "O que eu vi na sua avaliação",
    achadosRotulo: "O que eu encontrei",
    fecho: "Cada pele responde no seu tempo. Na reavaliação a gente confere o que mudou e ajusta o protocolo.",
    planoTitulo: "O seu protocolo",
    avulsaPrefixo: "A sessão avulsa custa",
    rodape: "No pacote, a sessão sai por menos porque você se compromete com o protocolo inteiro.",
    incluidoTitulo: "Incluído nos três",
  },
  pilates: {
    tituloCapa: "Proposta do seu plano de aulas",
    pessoa: "Aluna",
    dataRotulo: "Aula experimental em",
    profissao: "Instrutora de pilates",
    registro: "CREF 000000-G",
    contato: "Endereço do studio · (00) 00000-0000",
    avaliacaoTitulo: "O que eu vi na sua aula experimental",
    achadosRotulo: "O que eu vi",
    fecho: "Cada corpo se adapta no seu tempo. No acompanhamento a gente confere o que mudou e ajusta o plano.",
    planoTitulo: "O seu plano",
    avulsaPrefixo: "A aula avulsa custa",
    rodape: "Nos planos, a aula sai por menos porque você se compromete com a frequência combinada.",
    incluidoTitulo: "Incluído nos três",
  },
};

const PROXIMO_OPCAO = (a, b) =>
  `É só me dizer qual opção faz sentido para você. Tenho horário para começar ${a}, ou ${b}, e seguro esses horários até sábado.`;

/* ---------- regras (pagina 4) ---------- */

const REGRAS_FISIO = [
  ["Remarcação.", "Se precisar remarcar, me avise com 24 horas de antecedência pelo WhatsApp. A sessão é reposta dentro do período do plano."],
  ["Falta sem aviso.", "Conta como sessão feita. Imprevisto sério a gente conversa."],
  ["Pausa.", "Se você precisar parar por motivo de saúde, com atestado, o plano pausa por até 30 dias."],
];

const REGRAS_ESTETICA = (pagamento, reavaliacao) => [
  ["Remarcação.", "Se precisar remarcar, me avise com 24 horas de antecedência pelo WhatsApp. A sessão é reposta dentro do período do pacote."],
  ["Falta sem aviso.", "Conta como sessão feita. Imprevisto sério a gente conversa."],
  ["Pausa.", "Se a sua pele reagir a alguma sessão, ou por outro motivo de saúde, o pacote pausa por até 30 dias."],
  ["Pagamento.", pagamento],
  ["Reavaliação.", reavaliacao],
];

const REGRAS_PILATES = [
  ["Reposição.", "Se precisar faltar, me avise com 12 horas de antecedência pelo WhatsApp. Você pode repor até 2 aulas por mês, dentro de 7 dias da falta."],
  ["Trancamento.", "Se precisar parar por um tempo, o plano tranca por até 30 dias por ano, com aviso de 7 dias."],
  ["Atestado médico.", "Pausa o plano pelo tempo do atestado, sem contar como falta."],
  /* INFERIDO: o gerador deixa o mes entre colchetes. */
  ["Reajuste.", "A mensalidade reajusta uma vez por ano, em janeiro."],
  ["Pagamento.", "Pix até o dia 5 ou cartão recorrente."],
];

const fisioOp = (titulo, detalhe, quem, qtd, valor, parcelas, recomendada) => ({ titulo, detalhe, quem, qtd, valor, parcelas, ...(recomendada ? { recomendada: true } : {}) });

/* ---------- os casos ---------- */

export const CASOS = {
  fisio: [
    {
      id: "coluna",
      rotulo: "Coluna (lombar)",
      nome: "Marina Alves",
      idade: 58, // INFERIDO
      data: "24/09",
      avaliacao: {
        titulo: BASE.fisio.avaliacaoTitulo,
        trouxe: "Dor nas costas que piora no fim do dia e já me fez desistir da caminhada.",
        achados: [
          "A musculatura que sustenta a sua lombar cansa antes do fim do dia.",
          "Dobrar o tronco para a frente dói a partir da metade do movimento.",
          "O quadril direito está mais rígido que o esquerdo.",
        ],
        trabalhar: [
          "Ganhar resistência nas costas para aguentar o dia de trabalho.",
          "Voltar a abaixar para pegar coisas do chão com segurança.",
          "Retomar a caminhada com acompanhamento.",
        ],
      },
      plano: {
        modo: "parcelado",
        avulsa: "150",
        opcoes: [
          fisioOp("2x por semana", ["8 semanas", "{qtd} sessões"], "Para quem pode vir duas vezes por semana.", "16", "2080", "4"),
          fisioOp("3x por semana", ["8 semanas", "{qtd} sessões"], "A dor aparece no fim do dia, e três encontros por semana dão à musculatura o estímulo para aguentar o dia inteiro.", "24", "2880", "6", true),
          fisioOp("1x por semana", ["12 semanas", "{qtd} sessões"], "Para quem só consegue vir uma vez por semana. O ritmo é mais lento.", "12", "1620", "3"),
        ],
        incluido: ["Exercícios para casa por escrito", "Dúvidas por mensagem entre as sessões", "Reavaliação na sessão 12"],
      },
      regras: {
        itens: [
          ...REGRAS_FISIO,
          ["Pagamento.", "Pix à vista, cartão em até 6 vezes, ou parcelas mensais no Pix."],
          ["Reavaliação.", "Na sessão 12 eu refaço a avaliação e a gente decide junto os próximos passos."],
        ],
        proximo: PROXIMO_OPCAO("na segunda, 28/09, às 8h", "na quarta, 30/09, às 18h"),
      },
    },
    {
      id: "joelho",
      rotulo: "Pós-operatório de joelho",
      nome: "Rafael Souza",
      idade: 34, // INFERIDO
      data: "01/10",
      avaliacao: {
        titulo: BASE.fisio.avaliacaoTitulo,
        trouxe: "Quero voltar a correr, mas hoje nem subir escada eu consigo direito.",
        achados: [
          "O joelho operado ainda não estica por completo.",
          "A coxa direita perdeu força em relação à esquerda.",
          "Você apoia menos peso na perna operada ao caminhar.",
        ],
        trabalhar: [
          "Esticar o joelho por completo.",
          "Recuperar a força da coxa.",
          "Caminhar e subir escada sem compensar.",
          "Preparar a volta à corrida, na fase certa e com a liberação do seu cirurgião.",
        ],
      },
      plano: {
        modo: "parcelado",
        avulsa: "150",
        opcoes: [
          fisioOp("2x por semana", ["12 semanas", "{qtd} sessões"], "Para quem pode vir duas vezes por semana.", "24", "3120", "6"),
          fisioOp("3x por semana", ["12 semanas", "{qtd} sessões"], "Nos primeiros três meses depois da cirurgia a frequência pesa mais na recuperação da força.", "36", "4320", "8", true),
          fisioOp("3x nas 6 primeiras semanas, 2x nas 6 seguintes", ["12 semanas", "{qtd} sessões"], "Para quem precisa diminuir o ritmo na segunda metade.", "30", "3750", "6"),
        ],
        incluido: ["Exercícios para casa por escrito", "Contato com o seu cirurgião quando for preciso", "Reavaliação a cada 6 semanas"],
      },
      regras: {
        itens: [
          ...REGRAS_FISIO,
          ["Pagamento.", "Pix à vista, cartão em até 8 vezes, ou parcelas mensais no Pix."],
          ["Reavaliação.", "A cada 6 semanas, junto com o seu retorno ao cirurgião."],
        ],
        proximo: PROXIMO_OPCAO("na segunda, 05/10, às 7h", "na quarta, 07/10, às 19h"),
      },
    },
    {
      id: "pilatesClinico",
      rotulo: "Pilates clínico (hérnia)",
      nome: "Cláudia Ramos",
      idade: 45, // INFERIDO
      data: "30/09",
      plano: {
        modo: "mensal",
        avulsa: "90",
        opcoes: [
          fisioOp("2x por semana", ["plano mensal", "{qtd} encontros por mês"], "Para quem quer começar sem compromisso longo.", "8", "640"),
          fisioOp("2x por semana", ["plano trimestral", "{qtd} encontros por mês"], "O fortalecimento da musculatura profunda leva semanas para aparecer, e três meses dão tempo para a reavaliação mostrar o que mudou.", "8", "580", undefined, true),
          fisioOp("2x por semana", ["plano semestral", "{qtd} encontros por mês"], "Para quem já decidiu fazer do pilates clínico parte da rotina.", "8", "540"),
        ],
        incluido: ["Exercícios para casa por escrito", "Reposição da falta avisada dentro do mês", "Reavaliação no fim de cada trimestre"],
      },
      avaliacao: {
        titulo: BASE.fisio.avaliacaoTitulo,
        trouxe: "Dou aula em pé o dia inteiro e no fim da semana não aguento mais.",
        achados: [
          "A musculatura profunda do abdômen e das costas está fraca para o tanto que você fica em pé.",
          "A dor desce para a perna esquerda quando você se inclina para a frente.",
          "O quadril está rígido.",
        ],
        trabalhar: [
          "Fortalecer a musculatura que protege a coluna.",
          "Aprender a se movimentar sem provocar a dor.",
          "Ganhar mobilidade de quadril.",
        ],
      },
      regras: {
        itens: [
          ...REGRAS_FISIO,
          /* INFERIDO: o gerador deixa o dia entre colchetes; usamos o dia 5 do pilates. */
          ["Pagamento.", "Mensalidade no Pix ou no cartão, todo dia 5."],
          ["Reavaliação.", "No fim de cada trimestre."],
        ],
        proximo:
          "É só me dizer qual opção faz sentido para você. Tenho horário na turma de segunda e quarta às 7h ou na de terça e quinta às 19h, e seguro a vaga até sexta.",
      },
    },
  ],

  estetica: [
    {
      id: "facial",
      rotulo: "Facial",
      nome: "Camila Duarte",
      idade: 34, // INFERIDO
      data: "24/09",
      avaliacao: {
        titulo: BASE.estetica.avaliacaoTitulo,
        trouxe: "Manchas no rosto que aparecem mais no verão e não saem com nada que eu já usei em casa.",
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
      },
      plano: {
        modo: "parcelado",
        avulsa: "220",
        opcoes: [
          fisioOp("{qtd} sessões", ["a cada 15 dias", "3 meses", "sem home care"], "Para quem quer o protocolo no ritmo padrão.", "6", "1080", "6"),
          fisioOp("{qtd} sessões", ["a cada 15 dias", "4 meses", "com home care"], "A pele se renova em ciclos, e o home care sustenta o protocolo entre uma sessão e outra.", "8", "1920", "4", true),
          fisioOp("{qtd} sessões", ["a cada 21 dias", "4 meses", "sem home care"], "Para quem prefere um intervalo mais espaçado. O ritmo é mais lento.", "6", "990", "3"),
        ],
        incluido: ["Ficha de cuidados em casa", "Dúvidas por mensagem entre as sessões", "Reavaliação na sessão 4"],
      },
      regras: {
        itens: REGRAS_ESTETICA(
          "Pix à vista, cartão em até 6 vezes, ou parcelas no Pix.",
          "Na sessão 4 eu refaço a avaliação e a gente decide junto os próximos passos.",
        ),
        proximo: PROXIMO_OPCAO("na quarta, 30/09, às 10h", "na sexta, 02/10, às 15h"),
      },
    },
    {
      id: "corporal",
      rotulo: "Corporal",
      nome: "Fernanda Lopes",
      idade: 38, // INFERIDO
      data: "24/09",
      avaliacao: {
        titulo: BASE.estetica.avaliacaoTitulo,
        trouxe: "Depois dos meus filhos, meu abdômen mudou e não volta nem com exercício.",
        achados: [
          "Gordura localizada concentrada na região abdominal inferior.",
          "A pele tem menos firmeza ao toque na lateral do abdômen.",
          /* Verbatim do gerador: o campo [X] e do exemplo original. */
          "Medida da cintura registrada hoje: [X] cm.",
        ],
        trabalhar: [
          "Trabalhar a região com o protocolo de aparelho e drenagem linfática.",
          "Acompanhar a evolução pelas medidas a cada quatro sessões.",
        ],
      },
      plano: {
        modo: "parcelado",
        avulsa: "210",
        opcoes: [
          fisioOp("{qtd} sessões", ["1x por semana", "2 meses", "sem home care"], "Para quem quer o ritmo de uma sessão por semana.", "8", "1520", "4"),
          fisioOp("{qtd} sessões", ["2x por semana", "6 semanas", "com home care"], "Um intervalo mais curto entre as sessões mantém o estímulo, e é isso que costuma pesar mais nesse tipo de protocolo.", "12", "2040", "6", true),
          fisioOp("{qtd} sessões", ["1 a cada 10 dias", "3 meses", "sem home care"], "Para quem prefere um intervalo mais espaçado.", "8", "1360", "4"),
        ],
        incluido: ["Medidas a cada 4 sessões", "Orientação de cuidados em casa", "Dúvidas por mensagem entre as sessões"],
      },
      regras: {
        itens: REGRAS_ESTETICA(
          "Pix à vista, cartão em até 6 vezes, ou parcelas no Pix.",
          "A cada 4 sessões, com as medidas.",
        ),
        proximo: PROXIMO_OPCAO("na segunda, 28/09, às 9h", "na quarta, 30/09, às 17h"),
      },
    },
    {
      id: "laser",
      rotulo: "Depilação a laser",
      nome: "Juliana Prates",
      idade: 27, // INFERIDO
      data: "24/09",
      avaliacao: {
        titulo: BASE.estetica.avaliacaoTitulo,
        trouxe: "Cansei de fazer cera toda semana e queria resolver isso.",
        achados: [
          "Pelos grossos e escuros nas pernas e nas axilas.",
          "Regiões escolhidas para começar: pernas inteiras e axilas.",
        ],
        trabalhar: [
          "Reduzir a quantidade de pelo nas áreas tratadas ao longo do pacote, respeitando os ciclos de crescimento do pelo.",
        ],
      },
      plano: {
        modo: "parcelado",
        avulsa: "320",
        avulsaSufixo: " (pernas inteiras)",
        opcoes: [
          fisioOp("{qtd} sessões", ["a cada 45 dias", "9 meses"], "Só pernas inteiras.", "6", "1740", "6"),
          fisioOp("{qtd} sessões", ["a cada 45 dias", "12 meses"], "Pernas inteiras e axilas. O pelo tem fases de crescimento diferentes, e oito sessões cobrem os ciclos que aparecem depois das primeiras.", "8", "2320", "8", true),
          fisioOp("{qtd} sessões", ["a cada 60 dias", "12 meses"], "Só pernas inteiras, com intervalo mais espaçado.", "6", "1560", "6"),
        ],
        incluido: ["Orientação de cuidados antes e depois de cada sessão", "Teste de sensibilidade na primeira sessão", "Dúvidas por mensagem entre as sessões"],
      },
      regras: {
        itens: REGRAS_ESTETICA(
          "Pix à vista ou cartão em até 8 vezes.",
          "Na sessão 4 a gente confere a resposta do pelo e ajusta o intervalo.",
        ),
        proximo: PROXIMO_OPCAO("na quinta, 01/10, às 11h", "na sexta, 02/10, às 18h"),
      },
    },
  ],

  pilates: [
    {
      id: "iniciante",
      rotulo: "Aluna iniciante",
      nome: "Beatriz Lima",
      idade: 32, // INFERIDO
      data: "24/09",
      avaliacao: {
        titulo: BASE.pilates.avaliacaoTitulo,
        trouxe: "Passo o dia sentada e sinto o corpo mais pesado. Quero voltar a ter uma rotina de exercício.",
        achados: [
          "Você sentiu falta de fôlego nos exercícios de respiração do começo da aula.",
          "A postura fica mais ereta com a correção e some quando você se distrai.",
          "Facilidade nos exercícios de força de braço e mais dificuldade nos de equilíbrio.",
        ],
        trabalhar: [
          "Ganhar fôlego para aguentar a aula inteira sem pausa.",
          "Fortalecer o centro do corpo para a postura se manter sem correção.",
          "Criar uma rotina de exercício que caiba na sua semana.",
        ],
      },
      plano: {
        modo: "mensal",
        avulsa: "90",
        opcoes: [
          fisioOp("2x por semana", ["plano mensal", "{qtd} aulas por mês"], "Para quem quer testar o ritmo primeiro.", "8", "520"),
          fisioOp("3x por semana", ["plano trimestral", "{qtd} aulas por mês"], "Três aulas por semana dão ao seu corpo mais estímulo para a postura se manter, e o trimestral segura o valor da mensalidade.", "12", "660", undefined, true),
          fisioOp("2x por semana", ["plano semestral", "{qtd} aulas por mês"], "Para quem já decidiu que vai continuar. A mensalidade sai menor.", "8", "460"),
        ],
        incluido: ["Horário fixo reservado", "Reposição da falta avisada", "Acompanhamento a cada mês"],
      },
      regras: {
        itens: REGRAS_PILATES,
        proximo: "É só me dizer qual plano faz sentido para você. Tenho horário para começar na segunda, 28/09, às 8h, ou na quarta, 30/09, às 18h, e seguro esses horários até sábado.",
      },
    },
    {
      id: "tres",
      rotulo: "Aluna 3x por semana",
      nome: "Larissa Prado",
      idade: 36, // INFERIDO
      data: "24/09",
      avaliacao: {
        titulo: BASE.pilates.avaliacaoTitulo,
        trouxe: "Corro três vezes por semana e sinto que preciso de mais força no tronco.",
        achados: [
          "Boa resistência, mas pouca ativação do centro do corpo nos exercícios de estabilização.",
          "O equilíbrio em apoio de um pé só ainda está instável.",
          "Boa mobilidade de quadril.",
        ],
        trabalhar: [
          "Fortalecer o centro do corpo para dar mais sustentação à corrida.",
          "Melhorar o equilíbrio em apoio de um pé só.",
          "Manter a mobilidade que você já tem.",
        ],
      },
      plano: {
        modo: "mensal",
        avulsa: "90",
        opcoes: [
          fisioOp("3x por semana", ["plano mensal", "{qtd} aulas por mês"], "Para quem quer testar o ritmo primeiro.", "12", "720"),
          fisioOp("3x por semana", ["plano trimestral", "{qtd} aulas por mês"], "O ganho de estabilidade pede constância, e o trimestral segura o valor sem você precisar decidir todo mês.", "12", "660", undefined, true),
          fisioOp("3x por semana", ["plano semestral", "{qtd} aulas por mês"], "Para quem já decidiu que vai continuar.", "12", "600"),
        ],
        incluido: ["Horário fixo reservado", "Reposição da falta avisada", "Acompanhamento a cada mês"],
      },
      regras: {
        itens: REGRAS_PILATES,
        proximo: "É só me dizer qual plano faz sentido para você. Tenho horário na turma de segunda, quarta e sexta às 7h ou na de terça, quinta e sábado às 9h, e seguro a vaga até sábado.",
      },
    },
    {
      id: "renovacao",
      rotulo: "Renovação de plano",
      nome: "Renata Costa",
      idade: 41, // INFERIDO
      dataRotulo: "Aluna há",
      data: "10 meses · renovação do plano",
      avaliacao: {
        titulo: "O que mudou desde que começamos",
        trouxeRotulo: "O que você me disse",
        trouxe: "Não sinto mais aquele cansaço no fim do dia, e minha postura no computador melhorou.",
        achados: [
          "A postura se mantém ereta por mais tempo sem que eu precise corrigir.",
          "O fôlego melhorou nos exercícios de respiração.",
          "O equilíbrio em apoio de um pé só está mais estável.",
          "Frequência no período: 22 de 24 aulas.",
        ],
        trabalhar: ["Manter o que você conquistou.", "Aumentar o ritmo, como você pediu."],
      },
      plano: {
        modo: "mensal",
        avulsa: "90",
        sub: "Três caminhos a partir do que mudou desde que você começou.",
        incluidoTitulo: "Incluído nos dois planos",
        opcoes: [
          fisioOp("2x por semana", ["plano semestral", "{qtd} aulas por mês"], "Para manter o ritmo de hoje.", "8", "450"),
          fisioOp("3x por semana", ["plano semestral", "{qtd} aulas por mês"], "Você pediu mais ritmo, e três aulas por semana dão espaço para avançar.", "12", "600", undefined, true),
          { titulo: "Pausa", detalhe: [], quem: "Com orientação para manter em casa.", semValor: "Sem mensalidade" },
        ],
        incluido: ["Horário fixo reservado", "Reposição da falta avisada", "Acompanhamento no fim do plano"],
      },
      regras: {
        itens: REGRAS_PILATES,
        proximo: "É só me dizer qual caminho faz sentido para você. O seu plano atual termina em breve, e eu seguro o seu horário até lá.",
      },
    },
  ],
};

/** Junta a base do nicho com o caso: o mesmo formato que as folhas leem. */
export function montarProposta(nicho, casoId) {
  const b = BASE[nicho];
  const c = CASOS[nicho].find((x) => x.id === casoId) ?? CASOS[nicho][0];
  return {
    id: c.id,
    nicho,
    tituloCapa: b.tituloCapa,
    pessoa: b.pessoa,
    pessoaNome: c.nome,
    dataRotulo: c.dataRotulo ?? b.dataRotulo,
    data: c.data,
    profissao: b.profissao,
    registro: b.registro,
    contato: b.contato,
    avaliacao: { achadosRotulo: b.achadosRotulo, trouxeRotulo: "O que te trouxe aqui", fecho: b.fecho, ...c.avaliacao },
    plano: {
      titulo: b.planoTitulo,
      avulsaPrefixo: b.avulsaPrefixo,
      rodape: b.rodape,
      incluidoTitulo: b.incluidoTitulo,
      avulsaSufixo: "",
      ...c.plano,
    },
    regras: { titulo: "Como funciona", ...c.regras },
  };
}

/** Faixa da regua: de ~40% a ~267% da avulsa do caso, de 10 em 10. */
export function faixaAvulsa(p) {
  const base = Number(p.plano.avulsa);
  return {
    min: Math.max(20, Math.round((base * 0.4) / 10) * 10),
    max: Math.round((base * 8) / 3 / 10) * 10,
    passo: 10,
    base,
  };
}

/**
 * Valores das tres opcoes para uma avulsa: proporcionais aos do gerador
 * (a relacao sessao do plano x avulsa fica igual). Parcelado: arredonda a
 * parcela de 5 em 5; mensalidade: de 10 em 10. Na avulsa do exemplo devolve
 * exatamente os numeros do gerador.
 */
export function valoresPara(p, avulsa) {
  const fator = Number(avulsa) / Number(p.plano.avulsa);
  return p.plano.opcoes.map((o) => {
    if (o.semValor) return "";
    const total = Number(o.valor) * fator;
    const n = Number(o.parcelas);
    if (p.plano.modo === "parcelado" && n > 1) {
      return String(Math.max(5, Math.round(total / n / 5) * 5) * n);
    }
    return String(Math.max(10, Math.round(total / 10) * 10));
  });
}

export function primeiroNome(nome) {
  return String(nome || "").trim().split(/\s+/)[0] || "";
}
