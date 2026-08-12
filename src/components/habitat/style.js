import styled, { createGlobalStyle, css } from "styled-components";

export const Media = {
  Desktop: "@media(max-width:1200px)",
  Tablet: "@media(max-width:1000px)",
  TabletSmall: "@media(max-width:880px)",
  PhoneLarge: "@media(max-width:610px)",
  PhoneSmall: "@media(max-width:450px)",
};

/**
 * Identidade da Toka: navy + gold, Poppins nos títulos e Nunito Sans no
 * corpo. Os tokens ficam escopados nesta página, como em /aplicacao. O
 * `:root` global do site, que ainda usa o laranja legado, fica intocado.
 */
export const Tokens = createGlobalStyle`
  .toka-habitat {
    --navy-900: #121A30;
    --navy-800: #181F30;
    --navy-700: #1F2941;
    --navy-600: #2C3853;
    --gold: #E0B65A;
    --gold-forte: #EFCB7C;
    --gold-soft: rgba(224, 182, 90, 0.14);
    --gold-linha: rgba(224, 182, 90, 0.32);
    --off-white: #D0D2D7;
    --apagado: #8D93A3;
    --white: #FFFFFF;
    --erro: #E9967A;

    /* Ritmo vertical único da página. Uma seção nunca inventa o seu. */
    --respiro: 132px;
    --respiro-curto: 88px;
  }

  ${Media.Tablet} {
    .toka-habitat {
      --respiro: 96px;
      --respiro-curto: 66px;
    }
  }

  ${Media.PhoneLarge} {
    .toka-habitat {
      --respiro: 72px;
      --respiro-curto: 54px;
    }
  }
`;

/**
 * Um plano de fundo só para a página inteira, sem nenhuma borda
 * horizontal. As faixas alternadas de antes eram justamente o que fazia
 * a página ler como blocos empilhados: o olho encontrava uma linha de
 * corte e concluía "acabou uma coisa, começou outra". O gradiente longo
 * respira do escuro ao quase-escuro e volta, e os halos dourados marcam
 * os momentos altos sem desenhar limite nenhum.
 */
export const Page = styled.div`
  position: relative;
  min-height: 100dvh;
  width: 100%;
  color: var(--off-white);
  font-family: "Nunito Sans", "Inter", sans-serif;
  font-size: 16px;
  line-height: 1.62;
  /* "clip", não "hidden": qualquer valor de overflow diferente de
     "visible" num eixo obriga o outro eixo a computar como "auto" (vira
     um scroller). Como esta seção é ancestral da cena com
     position: sticky, isso quebrava o sticky inteiro — o "scroller
     mais próximo" deixava de ser a viewport e passava a ser esta div.
     "clip" corta o overflow horizontal sem criar contexto de rolagem. */
  overflow-x: clip;
  background: linear-gradient(
    180deg,
    var(--navy-900) 0%,
    var(--navy-800) 22%,
    var(--navy-900) 38%,
    var(--navy-800) 56%,
    var(--navy-900) 74%,
    var(--navy-800) 100%
  );

  /* Halos: profundidade sem contorno. Não recebem clique. */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
        50% 22% at 78% 4%,
        rgba(224, 182, 90, 0.07),
        transparent 70%
      ),
      radial-gradient(
        60% 18% at 20% 46%,
        rgba(224, 182, 90, 0.05),
        transparent 70%
      ),
      radial-gradient(
        55% 16% at 82% 88%,
        rgba(224, 182, 90, 0.06),
        transparent 70%
      );
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: var(--gold);
    color: var(--navy-900);
  }
`;

export const Section = styled.section`
  width: 100%;
  padding: var(--respiro) 0;
  position: relative;
  z-index: 1;
`;

/**
 * Dobra que ocupa a tela sozinha, com o conteúdo centrado. É o "uma
 * coisa de cada vez": sem isso, duas dobras aparecem juntas na mesma
 * tela e a de cima rouba a atenção da de baixo antes de terminar de ser
 * lida.
 *
 * No telemóvel a altura mínima sai. Lá o conteúdo já enche a tela por
 * conta própria, e forçar 100dvh só criaria vazio de rolagem.
 */
export const SectionTela = styled(Section)`
  min-height: 100dvh;
  display: flex;
  align-items: center;

  ${Media.TabletSmall} {
    min-height: 0;
    display: block;
  }
`;

export const Inner = styled.div`
  width: 90%;
  max-width: 1080px;
  margin: 0 auto;
  position: relative;
`;

/**
 * O numeral de fundo que substituiu os rótulos do tipo "O DIAGNÓSTICO".
 * Contorno apenas, gigante, atrás do conteúdo. Marca em que ponto da
 * história a pessoa está sem pendurar uma etiqueta em cima do título.
 */
