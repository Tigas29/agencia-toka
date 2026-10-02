/* Gerado de lowticket-saude/guia/exemplos.md (Teo, 02/out/2026): as 9 conversas e os 3 audios,
   verbatim. `de: "nota"` e a linha de cena entre parenteses do original (ex.: dois dias depois).
   `guia` e o JSON que a IA real devolve; EXEMPLO-PENDENTE ate o Tiago/Ana colar as saidas reais. */

const PENDENTE = (n) => ({
  aviso: "",
  caso: { resumo: `EXEMPLO-PENDENTE: resumo do caso ${n}`, fraseDela: `EXEMPLO-PENDENTE: frase dela ${n}` },
  spin: {
    situacao: ["EXEMPLO-PENDENTE: situação 1", "EXEMPLO-PENDENTE: situação 2"],
    problema: ["EXEMPLO-PENDENTE: problema 1", "EXEMPLO-PENDENTE: problema 2"],
    implicacao: ["EXEMPLO-PENDENTE: implicação 1", "EXEMPLO-PENDENTE: implicação 2"],
    necessidade: ["EXEMPLO-PENDENTE: necessidade 1", "EXEMPLO-PENDENTE: necessidade 2"],
  },
  recomendacao: { opcao: "EXEMPLO-PENDENTE: opção", porque: "EXEMPLO-PENDENTE: porque" },
  conducao: ["EXEMPLO-PENDENTE: passo 1", "EXEMPLO-PENDENTE: passo 2", "EXEMPLO-PENDENTE: passo 3", "EXEMPLO-PENDENTE: passo 4", "EXEMPLO-PENDENTE: passo 5"],
  objecoes: [
    { objecao: "EXEMPLO-PENDENTE: se ela disser 1", resposta: "EXEMPLO-PENDENTE: resposta 1" },
    { objecao: "EXEMPLO-PENDENTE: se ela disser 2", resposta: "EXEMPLO-PENDENTE: resposta 2" },
  ],
  mensagens: {
    mesmaNoite: "EXEMPLO-PENDENTE: mensagem da mesma noite",
    doisDias: "EXEMPLO-PENDENTE: mensagem de dois dias",
    umaSemana: "EXEMPLO-PENDENTE: mensagem de uma semana",
  },
  pagina2: {
    trouxe: "EXEMPLO-PENDENTE: o que trouxe",
    encontrei: ["EXEMPLO-PENDENTE: achado 1", "EXEMPLO-PENDENTE: achado 2"],
    trabalhar: ["EXEMPLO-PENDENTE: trabalhar 1", "EXEMPLO-PENDENTE: trabalhar 2"],
  },
  cuidado: "EXEMPLO-PENDENTE: cuidado",
});

