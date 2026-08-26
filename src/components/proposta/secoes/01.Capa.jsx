import styled from "styled-components";
import logoToka from "../../../assets/landingpage/logo.svg";
import { Cta } from "../../../estilo/ds";
import { Seta } from "../../habitat/icones";
import { Coluna, Media } from "../style";

/**
 * Dobra 1. Nenhum preço, nenhum entregável: só a tese e quanto tempo a
 * leitura vai tomar.
 *
 * Dizer o tempo logo no começo não é gentileza, é o que segura a
 * leitura. Quem abre um link de proposta no telemóvel decide em três
 * segundos se lê agora ou "depois" (que é nunca), e a estimativa tira
 * essa decisão do escuro.
 */

const Faixa = styled.header`
  width: 100%;
  padding: 26px 0 0;
`;

const Topo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  img {
    height: 28px;
    width: auto;
  }

  p {
    font-family: "Poppins", sans-serif;
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
    margin: 0;
    text-align: right;
  }

  ${Media.PhoneLarge} {
    p {
      font-size: 0.6rem;
      letter-spacing: 0.16em;
    }
  }
`;

const Corpo = styled.div`
  padding: clamp(60px, 11vw, 120px) 0 clamp(70px, 12vw, 130px);

  h1 {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(2.3rem, 6vw, 4.1rem);
    font-weight: 400;
    line-height: 1.07;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0 0 30px;

    em {
      font-style: normal;
      color: var(--acento);
    }
  }

  .abertura {
    font-size: clamp(1.04rem, 1.7vw, 1.2rem);
    line-height: 1.6;
    color: var(--tinta-corpo);
    margin: 0 0 38px;
    max-width: 40rem;
  }
`;

export default function Capa({ dados, aoClicar }) {
  const { capa, cliente } = dados;

  return (
    <Faixa className="faixa-escura">
      <Coluna>
        <Topo>
          <img src={logoToka} alt="Toka" />
          <p>
            {capa.selo}
            <br />
            {cliente.saudacao}
          </p>
        </Topo>

        <Corpo>
          <h1
            dangerouslySetInnerHTML={{
              __html: capa.titulo.join(" "),
            }}
          />
          <p className="abertura">
            {cliente.saudacao}, {capa.abertura}
          </p>
          <Cta type="button" onClick={aoClicar}>
            {capa.botao}
            <Seta />
          </Cta>
        </Corpo>
      </Coluna>
    </Faixa>
  );
}