export const Numeral = styled.span`
  position: absolute;
  top: -0.42em;
  right: -0.06em;
  font-family: "Poppins", sans-serif;
  font-size: clamp(9rem, 22vw, 19rem);
  font-weight: 700;
  line-height: 0.8;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(224, 182, 90, 0.13);
  pointer-events: none;
  user-select: none;
  z-index: 0;

  ${Media.TabletSmall} {
    top: -0.3em;
    right: -0.02em;
    font-size: clamp(7rem, 30vw, 11rem);
  }
`;

export const H2 = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: clamp(1.75rem, 3.4vw, 2.6rem);
  font-weight: 600;
  line-height: 1.18;
  letter-spacing: -0.02em;
  color: var(--white);
  margin: 0 0 22px;
  max-width: 20ch;
  position: relative;
  z-index: 1;

  ${Media.PhoneLarge} {
    max-width: 100%;
  }

  em {
    font-style: normal;
    color: var(--gold);
  }
`;

/** Parágrafo de abertura de seção, um pouco maior que o corpo. */
export const Lead = styled.p`
  font-size: clamp(1.02rem, 1.5vw, 1.18rem);
  color: var(--off-white);
  margin: 0 0 18px;
  max-width: 62ch;
  position: relative;
  z-index: 1;
`;

export const Texto = styled.p`
  font-size: 1rem;
  color: var(--apagado);
  margin: 0 0 16px;
  max-width: 62ch;
  position: relative;
  z-index: 1;

  strong {
    color: var(--off-white);
    font-weight: 600;
  }
`;

/**
 * Lista de argumentos. Substituiu os parágrafos corridos nas dobras que
 * explicam alguma coisa: em texto corrido a pessoa precisa parar de
 * rolar para achar onde estava, e cada item aqui entra na sua própria
 * rolagem. O corpo é maior que o do parágrafo comum de propósito, porque
 * nestas dobras a lista é o conteúdo principal, não apoio.
 */
export const Bullets = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 22px;
  max-width: 40rem;
  position: relative;
  z-index: 1;

  li {
    font-size: 1.1rem;
    line-height: 1.5;
    color: var(--off-white);
    padding-left: 26px;
    position: relative;
    margin-bottom: 15px;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 11px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--gold);
    }

    strong {
      color: var(--white);
      font-weight: 600;
    }
  }

  ${Media.PhoneLarge} {
    li {
      font-size: 1.02rem;
      padding-left: 22px;
      margin-bottom: 13px;
    }
  }
`;

/** Frase de fecho de um bloco: pesa mais que a lista que vem antes. */
export const Fecho = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 1.08rem;
  font-weight: 500;
  color: var(--gold);
  margin: 0;
  max-width: 40rem;
  position: relative;
  z-index: 1;

  ${Media.PhoneLarge} {
    font-size: 1rem;
  }
`;

const tamanhos = {
  grande: css`
    padding: 19px 34px;
    font-size: 1.05rem;
  `,
  medio: css`
    padding: 15px 28px;
    font-size: 0.98rem;
  `,
};

export const Cta = styled.button`
  ${(p) => tamanhos[p.$tamanho || "grande"]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: none;
  border-radius: 10px;
  background: var(--gold);
  color: var(--navy-900);
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: background 220ms ease, transform 220ms ease,
    box-shadow 220ms ease;
  box-shadow: 0 10px 30px rgba(224, 182, 90, 0.16);

  &:hover {
    background: var(--gold-forte);
    transform: translateY(-2px);
    box-shadow: 0 14px 38px rgba(224, 182, 90, 0.24);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--white);
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    flex: none;
  }

  ${Media.PhoneLarge} {
    width: 100%;
    padding: 17px 18px;
    /* Encolhe o suficiente para o rótulo caber numa linha só. Quebrado
       em duas, com o ícone solto ao lado, o botão perde o ar de botão. */
    font-size: 0.95rem;
    gap: 10px;
  }

  ${Media.PhoneSmall} {
    font-size: 0.9rem;
  }
`;

/** Linha curta abaixo do botão. Tira o peso do clique. */
export const Microcopy = styled.p`
  font-size: 0.86rem;
  color: var(--apagado);
  margin: 14px 0 0;
  position: relative;
  z-index: 1;
`;

/**
 * Máscara de uma linha de título: o corte fica no pai, o movimento no
 * filho. Sem o `overflow: hidden` aqui a linha apareceria vindo de fora
 * em vez de nascer de dentro do próprio corte.
 */
export const Mascara = styled.span`
  display: block;
  overflow: hidden;
  padding-bottom: 0.06em;
`;
