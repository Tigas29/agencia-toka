import styled, { keyframes, css } from "styled-components";
import { Media, Cta as CtaDS, Progresso } from "../../estilo/ds";

/**
 * Estilo da /gargalo: a aplicação em formato de conversa.
 *
 * Nada aqui tem cor própria. Tudo pergunta ao design system qual é a
 * tinta da faixa, e é por isso que a página inteira vira de navy para
 * creme trocando uma classe no elemento raiz ("faixa-escura" ou
 * "faixa-clara", em spec.TEMA). As duas direções apresentadas ao Tiago
 * em 17/set são esta mesma tela com essa classe trocada.
 *
 * Comentário dentro de bloco styled usa aspas, nunca crase: uma crase
 * encerra o template e o esbuild acusa erro três linhas adiante.
 */

export { Tokens } from "../../estilo/ds";
export const Barra = Progresso;

const subir = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulsar = keyframes`
  0%, 80%, 100% { opacity: 0.35; transform: translateY(0); }
  40%           { opacity: 1;    transform: translateY(-3px); }
`;

const semMovimento = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Page = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(120% 60% at 85% 0%, var(--superficie) 0%, transparent 60%),
    var(--fundo);
  color: var(--tinta-corpo);
  font-family: "Nunito Sans", "Inter", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

/* Cabeçalho fixo: marca à esquerda, contador à direita. Fica colado no
   topo porque a conversa cresce para baixo e o médico precisa saber
   onde está sem rolar de volta. */
export const Topo = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 5%;
  background: color-mix(in srgb, var(--fundo) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--linha);

  .marca {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  img {
    height: 22px;
    width: auto;
    flex: none;
  }

  h1 {
    margin: 0;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 400;
    font-size: 1.3rem;
    letter-spacing: 0.01em;
    color: var(--tinta);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${Media.PhoneLarge} {
    padding: 14px 18px;

    img {
      height: 18px;
    }
    h1 {
      font-size: 1.1rem;
    }
  }
`;

export const Pilula = styled.span`
  flex: none;
  font-family: "Poppins", sans-serif;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 5px 11px;
  border: 1px solid var(--acento);
  border-radius: 999px;
  color: var(--acento);
  font-variant-numeric: tabular-nums;
  transition: transform 200ms ease;

  &[data-bump="true"] {
    transform: scale(1.08);
  }
`;

/* A coluna da conversa. Largura de leitura, nunca a tela inteira: bolha
   de 1100px é parágrafo, não fala. */
export const Fio = styled.main`
  flex: 1;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 28px 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${Media.PhoneLarge} {
    padding: 20px 14px 32px;
  }
`;

export const Linha = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  max-width: 86%;
  animation: ${subir} 260ms ease both;
  ${semMovimento};

  ${(p) =>
    p.$eu &&
    css`
      align-self: flex-end;
      justify-content: flex-end;
    `}

  ${(p) =>
    p.$continua &&
    css`
      /* fala emendada na anterior: o avatar fica invisível para manter
         o alinhamento, e a bolha se aproxima da de cima */
      margin-top: -4px;
      > .avatar {
        visibility: hidden;
      }
    `}

  ${Media.PhoneLarge} {
    max-width: 92%;
  }
`;

export const Avatar = styled.div.attrs({ className: "avatar" })`
  width: 32px;
  height: 32px;
  flex: none;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--linha);
  background: var(--superficie);
  display: grid;
  place-items: center;
  font-family: "Poppins", sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--acento);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const Bolha = styled.div`
  padding: 11px 15px;
  border-radius: 18px 18px 18px 5px;
  background: var(--superficie);
  color: var(--tinta);
  font-weight: 300;
  line-height: 1.5;
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
  }

  ${(p) =>
    p.$eu &&
    css`
      /* A resposta do médico é a tinta da faixa sobre o fundo: navy sólido
         no papel, creme no navy. O ouro fica para acento (pílula, barra,
         botão de enviar), senão a conversa vira um tabuleiro amarelo. */
      border-radius: 18px 18px 5px 18px;
      background: var(--tinta);
      color: var(--fundo);
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 0.92rem;
    `}
`;

export const Digitando = styled.div`
  display: inline-flex;
  gap: 4px;
  padding: 14px 15px;
  border-radius: 18px 18px 18px 5px;
  background: var(--superficie);

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--tinta-fraca);
    animation: ${pulsar} 1.1s ease-in-out infinite;
    ${semMovimento};
  }
  i:nth-child(2) {
    animation-delay: 0.15s;
  }
  i:nth-child(3) {
    animation-delay: 0.3s;
  }
