import styled, { css, keyframes } from "styled-components";

/**
 * Estilo da conversa. Tudo sai dos canvas B1, B2 e B3 da direcao B
 * (aprovada): fundo #E9E6DC, cabecalho navy #121A30, bolha branca do
 * assistente, bolha ambar #F3E3BC da pessoa, chips com borda navy.
 */

const NAVY = "#121A30";
const TINTA = "#16203A";
const FRACA = "#635E51";
const OURO = "#E0B65A";
const OURO_ESC = "#7A5C12";
const SOMBRA = "0 1px 1px rgba(18,26,48,0.06)";

const pontos = keyframes`
  0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-3px); }
`;

export const Fundo = styled.div`
  min-height: 100dvh;
  background: #e9e6dc;
  font-family: "Nunito Sans", sans-serif;
  color: ${TINTA};

  @media (min-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #d9d5c9;
    padding: 24px 0;
  }
`;

export const Tela = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: #e9e6dc;

  @media (min-width: 700px) {
    max-width: 460px;
    height: min(880px, calc(100dvh - 48px));
    border-radius: 22px;
    box-shadow: 0 30px 60px -28px rgba(18, 26, 48, 0.55), 0 2px 8px rgba(18, 26, 48, 0.12);
  }
`;

export const Cabecalho = styled.header`
  flex: none;
  position: relative;
  height: 64px;
  box-sizing: border-box;
  padding: 0 14px 0 6px;
  background: ${NAVY};
  display: flex;
  align-items: center;
  gap: 11px;

  .voltar {
    flex: none;
    width: 40px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    color: #f4f3ee;
    cursor: pointer;
  }

  .avatar {
    flex: none;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: ${OURO};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "EB Garamond", serif;
    font-size: 20px;
    color: ${NAVY};
  }

  .nomes {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .nome {
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #f4f3ee;
    white-space: nowrap;
  }

  .sub {
    font-size: 12px;
    color: #c9ccd4;
    white-space: nowrap;
  }

  .passo {
    flex: none;
    font-family: "Poppins", sans-serif;
    font-size: 11px;
    color: ${OURO};
  }

  .progresso {
    position: absolute;
    left: 0;
    bottom: -3px;
    height: 3px;
    background: ${OURO};
    transition: width 360ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    .progresso {
      transition: none;
    }
  }
`;

export const Pular = styled.div`
  flex: none;
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px 0;

  button {
    border: 0;
    background: transparent;
    padding: 6px 4px;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    color: ${OURO_ESC};
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
`;

export const Rolagem = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  .lista {
    min-height: 100%;
    box-sizing: border-box;
    padding: 14px 14px 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 8px;
  }
`;

const bolha = css`
  box-sizing: border-box;
  border-radius: 16px 16px 16px 4px;
  background: #fff;
  box-shadow: ${SOMBRA};
  font-size: 15px;
  line-height: 1.4;
`;

export const Bot = styled.div`
  ${bolha}
  align-self: flex-start;
  max-width: 290px;
  padding: 10px 13px;
`;

export const Pessoa = styled.div`
  align-self: flex-end;
  box-sizing: border-box;
  max-width: 260px;
  padding: 10px 13px;
  border-radius: 16px 16px 4px 16px;
  background: #f3e3bc;
  font-size: 15px;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

export const Nota = styled.div`
  align-self: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  font-size: 11.5px;
  color: ${FRACA};
  text-align: center;
`;

export const Digitando = styled.div`
  ${bolha}
  align-self: flex-start;
  display: flex;
  gap: 4px;
  padding: 13px 14px;

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${FRACA};
    animation: ${pontos} 1s ease-in-out infinite;
  }

  i:nth-child(2) {
    animation-delay: 0.15s;
  }

  i:nth-child(3) {
    animation-delay: 0.3s;
  }

  @media (prefers-reduced-motion: reduce) {
    i {
      animation: none;
      opacity: 0.6;
    }
  }
`;

/* Bolha larga do assistente (regua, valores, arquivo, guia). */
export const Rica = styled.div`
  ${bolha}
  align-self: flex-start;
  width: min(100%, 290px);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.larga {
    width: min(100%, 340px);
  }

  &.fina {
    padding: 6px;
  }

  .apoio {
    font-size: 12.5px;
    line-height: 1.4;
    color: ${FRACA};
  }

  .pequeno {
    font-size: 11.5px;
    color: ${FRACA};
    text-align: center;
  }

  .linhaRegua {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .valor {
    flex: none;
    font-family: "EB Garamond", serif;
    font-size: 34px;
    line-height: 1;
  }

  input[type="range"] {
    flex: 1;
    min-width: 0;
    height: 30px;
    accent-color: ${OURO_ESC};
    cursor: pointer;
  }
`;

export const Opcoes = styled.div`
  align-self: flex-start;
  box-sizing: border-box;
  width: min(100%, 290px);
  padding: 6px 14px 10px;
  border-radius: 16px 16px 16px 4px;
  background: #fff;
  box-shadow: ${SOMBRA};
  display: flex;
  flex-direction: column;

  .op {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid rgba(22, 32, 58, 0.1);
  }

  .titulo {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    font-size: 14px;
    font-weight: 600;
  }

  .det {
    font-size: 12px;
    color: ${FRACA};
  }

  .rec {
    padding: 1px 7px;
    border-radius: 999px;
    background: ${NAVY};
    color: ${OURO};
    font-family: "Poppins", sans-serif;
    font-size: 9.5px;
    font-weight: 400;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }

  .num {
    flex: none;
    display: inline-flex;
    align-items: baseline;
    font-family: "EB Garamond", serif;
    font-size: 19px;
    border-radius: 4px;
    padding: 0 4px;
    white-space: nowrap;
  }

  .num.edita {
    background: rgba(224, 182, 90, 0.42);
    box-shadow: inset 0 -2px 0 rgba(122, 92, 18, 0.45);
  }

  .num input {
    font: inherit;
    font-size: max(19px, 16px);
    color: inherit;
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    outline: none;
    text-align: left;
  }

  .num.edita:focus-within {
    box-shadow: 0 0 0 2px ${OURO_ESC};
    background: #fbefc4;
  }

  .mes {
    margin-left: 3px;
    font-family: "Nunito Sans", sans-serif;
    font-size: 11px;
    color: ${FRACA};
  }

  .continuar {
    margin-top: 10px;
  }
`;

export const BotaoEscuro = styled.button`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  border: 0;
  border-radius: 12px;
  background: ${NAVY};
  color: #f4f3ee;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid ${OURO};
    outline-offset: 2px;
  }
`;

export const BotaoClaro = styled.button`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  border: 1.5px solid ${NAVY};
  border-radius: 12px;
  background: #fff;
  color: ${TINTA};
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid ${OURO_ESC};
    outline-offset: 2px;
  }
