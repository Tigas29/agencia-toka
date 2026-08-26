import styled from "styled-components";
import { Media, Section } from "../../estilo/ds";

/**
 * Estilo próprio da /habitat.
 *
 * Quase nada mora aqui: a página é escrita contra `src/estilo/ds.js`, o
 * mesmo design system da home e do resto do site. Antes este arquivo
 * mantinha uma paleta paralela (`--navy-900`, `--gold`, `--off-white`) e
 * títulos em Poppins 600, o que fazia a /habitat parecer um site vizinho
 * do institucional em vez da mesma marca.
 *
 * Sobra só o que é desta página e de nenhuma outra: o fundo em gradiente
 * longo com halos, que existe porque aqui a cor é narrativa (ver
 * `Atmosfera.jsx`, que anima a temperatura conforme a rolagem), e as
 * cenas em `position: sticky` que ele precisa sustentar.
 *
 * O que a página importa do DS ela importa direto de `estilo/ds`. Este
 * arquivo não reexporta nada: intermediário que só repassa nome esconde
 * de onde a coisa vem.
 */

export { Media };

/**
 * Um plano de fundo só para a página inteira, sem nenhuma borda
 * horizontal. As faixas alternadas de antes eram justamente o que fazia
 * a página ler como blocos empilhados: o olho encontrava uma linha de
 * corte e concluía "acabou uma coisa, começou outra". O gradiente longo
 * respira do escuro ao quase-escuro e volta, e os halos dourados marcam
 * os momentos altos sem desenhar limite nenhum.
 *
 * A exceção é a dobra de prova, que é uma faixa clara e opaca por cima
 * disto — lá o argumento muda de registro, e o papel claro faz o corte
 * que o gradiente evita no resto da página.
 */
export const Page = styled.div`
  position: relative;
  min-height: 100dvh;
  width: 100%;
  color: var(--tinta-corpo);
  font-family: "Nunito Sans", "Inter", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.62;
  /* "clip", não "hidden": qualquer valor de overflow diferente de
     "visible" num eixo obriga o outro eixo a computar como "auto" (vira
     um scroller). Como esta div é ancestral das cenas com
     position: sticky, isso quebrava o sticky inteiro — o "scroller mais
     próximo" deixava de ser a viewport e passava a ser ela. "clip" corta
     o overflow horizontal sem criar contexto de rolagem. */
  overflow-x: clip;
  background: linear-gradient(
    180deg,
    var(--fundo) 0%,
    var(--fundo-fundo) 22%,
    var(--fundo) 38%,
    var(--fundo-fundo) 56%,
    var(--fundo) 74%,
    var(--fundo-fundo) 100%
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
    background: var(--acento);
    color: var(--fundo);
  }
`;

/**
 * Seção sem fundo próprio, para o gradiente da página aparecer atrás.
 *
 * O `Section` do DS pinta `var(--fundo)`, que é o certo numa página de
 * faixas alternadas e o errado aqui: cada seção taparia o gradiente com
 * um retângulo chapado e a página voltaria a ler como blocos empilhados.
 */
export const SectionTransparente = styled(Section)`
  background: transparent;

  &.faixa-escura::before {
    content: none;
  }
`;

/**
 * Dobra de tela cheia sobre o gradiente. Mesma ideia do `SectionTela` do
 * DS, sem o fundo opaco, pela razão acima.
 */
export const SectionTela = styled(SectionTransparente)`
  min-height: 100dvh;
  display: flex;
  align-items: center;

  ${Media.TabletSmall} {
    min-height: 0;
    display: block;
  }
`;

/** Área de leitura da página. */
export const Inner = styled.div`
  width: 90%;
  max-width: 1080px;
  margin: 0 auto;
  position: relative;

  ${Media.PhoneLarge} {
    width: 100%;
    padding: 0 22px;
  }
`;
