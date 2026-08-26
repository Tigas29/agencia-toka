import styled, { keyframes } from "styled-components";
import {
  Acoes,
  Apoio,
  Campo,
  Contador,
  Cta,
  Erro,
  Lead as LeadDS,
  Media,
  Opcoes,
  Painel,
  Palco,
  Progresso,
  Selo,
  Texto,
  Topo,
  Voltar,
} from "../../estilo/ds";

/**
 * Estilo da /aplicacao — a triagem — e, por herança, da /obrigado, que
 * importa deste arquivo.
 *
 * Ele deixou de ter paleta própria: antes declarava `--navy-900`,
 * `--gold` e `--off-white` num escopo `.toka-aplicacao`, o que dava uma
 * terceira identidade ao site. Agora tudo vem de `src/estilo/ds.js`, e o
 * que existe aqui é só a diferença desta página para o padrão.
 *
 * Os nomes exportados continuam em inglês (`Panel`, `Options`, `Field`)
 * porque `index.jsx` e a engine de perguntas os consomem por esses
 * nomes, e a reconstrução visual não é hora de renomear API interna. Por
 * baixo, cada um é o componente equivalente do DS.
 */

export { Tokens } from "../../estilo/ds";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/**
 * O halo no canto superior é o que separa esta página de um formulário
 * qualquer: ela é uma tela só, sem seções para dar ritmo, então a única
 * profundidade possível vem do fundo.
 */
export const Page = styled.div`
  min-height: 100dvh;
  width: 100%;
  background: radial-gradient(
      120% 90% at 85% 10%,
      var(--superficie) 0%,
      transparent 60%
    ),
    var(--fundo);
  color: var(--tinta-corpo);
  font-family: "Nunito Sans", "Inter", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.65;
  display: flex;
  flex-direction: column;

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: var(--acento);
    color: var(--fundo);
  }
`;

export const Progress = Progresso;

export const Topbar = styled(Topo)`
  padding: 34px 48px 0;

  img {
    width: 104px;
    height: auto;
  }

  ${Media.PhoneLarge} {
    padding: 26px 24px 0;

    img {
      width: 84px;
    }

    /* No telemóvel o rótulo de contexto brigaria com o logo pela mesma
       linha, e quem perde é o logo. */
    span {
      display: none;
    }
  }
`;

export const Main = styled(Palco)`
  padding: 48px;

  ${Media.PhoneLarge} {
    padding: 32px 24px 56px;
  }
`;

export const Panel = styled(Painel)`
  max-width: 680px;
  animation: ${fadeUp} 380ms ease both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/** Rótulo de etapa. É o `Selo` do DS com menos ar embaixo. */
export const Kicker = styled(Selo)`
  color: var(--acento);
  margin-bottom: 18px;
`;

/**
 * Enunciado da pergunta.
 *
 * Serifada, e não Poppins 600 como era: a pergunta é o título daquela
 * tela, e usar a letra do wordmark aqui é o que faz a triagem parecer a
 * mesma marca da home em vez de um formulário contratado à parte.
 */
export const Title = styled.h1`
  font-family: "EB Garamond", Georgia, serif;
  font-weight: 400;
  font-size: ${({ $small }) => ($small ? "2rem" : "2.6rem")};
  line-height: 1.12;
  letter-spacing: -0.012em;
  color: var(--tinta);
  margin-bottom: 16px;
  /* evita palavra viúva na quebra do título */
  text-wrap: balance;

  ${Media.Tablet} {
    font-size: ${({ $small }) => ($small ? "1.75rem" : "2.15rem")};
  }

  ${Media.PhoneLarge} {
    font-size: ${({ $small }) => ($small ? "1.5rem" : "1.8rem")};
  }

  em {
    font-style: normal;
    color: var(--acento);
  }
`;

export const Lead = styled(LeadDS)`
  margin-bottom: 14px;
  max-width: 60ch;
`;

export const Body = styled(Texto)`
  /* pre-line porque o texto da /obrigado vem de uma string única com
     quebras de parágrafo dentro. */
  white-space: pre-line;
  margin-bottom: 34px;
  max-width: 62ch;

  ${Media.PhoneLarge} {
    margin-bottom: 28px;
  }
`;

/** Selo de alerta: "vagas limitadas", "leia antes de responder". */
export const Warning = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--acento);
  background: var(--acento-veu);
  border: 1px solid var(--acento-borda);
  border-radius: 999px;
  padding: 7px 14px;
  margin-bottom: 18px;
`;

export const Counter = styled(Contador)`
  color: var(--acento);
  margin-bottom: 14px;
`;

export const Description = styled(Texto)`
  margin-bottom: 26px;
  max-width: 60ch;
`;

export const Options = Opcoes;

export const Field = Campo;

export const Actions = Acoes;

export const Primary = styled(Cta).attrs({ $tamanho: "medio" })``;

export const Ghost = Voltar;

/** Dica de atalho de teclado. Atalho não existe em touch, e a dica some. */
export const Hint = styled(Apoio)`
  margin-top: 22px;

  @media (hover: none), (max-width: 610px) {
    display: none;
  }
`;

/** Nota discreta de rodapé. Diferente de `Hint`, aparece no celular. */
export const Nota = styled(Apoio)`
  margin-top: 34px;
  padding-top: 22px;
  border-top: 1px solid var(--linha);
  max-width: 44ch;
`;

export const Error = Erro;

export const VideoFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 26px 0 4px;
  border: 1px solid var(--linha);
  border-radius: 12px;
  overflow: hidden;
  background: var(--superficie);

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;
