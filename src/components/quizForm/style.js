import styled from "styled-components";
import { Acoes, Campo, Erro, Media, Opcoes, Palco, Progresso } from "../../estilo/ds";

/**
 * Teste de escala para consultórios (/quizForm-fisio).
 *
 * Mesma reconstrução do /clienteForm, e pela mesma razão: os dois eram
 * formulários laranja, cada um com a sua caixa. Aqui há uma tela a mais,
 * a de abertura, que apresenta o teste antes da primeira pergunta.
 *
 * Os componentes que o `index.jsx` não usa (`Question`, `Options`,
 * `Footer`, `LoadingScreen`, `ResultScreenContainer`, `ResultContent`)
 * saíram: eram de uma versão do quiz que calculava e mostrava resultado,
 * e essa versão não existe mais no componente.
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
 * Tela de abertura. O título era caixa alta em Poppins 700 e disputava
 * atenção com o botão logo abaixo; agora é a serifada da marca, e a
 * versalete fica só no botão.
 */
export const StartScreen = styled.div`
  width: 100%;
  max-width: 620px;

  h1 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(2rem, 4.4vw, 3.2rem);
    line-height: 1.08;
    letter-spacing: -0.014em;
    /* O texto vem em caixa alta do JSX. Em serifada, caixa alta desse
       tamanho vira placa: o lowercase devolve a frase e a regra de
       first-letter recompõe a inicial. */
    text-transform: lowercase;
    color: var(--tinta);
    margin: 0 0 20px;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  p {
    font-size: 1.06rem;
    line-height: 1.6;
    color: var(--tinta-corpo);
    margin: 0 0 34px;
    max-width: 48ch;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 17px 34px;
    border-radius: 999px;
    background: var(--acento);
    color: var(--fundo);
    border: 1px solid var(--acento);
    font-family: "Poppins", sans-serif;
    font-size: 0.86rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: transform 240ms ease;

    &:hover {
      transform: translateY(-2px);
    }

    ${Media.PhoneLarge} {
      width: 100%;
      padding: 16px 20px;
    }
  }
`;

export const LogoWrapper = styled.div`
  margin-bottom: 44px;

  img {
    width: auto;
    height: 30px;
    display: block;
  }
`;

export const InputContainer = styled(Campo)`
  margin-top: 0;

  label {
    display: block;
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(1.6rem, 3.2vw, 2.4rem);
    line-height: 1.12;
    letter-spacing: -0.012em;
    color: var(--tinta);
    margin-bottom: 26px;
    max-width: 22ch;
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
