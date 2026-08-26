import { useRef } from "react";
import styled from "styled-components";
import logoToka from "../../../assets/landingpage/logo.svg";
import { Cta, Mascara } from "../../../estilo/ds";
import { Inner, Media } from "../style";
import { Seta } from "../icones";
import {
  EASE,
  gsap,
  useContextoGsap,
  useMenosMovimento,
} from "../animacao";

/**
 * Dobra 1. Uma ideia só: a briga entre fornecedores é o problema, e ela
 * tem um dono agora. A prova numérica entra logo abaixo do botão porque
 * em tráfego frio ela é o que segura o cético até a segunda dobra.
 *
 * A entrada roda assim que a página monta, sem esperar rolagem — o
 * herói já nasce visível na tela. Cada linha do título mora dentro do
 * próprio `Mascara`, então a entrada é sempre "nasce de dentro do
 * corte", nunca "vem voando de fora".
 */

const Faixa = styled.header`
  width: 100%;
  padding: 26px 0 0;
  position: relative;
  z-index: 1;
`;

const Topo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  img {
    height: 30px;
    width: auto;
  }
`;

const Corpo = styled.div`
  padding: clamp(56px, 9vw, 104px) 0 var(--respiro);
  max-width: 42rem;
  position: relative;

  h1 {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(2.2rem, 5.6vw, 3.9rem);
    font-weight: 400;
    line-height: 1.06;
    letter-spacing: -0.014em;
    color: var(--tinta);
    margin: 0 0 26px;

    .destaque {
      color: var(--acento);
    }
  }

  .abertura {
    font-size: clamp(1.05rem, 1.7vw, 1.24rem);
    color: var(--tinta-corpo);
    margin: 0 0 34px;
    max-width: 34rem;
  }
`;

const Selo = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--acento);
  margin: 0 0 26px;
`;

const Numeros = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px 40px;
  margin-top: 54px;
  padding-top: 28px;
  border-top: 1px solid var(--linha);

  div {
    strong {
      display: block;
      font-family: "Poppins", sans-serif;
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--tinta);
      line-height: 1.2;
    }

    span {
      font-size: 0.86rem;
      color: var(--tinta-fraca);
    }
  }

  ${Media.PhoneLarge} {
    gap: 18px 28px;
  }
`;

export default function Hero({ aoClicar }) {
  const menosMovimento = useMenosMovimento();
  const linhasRef = useRef([]);
  const seloRef = useRef(null);
  const aberturaRef = useRef(null);
  const acaoRef = useRef(null);
  const numerosRefs = useRef([]);

  const escopo = useContextoGsap(() => {
    if (menosMovimento) return;

    const tl = gsap.timeline({ defaults: { ease: EASE } });

    tl.fromTo(seloRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
      .fromTo(
        linhasRef.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.75, stagger: 0.12 },
        0.15
      )
      .fromTo(
        aberturaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.6
      )
      .fromTo(
        acaoRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.72
      )
      .fromTo(
        numerosRefs.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
        0.9
      );
     
  }, [menosMovimento]);

  const linhas = [
    ["O gestor culpa o site."],
    ["O designer culpa o conteúdo."],
    [
      "E todo mundo culpa a sua ",
      <span className="destaque" key="s">
        secretária
      </span>,
      ".",
    ],
  ];

  return (
    <Faixa ref={escopo}>
      <Inner>
        <Topo>
          <img src={logoToka} alt="Toka" />
        </Topo>

        <Corpo>

          <Selo ref={seloRef}>Habitat Estratégico©</Selo>

          <h1>
            {linhas.map((linha, i) => (
              <Mascara key={i}>
                <span
                  style={{ display: "block" }}
                  ref={(el) => {
                    linhasRef.current[i] = el;
                  }}
                >
                  {linha}
                </span>
              </Mascara>
            ))}
          </h1>

          <p className="abertura" ref={aberturaRef}>
            Enquanto eles decidem de quem é a culpa, a sua agenda continua com
            buraco. A Toka assume a operação inteira, do posicionamento ao
            paciente sentado na cadeira.
          </p>

          <div className="acao" ref={acaoRef}>
            <Cta onClick={aoClicar}>
              Quero minha região exclusiva
              <Seta />
            </Cta>
          </div>

          <Numeros>
            <div
              ref={(el) => {
                numerosRefs.current[0] = el;
              }}
            >
              <strong>5 anos</strong>
              <span>dedicados só a medicina</span>
            </div>
            <div
              ref={(el) => {
                numerosRefs.current[1] = el;
              }}
            >
              <strong>R$ 6 milhões</strong>
              <span>em mídia gerenciada</span>
            </div>
            <div
              ref={(el) => {
                numerosRefs.current[2] = el;
              }}
            >
              <strong>R$ 17 milhões</strong>
              <span>gerados para parceiros</span>
            </div>
          </Numeros>
        </Corpo>
      </Inner>
    </Faixa>
  );
}