`;

const girar = keyframes`to { transform: rotate(360deg); }`;

export const Giro = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(22, 32, 58, 0.25);
  border-top-color: ${TINTA};
  animation: ${girar} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2.4s;
  }
`;

export const Chips = styled.div`
  align-self: flex-end;
  width: min(100%, 286px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 2px;

  button {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    padding: 11px 14px;
    border: 1.5px solid ${NAVY};
    border-radius: 14px;
    background: #fff;
    color: ${TINTA};
    text-align: left;
    cursor: pointer;
    transition: background 150ms ease;
  }

  button:hover {
    background: #faf6ea;
  }

  button:focus-visible {
    outline: 2px solid ${OURO_ESC};
    outline-offset: 2px;
  }

  .rotulo {
    font-family: "Poppins", sans-serif;
    font-size: 14.5px;
    font-weight: 500;
  }

  .quem {
    font-size: 12.5px;
    color: ${FRACA};
  }
`;

export const Paletas = styled.div`
  align-self: flex-end;
  width: min(100%, 300px);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 10px 2px;
    border: 1px solid rgba(22, 32, 58, 0.18);
    border-radius: 14px;
    background: #fff;
    cursor: pointer;
    transition: border-color 150ms ease;
  }

  button:hover {
    border: 2px solid ${NAVY};
    padding: 9px 1px;
  }

  button:focus-visible {
    outline: 2px solid ${OURO_ESC};
    outline-offset: 2px;
  }

  .bolinha {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .nome {
    font-size: 11.5px;
    line-height: 1.2;
    color: ${TINTA};
    text-align: center;
  }
`;

