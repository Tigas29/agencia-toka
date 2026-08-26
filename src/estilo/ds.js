import styled, { createGlobalStyle, css, keyframes } from "styled-components";

/**
 * Design system do site. Toda página ativa é escrita contra este arquivo.
 *
 * Ele nasceu como estilo só da home e virou base comum quando as demais
 * rotas foram reconstruídas: o site vivia com três identidades ao mesmo
 * tempo (a home nova, o navy da /habitat e da /aplicacao, e o laranja
 * legado da /LandingPage e dos formulários), e cada uma resolvia cor,
 * título e respiro por conta própria.
 *
 * A ideia que faz o resto funcionar: nenhum componente daqui sabe que
 * cor ele tem. Ele pergunta "qual é a tinta desta faixa?" em vez de
 * "qual é o branco?". Os seis tokens semânticos abaixo respondem isso, e
 * `.faixa-escura` / `.faixa-clara` os redefinem. Trocar o tema de uma
 * seção inteira é trocar uma classe — foi o que tornou possível uma
 * página alternar navy e papel sem duplicar componente.
 *
 * Escopo: `.toka` no elemento de página. Fora dele nada aqui pinta.
 *
 * O que NÃO mora aqui é lógica: animação (`components/habitat/animacao.js`)
 * e captura de lead/UTM (`components/habitat/lead.js`) continuam nos seus
 * arquivos, compartilhados por todas as páginas.
 */

export const Media = {
  Desktop: "@media(max-width:1200px)",
  Tablet: "@media(max-width:1000px)",
  TabletSmall: "@media(max-width:880px)",
  PhoneLarge: "@media(max-width:610px)",
  PhoneSmall: "@media(max-width:450px)",
};

/** Cores cruas. Ninguém as usa direto: elas alimentam os temas abaixo. */
const NAVY = "#121A30";
const NAVY_FUNDO = "#0F1626";
const CREME = "#EFEDE6";
const CREME_FUNDO = "#E9E6DC";
const GOLD = "#E0B65A";
/* Sobre creme o gold claro fica com ~2:1 de contraste e some. O acento da
   faixa clara é o mesmo ouro escurecido até passar de 4.5:1, medido, e
   não escolhido no olho: ele carrega rótulo de 0.7rem. */
const GOLD_ESCURO = "#7A5C12";
/* Erro é o único par de cor que não deriva do acento: ele precisa ler como
   alerta em qualquer faixa. O tom claro serve sobre navy, o escuro sobre
   creme, e ambos passam de 4.5:1 contra o próprio fundo. */
const ERRO_SOBRE_ESCURO = "#E9967A";
const ERRO_SOBRE_CLARO = "#9B3412";

export const Tokens = createGlobalStyle`
  .toka {
    /* O respiro é o que a referência tem de sobra e a nossa página não
       tinha: eles gastam quase o dobro de rolagem para dizer menos. */
    --respiro: 190px;
    --respiro-curto: 112px;

    /* Tema padrão da página: escuro. Cada seção pode virar clara. */
    --fundo: ${NAVY};
    --fundo-fundo: ${NAVY_FUNDO};
    --tinta: #F4F3EE;
    --tinta-corpo: #C9CCD4;
    --tinta-fraca: #7F8698;
    --linha: rgba(244, 243, 238, 0.11);
    --acento: ${GOLD};
    --erro: ${ERRO_SOBRE_ESCURO};
    /* Véu do acento, para fundo de opção marcada e realce de campo. Sai
       de color-mix e não de um rgba fixo porque o acento muda com a
       faixa: escrito à mão, o dourado claro vazaria na faixa creme. */
    --acento-veu: color-mix(in srgb, var(--acento) 14%, transparent);
    --acento-borda: color-mix(in srgb, var(--acento) 45%, transparent);
  }

  .toka .faixa-escura {
    --fundo: ${NAVY};
    --fundo-fundo: ${NAVY_FUNDO};
    --tinta: #F4F3EE;
    --tinta-corpo: #C9CCD4;
    --tinta-fraca: #7F8698;
    --linha: rgba(244, 243, 238, 0.11);
    --acento: ${GOLD};
    --erro: ${ERRO_SOBRE_ESCURO};
  }

  .toka .faixa-clara {
    --fundo: ${CREME};
    --fundo-fundo: ${CREME_FUNDO};
    --tinta: #16203A;
    --tinta-corpo: #3E4657;
    /* Medido, não estimado: #8A8578 dava 3.14:1 sobre o creme, e é
       nesta cor que ficam o selo da seção e as descrições dos itens. */
    --tinta-fraca: #635E51;
    --linha: rgba(22, 32, 58, 0.13);
    --acento: ${GOLD_ESCURO};
    --erro: ${ERRO_SOBRE_CLARO};
  }

  ${Media.Tablet} {
    .toka {
      --respiro: 124px;
      --respiro-curto: 80px;
    }
  }

  ${Media.PhoneLarge} {
    .toka {
      --respiro: 82px;
      --respiro-curto: 58px;
    }
  }
`;