`;

/* A doca de resposta é inline: nasce embaixo da última fala e some
   quando a resposta vira bolha. Não é rodapé fixo de app de mensagem,
   porque aqui cada pergunta tem um jeito de responder. */
export const Doca = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 6px;
  animation: ${subir} 260ms ease both;
  ${semMovimento};
`;

export const Rotulo = styled.label`
  font-family: "Poppins", sans-serif;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--tinta-fraca);
  padding-left: 4px;
`;

export const Campo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--acento-borda);
  border-radius: 999px;
  padding: 5px 5px 5px 18px;
  background: color-mix(in srgb, var(--tinta) 4%, transparent);
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus-within {
    border-color: var(--acento);
    box-shadow: 0 0 0 3px var(--acento-veu);
  }

  .prefixo {
    color: var(--tinta-fraca);
    font-weight: 400;
    margin-right: -4px;
  }

  input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--tinta);
    font: inherit;
    font-size: 1rem;
    padding: 9px 0;

    &::placeholder {
      color: var(--tinta-fraca);
    }
  }
`;

export const Enviar = styled.button`
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  display: grid;
  place-items: center;
  background: var(--acento);
  color: var(--fundo);
  transition: opacity 200ms ease, transform 200ms ease;

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
  &:not(:disabled):hover {
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 1px solid var(--tinta);
    outline-offset: 3px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const Area = styled.div`
  border: 1px solid var(--acento-borda);
  border-radius: 18px;
  background: color-mix(in srgb, var(--tinta) 4%, transparent);
  padding: 12px 16px 8px;
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus-within {
    border-color: var(--acento);
    box-shadow: 0 0 0 3px var(--acento-veu);
  }

  textarea {
    width: 100%;
    min-height: 84px;
    resize: vertical;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--tinta);
    font: inherit;
    font-size: 1rem;
    line-height: 1.5;

    &::placeholder {
      color: var(--tinta-fraca);
    }
  }

  .acoes {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
  }
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.button`
  font-family: "Poppins", sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 999px;
  border: 1px solid var(--linha);
  background: color-mix(in srgb, var(--tinta) 4%, transparent);
  color: var(--tinta);
  cursor: pointer;
  text-align: left;
  transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;

  &:hover {
    border-color: var(--acento);
    background: var(--acento-veu);
  }
  &:active {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: 1px solid var(--tinta);
    outline-offset: 3px;
  }
`;

export const Pular = styled.button`
  border: 0;
  background: transparent;
  color: var(--tinta-fraca);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 6px 4px;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: var(--tinta);
  }
`;

export const Erro = styled.p`
  margin: 0;
  padding-left: 4px;
  font-size: 0.85rem;
  color: var(--erro);
`;

export const Lgpd = styled.p`
  margin: 4px 4px 0;
  font-size: 0.7rem;
  line-height: 1.45;
  color: var(--tinta-fraca);
  text-align: center;
`;

/* Fecho: o botão único depois das últimas falas. */
export const Fim = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0 0 42px;
  animation: ${subir} 260ms ease both;
  ${semMovimento};

  ${Media.PhoneLarge} {
    padding-left: 0;
    align-items: stretch;
  }
`;

export const Cta = styled(CtaDS)`
  text-decoration: none;
`;

export const Sentinela = styled.div`
  height: 1px;
`;