export const Arquivo = styled.div`
  align-self: flex-start;
  box-sizing: border-box;
  width: min(100%, 290px);
  padding: 6px;
  border-radius: 16px 16px 16px 4px;
  background: #fff;
  box-shadow: ${SOMBRA};
  display: flex;
  flex-direction: column;
  gap: 6px;

  .titulo {
    padding: 6px 7px 0;
    font-size: 15px;
    line-height: 1.4;
  }

  .abrir {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
    font: inherit;
  }

  .abrir:focus-visible {
    outline: 2px solid ${OURO_ESC};
    outline-offset: 2px;
    border-radius: 11px;
  }

  .miniatura {
    position: relative;
    height: 128px;
    border-radius: 11px;
    overflow: hidden;
  }

  .folha {
    position: absolute;
    box-sizing: border-box;
    background: #fff;
    border-radius: 2px;
  }

  .folha.tras {
    left: 150px;
    top: 18px;
    width: 84px;
    height: 116px;
    transform: rotate(7deg);
    box-shadow: 0 6px 14px rgba(18, 26, 48, 0.14);
  }

  .folha.frente {
    left: 96px;
    top: 14px;
    width: 88px;
    height: 122px;
    padding: 8px;
    transform: rotate(-3deg);
    box-shadow: 0 8px 18px rgba(18, 26, 48, 0.18);
  }

  .m-rot {
    font-family: "Poppins", sans-serif;
    font-size: 5px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .m-tit {
    margin-top: 3px;
    font-family: "EB Garamond", serif;
    font-size: 10.5px;
    line-height: 1.05;
  }

  .m-linha {
    margin-top: 7px;
    height: 1px;
  }

  .m-nome {
    margin-top: 5px;
    font-family: "EB Garamond", serif;
    font-size: 7.5px;
  }

  .m-prof {
    margin-top: 14px;
    font-size: 5.5px;
    color: #3e4657;
  }

  .m-logo {
    display: block;
    max-width: 36px;
    max-height: 12px;
    margin-bottom: 4px;
    object-fit: contain;
  }

  .arquivoLinha {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 4px 7px 6px;
    min-width: 0;
  }

  .arquivoLinha .nm {
    font-size: 13.5px;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .arquivoLinha .sb {
    font-size: 12px;
    color: ${FRACA};
  }
`;

export const Mensagem = styled.div`
  align-self: flex-start;
  box-sizing: border-box;
  width: min(100%, 290px);
  padding: 10px 13px 12px;
  border-radius: 16px 16px 16px 4px;
  background: #fff;
  box-shadow: ${SOMBRA};
  display: flex;
  flex-direction: column;
  gap: 8px;

  .legenda {
    font-size: 13.5px;
    line-height: 1.4;
    color: #3e4657;
  }

  .zap {
    padding: 9px 11px;
    border-radius: 11px;
    background: #f3f0e8;
    font-size: 13px;
    line-height: 1.42;
  }

  .anexo {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 8px;
    padding: 7px 9px;
    border-radius: 8px;
    background: #fff;
    font-size: 12px;
    font-weight: 700;
    overflow-wrap: anywhere;
  }
`;