export const Page = styled.div`
  position: relative;
  min-height: 100dvh;
  width: 100%;
  background: var(--fundo);
  color: var(--tinta-corpo);
  font-family: "Nunito Sans", "Inter", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.65;
  /* "clip", não "hidden": qualquer overflow diferente de "visible" num
     eixo faz o outro virar um scroller, e isso quebraria qualquer
     position: sticky que a página venha a ter. */
  overflow-x: clip;

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: var(--acento);
    color: var(--fundo);
  }
`;

/**
 * Faixa de cor. É ela que pinta o fundo e, por tabela, redefine os
 * tokens de tinta para tudo que estiver dentro.
 *
 * O grão existe para o navy não ler como cor chapada de tela. É um
 * `feTurbulence` embutido como data URI: nenhuma requisição, nenhum
 * arquivo, e sobre a faixa clara ele sai de cena, porque papel claro com
 * ruído por cima lê como impressão suja e não como textura.
 */
const grao =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
       <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3"/></filter>
       <rect width="180" height="180" filter="url(#g)" opacity="0.55"/>
     </svg>`
  );

export const Section = styled.section`
  width: 100%;
  padding: var(--respiro) 0;
  position: relative;
  background: var(--fundo);
  color: var(--tinta-corpo);
  /* A cor da faixa não muda em uso, mas a transição existe para o
     primeiro pintar (fontes chegando, tema aplicado) não dar um degrau
     seco entre uma dobra e a seguinte. */
  transition: background 320ms ease;

  &.faixa-escura::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.05;
    background-image: url("${grao}");
    background-size: 180px 180px;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

/**
 * Emenda entre duas seções.
 *
 * Cada seção paga respiro embaixo E em cima, então onde uma encosta na
 * outra o espaço aparecia dobrado: 380px de nada no meio da página, que
 * em duas faixas da mesma cor lê como buraco, não como pausa. Quando a
 * seção tem uma irmã antes dela, o topo passa a usar o respiro curto.
 *
 * A troca de faixa não sofre com isso, porque lá a mudança de cor já
 * marca o corte e o espaço extra vira moldura.
 */
export const Emenda = createGlobalStyle`
  .toka section + section {
    padding-top: var(--respiro-curto);
  }
`;

/**
 * Camada da onda de fundo. Vive dentro de uma faixa navy, atrás de tudo,
 * e nunca recebe clique.
 *
 * A onda desliza no eixo X em três velocidades diferentes. É movimento
 * ambiente: se alguém reparar nele, está forte demais. Quem pediu menos
 * movimento recebe a onda parada, que continua tirando o navy de cor
 * chapada sem nada se mexendo.
 */
const desliza = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-600px); }
`;

export const Onda = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  color: var(--tinta);
  opacity: 0.07;
  z-index: 0;

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* Cada senoide corre num tempo diferente: junto, o olho lê "água", e
     não "três linhas paralelas se mexendo". O deslocamento de 600px é
     exatamente um período dos paths, então a volta é invisível. */
  [data-onda="1"] {
    animation: ${desliza} 26s linear infinite;
  }

  [data-onda="2"] {
    animation: ${desliza} 38s linear infinite;
  }

  [data-onda="3"] {
    animation: ${desliza} 19s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    [data-onda] {
      animation: none;
    }
  }
`;

export const Inner = styled.div`
  width: 90%;
  max-width: 1140px;
  margin: 0 auto;
  position: relative;

  /* No telemóvel a medida vira padding fixo, e não porcentagem: 5% de
     390px dá 19px de margem, e qualquer coluna interna (um número, um
     marco de trilha) somava a isso só de um lado, deixando o texto
     colado na borda direita e afastado na esquerda. É essa assimetria
     que lê como conteúdo vazando da tela. */
  ${Media.PhoneLarge} {
    width: 100%;
    padding: 0 22px;
  }
`;

