import { useState } from "react";
import * as Styled from "./style";

const faqList = [
  {
    id: 1,
    pergunta: "Quanto tempo leva para entregar um projeto completo?",
    resposta:
      "O tempo pode variar conforme o nível de complexidade e volume do projeto. Mas nossos processos são otimizados para entregar com a maior agilidade possível, sem abrir mão da excelência na qualidade.",
  },
  {
    id: 2,
    pergunta:
      "Preciso contratar tudo ou posso fechar só uma parte (tipo só design)?",
    resposta:
      "Nós podemos entrar apenas com um serviço, sim — principalmente quando você já tem pessoas tocando outras frentes. A Toka entra sempre para somar, seja cuidando de tudo ou sendo uma peça estratégica da engrenagem.",
  },
  {
    id: 3,
    pergunta: "Vocês trabalham com código ou ferramentas no-code?",
    resposta:
      "Usamos as duas abordagens conforme o projeto. O foco é entregar resultado, não tecnologia pela tecnologia.",
  },
  {
    id: 4,
    pergunta: "Não tenho briefing pronto. Isso é um problema?",
    resposta:
      "Nenhum problema. A gente te ajuda a construir esse briefing no início da consultoria.",
  },
  {
    id: 5,
    pergunta: "Vou participar do processo ou só recebo no final?",
    resposta:
      "Você participa, sim. Faz parte da nossa metodologia cocriar com o cliente em etapas-chave.",
  },
  {
    id: 6,
    pergunta: "Tenho um time interno, dá pra integrar com vocês?",
    resposta:
      "Sim! A integração com times internos é algo comum por aqui. Atuamos como braço complementar e estratégico.",
  },
  {
    id: 7,
    pergunta: "O site vai ser fácil de atualizar depois?",
    resposta:
      "Sim, entregamos com painel personalizado ou plataformas como Webflow e WordPress, conforme o projeto.",
  },
  {
    id: 8,
    pergunta: "Depois que lançarem meu projeto, eu fico sozinho?",
    resposta:
      "De jeito nenhum. Oferecemos planos de acompanhamento e evolução contínua após o lançamento.",
  },
];

export default function Faq() {
  const [ativo, setAtivo] = useState(null);

  const toggle = (id) => {
    setAtivo((prev) => (prev === id ? null : id));
  };

  return (
    <Styled.Container>
      <div className="content">
        <div className="left">
          <p className="label">F.A.Q</p>
          <h2>Dúvidas Frequentes</h2>
          <p className="desc">
            Respondemos aqui o que todo mundo quer saber antes de começar, de
            forma clara e direta!
          </p>
        </div>

        <div className="right">
          <ul>
            {faqList.map((item) => (
              <li key={item.id}>
                <div className="question" onClick={() => toggle(item.id)}>
                  <p>{item.pergunta}</p>
                  <span>{ativo === item.id ? "–" : "+"}</span>
                </div>
                <div className={`answer ${ativo === item.id ? "active" : ""}`}>
                  <p>{item.resposta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Styled.Container>
  );
}
