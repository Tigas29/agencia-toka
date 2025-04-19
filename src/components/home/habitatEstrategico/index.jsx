import * as Styled from "./style";
import Button from "./../../GLOBAL/button/index";
import habitatlogo from "../../../assets/homepage/habitat/logoHabitat.svg";
import item1 from "../../../assets/homepage/habitat/items.png";
import item2 from "../../../assets/homepage/habitat/items2.png";
export default function Habitat() {
  return (
    <Styled.Container>
      <div className="content">
        <div className="logo">
          <img src={habitatlogo} alt="Habitat Estratégico" />
        </div>
        <div className="topBox">
          <div className="text">
            <h3>
              Projetamos seu marketing <br />
              com base na real necessidade do seu negócio.
            </h3>
            <p>
              Você não precisa de mais tarefas, precisa de resultado. <br />
              Na Toka, atuamos como um braço estratégico do seu time ou como sua
              equipe completa de marketing e vendas. Nosso modelo é adaptável,
              escalável e feito para tirar peso da sua operação sem abrir mão da
              performance.
            </p>
          </div>

          <div className="image">
            <img src={item1} alt="Diagrama Habitat" />
          </div>
        </div>

        <div className="bottomBox">
          <div className="chart">
            <img src={item2} alt="Gráfico de módulos" />
          </div>

          <div className="text">
            <h3>
              Você escolhe o plano que <br />
              acompanha seu momento e evolui com ele.
            </h3>
            <p>
              Nossos serviços são organizados em módulos que crescem junto com
              seu negócio. <br />
              Você pode começar com o essencial e avançar conforme seu time e
              operação amadurecem. <br />O importante é ter estrutura desde o
              início e nós entregamos isso com inteligência.
            </p>
          </div>
        </div>

        <Button text="Agendar uma call" showIcon={true} />
      </div>
    </Styled.Container>
  );
}
