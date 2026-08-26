import styled from "styled-components";
import {
  Acoes,
  Campo,
  Erro,
  Media,
  Opcoes,
  Palco,
  Progresso,
} from "../../estilo/ds";

/**
 * Formulário de contato do site (/clienteForm), o que abre um card no
 * Pipefy.
 *
 * Era laranja, com caixa de vidro sobre um degradê escuro, botão redondo
 * e rótulo em Poppins 700. Agora usa os mesmos componentes de
 * formulário da /aplicacao — uma pergunta por tela, campo com linha
 * embaixo, resposta em lista.
 *
 * Os nomes exportados são os de antes (`ContainerBackground`,
 * `InputContainer`, `RevenueOptions`) porque `index.jsx` os consome
 * assim, e ali mora a lógica de passos, validação e envio, que não é
 * assunto de uma troca de casca.
 */

export { Tokens } from "../../estilo/ds";

export const ContainerBackground = styled.div`
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
  /* A coluna existe para o palco poder crescer: é o flex-grow dele que
     centra a pergunta na altura da tela. Sem um pai flex, o palco não
     tem o que ocupar e tudo fica encostado no topo. */
  display: flex;
  flex-direction: column;

  * {
    box-sizing: border-box;
  }

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  ::selection {
    background: var(--acento);
    color: var(--fundo);
  }
`;

export const ProgressBar = Progresso;

export const Container = styled(Palco)`
  .box {
    width: 100%;
    max-width: 640px;
  }
`;

/**
 * Uma pergunta por tela: o rótulo vira o enunciado, em corpo de título.
 * Ele era um `label` de 0.9rem acima do campo, o que fazia a pergunta
 * parecer legenda de formulário de cadastro.
 */
export const InputContainer = styled(Campo)`
  margin-top: 0;

  /* Complemento do segmento "Outro": é um campo secundário, e entra um
     degrau abaixo do corpo de campo padrão. Antes tinha cor e borda
     escritas em style inline — branco puro sobre um cinza #ccc. */
  .campo-extra {
    max-width: 26rem;
    font-size: 1.1rem;
  }

  label {
    display: block;
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(1.7rem, 3.4vw, 2.6rem);
    line-height: 1.12;
    letter-spacing: -0.012em;
    color: var(--tinta);
    margin-bottom: 26px;
    max-width: 20ch;
  }
`;

export const RevenueOptions = styled(Opcoes)`
  margin-top: 0;

  /* O JSX marca a escolhida com "selected"; o DS desenha ".marcada".
     Em vez de mexer na marcação, o seletor herda o desenho aqui. */
  button.selected {
    border-color: var(--acento);
    background: var(--acento-veu);
    color: var(--tinta);
  }
`;

export const Buttons = styled(Acoes)`
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 26px;
    border-radius: 999px;
    background: var(--acento);
    color: var(--fundo);
    border: 1px solid var(--acento);
    font-family: "Poppins", sans-serif;
    font-size: 0.92rem;
    font-weight: 400;
    cursor: pointer;
    transition: transform 240ms ease, opacity 240ms ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    ${Media.PhoneLarge} {
      width: 100%;
      padding: 16px 20px;
    }
  }
`;

export const Navigation = styled.div`
  margin-top: 14px;

  /* Voltar é o mesmo botão discreto do DS. Ele não entra por composição
     porque aqui o elemento vem do JSX como .back dentro desta div. */
  .back {
    background: none;
    border: 0;
    padding: 8px 2px;
    font-family: "Poppins", sans-serif;
    font-size: 0.86rem;
    font-weight: 400;
    color: var(--tinta-fraca);
    cursor: pointer;
    transition: color 160ms ease;

    &:hover {
      color: var(--tinta);
    }

    &:focus-visible {
      outline: 1px solid var(--tinta);
      outline-offset: 3px;
    }
  }
`;

export const EndMessage = styled.div`
  p {
    margin: 0;
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(1.7rem, 3.4vw, 2.6rem);
    line-height: 1.12;
    color: var(--tinta);
    max-width: 20ch;
  }
`;

export const ErrorMessage = Erro;