export const Barra = styled.form`
  flex: none;
  position: relative;
  box-sizing: border-box;
  min-height: 76px;
  padding: 10px 12px calc(20px + env(safe-area-inset-bottom, 0px)) 12px;
  background: #f7f5f0;
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    flex: 1;
    min-width: 0;
    height: 46px;
    box-sizing: border-box;
    padding: 0 16px;
    border: 1px solid rgba(22, 32, 58, 0.13);
    border-radius: 999px;
    background: #fff;
    font-family: "Nunito Sans", sans-serif;
    font-size: 16px;
    color: ${TINTA};
  }

  textarea {
    flex: 1;
    min-width: 0;
    height: 46px;
    box-sizing: border-box;
    padding: 5px 16px;
    border: 1px solid rgba(22, 32, 58, 0.13);
    border-radius: 23px;
    background: #efece4;
    font-family: "Nunito Sans", sans-serif;
    font-size: 13px;
    line-height: 1.3;
    resize: none;
    color: ${FRACA};
  }

  textarea::placeholder {
    color: ${FRACA};
    opacity: 1;
  }

  input:focus-visible {
    outline: 2px solid ${OURO_ESC};
    outline-offset: 1px;
  }

  button {
    flex: none;
    width: 46px;
    height: 46px;
    border: 0;
    border-radius: 50%;
    background: ${NAVY};
    color: #f4f3ee;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

/* Miniatura da conversa de WhatsApp e do audio de exemplo. */
export const Zap = styled.div`
  align-self: flex-start;
  box-sizing: border-box;
  width: min(100%, 340px);
  padding: 10px 10px 8px;
  border-radius: 16px 16px 16px 4px;
  background: #fff;
  box-shadow: ${SOMBRA};
  display: flex;
  flex-direction: column;
  gap: 8px;

  .rotulo {
    padding: 0 3px;
    font-family: "Poppins", sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: ${OURO_ESC};
  }

  .fundo {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 9px;
    border-radius: 11px;
    background: #efeadf;
  }

  .m {
    box-sizing: border-box;
    max-width: 86%;
    padding: 6px 9px;
    border-radius: 9px;
    font-size: 12.5px;
    line-height: 1.38;
    overflow-wrap: anywhere;
  }

  .m.voce {
    align-self: flex-end;
    background: #e1eed4;
    border-bottom-right-radius: 3px;
  }

  .m.paciente {
    align-self: flex-start;
    background: #fff;
    border-bottom-left-radius: 3px;
  }

  .m.nota {
    align-self: center;
    max-width: 94%;
    padding: 3px 9px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.7);
    font-size: 11px;
    font-style: italic;
    color: ${FRACA};
    text-align: center;
  }

  .m .anexo {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
    padding: 4px 6px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.75);
    font-size: 11px;
    font-weight: 700;
  }

  .mais {
    align-self: flex-start;
    padding: 6px 3px;
    border: 0;
    background: transparent;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    color: ${OURO_ESC};
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  .audio {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 10px;
    border-radius: 11px;
    background: #e1eed4;
  }

  .play {
    flex: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${NAVY};
    color: ${OURO};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .onda {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 2px;
    height: 26px;
  }

  .onda i {
    flex: 1;
    min-width: 1px;
    max-width: 3px;
    border-radius: 2px;
    background: rgba(22, 32, 58, 0.45);
  }

  .dur {
    flex: none;
    font-size: 12px;
    color: ${FRACA};
  }

  .transcricao {
    padding: 8px 10px;
    border-radius: 9px;
    background: #f3f0e8;
    font-size: 12.5px;
    line-height: 1.45;
    color: #3e4657;
  }
`;

export const Oferta = styled.div`
  align-self: flex-start;
  box-sizing: border-box;
  width: min(100%, 290px);
  padding: 14px;
  border-radius: 16px 16px 16px 4px;
  background: ${NAVY};
  color: #f4f3ee;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .titulo {
    font-family: "EB Garamond", serif;
    font-size: 19px;
    line-height: 1.15;
  }

  .itens {
    font-size: 12px;
    line-height: 1.45;
    color: #c9ccd4;
  }

  .cta {
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: ${OURO};
    color: ${NAVY};
    font-family: "Poppins", sans-serif;
    font-size: 14.5px;
    font-weight: 600;
    text-decoration: none;
  }

  .cta:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .micro {
    font-size: 10.5px;
    color: #9aa0b0;
    text-align: center;
  }
`;
