import { useState } from "react";
import * as Styled from "./style.js";

const faqItems = [
  {
    id: "01",
    question: "Funciona para quem está começando?",
    answer: "Sim. Construímos a base do zero com você.",
  },
  {
    id: "02",
    question: "Precisa aparecer muito?",
    answer:
      "Você aparece o suficiente para transmitir confiança. Nada forçado.",
  },
  {
    id: "03",
    question: "Não tenho muitos seguidores. Isso atrapalha?",
    answer: "Não. Seguidores não pagam contas. Estratégia paga.",
  },
  {
    id: "04",
    question: "É arriscado?",
    answer: "O método é feito para retorno rápido e crescimento contínuo.",
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState("01");

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Styled.Container id="faq">
      <div className="inner">
        <div className="containerFaq">
          <div className="left">
            <div className="badge">TIRE SUAS DÚVIDAS AQUI</div>

            <h2>Perguntas mais frequentes</h2>

            <span className="underline" />
          </div>

          <div className="right">
            {faqItems.map((item) => (
              <div key={item.id} className="faqItem">
                <button
                  type="button"
                  className="questionRow"
                  onClick={() => handleToggle(item.id)}
                >
                  <div className="number">{item.id}</div>
                  <p className="questionText">{item.question}</p>
                  <span className={`icon ${openId === item.id ? "open" : ""}`}>
                    +
                  </span>
                </button>

                {openId === item.id && (
                  <p className="answerText">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Styled.Container>
  );
}