/**
 * Display serifado. É a letra do wordmark da marca (o "TOKA" do logo é
 * uma Garamond), então o título grande em Garamond não é um empréstimo
 * de estilo: é a própria assinatura da Toka em corpo de texto.
 *
 * É **EB Garamond, não Cormorant**. Cormorant Garamond era a escolha
 * original e saiu em 25/ago/2026 por um defeito da fonte, não de layout:
 * o circunflexo renderiza deslocado para a direita, sobre o espaço
 * seguinte — "mês" vira "mề s", "você" vira "vocề". Vale para a família
 * inteira (Cormorant Garamond E Cormorant), para o .ttf variable E para
 * o woff2 do Google, e NÃO se resolve com `font-feature-settings`
 * (ccmp/liga/calt testados). O texto está em NFC, com o ê pré-composto:
 * não é problema de codificação. Em português isso atinge quase toda
 * headline e passa despercebido em revisão de layout — só aparece lendo
 * o texto, palavra por palavra.
 *
 * O peso mínimo da EB Garamond é 400 (não 300), daí o `letter-spacing`
 * mais fechado: ele devolve a leveza que o peso a mais tirou.
 *
 * `line-height` de 1.06: em serifada e tamanho grande, o respiro entre
 * linhas é o que separa "editorial" de "apertado".
 */
const display = css`
  font-family: "EB Garamond", Georgia, serif;
  font-weight: 400;
  line-height: 1.06;
  letter-spacing: -0.014em;
  color: var(--tinta);
  margin: 0;

  em {
    font-style: normal;
    color: var(--acento);
  }
`;

/**
 * A Garamond vem com algarismos de texto (old-style) por padrão: o "1"
 * tem a altura de um "I" minúsculo e o "3" desce abaixo da linha de
 * base. Em texto corrido isso é elegante; num numeral de destaque ("1",
 * "2", "3" dos passos, "+R$16M" da prova) vira letra e o leitor tropeça.
 * `lining-nums` traz os algarismos alinhados pela caixa alta.
 */
export const numerais = css`
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: "lnum" 1;
`;

export const H1 = styled.h1`
  ${display};
  /* Um degrau abaixo do que era (5.6rem): a Cormorant não tem peso menor
     que 300, então a leveza que sobra vem de tamanho e de ar em volta. */
  font-size: clamp(2.7rem, 6.2vw, 5rem);
`;

export const H2 = styled.h2`
  ${display};
  font-size: clamp(2.1rem, 4.4vw, 3.6rem);
  max-width: 22ch;
  margin-bottom: 26px;

  ${Media.PhoneLarge} {
    max-width: 100%;
  }
`;

/** Parágrafo de abertura de seção, um degrau acima do corpo. */
export const Lead = styled.p`
  font-size: clamp(1.04rem, 1.5vw, 1.18rem);
  color: var(--tinta-corpo);
  margin: 0 0 18px;
  max-width: 54ch;
`;

export const Texto = styled.p`
  font-size: 1rem;
  color: var(--tinta-fraca);
  margin: 0 0 16px;
  max-width: 58ch;

  strong {
    color: var(--tinta-corpo);
    font-weight: 600;
  }
`;

/**
 * Rótulo que abre cada seção: traço curto, versalete, entreletras larga.
 * O traço é um `::before`, e não um caractere, para o espaçamento não
 * depender da fonte nem virar travessão em leitor de tela.
 */
export const Selo = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.68rem;
  /* 400, não 500: o Poppins dos micro-rótulos era o elemento mais pesado
     da página depois dos títulos, e é ele que tirava o ar "clean". */
  font-weight: 400;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--tinta-fraca);
  margin: 0 0 40px;
  display: flex;
  align-items: center;
  gap: 18px;

  &::before {
    content: "";
    width: 34px;
    height: 1px;
    background: currentColor;
    flex: none;
  }
