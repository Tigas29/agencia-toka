import styled from "styled-components";
import { Media } from "./style";

/**
 * A prova de cada entregável.
 *
 * A lista de dez linhas é promessa até alguém poder ver. Cada item que
 * tem material aponta para ele em um de três formatos, e o item guarda
 * só a intenção (`exemplo`), nunca o material em si.
 *
 * Item sem exemplo não ganha nada. Um botão que abre uma página genérica
 * vale menos que a ausência dele: quem clica uma vez e não vê o que foi
 * prometido para de clicar nos outros.
 */

const Botoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
`;

/**
 * Link de exemplo. Não usa o `Cta` do design system de propósito: aquele
 * é o botão da ação principal da página, e estes são links de apoio
 * espalhados pela lista. Meia dúzia de pílulas douradas competiria com o
 * único botão que importa, o do fim.
 */
const Link = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 0.82rem;
  color: var(--acento);
  text-decoration: none;
  border: 1px solid var(--acento-borda);
  border-radius: 999px;
  padding: 7px 15px;
  transition: background 200ms ease, border-color 200ms ease;

  &:hover {
    background: var(--acento-veu);
    border-color: var(--acento);
  }

  &:focus-visible {
    outline: 1px solid var(--tinta);
    outline-offset: 3px;
  }

  svg {
    flex: none;
  }
`;

const Saida = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M4.5 1.5H10.5V7.5M10.5 1.5L5 7M8 8.5v2h-6.5V4h2"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * A peça de exemplo, uma por entregável.
 *
 * Era uma galeria de três, e três miniaturas no meio da lista viravam
 * vitrine: puxavam a atenção para longe do que a dobra constrói, que é o
 * valor somando item a item. Uma peça, em largura que dá para ler o
 * título dela, prova o mesmo padrão sem interromper a leitura.
 */
const Artes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;

  figure {
    margin: 0;
    /* Largura fixa, e não fração da coluna: a peça é quadrada, e deixá-la
       ocupar a largura inteira da dobra daria uma imagem alta demais,
       empurrando o resto da lista para fora da tela. */
    max-width: 300px;
    width: 100%;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid var(--linha);
    background: var(--superficie);
  }

  figcaption {
    font-family: "Poppins", sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
    margin-top: 8px;
  }

  ${Media.PhoneLarge} {
    figure {
      max-width: 100%;
    }
  }
`;

const Conversa = styled.div`
  margin-top: 16px;
  border: 1px solid var(--linha);
  border-radius: 14px;
  background: var(--superficie);
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 30rem;

  .bolha {
    max-width: 82%;
    padding: 9px 13px;
    border-radius: 13px;
    font-size: 0.88rem;
    line-height: 1.45;
  }

  /* Quem escreve alinha à esquerda, quem responde à direita: é a
     convenção do próprio WhatsApp, e ler a conversa exige reconhecer de
     imediato quem é o paciente e quem é a assistente. */
  .lead {
    align-self: flex-start;
    background: var(--fundo);
    color: var(--tinta-corpo);
    border: 1px solid var(--linha);
    border-bottom-left-radius: 4px;
  }

  .ia {
    align-self: flex-end;
    background: var(--acento-veu);
    color: var(--tinta);
    border: 1px solid var(--acento-borda);
    border-bottom-right-radius: 4px;
  }

  .hora {
    display: block;
    font-size: 0.66rem;
    color: var(--tinta-fraca);
    margin-top: 4px;
  }

  .nota {
    font-size: 0.78rem;
    color: var(--tinta-fraca);
    margin: 6px 0 0;
    padding-top: 10px;
    border-top: 1px solid var(--linha);
  }
`;

export default function Exemplo({ exemplo, amostras }) {
  if (!exemplo) return null;

  if (exemplo.tipo === "link") {
    return (
      <Botoes>
        <Link href={exemplo.url} target="_blank" rel="noopener noreferrer">
          {exemplo.rotulo}
          <Saida />
        </Link>
      </Botoes>
    );
  }

  if (exemplo.tipo === "imagem") {
    const pecas = amostras?.[exemplo.chave] || [];
    if (!pecas.length) return null;
    return (
      <Artes>
        {pecas.map((peca) => (
          <figure key={peca.src}>
            <img src={peca.src} alt={peca.alt} loading="lazy" />
            <figcaption>{peca.legenda}</figcaption>
          </figure>
        ))}
      </Artes>
    );
  }

  if (exemplo.tipo === "conversa") {
    const mensagens = amostras?.[exemplo.chave] || [];
    if (!mensagens.length) return null;
    return (
      <Conversa>
        {mensagens.map((m, i) => (
          <div key={`${m.hora}-${i}`} className={`bolha ${m.de}`}>
            {m.texto}
            <span className="hora">{m.hora}</span>
          </div>
        ))}
        <p className="nota">
          Conversa de exemplo. O atendimento real de nenhum paciente aparece
          aqui.
        </p>
      </Conversa>
    );
  }

  return null;
}
