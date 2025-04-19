// import styled as * from "./style.js"
import * as Styled from "./style.js";
import Button from "./../../GLOBAL/button/index";

export default function Banner() {
  return (
    <Styled.Container>
      <div className="textContainer">
        <h1>
          Assessoria de <span>marketing digital</span>, especializada em{" "}
          <span>Growth Marketing e Vendas.</span>
        </h1>
        <p>
          A Toka une estratégia, tecnologia e execução para transformar negócios
          em máquinas de crescimento.
        </p>
        <Button text="Agendar uma call" showIcon={false} />
      </div>
    </Styled.Container>
  );
}