`;

const tamanhos = {
  grande: css`
    padding: 17px 34px;
    font-size: 1rem;
  `,
  medio: css`
    padding: 13px 26px;
    font-size: 0.92rem;
  `,
};

/**
 * Botão pill. Três variantes: preenchida com o acento (o padrão),
 * `$tom="tinta"` (fundo navy, para as faixas claras) e
 * `$tom="contorno"` (1px de `--linha`). O contorno não engorda no hover,
 * porque a espessura da borda é metade do ar de leveza da página.
 */
export const Cta = styled.button`
  ${(p) => tamanhos[p.$tamanho || "grande"]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 999px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background 240ms ease, color 240ms ease,
    border-color 240ms ease, transform 240ms ease;

  ${(p) =>
    p.$tom === "tinta"
      ? css`
          /* Botão principal das faixas claras. Sobre papel, o ouro
             escuro do acento vira um bloco mostarda que some no fundo
             creme; a tinta da própria faixa (o navy) é o que faz o botão
             existir sem gritar. */
          background: var(--tinta);
          color: var(--fundo);
          border: 1px solid var(--tinta);

          &:hover {
            transform: translateY(-2px);
          }
        `
      : p.$tom === "contorno"
      ? css`
          background: transparent;
          color: var(--tinta);
          border: 1px solid var(--linha);

          &:hover {
            border-color: var(--tinta);
          }
        `
      : css`
          background: var(--acento);
          /* A tinta do botão sólido é o próprio fundo da faixa: navy
             sobre o ouro claro, creme sobre o ouro escuro. Um valor fixo
             aqui erraria em uma das duas faixas, sempre. */
          color: var(--fundo);
          border: 1px solid var(--acento);

          &:hover {
            transform: translateY(-2px);
          }
        `};

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 1px solid var(--tinta);
    outline-offset: 4px;
  }

  svg {
    flex: none;
  }

  ${Media.PhoneLarge} {
    width: 100%;
    padding: 16px 20px;
    font-size: 0.94rem;
  }
`;

/** Linha curta abaixo do botão. Tira o peso do clique. */
export const Microcopy = styled.p`
  font-size: 0.84rem;
  color: var(--tinta-fraca);
  margin: 16px 0 0;
`;

/** Régua de 1px. O único divisor da página. */
export const Regua = styled.hr`
  border: 0;
  height: 1px;
  background: var(--linha);
  margin: 0;
`;

/**
 * Máscara de uma linha de título: o corte fica no pai, o movimento no
 * filho. Sem o `overflow: hidden` aqui a linha viria de fora em vez de
 * nascer de dentro do próprio corte.
 */
export const Mascara = styled.span`
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
`;

/* ------------------------------------------------------------------ *
 * Formulário
 *
 * Três rotas do site são formulário de passo único por tela: /aplicacao,
 * /clienteForm e /quizForm-fisio. Antes deste bloco cada uma tinha a sua
 * própria caixa, o seu próprio input e o seu próprio botão-resposta —
 * duas em laranja, uma em navy, e nenhuma parecida com a outra.
 *
 * Tudo aqui é escrito contra os tokens de faixa, então o mesmo campo
 * funciona sobre navy e sobre papel: é isso que permite a /aplicacao ser
 * escura e um formulário dentro de uma seção clara usar os mesmos
 * componentes.
 * ------------------------------------------------------------------ */

/** Trilho de progresso fixo no topo. A barra é o filho. */
export const Progresso = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--linha);
  z-index: 20;

  div {
    height: 100%;
    background: var(--acento);
    transition: width 320ms ease;
  }
`;

/** Barra de marca do topo: logo à esquerda, contexto à direita. */
export const Topo = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 26px 5%;

  img {
    width: auto;
    height: 30px;
  }

  span {
    font-family: "Poppins", sans-serif;
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
  }

  ${Media.PhoneLarge} {
    padding: 20px 22px;

    img {
      height: 24px;
    }

    span {
      font-size: 0.6rem;
      letter-spacing: 0.16em;
    }
  }
`;

/** Área central que segura o painel e o centraliza na altura da tela. */
export const Palco = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 5% 80px;

  ${Media.PhoneLarge} {
    align-items: flex-start;
    padding: 16px 22px 60px;
  }
`;

/**
 * A caixa de uma pergunta. Sem borda e sem sombra de propósito: o que
 * separa a pergunta do resto da página é o ar em volta dela, não uma
 * moldura. Moldura aqui devolvia a cara de formulário de sistema.
 */
export const Painel = styled.section`
  width: 100%;
  max-width: 720px;
`;

/** "Pergunta 3 de 8". Fica acima do enunciado, no tom mais fraco. */
export const Contador = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--tinta-fraca);
  margin: 0 0 22px;
  ${numerais};
`;

/**
 * Enunciado da pergunta. Usa o mesmo display serifado dos títulos de
 * seção: a pergunta é o título daquela tela, e tratá-la como parágrafo
 * grande era o que fazia o formulário parecer outro site.
 */
export const Pergunta = styled.h1`
  ${display};
  font-size: clamp(1.7rem, 3.4vw, 2.7rem);
  max-width: 20ch;

  ${Media.PhoneLarge} {
    max-width: 100%;
  }
