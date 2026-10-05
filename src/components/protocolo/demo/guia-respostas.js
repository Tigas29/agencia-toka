/**
 * As respostas REAIS das mensagens prontas do produto, uma por caso, para o
 * ponto em que a conversa de exemplo (guia-exemplos.js) travou. Texto
 * verbatim de Workspace/ana/lowticket-saude/produto/{fisio,estetica,pilates}.md,
 * secoes "Quando ela diz vou pensar", "As respostas na hora", "As tres
 * mensagens" e "A renovacao".
 *
 * Substituicoes feitas no render, nao aqui: [NOME] vira o primeiro nome do
 * caso e [AVULSA] vira a avulsa que a pessoa escolheu. Qualquer outro
 * [colchete] fica como no produto (o que a profissional preenche) e sai em
 * marca-texto. `pre` e a linha de contexto do original ("Se tiver:").
 *
 * Enquanto o guia com IA nao existe, a tela "pronta" mostra isto. Quando
 * existir, GUIA_IA_PRONTO (guia-exemplos.js) troca por CartoesGuia.
 */

const VOU_PENSAR = (campo) => ({
  quando: "“Vou pensar”, ali na hora",
  msgs: [
    { texto: "Claro. Me conta uma coisa: tem alguém com quem você vai decidir isso em casa?" },
    { pre: "Se tiver", texto: campo },
    { pre: "E sempre", texto: "O que ficou de dúvida para você decidir?" },
  ],
});

const MARIDO = (final) => ({
  quando: "“Vou ver com meu marido” (ou quem for)",
  msgs: [{ texto: `Faz todo sentido. Leva a proposta, que está tudo escrito, inclusive o que eu vi na avaliação. Se ele quiser tirar alguma dúvida comigo, ${final}` }],
});

const RESPOSTAS = {
  fisio: {
    coluna: VOU_PENSAR("Então leva a proposta para mostrar. Está tudo escrito ali: o que eu vi e as três opções."),
    joelho: {
      quando: "“O plano de saúde cobre?”",
      msgs: [{ texto: "O meu atendimento é particular. Eu te dou o recibo de cada pagamento para você pedir o reembolso ao seu plano, se ele tiver essa cobertura." }],
    },
    pilatesClinico: {
      quando: "“Posso pagar por sessão?”",
      msgs: [{ texto: "Pode, a avulsa é R$ [AVULSA]. Avulsa eu não consigo segurar o mesmo horário toda semana, e o plano é o que dá continuidade ao tratamento." }],
    },
  },
  estetica: {
    facial: {
      quando: "“Tá caro.”",
      msgs: [{ texto: "Entendo. Das três opções, qual ficou mais perto do que cabe para você agora? A do intervalo mais espaçado existe para isso: o ritmo é mais lento, e cabe melhor no mês." }],
    },
    corporal: {
      quando: "Quando ela some depois do “vou pensar”",
      msgs: [
        { pre: "Dois dias depois", texto: "[NOME], ainda estou segurando o horário de [DIA] às [HORA] para você, até amanhã. Depois ele volta para a agenda. Quer que eu deixe reservado?" },
        { pre: "Uma semana depois", texto: "[NOME], passando para saber como está a sua pele. Se quiser começar o protocolo, me chama. Se decidiu esperar, tudo bem também: me avisa e eu paro de te escrever." },
      ],
    },
    laser: MARIDO("pode me chamar."),
  },
  pilates: {
    iniciante: {
      quando: "“Vou ver minha agenda”, ao fim da aula experimental",
      msgs: [
        { texto: "Claro. Me conta uma coisa: você decide isso sozinha ou tem alguém em casa que entra nessa conversa?" },
        { pre: "Se tiver", texto: "Então leva a proposta para mostrar. Está tudo escrito ali: o que eu vi na sua aula e as opções de plano." },
        { pre: "E sempre", texto: "O que ficou de dúvida para você decidir?" },
      ],
    },
    tres: {
      quando: "“Tem multa se eu quiser cancelar?”",
      msgs: [{ texto: "O cancelamento funciona assim: [a regra do seu contrato]. Você também pode trancar o plano por até [30] dias por ano, com aviso de uma semana. Está tudo escrito no contrato que eu te entrego junto com o plano." }],
    },
    renovacao: {
      quando: "Se ela disser que está satisfeita e quer parar",
      msgs: [{ texto: "Que bom que você está satisfeita com o que conquistou. Se quiser, a gente passa para [2x por semana] para manter o ritmo. Se preferir parar, fica com o meu contato e me chama quando quiser voltar." }],
    },
  },
};

export function respostasDoCaso(nicho, casoId) {
  return RESPOSTAS[nicho]?.[casoId] ?? null;
}

export default RESPOSTAS;
