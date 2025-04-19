import * as Styled from "./style";
import card1 from "../../../assets/homepage/doing/card1.svg";
import card2 from "../../../assets/homepage/doing/card2.svg";
import card3 from "../../../assets/homepage/doing/card3.svg";

const cards = [
  {
    title: "Criativo",
    highlight: false,
    description: (
      <>
        Criamos com estratégia.{" "}
        <strong>Design, identidade visual, sites e vídeos</strong> pensados para
        posicionar sua marca de forma única e gerar conexão real com o público
        certo. Tudo com foco em conversão, não só estética.
      </>
    ),
    icon: card3,
  },
  {
    title: "GROWTH",
    highlight: true,
    description: (
      <>
        Marketing que vende de verdade. Estruturamos o seu{" "}
        <strong>funil de vendas</strong>, geramos{" "}
        <strong>tráfego qualificado</strong>, implementamos <strong>CRM</strong>{" "}
        e automações para transformar leads em clientes com controle, dados e
        escala.
      </>
    ),
    icon: card2,
  },
  {
    title: "Tecnologia",
    highlight: false,
    description: (
      <>
        Escalabilidade com inteligência. Aplicamos tecnologia para acelerar o
        crescimento:{" "}
        <strong>IA, dashboards e integrações personalizadas</strong> que
        transformam operação em inteligência de negócio.
      </>
    ),
    icon: card1,
  },
];

export default function Doing() {
  return (
    <Styled.Container>
      <div className="content">
        <div className="intro">
          <p className="label">O QUE FAZEMOS</p>
          <h2>
            Como tiramos estratégias do papel <br />
            <span>(e transformamos em crescimento real)</span>
          </h2>
          <p className="subtitle">
            Sem complicação: nossa assessoria combina três núcleos essenciais:{" "}
            <strong>Criativo</strong>, <strong>Growth</strong> e
            <strong>Tecnologia</strong>. Que atuam de forma integrada para
            escalar marcas com inteligência e performance.
          </p>
        </div>

        <div className="grid">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <h3 className={card.highlight ? "highlight" : ""}>
                {card.title}
              </h3>
              <p>{card.description}</p>
              <div className="icon">
                <img src={card.icon} alt={`Ícone de ${card.title}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Styled.Container>
  );
}
