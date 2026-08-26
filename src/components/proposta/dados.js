/**
 * Conteúdo e números de cada proposta, indexados por slug de URL.
 *
 * A rota é `/proposta/:cliente`, então abrir uma proposta nova é
 * acrescentar uma chave aqui. Nenhuma seção da página tem número
 * escrito dentro dela: tudo que aparece na tela sai deste arquivo ou
 * das funções de cálculo do fim, e é isso que impede a página de
 * mostrar dois valores diferentes para a mesma coisa (o defeito que o
 * deck comercial precisou de um `console.warn` para vigiar).
 *
 * A estrutura da copy segue Emoção, Lógica, Medo e CTA, que é a ordem
 * do Brunson para página de produto pago (o pedido fica no fim, não no
 * topo, porque aqui há valor a construir antes de pedir qualquer coisa).
 */

import arteEmanuelAvaliacao from "../../assets/proposta/arte-emanuel-avaliacao.webp";

/* ── Cálculo ────────────────────────────────────────────────────────
   Uma conta só, usada pela seção da conta, pela calculadora e pelo
   comparativo do plano de indicação. Escrever a mesma fórmula em três
   seções seria pedir para elas divergirem na primeira edição.
   ─────────────────────────────────────────────────────────────────── */

/**
 * O que sobra para o médico em cada procedimento vendido, antes dos
 * custos fixos: o ticket menos o custo operacional dele (hospital,
 * material, equipe, imposto) e menos a comissão da Toka.
 */
export const contribuicao = ({ ticket, custoOperacional, comissao }) =>
  ticket * (1 - custoOperacional) - ticket * comissao;

/** Custo mensal cheio: assessoria, plataformas e verba de anúncio. */
export const custoMensal = (economia, fixoMes) =>
  fixoMes + economia.plataformas + economia.verba;

export const custoSemestre = (economia, fixoMes) =>
  custoMensal(economia, fixoMes) * economia.meses;

/**
 * Quantos procedimentos no semestre inteiro pagam tudo. Arredonda para
 * cima: meio procedimento não existe, e arredondar para baixo mostraria
 * um ponto de equilíbrio que a conta não alcança.
 */
export const procedimentosParaEmpatar = (economia, fixoMes) =>
  Math.ceil(custoSemestre(economia, fixoMes) / contribuicao(economia));

export const brl = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });

/* ── Propostas ───────────────────────────────────────────────────── */

/**
 * Material que os entregáveis mostram como exemplo.
 *
 * Mora fora da lista de itens porque é volumoso e porque é reaproveitável:
 * a próxima proposta aponta para as mesmas peças. O item guarda só a
 * chave, e a seção resolve.
 *
 * ⚠️ Nada de antes e depois aqui, mesmo tendo material. A própria copy
 * desta página promete peça dentro da Resolução do CFM, e uma arte de
 * antes e depois na dobra ao lado desmentiria a frase.
 */
const AMOSTRAS = {
  /**
   * Uma peça, não uma galeria. Três miniaturas viravam uma vitrine no
   * meio da lista de entregáveis e puxavam a atenção para longe do que
   * a dobra está construindo, que é o valor somando. Uma peça em tamanho
   * que dá para ler prova o padrão igual e não interrompe a leitura.
   */
  artes: [
    {
      src: arteEmanuelAvaliacao,
      alt: "Anúncio de feed sobre avaliação de transplante capilar, com o título 'O seu caso tem um número'",
      legenda: "Anúncio de feed",
    },
  ],

  /**
   * Conversa escrita à mão, e não print de atendimento real: mostrar
   * conversa de paciente numa proposta seria exatamente o oposto do que
   * a página promete sobre o cuidado com dado de quem procura o médico.
   */
  conversa: [
    { de: "lead", texto: "Oi, vi o anúncio. Quanto custa a cirurgia?", hora: "23:41" },
    {
      de: "ia",
      texto:
        "Boa noite! Sou a assistente do consultório. O valor depende do que a avaliação encontrar, então quem fecha isso é o doutor na consulta. Posso te adiantar como funciona?",
      hora: "23:41",
    },
    { de: "lead", texto: "pode sim", hora: "23:42" },
    {
      de: "ia",
      texto:
        "A avaliação leva uns 40 minutos e é ela que define se o seu caso tem indicação. Tenho quinta às 14h ou sexta às 9h30. Qual fica melhor?",
      hora: "23:42",
    },
    { de: "lead", texto: "quinta 14h", hora: "23:43" },
    {
      de: "ia",
      texto:
        "Agendado. Vou te mandar o endereço e um lembrete na quarta. Qualquer coisa antes disso, é só chamar aqui.",
      hora: "23:43",
    },
  ],
};