const BRUTO = {
  "fisio": {
    "coluna": {
      "conversa": [
        {
          "de": "voce",
          "texto": "Oi, Marina. Te mando aqui a proposta que a gente viu hoje, para você ter no celular. Se aparecer alguma dúvida em casa, me pergunta por aqui.",
          "anexo": "a proposta em PDF"
        },
        {
          "de": "paciente",
          "texto": "Oi! Chegou sim, obrigada. Li tudo agora no sofá"
        },
        {
          "de": "paciente",
          "texto": "Gostei de ver escrito o que você achou. O quadril eu nem sabia que estava pegando. Eu só sentia as costas, no fim do dia não aguento mais e já desisti da caminhada"
        },
        {
          "de": "voce",
          "texto": "É um dos pontos que a gente trabalha junto com a lombar. Ficou alguma dúvida sobre as opções?"
        },
        {
          "de": "paciente",
          "texto": "Fiquei olhando a de 3x por semana. É bastante né? Trabalho até as 18h"
        },
        {
          "de": "voce",
          "texto": "Foi a que eu marquei como a que eu recomendo, porque a dor aparece no fim do dia e três encontros por semana dão mais estímulo para a musculatura aguentar o dia inteiro. A de 1x por semana existe para quem não consegue vir mais, mas o ritmo é mais lento."
        },
        {
          "de": "paciente",
          "texto": "Entendi. Vou pensar com calma, tá? Não quero decidir correndo"
        },
        {
          "de": "voce",
          "texto": "Claro. O que ficou de dúvida para você decidir?"
        },
        {
          "de": "paciente",
          "texto": "Acho que é mais o horário mesmo. E o valor junto, preciso ver como fica o mês"
        },
        {
          "de": "voce",
          "texto": "Faz sentido. Segunda às 8h e quarta às 18h eu sigo segurando até sábado. Se quiser me dizer qual cabe, eu já deixo reservado."
        },
        {
          "de": "paciente",
          "texto": "Tá bom, te falo até sábado"
        },
        {
          "de": "paciente",
          "texto": "Mas se eu não conseguir, tudo bem né? Vou pensar"
        }
      ],
      "audio": {
        "duracao": "1:12",
        "transcricao": "Então, acabei de avaliar a Marina, a que chegou com dor nas costas. Ela me disse assim: dor que piora no fim do dia e que já fez ela desistir da caminhada. No exame, a lombar cansa antes do fim do dia, dobrar o tronco dói a partir da metade do movimento, e o quadril direito está mais rígido que o esquerdo. Montei a proposta com três opções. A que eu recomendo é a de três vezes por semana, oito semanas, 24 sessões, dois mil oitocentos e oitenta, ou seis vezes de quatrocentos e oitenta. Mandei o PDF à noite e ela respondeu que gostou de ver escrito, mas que ia pensar. Eu perguntei o que ficou de dúvida e ela falou do horário, porque trabalha até as 18h, e do valor junto. Eu segurei segunda às 8h e quarta às 18h até sábado. E agora eu não sei o que fazer. Insisto? Espero ela falar? Fico com a sensação de que expliquei tudo e ela travou mesmo assim. O que eu pergunto para ela, e em que ordem?"
      }
    },
    "joelho": {
      "conversa": [
        {
          "de": "voce",
          "texto": "Oi, Rafael. Te mando aqui a proposta que a gente viu hoje, para você ter no celular. Se aparecer alguma dúvida em casa, me pergunta por aqui.",
          "anexo": "a proposta em PDF"
        },
        {
          "de": "paciente",
          "texto": "Opa, chegou. Valeu"
        },
        {
          "de": "paciente",
          "texto": "Li as três. Eu queria mesmo voltar a correr, mas hoje nem subir escada eu consigo direito, então a de 3x faz sentido"
        },
        {
          "de": "voce",
          "texto": "Foi essa que eu recomendo. Nos primeiros três meses depois da cirurgia a frequência pesa mais na recuperação da força. E a volta à corrida vem na fase certa, com a liberação do seu cirurgião."
        },
        {
          "de": "paciente",
          "texto": "Combinado. Deixa eu te perguntar uma coisa antes: o plano de saúde cobre isso? Pago o meu todo mês, foi ele que pagou a cirurgia"
        },
        {
          "de": "voce",
          "texto": "O meu atendimento é particular. Eu te dou o recibo de cada pagamento para você pedir o reembolso ao seu plano, se ele tiver essa cobertura."
        },
        {
          "de": "paciente",
          "texto": "Mas dá para saber antes se reembolsa? Não queria pagar R$ 4.320 e descobrir depois que não volta nada"
        },
        {
          "de": "voce",
          "texto": "Isso só o plano responde, porque cada contrato é de um jeito. Vale ligar e perguntar sobre reembolso de fisioterapia fora da rede. Se ele pedir algum dado a mais no recibo, me avisa que eu coloco."
        },
        {
          "de": "paciente",
          "texto": "Beleza. Tem como parcelar? Se o plano não cobrir eu preciso diluir"
        },
        {
          "de": "voce",
          "texto": "Tem, são 8 vezes de R$ 540 na opção 2, no cartão ou em parcelas no Pix. Os horários de segunda, 05/10, às 7h e de quarta, 07/10, às 19h eu seguro até sábado."
        },
        {
          "de": "paciente",
          "texto": "Ligo para o plano amanhã cedo e te falo. Só não quero fechar sem saber se cobre"
        }
      ],
      "audio": null
    },
    "pilatesClinico": {
      "conversa": [
        {
          "de": "voce",
          "texto": "Oi, Cláudia. Te mando aqui a proposta que a gente viu hoje, para você ter no celular. Se aparecer alguma dúvida em casa, me pergunta por aqui.",
          "anexo": "a proposta em PDF"
        },
        {
          "de": "paciente",
          "texto": "Oi! Recebi. Obrigada pela avaliação, foi bem diferente do que eu esperava"
        },
        {
          "de": "paciente",
          "texto": "Dou aula em pé o dia inteiro e no fim da semana não aguento mais. Quando eu me inclino para a frente a dor desce para a perna esquerda, você viu isso né"
        },
        {
          "de": "voce",
          "texto": "Vi sim, está na proposta, junto com o quadril rígido. Ficou alguma dúvida nas três opções?"
        },
        {
          "de": "paciente",
          "texto": "Olhei a do trimestral, R$ 580 por mês. Mas eu nunca fiz pilates, e se eu não me adaptar? Fico presa três meses"
        },
        {
          "de": "voce",
          "texto": "Entendo a preocupação. O trimestral é o que eu recomendo porque o fortalecimento da musculatura profunda leva semanas, e três meses dão tempo para a reavaliação mostrar o que mudou."
        },
        {
          "de": "paciente",
          "texto": "Faz sentido. Mas eu pensei numa coisa: posso pagar por sessão? Vou vindo conforme a minha semana de aula deixa"
        },
        {
          "de": "voce",
          "texto": "Pode, a avulsa é R$ 90. Só que na avulsa eu não consigo segurar o mesmo horário toda semana, e o plano é o que dá continuidade ao tratamento."
        },
        {
          "de": "paciente",
          "texto": "Hum. É que a minha escala muda todo mês, não sei se consigo 2x por semana certinho"
        },
        {
          "de": "voce",
          "texto": "Me conta como é essa escala. Eu tenho a turma de segunda e quarta às 7h e a de terça e quinta às 19h, e seguro a vaga até sexta."
        },
        {
          "de": "paciente",
          "texto": "Varia. Tem semana que sim, tem semana que não. Por isso eu preferia ir pagando por sessão mesmo"
        }
      ],
      "audio": null
    }
  },
  "estetica": {
    "facial": {
      "conversa": [
        {
          "de": "voce",
          "texto": "Oi, Camila. Te mando aqui a proposta que a gente viu hoje, para você ter no celular. Se aparecer alguma dúvida em casa, me pergunta por aqui.",
          "anexo": "a proposta em PDF"
        },
        {
          "de": "paciente",
          "texto": "Oi! Chegou, obrigada. Fiquei olhando as três"
        },
        {
          "de": "paciente",
          "texto": "Eu tenho essas manchas no rosto que aparecem mais no verão, e não saem com nada que eu já usei em casa. Já gastei em creme que não adiantou nada"
        },
        {
          "de": "voce",
          "texto": "Por isso na proposta eu coloquei o que vi: a mancha fica mais visível com luz natural, e a textura está irregular ao toque. Qual das opções ficou mais perto do que você pensou?"
        },
        {
          "de": "paciente",
          "texto": "A 2 é a que você recomenda né? R$ 1.920"
        },
        {
          "de": "voce",
          "texto": "É. A pele se renova em ciclos, e o home care sustenta o protocolo entre uma sessão e outra. São 8 sessões em 4 meses, ou 4x de R$ 480."
        },
        {
          "de": "paciente",
          "texto": "E a 1 sem o home care, 6 sessões, R$ 1.080?"
        },
        {
          "de": "voce",
          "texto": "É a do ritmo padrão, sem os cuidados em casa. Funciona de outro jeito, a pele fica mais tempo sem acompanhamento entre uma sessão e outra."
        },
        {
          "de": "paciente",
          "texto": "Entendi. Eu não sei se eu consigo mesmo. A sessão avulsa é 220, né? Fiz a conta e fica puxado"
        },
        {
          "de": "voce",
          "texto": "A avulsa é R$ 220, e no pacote a sessão sai por menos porque você se compromete com o protocolo inteiro. A de 21 dias, de R$ 990, existe para quem prefere um intervalo mais espaçado."
        },
        {
          "de": "paciente",
          "texto": "Tá caro para mim agora, sendo bem sincera. Eu queria muito, mas não sei como encaixar"
        }
      ],
      "audio": {
        "duracao": "1:13",
        "transcricao": "Atendi a Camila hoje, avaliação do rosto. Ela chegou falando de manchas que aparecem mais no verão e que não saem com nada que ela já usou em casa. Disse que já gastou em creme que não adiantou. Na pele eu vi a oleosidade concentrada na testa, no nariz e no queixo, as manchas mais visíveis com luz natural nas maçãs do rosto, e a textura irregular ao toque. Montei três opções. A que eu recomendo é a segunda, oito sessões, de quinze em quinze dias, com home care, mil novecentos e vinte, ou quatro vezes de quatrocentos e oitenta. Ela ficou olhando as três e voltou duas vezes na primeira, a de mil e oitenta. Perguntou da sessão avulsa, que é duzentos e vinte, e fez a conta na hora. No fim falou que estava caro para ela agora, mas que queria muito. Eu não sei se o problema é o valor total, a parcela, ou se ela ainda não viu por que o home care entra. Fiquei sem saber o que responder sem parecer que estou forçando a segunda opção."
      }
    },
    "corporal": {
      "conversa": [
        {
          "de": "voce",
          "texto": "Oi, Fernanda. Te mando aqui a proposta que a gente viu hoje, para você ter no celular. Se aparecer alguma dúvida em casa, me pergunta por aqui.",
          "anexo": "a proposta em PDF"
        },
        {
          "de": "paciente",
          "texto": "Oi! Chegou sim, obrigada por hoje"
        },
        {
          "de": "paciente",
          "texto": "Foi bom conversar, sabe? Depois dos meus filhos meu abdômen mudou e não volta nem com exercício. Eu já tinha até parado de tentar"
        },
        {
          "de": "voce",
          "texto": "Fico contente que você veio. Na proposta está o que eu vi e as três opções. Ficou alguma dúvida?"
        },
        {
          "de": "paciente",
          "texto": "Vi os valores. Vou olhar com calma e depois te falo"
        },
        {
          "de": "voce",
          "texto": "Fica à vontade. Qualquer coisa me pergunta por aqui."
        },
        {
          "de": "nota",
          "texto": "dois dias depois, mensagem lida, sem resposta"
        },
        {
          "de": "voce",
          "texto": "Fernanda, ainda estou segurando o horário de quarta às 17h para você, até amanhã. Depois ele volta para a agenda. Quer que eu deixe reservado?"
        },
        {
          "de": "nota",
          "texto": "sem resposta"
        },
        {
          "de": "nota",
          "texto": "uma semana depois, mensagem lida, sem resposta"
        },
        {
          "de": "voce",
          "texto": "Fernanda, passando para saber como você está. Se quiser começar o protocolo, me chama. Se decidiu esperar, tudo bem também: me avisa e eu paro de te escrever."
        },
        {
          "de": "nota",
          "texto": "sem resposta há 7 dias"
        }
      ],
      "audio": null
    },
    "laser": {
      "conversa": [
        {
          "de": "voce",
          "texto": "Oi, Juliana. Te mando aqui a proposta que a gente viu hoje, para você ter no celular. Se aparecer alguma dúvida em casa, me pergunta por aqui.",
          "anexo": "a proposta em PDF"
        },
        {
          "de": "paciente",
          "texto": "Oi, recebi! Gostei bastante"
        },
        {
          "de": "paciente",
          "texto": "Cansei de fazer cera toda semana e queria resolver isso. Você acha que em quantas sessões o pelo some?"
        },
        {
          "de": "voce",
          "texto": "Isso eu não sei te dizer, porque o pelo tem fases de crescimento diferentes e cada pessoa responde no seu tempo. Na sessão 4 a gente confere a resposta do pelo e ajusta o intervalo."
        },
        {
          "de": "paciente",
          "texto": "Entendi. E a opção 2 é pernas e axilas, né? R$ 2.320"
        },
        {
          "de": "voce",
          "texto": "Isso, 8 sessões em 12 meses, a cada 45 dias, ou 8x de R$ 290. Eu recomendo porque oito sessões cobrem os ciclos que aparecem depois das primeiras."
        },
        {
          "de": "paciente",
          "texto": "Eu quero. Só que eu divido as contas com meu marido e ele acha que é muito dinheiro para uma coisa que eu faço de cera"
        },
        {
          "de": "voce",
          "texto": "Faz todo sentido. Leva a proposta, que está tudo escrito, inclusive o que eu vi na avaliação. Se ele quiser tirar alguma dúvida comigo, pode me chamar."
        },
        {
          "de": "paciente",
          "texto": "Vou mostrar para ele hoje à noite"
        },
        {
          "de": "voce",
          "texto": "Combinado. Tenho horário na quinta, 01/10, às 11h ou na sexta, 02/10, às 18h, e seguro até sábado."
        },
        {
          "de": "paciente",
          "texto": "Tá bom. Vou ver com meu marido e te falo"
        }
      ],
      "audio": null
    }
  },
  "pilates": {
    "iniciante": {
      "conversa": [
        {
          "de": "voce",
          "texto": "Oi, Beatriz. Te mando aqui a proposta que a gente viu hoje, para você ter no celular. Se aparecer alguma dúvida em casa, me pergunta por aqui.",
          "anexo": "a proposta em PDF"
        },
        {
          "de": "paciente",
          "texto": "Oi! Obrigada pela aula, eu gostei bastante"
        },
        {
          "de": "paciente",
          "texto": "Passo o dia sentada e sinto o corpo mais pesado. Quero voltar a ter uma rotina de exercício, mas sempre começo e paro"
        },
        {
          "de": "voce",
          "texto": "Dá para ver na aula que você tem facilidade nos exercícios de força de braço. Ficou alguma dúvida nos planos?"
        },
        {
          "de": "paciente",
          "texto": "Vi que você recomenda o de 3x, trimestral, R$ 660. Três vezes por semana parece muito para mim"
        },
        {
          "de": "voce",
          "texto": "Eu recomendo porque três aulas por semana dão mais estímulo para a postura se manter, e o trimestral segura o valor da mensalidade. O de 2x por semana, mensal, R$ 520, existe para quem quer testar o ritmo primeiro."
        },
        {
          "de": "paciente",
          "texto": "Hum, entendi. Eu preciso ver como fica com meu trabalho, às vezes saio tarde"
        },
        {
          "de": "voce",
          "texto": "Claro. O que ficou de dúvida para você decidir?"
        },
        {
          "de": "paciente",
          "texto": "Não é dúvida, é que eu não sei se vou conseguir ir. Deixa eu olhar a minha agenda da semana"
        },
        {
          "de": "voce",
          "texto": "Os horários que eu tenho são segunda, 28/09, às 8h e quarta, 30/09, às 18h, e seguro até sábado."
        },
        {
          "de": "paciente",
          "texto": "Tá bom, vou ver minha agenda e te aviso"
        }
      ],
      "audio": {
        "duracao": "1:08",
        "transcricao": "Dei a aula experimental da Beatriz hoje. Ela passa o dia sentada, sente o corpo pesado e quer voltar a ter uma rotina de exercício, mas me disse que sempre começa e para. Na aula, ela sentiu falta de fôlego na respiração do começo, a postura fica ereta quando eu corrijo e some quando ela se distrai, e ela foi bem nos exercícios de força de braço e teve mais dificuldade no equilíbrio. Montei a proposta com três planos. Eu recomendo o de três vezes por semana, trimestral, seiscentos e sessenta por mês. Ela gostou da aula, mas quando viu a frequência disse que três vezes parecia muito. Expliquei os outros dois, o de duas vezes mensal e o semestral. Falou do trabalho, que às vezes sai tarde, e fechou com: vou ver minha agenda. Perguntei se tinha dúvida e ela disse que não era dúvida. Eu fiquei sem entender o que está travando de verdade. Seria o tempo, o valor, ou o medo de começar e parar de novo?"
      }
    },
    "tres": {
      "conversa": [
        {
          "de": "voce",
          "texto": "Oi, Larissa. Te mando aqui a proposta que a gente viu hoje, para você ter no celular. Se aparecer alguma dúvida em casa, me pergunta por aqui.",
          "anexo": "a proposta em PDF"
        },
        {
          "de": "paciente",
          "texto": "Oi! Li tudo. Corro três vezes por semana e sinto que preciso de mais força no tronco, e foi isso que você mostrou"
        },
        {
          "de": "voce",
          "texto": "Foi o que apareceu na aula: pouca ativação do centro do corpo nos exercícios de estabilização, e o equilíbrio em um pé só ainda instável. A mobilidade de quadril está boa."
        },
        {
          "de": "paciente",
          "texto": "Queria o de 3x por semana. Mas qual vale mais a pena, o mensal de R$ 720 ou o trimestral de R$ 660?"
        },
        {
          "de": "voce",
          "texto": "Eu recomendo o trimestral. O ganho de estabilidade pede constância, e ele segura o valor sem você precisar decidir todo mês."
        },
        {
          "de": "paciente",
          "texto": "Faz sentido. Só que eu me preocupo com uma coisa: e se eu viajar, ou tiver uma prova de corrida e precisar parar?"
        },
        {
          "de": "voce",
          "texto": "Você pode trancar o plano por até 30 dias por ano, com aviso de 7 dias. E uma pausa com atestado médico não conta como falta."
        },
        {
          "de": "paciente",
          "texto": "Ok. Mas se eu quiser sair no meio, tem multa?"
        },
        {
          "de": "voce",
          "texto": "Está tudo escrito no contrato que eu te entrego junto com o plano, para você ler antes de decidir. Quer que eu te mande ele hoje?"
        },
        {
          "de": "paciente",
          "texto": "Manda sim"
        },
        {
          "de": "paciente",
          "texto": "Se tiver multa eu fico com medo do trimestral. Acho que prefiro o mensal então, mesmo pagando mais por mês"
        }
      ],
      "audio": null
    },
    "renovacao": {
      "conversa": [
        {
          "de": "voce",
          "texto": "Oi, Renata. Te mando aqui o acompanhamento dos seus 10 meses de aula e os caminhos para daqui para frente.",
          "anexo": "o acompanhamento em PDF"
        },
        {
          "de": "paciente",
          "texto": "Oi! Li agora. Nossa, 22 de 24 aulas, nem lembrava que tinha ido tanto"
        },
        {
          "de": "voce",
          "texto": "Foi uma frequência boa no período. No papel você diz que não sente mais aquele cansaço no fim do dia e que a postura no computador melhorou."
        },
        {
          "de": "paciente",
          "texto": "É verdade, eu falei isso. Hoje eu me sinto bem"
        },
        {
          "de": "voce",
          "texto": "Na aula dá para ver também: a postura se mantém ereta por mais tempo sem eu precisar corrigir, e o equilíbrio em apoio de um pé só está mais estável."
        },
        {
          "de": "paciente",
          "texto": "Então, sobre as opções. A de 3x por semana me deu vontade, porque eu pedi mais ritmo. Mas R$ 600 por mês fica puxado"
        },
        {
          "de": "voce",
          "texto": "A de 3x semestral é R$ 600 por mês, e é a que eu recomendo porque você pediu mais ritmo e três aulas dão espaço para avançar. Para manter o ritmo de hoje, a de 2x é R$ 450 por mês."
        },
        {
          "de": "paciente",
          "texto": "Hum. E se eu der uma pausa? Tem como?"
        },
        {
          "de": "voce",
          "texto": "Tem. A terceira opção é a pausa, sem mensalidade, e eu te passo orientação para manter em casa. O seu plano atual termina em breve, e eu seguro o seu horário até lá."
        },
        {
          "de": "paciente",
          "texto": "Não sei, estou na dúvida. Eu me sinto bem agora, e se eu parar um pouco e ver como fico? Será que preciso mesmo continuar?"
        }
      ],
      "audio": null
    }
  }
};

/** { fisio: { coluna, joelho, pilatesClinico }, estetica: {...}, pilates: {...} }, cada um { conversa, audio, guia }. */
const GUIA_EXEMPLOS = Object.fromEntries(
  Object.entries(BRUTO).map(([nicho, casos]) => [
    nicho,
    Object.fromEntries(Object.entries(casos).map(([id, c]) => [id, { ...c, guia: PENDENTE(id) }])),
  ]),
);

export default GUIA_EXEMPLOS;
