import { forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import { Media } from "../style";

/**
 * A trilha compacta do fecho da dobra 4.
 *
 * Antes ela carregava a dobra inteira, com as quatro fases lado a lado e
 * os entregáveis de cada uma. O problema era justamente esse: quatro
 * colunas na tela ao mesmo tempo significam que três delas são prévia da
 * próxima, e a atenção nunca ficava numa coisa só. As fases passaram a
 * ocupar a tela uma por vez em `secoes/05.Foco.jsx`, e sobrou para esta
 * trilha o papel de fecho: o momento em que as quatro, já explicadas, se
 * juntam num desenho só.
 *
 * Ela só sabe desenhar. Quem anima é o pai, pelos refs abaixo — a seção
 * que prende a tela é ancestral daqui, e o React atribui refs de baixo
 * para cima, então montar a timeline aqui pegaria esse ancestral ainda
 * nulo.
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
  margin: 0 auto;
  max-width: 44rem;

  ${Media.PhoneLarge} {
    gap: 10px;
  }
`;

/**
 * A linha que costura os marcos. Elemento real, não `::before`, porque o
 * GSAP precisa de uma referência de DOM para desenhá-la. Nasce inteira e
 * o script a rebobina: repouso primeiro, script depois.
 */
const Linha = styled.div`
  position: absolute;
  top: 27px;
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
`;

const Etapa = styled.div`
  position: relative;
  text-align: center;
`;

const Marco = styled.div`
  width: 54px;
  height: 54px;
  margin: 0 auto 14px;
  position: relative;
  z-index: 1;

  ${Media.PhoneLarge} {
    width: 44px;
    height: 44px;
    margin-bottom: 10px;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Nome = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.94rem;
  font-weight: 500;
  color: var(--off-white);
  margin: 0;

  ${Media.PhoneLarge} {
    font-size: 0.78rem;
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
