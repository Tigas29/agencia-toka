import { forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import { Media } from "../style";

/**
 * A trilha de progresso da dobra 4, no rodapé do palco.
 *
 * Ela já foi duas coisas antes desta. Primeiro carregava a dobra inteira,
 * com as quatro fases lado a lado — e três delas eram prévia da próxima,
 * então a atenção nunca ficava numa coisa só. Depois virou um fecho, um
 * quinto tempo só para reapresentar as quatro juntas, e o Tiago apontou o
 * custo disso: rolagem gasta para mostrar o que já tinha passado.
 *
 * Agora ela **se monta enquanto as fases acontecem**. Cada marco acende
 * no tempo da sua fase e continua aceso, mais discreto. Quando a quarta
 * termina, a trilha já está inteira, sem nenhuma rolagem a mais. De
 * quebra ela responde uma pergunta que a dobra não respondia: no meio da
 * terceira fase, quantas faltam.
 *
 * Só sabe desenhar. Quem anima é o pai, pelos refs abaixo — a seção que
 * prende a tela é ancestral daqui, e o React atribui refs de baixo para
 * cima, então montar a timeline aqui pegaria esse ancestral ainda nulo.
 */

const ETAPAS = [
  { letra: "F", nome: "Fundação" },
  { letra: "O", nome: "Origem" },
  { letra: "C", nome: "Conversão" },
  { letra: "O", nome: "Operação" },
];

export const FASES_NA_TRILHA = ETAPAS.length;

const Trilho = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 0;
  max-width: 30rem;

  ${Media.PhoneLarge} {
    gap: 8px;
    max-width: 100%;
  }
`;

/**
 * A linha que costura os marcos. Elemento real, não `::before`, porque o
 * GSAP precisa de uma referência de DOM para desenhá-la. Nasce inteira e
 * o script a rebobina: repouso primeiro, script depois.
 */
const Linha = styled.div`
  position: absolute;
  top: 21px;
  left: 12.5%;
  right: 12.5%;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--gold-linha),
    var(--gold-linha) 70%,
    rgba(224, 182, 90, 0.1)
  );
  transform-origin: left center;

  ${Media.PhoneLarge} {
    top: 17px;
  }
`;

const Etapa = styled.div`
  position: relative;
  text-align: center;
`;

const Marco = styled.div`
  width: 42px;
  height: 42px;
  margin: 0 auto 10px;
  position: relative;
  z-index: 1;

  ${Media.PhoneLarge} {
    width: 34px;
    height: 34px;
    margin-bottom: 0;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

/**
 * O nome por extenso some no telemóvel. Lá a tela é curta, a trilha
 * divide o palco com o texto da fase, e quatro nomes em fila roubam
 * altura de quem está tentando ler. A letra basta para orientar, e o
 * nome inteiro está em letras garrafais logo acima.
 */
const Nome = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--off-white);
  margin: 0;

  ${Media.PhoneLarge} {
    display: none;
  }
`;

const TrilhaFoco = forwardRef(function TrilhaFoco(_props, refExterno) {
  const escopo = useRef(null);
  const linhaRef = useRef(null);
  const marcosRefs = useRef([]);
  const nomesRefs = useRef([]);

  useImperativeHandle(refExterno, () => ({
    linha: linhaRef.current,
    marcos: marcosRefs.current,
    nomes: nomesRefs.current,
  }));

  return (
    <Trilho ref={escopo}>
      <Linha ref={linhaRef} />
      {ETAPAS.map((etapa, i) => (
        <Etapa key={etapa.nome}>
          <Marco
            ref={(el) => {
              marcosRefs.current[i] = el;
            }}
          >
            <svg viewBox="0 0 54 54" aria-hidden="true">
              <circle cx="27" cy="27" r="26" fill="var(--navy-900)" />
              <circle
                cx="27"
                cy="27"
                r="26"
                fill="var(--gold-soft)"
                stroke="var(--gold)"
                strokeWidth="1.2"
              />
              <text
                x="27"
                y="34"
                textAnchor="middle"
                fontSize="21"
                fontFamily="Poppins, sans-serif"
                fontWeight="600"
                fill="var(--gold)"
              >
                {etapa.letra}
              </text>
            </svg>
          </Marco>

          <Nome
            ref={(el) => {
              nomesRefs.current[i] = el;
            }}
          >
            {etapa.nome}
          </Nome>
        </Etapa>
      ))}
    </Trilho>
  );
});

export default TrilhaFoco;