`;

/** Lista de respostas. Cada filho é um `button`. */
export const Opcoes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;

  button {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    text-align: left;
    padding: 16px 20px;
    font-family: "Nunito Sans", "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.45;
    color: var(--tinta-corpo);
    background: transparent;
    border: 1px solid var(--linha);
    border-radius: 10px;
    transition: border-color 160ms ease, background 160ms ease,
      color 160ms ease, transform 160ms ease;

    &:hover {
      border-color: var(--acento-borda);
      background: var(--acento-veu);
      color: var(--tinta);
      /* Desloca em vez de crescer: escala em item de lista mexe com o
         vizinho e a lista inteira treme na passagem do mouse. */
      transform: translateX(3px);
    }

    &:focus-visible {
      outline: 1px solid var(--tinta);
      outline-offset: 3px;
    }

    &.marcada {
      border-color: var(--acento);
      background: var(--acento-veu);
      color: var(--tinta);
    }

    ${Media.PhoneLarge} {
      font-size: 0.94rem;
      padding: 14px 16px;
      gap: 12px;
    }
  }

  /* A tecla de atalho. Existe no desktop, onde responder pelo teclado é
     mais rápido que mirar o clique. */
  .tecla {
    flex: none;
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    font-family: "Poppins", sans-serif;
    font-size: 0.74rem;
    font-weight: 500;
    color: var(--acento);
    border: 1px solid var(--acento-borda);
    border-radius: 6px;
    ${numerais};
  }

  button.marcada .tecla {
    background: var(--acento);
    color: var(--fundo);
    border-color: var(--acento);
  }
`;

/**
 * Campo de texto. A linha embaixo, e não a caixa em volta: com caixa, um
 * campo por tela lê como célula de planilha; com linha, lê como resposta
 * escrita à mão.
 */
export const Campo = styled.div`
  margin-top: 30px;

  input,
  textarea,
  select {
    width: 100%;
    background: transparent;
    border-bottom: 1px solid var(--linha);
    padding: 12px 2px;
    font-family: "Nunito Sans", "Inter", sans-serif;
    font-size: 1.4rem;
    font-weight: 300;
    color: var(--tinta);
    transition: border-color 160ms ease;

    &::placeholder {
      color: var(--tinta-fraca);
      opacity: 0.7;
    }

    &:focus {
      outline: none;
      border-bottom-color: var(--acento);
    }

    ${Media.PhoneLarge} {
      font-size: 1.12rem;
    }
  }

  textarea {
    min-height: 110px;
    resize: vertical;
    border: 1px solid var(--linha);
    border-radius: 10px;
    padding: 16px;
    font-size: 1rem;
    line-height: 1.6;

    &:focus {
      border-color: var(--acento);
    }
  }

  /* O select herda o fundo da faixa, mas a lista aberta é desenhada pelo
     sistema: sem cor explícita nas opções, um tema escuro de SO pinta
     texto claro sobre o nosso creme. */
  select option {
    background: var(--fundo);
    color: var(--tinta);
  }
`;

/** Rótulo curto acima de um campo. */
export const Rotulo = styled.label`
  display: block;
  font-family: "Poppins", sans-serif;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--tinta-fraca);
  margin-bottom: 4px;
`;

/** Linha de botões do rodapé do painel: avançar à esquerda, voltar depois. */
export const Acoes = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 34px;
  flex-wrap: wrap;

  ${Media.PhoneLarge} {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 12px;
  }
`;

/**
 * Botão discreto de voltar. Não é o `Cta` com outra variante porque não
 * deve competir com o avançar nem ocupar a mesma altura de toque.
 */
export const Voltar = styled.button`
  background: none;
  border: 0;
  padding: 8px 2px;
  font-family: "Poppins", sans-serif;
  font-size: 0.86rem;
  font-weight: 400;
  color: var(--tinta-fraca);
  transition: color 160ms ease;

  &:hover {
    color: var(--tinta);
  }

  &:focus-visible {
    outline: 1px solid var(--tinta);
    outline-offset: 3px;
  }
`;

/**
 * Mensagem de erro. `role="alert"` fica com quem usa: o estilo garante
 * que ela seja vista, o atributo garante que ela seja anunciada.
 */
export const Erro = styled.p`
  margin: 16px 0 0;
  font-size: 0.9rem;
  color: var(--erro);
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    flex: none;
  }
`;

/** Linha de apoio sob um campo ou botão (LGPD, "leva 2 minutos"). */
export const Apoio = styled.p`
  margin: 14px 0 0;
  font-size: 0.82rem;
  color: var(--tinta-fraca);
  max-width: 52ch;
`;
