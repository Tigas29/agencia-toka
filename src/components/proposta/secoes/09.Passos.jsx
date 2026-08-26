import styled from "styled-components";
import { Cta, H2, Microcopy, Selo } from "../../../estilo/ds";
import { Whatsapp } from "../../habitat/icones";
import { track } from "../../habitat/lead";
import { Coluna, Dobra, Media } from "../style";

/**
 * Dobra 9, o pedido. Uma ação só, e ela é a mais barata possível:
 * responder uma mensagem. Pedir agendamento, formulário ou assinatura
 * aqui seria trocar um passo que custa dez segundos por um que custa
 * uma decisão de agenda.
 *
 * O link já leva a mensagem escrita porque quem abre o WhatsApp com o
 * campo vazio precisa formular a frase, e formular a frase é onde a
 * pessoa desiste.
 *
 * Esta dobra não anima a entrada, e aqui a razão não é ritmo de leitura:
 * o fim de um gatilho de rolagem na última dobra cai além do que a
 * página consegue rolar, então a cascata nunca completa e o botão da
 * proposta inteira fica na tela meio transparente, parecendo desativado.
 */

const Passos = styled.ol`
  list-style: none;
  counter-reset: passo;
  padding: 0;
  margin: 36px 0 44px;

  li {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: baseline;
    gap: 20px;
    padding: 20px 0;
    border-bottom: 1px solid var(--linha);

    &:last-child {
      border-bottom: 0;
    }
  }

  .n {
    font-family: "EB Garamond", Georgia, serif;
    font-variant-numeric: lining-nums proportional-nums;
    font-size: clamp(1.7rem, 4vw, 2.3rem);
    line-height: 1;
    color: var(--acento);
  }

  p {
    font-size: 1.02rem;
    line-height: 1.58;
    color: var(--tinta-corpo);
    margin: 0;
    max-width: 48ch;
  }

  ${Media.PhoneLarge} {
    gap: 14px;
  }
`;

export default function PassosFinais({ dados }) {
  const { passos, whatsapp } = dados;

  const link = `https://api.whatsapp.com/send/?phone=${whatsapp}&text=${encodeURIComponent(
    passos.mensagem
  )}&type=phone_number&app_absent=0`;

  return (
    <Dobra className="faixa-clara" id="proximo-passo">
      <Coluna>
        <Selo>{passos.selo}</Selo>
        <H2>{passos.titulo}</H2>

        <Passos>
          {passos.itens.map((item) => (
            <li key={item.n}>
              <span className="n">{item.n}</span>
              <p>{item.texto}</p>
            </li>
          ))}
        </Passos>

        <div>
          <Cta
            as="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            $tom="tinta"
            onClick={() => track("Contact", { content_name: "proposta" })}
          >
            <Whatsapp />
            {passos.botao}
          </Cta>
          <Microcopy>{passos.microcopy}</Microcopy>
        </div>
      </Coluna>
    </Dobra>
  );
}