const PAULO = {
  slug: "paulo",

  cliente: {
    nome: "Dr. Paulo",
    saudacao: "Dr. Paulo",
  },

  capa: {
    selo: "Proposta · Toka Company",
    titulo: ["Você não tem um problema", "de marketing. Você tem um", "problema de <em>dono</em>."],
    abertura:
      "é a proposta que eu te falei. Dá uns seis minutos de leitura. No fim está o preço, a conta feita com o seu custo dentro e o que eu preciso de você para começar.",
    botao: "Começar a ler",
  },

  /* ── I · Emoção ─────────────────────────────────────────────── */

  culpa: {
    selo: "Primeiro",
    titulo: "Se você já tentou antes e não deu certo, o problema não foi você.",
    linhas: [
      "Você contratou alguém para fazer anúncio. Outra pessoa para fazer a arte. Um terceiro mexeu no site em algum momento. E o CRM ficou com a secretária, que já tinha o consultório inteiro na cabeça.",
      "Cada um entregou o pedaço dele direitinho. E o paciente sumia no meio do caminho do mesmo jeito.",
      "Não é falta de esforço, nem de dinheiro gasto. É que ninguém respondia pelo caminho inteiro.",
      "O mercado te vendeu post. Post não enche agenda. Nunca encheu.",
    ],
    fecho:
      "Você não quer ser famoso. Você quer operar mais, escolhendo quem opera e cobrando o que vale.",
  },

  domino: {
    selo: "A ideia",
    titulo: "Dois médicos, a mesma formação.",
    linhas: [
      "Um deles opera melhor. O outro tem fila de espera.",
      "Você conhece os dois. Todo mundo conhece.",
      "A diferença entre eles não é técnica. Um construiu demanda própria. O outro ficou esperando a indicação chegar.",
    ],
    definicao: {
      titulo: "Demanda própria é uma coisa só:",
      texto:
        "um caminho que você é dono, do primeiro clique até a cadeira do consultório, com uma pessoa respondendo por ele inteiro.",
    },
    fecho: "Só é referência quem tem paciente.",
  },

  /* ── II · Lógica ────────────────────────────────────────────── */

  entrega: {
    selo: "O que entra",
    titulo: "As dez linhas que eu vou tocar.",
    abertura:
      "Ao lado de cada uma está o que ela custaria contratada separada, no semestre. São valores de mercado, não número inflado para impressionar: você pode conferir um por um.",
    grupos: [
      {
        rotulo: "O que os R$ 2.500 costumam comprar",
        itens: [
          {
            nome: "Gestão de tráfego pago",
            exemplo: {
              tipo: "link",
              url: "/demo",
              rotulo: "ver a tela de tráfego",
            },
            promessa:
              "para que todo mês entre gente nova que ainda não te conhece, com custo por contato medido",
            detalhe:
              "Meta e Google na sua conta e no seu CNPJ. Segmentação, teste de criativo e otimização semanal.",
            valor: 15000,
          },
          {
            nome: "Ajuste do CRM que você já usa",
            exemplo: {
              tipo: "link",
              url: "/demo",
              rotulo: "ver o funil num painel real",
            },
            promessa:
              "para que nenhum contato fique sem dono, sem prazo e sem resposta",
            detalhe:
              "Funil arrumado, etapas com significado, campo de origem preenchido. O que está bagunçado hoje passa a ser legível.",
            valor: 4000,
          },
          {
            nome: "Página de venda",
            exemplo: {
              tipo: "link",
              url: "https://dra-mayara-olhar-renovado.vercel.app/blefaroplastia-cascavel",
              rotulo: "ver uma página no ar",
            },
            promessa:
              "para que quem clica no anúncio chegue num lugar que fecha, e não numa vitrine",
            detalhe:
              "Página construída para converter, com formulário ligado ao CRM e rastreamento de origem por anúncio.",
            valor: 6000,
          },
          {
            nome: "Google Meu Negócio",
            promessa:
              "para que quem procura por você em vez de esbarrar em você encontre a ficha certa",
            detalhe:
              "Perfil completo, categorias corretas, fotos, horário, rota e política de avaliação.",
            valor: 3000,
          },
          {
            nome: "Copy de anúncio, página e conteúdo",
            exemplo: {
              tipo: "link",
              url: "https://innovamovimento.com.br/corpo-de-gabinete",
              rotulo: "ver uma página escrita por mim",
            },
            promessa:
              "para que o paciente entenda o valor antes de perguntar o preço",
            detalhe:
              "Todo texto que vende, escrito dentro da Resolução do CFM. Sem promessa de resultado e sem antes e depois.",
            valor: 9000,
          },
        ],
      },
      {
        rotulo: "O que entra junto, por R$ 200 a mais",
        itens: [
          {
            nome: "Site completo",
            exemplo: {
              tipo: "link",
              url: "https://drluisfelipebortolan.com",
              rotulo: "ver um site no ar",
            },
            promessa:
              "para que quem te procura no Google veja o mesmo nível que vê no seu consultório",
            detalhe:
              "Site próprio, rápido, com as páginas de cada procedimento e agendamento integrado.",
            valor: 7000,
          },
          {
            nome: "Arte dos estáticos",
            exemplo: { tipo: "imagem", chave: "artes" },
            promessa:
              "para que toda peça que sai com o seu nome tenha a mesma cara",
            detalhe:
              "Identidade aplicada, padrão de peça e a leva de criativo de anúncio renovada.",
            valor: 6000,
          },
          {
            nome: "Roteiro e copy de vídeo",
            promessa: "para que você grave uma vez e apareça a semana inteira",
            detalhe:
              "Roteiro pronto para gravar no celular, com o que falar e em que ordem. Você lê e grava.",
            valor: 4000,
          },
          {
            nome: "Assistente de IA no WhatsApp",
            exemplo: { tipo: "conversa", chave: "conversa" },
            promessa:
              "para que quem te chama às onze da noite de domingo seja atendido na hora",
            detalhe:
              "Responde, qualifica e agenda sozinho. Sua equipe recebe o paciente já triado, com o histórico da conversa.",
            valor: 9000,
          },
          {
            nome: "Dashboard",
            exemplo: {
              tipo: "link",
              url: "/demo",
              rotulo: "abrir o painel de demonstração",
            },
            promessa:
              "para que você decida com número, e não com sensação",
            detalhe:
              "Quantos chegaram, quantos viraram consulta, quantos viraram procedimento. Custo por paciente e retorno por campanha, numa tela só.",
            valor: 5000,
          },
        ],
      },
    ],
    fecho: "Contratado separado, isso custaria",
  },

  preco: {
    selo: "O preço",
    /**
     * O enquadramento é de mercado, não de conversa. Dizer "combinamos
     * 2.500 e agora são 2.700" lido sozinho, sem ninguém para conduzir,
     * é um aumento sendo justificado. A faixa desloca a comparação para
     * onde ela ajuda: o valor é o de sempre, o que muda é o que cabe.
     */
    faixa: { de: 2500, ate: 3000 },
    titulo: "Assessoria de marketing médico fica entre R$ 2.500 e R$ 3.000 por mês.",
    linhasAbertura: [
      "Essa é a faixa, e ela vale para quase todo mundo que faz isso. O que muda de uma proposta para outra não é o valor. É quanta coisa cabe dentro dele.",
    ],
    colunas: [
      {
        valor: 2500,
        rotulo: "O que a faixa costuma comprar",
        nota: "Cinco frentes. Serve, e para aí.",
      },
      {
        valor: 2700,
        rotulo: "O que entra aqui",
        nota: "As dez. O caminho fecha.",
        destaque: true,
      },
    ],
    linhasPreco: [
      "Duzentos reais separam uma coluna da outra.",
    ],
    comissao: {
      titulo: "Mais 5% sobre cada procedimento que sair daqui.",
      texto:
        "Esses 5% são de propósito, e são a parte mais importante deste papel. É o que faz eu não conseguir ganhar dinheiro sem você ganhar primeiro. Nenhuma agência cobra assim, porque assim dá trabalho.",
    },
    custos: {
      titulo: "O que não é meu e eu não escondo",
      itens: [
        {
          nome: "Plataformas",
          valor: "cerca de R$ 300 por mês",
          texto:
            "CRM, assistente de IA, hospedagem e disparo. Assinaturas no seu nome, você cancela quando quiser.",
        },
        {
          nome: "Verba de anúncio",
          valor: "mínimo R$ 1.500 por mês",
          texto:
            "Na sua conta e no seu CNPJ, do primeiro dia ao último. Abaixo disso o Meta não junta gente suficiente para aprender quem é o seu paciente, e a gente fica otimizando no escuro.",
        },
      ],
    },
  },

  conta: {
    selo: "A conta",
    titulo: "Eu podia ter te mostrado essa conta sem o seu custo.",
    abertura:
      "Ia ficar mais bonita. Não seria a sua realidade. Então o seu custo operacional está aqui dentro, e a minha comissão também.",
    legendaCalculadora:
      "Se o seu ticket não for esse, mexe aqui e a conta se refaz.",
    /**
     * O ritmo (quantos por mês) é escrito pela própria conta, e não aqui:
     * com o ticket mexido no controle acima, uma frase fixa dizendo
     * "menos de um por mês" passaria a contradizer o número na tela logo
     * acima dela. Só a mecânica, que não depende do ticket, é texto.
     */
    fechoMecanica:
      "O que vier depois disso entra quase limpo, porque o seu custo, a mídia e a minha comissão repetem a cada paciente, e a assessoria não repete nenhuma vez.",
  },

  indicacao: {
    selo: "Como o fixo diminui",
    titulo: "Tem um jeito de esse fixo virar R$ 400.",
    abertura:
      "Não é desconto de lançamento nem promoção de primeiro mês. É a única coisa que eu não consigo comprar com dinheiro: médico indicado por médico chega comigo com a confiança já pronta.",
    escada: [
      { indicacoes: 0, fixo: 2700, rotulo: "Hoje" },
      { indicacoes: 1, fixo: 1900, rotulo: "1 indicação que fecha" },
      { indicacoes: 2, fixo: 1150, rotulo: "2 indicações" },
      { indicacoes: 3, fixo: 400, rotulo: "3 indicações", destaque: true },
    ],
    regras: [
      "Vale quando o indicado fecha assessoria comigo, não quando ele só conversa.",
      "O escopo continua sendo as dez linhas. Nada encolhe junto com o preço.",
      "O valor se mantém enquanto os três estiverem ativos. Se um sair, você sobe um degrau e pode indicar outro.",
    ],
    tituloComparativo: "O que isso faz com a sua conta",
    fecho:
      "Três conversas suas valem mais para mim do que a diferença no seu boleto. É uma troca, não um favor.",
  },

  /* ── III · Medo ─────────────────────────────────────────────── */

  risco: {
    selo: "O outro lado",
    titulo: "O que acontece se ficar como está.",
    linhas: [
      "O anúncio continua rodando sem ninguém saber qual deles trouxe paciente.",
      "A mensagem de domingo à noite continua sendo respondida na segunda de manhã, quando a pessoa já marcou com outro.",
      "E daqui a seis meses você vai estar com a mesma dúvida que tem hoje: valeu ou não valeu.",
    ],
    fecho: "Esse custo não aparece em boleto nenhum, e é o mais caro dos dois.",
    tetoTitulo: "E o risco de fazer tem teto, escrito aqui:",
    teto: [
      "A conta de anúncio é sua, no seu CNPJ, do primeiro dia ao último. Você vê cada centavo entrando e saindo.",
      "Tudo que a gente montar fica com você: site, CRM, assistente, dashboard, criativo. No mês sete é seu, continuando comigo ou não.",
      "Os 5% eu só recebo se você vender. Se não vender, eu trabalhei de graça.",
    ],
  },

  /* ── IV · CTA ───────────────────────────────────────────────── */

  passos: {
    selo: "O próximo passo",
    titulo: "Se fizer sentido, são três coisas.",
    itens: [
      {
        n: "1",
        texto: "Você me responde no WhatsApp que topa. Só isso, uma mensagem.",
      },
      {
        n: "2",
        texto:
          "A gente marca uma hora para eu pegar os acessos e você me contar como a sua agenda funciona hoje.",
      },
      {
        n: "3",
        texto:
          "Em sete dias o primeiro anúncio está no ar e você tem o link do dashboard.",
      },
    ],
    botao: "Responder no WhatsApp",
    mensagem:
      "Dr. Paulo aqui. Li a proposta e quero conversar.",
    microcopy:
      "Se preferir, me manda a dúvida por áudio mesmo. Eu respondo hoje.",
  },

  economia: {
    ticket: 10000,
    ticketMin: 2000,
    ticketMax: 30000,
    ticketPasso: 500,
    custoOperacional: 0.4,
    comissao: 0.05,
    fixoMes: 2700,
    fixoPiso: 400,
    plataformas: 300,
    verba: 1500,
    meses: 6,
  },

  whatsapp: "5511996865057",

  amostras: AMOSTRAS,
};

const PROPOSTAS = {
  [PAULO.slug]: PAULO,
};

export const buscarProposta = (slug) => PROPOSTAS[(slug || "").toLowerCase()] || null;

export default PROPOSTAS;
