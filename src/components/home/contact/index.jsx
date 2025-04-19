import * as Styled from "./style";
import Button from "./../../GLOBAL/button/index";

export default function Contact() {
  return (
    <Styled.Container>
      <div className="content">
        <div className="left">
          <p className="label">VAMOS CONVERSAR?</p>
          <h1>
            Vamos transformar seu <br />
            próximo passo em <br />
            crescimento real.
          </h1>
          <p className="sub">
            Conte pra gente o momento da sua empresa. <br />
            Nós cuidamos da estratégia.
          </p>
          <Button text="Agendar uma call" showIcon={false} />
        </div>

        <div className="right">
          <div className="info">
            <p className="title">Telefone</p>
            <p>+55 11 99686-5057</p>
          </div>
          <div className="info">
            <p className="title">Email</p>
            <p>marketing@agenciatoka.com.br</p>
          </div>
        </div>
      </div>
    </Styled.Container>
  );
}
