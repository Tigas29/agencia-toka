import { forwardRef } from "react";
import styled from "styled-components";
import { Media } from "./style";

/**
 * Uma frase por vez, sozinha na tela.
 *
 * É a peça que o Tiago descreveu pela imagem do zoológico: entrar e ver
 * todos os bichos de uma vez é confusão; o que funciona é um guia
 * mostrando um por um. Antes daqui, os bullets entravam um a um mas
 * **ficavam acumulados**, e no fim de cada tempo havia quatro ou cinco
 * linhas na tela ao mesmo tempo. A pessoa recebia a jaula inteira.
 *
 * Agora a frase anterior **sai** quando a próxima chega. Nunca duas.
 *
 * O empilhamento por `position: absolute` é o que permite isso sem a
 * página andar: todas ocupam o mesmo lugar e se revezam. Com
 * `prefers-reduced-motion` nada as reveza, então `$estatico` desfaz o
 * empilhamento e as põe em sequência vertical, legíveis de uma vez.
 */

const Caixa = styled.div`
  position: relative;
  width: 100%;
  min-height: ${(p) => (p.$estatico ? "0" : "min(280px, 34vh)")};
  display: ${(p) => (p.$estatico ? "block" : "grid")};
  align-items: center;

  ${Media.PhoneLarge} {
    min-height: ${(p) => (p.$estatico ? "0" : "min(240px, 30vh)")};
  }
`;

const Frase = styled.p`
  position: ${(p) => (p.$estatico ? "static" : "absolute")};
  inset: ${(p) => (p.$estatico ? "auto" : "0")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: ${(p) => (p.$estatico ? "0 0 22px" : "0")};
  /* A frase inteira é uma camada só para o desfoque: sem isto, o
     navegador compõe cada linha em separado e a saída pisca. */
  will-change: opacity, transform, filter;

  font-family: "Poppins", sans-serif;
  font-size: clamp(1.5rem, 3.2vw, 2.4rem);
  font-weight: 500;
  line-height: 1.22;
  letter-spacing: -0.02em;
  color: var(--off-white);
  max-width: 22ch;

  /* A frase de virada tem o peso de um título e a cor da marca: é ela
     que fecha cada ato, e precisa soar diferente das que a levaram até
     lá. */
  &[data-peso="virada"] {
    color: var(--white);
    font-weight: 600;
    font-size: clamp(1.7rem, 3.8vw, 2.9rem);
  }

  &[data-peso="marca"] {
    color: var(--gold);
    font-weight: 600;
    font-size: clamp(1.8rem, 4.2vw, 3.1rem);
    letter-spacing: -0.03em;
  }

  em {
    font-style: normal;
    color: var(--gold);
  }

  strong {
    color: var(--white);
    font-weight: 600;
  }

  ${Media.PhoneLarge} {
    max-width: 100%;
  }
`;

const Legenda = forwardRef(function Legenda(
  { children, peso, estatico },
  ref
) {
  return (
    <Frase ref={ref} data-peso={peso} $estatico={estatico}>
      {children}
    </Frase>
  );
});

export { Caixa as CaixaDeLegendas };
export default Legenda;
