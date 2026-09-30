import styled from "styled-components";
import { Inner, Lead } from "../../estilo/ds";
import doc from "./docs";
import { Bloco, Titulo2 } from "./style";

/**
 * Cena: o titulo com o valor que sai pela porta e, ao lado, o comparativo
 * entre o preco solto (conversa sem resposta) e o papel na mao (pagina 3
 * do documento). A seta dourada de 1px liga um ao outro.
 */

const Grade = styled.div`
  display: grid;
  gap: 40px;
  align-items: center;

  @media (min-width: 881px) {
    grid-template-columns: 0.9fr 1.3fr;
    gap: 64px;
  }
`;

const Comparativo = styled.div`
  display: grid;
  gap: 14px;
  justify-items: center;

  @media (min-width: 881px) {
    grid-template-columns: 1fr 44px 1fr;
    gap: 10px;
    align-items: center;
    justify-items: stretch;
  }
`;

const Coluna = styled.div`
  width: 100%;
  max-width: 340px;

  .rotulo {
    font-family: "Poppins", sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
    margin: 0 0 12px;
  }

  &.b .rotulo {
    color: var(--acento);
  }
`;

const CartaoA = styled.div`
  background: #161D30;
  border: 1px solid rgba(244, 243, 238, 0.07);
  border-radius: 18px;
  padding: 18px 16px 14px;
  opacity: 0.78;
  filter: saturate(0.5);

  .chat {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .b {
    max-width: 88%;
    padding: 8px 11px;
    border-radius: 10px;
    font-size: 0.86rem;
    line-height: 1.35;
    color: #B8BFCC;
  }

  .voce {
    align-self: flex-end;
    background: #2C3A47;
    border-top-right-radius: 2px;
  }

  .ela {
    align-self: flex-start;
    background: #242C40;
    border-top-left-radius: 2px;
  }

  .visto {
    margin: 14px 0 0;
    font-size: 0.74rem;
    color: #7F8698;
    text-align: right;
  }
`;

const CartaoB = styled.div`
  border-radius: 18px;
  padding: 12px;
  background: rgba(224, 182, 90, 0.07);
  border: 1px solid #E0B65A;
  box-shadow: 0 0 34px -10px rgba(224, 182, 90, 0.45);

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 6px;
    background: #fff;
  }
`;

const Seta = styled.svg`
  width: 44px;
  height: 44px;
  flex: none;
  transform: rotate(90deg);

  @media (min-width: 881px) {
    transform: none;
  }
`;

export function Cena({ d }) {
  return (
    <Bloco className="faixa-escura" data-cena>
      <Inner>
        <Grade>
          <div>
            <Titulo2>{d.cena.titulo}</Titulo2>
            <Lead style={{ marginBottom: 0 }}>{d.cena.texto}</Lead>
          </div>
          <Comparativo>
            <Coluna>
              <p className="rotulo">O preço solto</p>
              <CartaoA>
                <div className="chat">
                  <div className="b voce">{d.cena.conversa.voce}</div>
                  <div className="b ela">{d.cena.conversa.ela}</div>
                </div>
                <p className="visto">Visualizada · sem resposta há 6 dias</p>
              </CartaoA>
            </Coluna>
            <Seta viewBox="0 0 44 44" aria-hidden="true">
              <path d="M6 22h32M30 14l8 8-8 8" fill="none" stroke="#E0B65A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </Seta>
            <Coluna className="b">
              <p className="rotulo">O papel na mão</p>
              <CartaoB>
                <img src={doc[d.slug][3]} width="700" height="990" alt="Página do plano em três opções, com os preços" />
              </CartaoB>
            </Coluna>
          </Comparativo>
        </Grade>
      </Inner>
    </Bloco>
  );
}
