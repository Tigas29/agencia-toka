import { useRef } from "react";
import styled from "styled-components";
import { Cta, Microcopy } from "../../../estilo/ds";
import { Inner, Media } from "../style";
import Legenda, { CaixaDeLegendas } from "../Legenda";
import { Seta } from "../icones";
import {
  EASE,
  alturaDaCena,
  gatilhoDeCena,
  gsap,
  useContextoGsap,
  useMenosMovimento,
} from "../animacao";

/**
 * Dobra 3. O risco invertido, e a virada emocional da página: é aqui
 * que a objeção "mais uma promessa" se quebra.
 *
 * Mesma regra do zoológico da dobra 2: uma frase por vez, a anterior
 * sai. Os bullets acumulados de antes entregavam o argumento inteiro de
 * uma vez, e este argumento em particular ganha em ser dito devagar.
 */

const FRASES = [
  { texto: "Toda agência promete resultado." },
  { texto: "Poucas topam ser pagas por ele.", peso: "virada" },
  { texto: "A nossa remuneração é atrelada ao seu crescimento." },
  { texto: "Tudo que não vira procedimento sai da mesa por conta própria." },
  { texto: "Você não paga para testar. Paga pelo que funcionou." },
  {
    texto:
      "Antes de existir resultado, a única prova que vale é onde a agência coloca o próprio dinheiro.",
    peso: "virada",
  },
];

const CenaAlta = styled.section`
  position: relative;
  height: ${(p) => (p.$estatico ? "auto" : alturaDaCena(FRASES.length + 1, 24))};
  z-index: 1;

  ${Media.TabletSmall} {
    height: ${(p) => (p.$estatico ? "auto" : alturaDaCena(FRASES.length + 1, 21))};
  }
`;

const Palco = styled.div`
  position: ${(p) => (p.$estatico ? "static" : "sticky")};
  top: 0;
  min-height: ${(p) => (p.$estatico ? "0" : "100dvh")};
  display: flex;
  align-items: center;
  padding: ${(p) => (p.$estatico ? "var(--respiro) 0" : "0")};
  overflow: hidden;
`;

const Bloco = styled.div`
  max-width: 46rem;
  position: relative;
`;

const Titulo = styled.h2`
  font-family: "EB Garamond", Georgia, serif;
  font-size: clamp(1.85rem, 3.8vw, 2.9rem);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.014em;
  color: var(--tinta);
  margin: 0 0 40px;
`;

const Acao = styled.div`
  margin-top: 34px;
`;

export default function Risco({ aoClicar }) {
  const menosMovimento = useMenosMovimento();
  const cenaAltaRef = useRef(null);
  const tituloRef = useRef(null);
  const frasesRefs = useRef([]);
  const acaoRef = useRef(null);

  const escopo = useContextoGsap(() => {
    if (menosMovimento || !cenaAltaRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: gatilhoDeCena(cenaAltaRef.current, 0.5),
    });

    // 🔑 O título fica fora da timeline, visível desde sempre: é ele que
    // ocupa a tela enquanto a cena sobe para prender. Com o gatilho em
    // "top top" (ver `gatilhoDeCena`), pôr o título aqui dentro faria a
    // seção entrar em branco.

    // Cruzamento, não sequência: a frase sai no mesmo instante em que a
    // seguinte entra. Deixar um vão entre as duas é o que faz a tela
    // parecer vazia no meio da rolagem.
    frasesRefs.current.filter(Boolean).forEach((frase, i) => {
      const t = 0.7 + i;
      tl.fromTo(
        frase,
        { opacity: 0, y: 30, filter: "blur(9px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3 },
        t
      );
      if (i < FRASES.length - 1) {
        tl.to(
          frase,
          { opacity: 0, y: -26, filter: "blur(9px)", duration: 0.3 },
          t + 1
        );
      }
    });

    // O botão só entra depois da última frase: oferecer a ação antes de
    // o argumento fechar é pedir a decisão sem ter dado o motivo.
    tl.fromTo(
      acaoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.35 },
      0.7 + FRASES.length
    );

  }, [menosMovimento]);

  return (
    <CenaAlta ref={cenaAltaRef} $estatico={menosMovimento}>
      <Palco ref={escopo} $estatico={menosMovimento}>
        <Inner>
          <Bloco>
            <Titulo ref={tituloRef}>
              Se a sua clínica não crescer, nós não&nbsp;ganhamos.
            </Titulo>

            <CaixaDeLegendas $estatico={menosMovimento}>
              {FRASES.map((frase, i) => (
                <Legenda
                  key={frase.texto}
                  peso={frase.peso}
                  estatico={menosMovimento}
                  ref={(el) => {
                    frasesRefs.current[i] = el;
                  }}
                >
                  {frase.texto}
                </Legenda>
              ))}
            </CaixaDeLegendas>

            <Acao ref={acaoRef}>
              <Cta onClick={aoClicar}>
                Quero entender o modelo
                <Seta />
              </Cta>
              <Microcopy>
                Conversa direta, sem proposta genérica de gaveta.
              </Microcopy>
            </Acao>
          </Bloco>
        </Inner>
      </Palco>
    </CenaAlta>
  );
}
