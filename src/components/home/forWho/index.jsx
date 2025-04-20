import * as Styled from "./style";

export default function WhoIsFor() {
  return (
    <Styled.Container>
      <div className="content">
        <div className="left">
          <p className="headline">
            A Toka é para <br />
            empresas que não <br />
            querem depender da <br />
            sorte e quer vender mais.
          </p>
        </div>

        <div className="right">
          <ul>
            <li>
              <h3>Saúde</h3>
              <p>Já fatura bem, mas quer escalar com previsibilidade</p>
            </li>
            <li>
              <h3>Educação</h3>
              <p>Cansou de freelancers e ações sem estratégia</p>
            </li>
            <li>
              <h3>Serviços</h3>
              <p>Quer posicionar a marca com autoridade</p>
            </li>
            <li>
              <h3>Tecnologia</h3>
              <p>Precisa gerar leads qualificados no digital</p>
            </li>
            <li>
              <h3>Indústria</h3>
              <p>Busca um parceiro que pense e execute</p>
            </li>
            <li>
              <h3>Consultorias</h3>
              <p>Quer parar de depender de indicações</p>
            </li>
            <li>
              <h3>Moda & Consumo</h3>
              <p>Valoriza crescimento sustentável</p>
            </li>
          </ul>
        </div>
      </div>
    </Styled.Container>
  );
}
