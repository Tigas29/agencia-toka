import styled from "styled-components";

/**
 * Estado de espera do `Suspense` do router, antes de a rota chegar.
 *
 * Ficava laranja (`rgb(226,159,59)`, resquício da identidade antiga) e
 * sobre fundo transparente, então a primeira coisa que se via em
 * qualquer rota era um lampejo da paleta que o site não usa mais. Agora
 * é a mesma cortina clara com que a home abre, e a passagem para o
 * preloader de marca acontece sem degrau de cor.
 *
 * Os valores estão escritos à mão, sem `var(--)`, de propósito: este
 * componente monta FORA do escopo de tokens (`.toka`), porque ele existe
 * justamente enquanto a página que declara esses tokens ainda não montou.
 */
export const Container = styled.div`
  .loader-container {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #efede6;
    z-index: 9998;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid;
    border-color: #7a5c12 transparent rgba(122, 92, 18, 0.24) transparent;
    border-radius: 50%;
    animation: spin-anim 1.1s linear infinite;
  }

  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Quem pediu menos movimento recebe a marca parada, não um giro. */
  @media (prefers-reduced-motion: reduce) {
    .spinner {
      animation: none;
      border-color: #7a5c12;
      opacity: 0.6;
    }
  }
`;
