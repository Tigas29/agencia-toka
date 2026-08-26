import { useRef } from "react";
import styled from "styled-components";
import { Inner, Media } from "../style";
import Legenda, { CaixaDeLegendas } from "../Legenda";
import {
  EASE,
  alturaDaCena,
  gatilhoDeCena,
  gsap,
  useContextoGsap,
  useEhCelular,
  useMenosMovimento,
} from "../animacao";
import CenaOrganismo, { CAMERA, NOS } from "../graficos/CenaOrganismo";

/**
 * Dobra 2, e a mais importante da página. O organismo fica preso no
 * centro da tela enquanto a rolagem conta a história, e ao lado dele
 * **uma frase por vez**.
 *
 * A regra que manda aqui é a do zoológico: o guia mostra um bicho de
 * cada vez, e o anterior fica para trás. A versão anterior desta dobra
 * revelava bullets um a um mas deixava todos acumulados, e no fim de
 * cada tempo havia cinco linhas na tela ao mesmo tempo. Cada frase agora
 * sai antes de a próxima entrar, sem exceção.
 *
 * Catorze tempos, alimentados por 620vh de rolagem. Cada trecho usa
 * `.fromTo(...)` no primeiro uso de um alvo e `.to(...)` em todo reuso:
 * dois `.fromTo` no mesmo alvo brigam pelo estado de repouso, e vale o
 * que foi adicionado por último.
 */

/**
 * A narrativa inteira, em ordem. `peso` muda a tipografia: `virada` é a
 * frase que fecha um ato, `marca` é o nome da oferta.
 */
const FRASES = [
  { texto: "Você já trocou de agência." },
  { texto: "Trocou de gestor de tráfego." },
  { texto: "Contratou um designer melhor." },
  { texto: "Seis meses depois, a mesma conversa." },
  { texto: "O tráfego mostra CPL baixo." },
  { texto: "O designer mostra o feed bonito." },
  { texto: "A recepção mostra que atendeu." },
  { texto: "E o seu faturamento não se move." },
  { texto: "Não é azar. É arquitetura.", peso: "virada" },
  { texto: "Habitat Estratégico©", peso: "marca" },
  {
    nome: "Fundação",
    texto: "A clínica para de competir por preço antes de o anúncio subir.",
  },
  {
    nome: "Origem",
    texto: "O anúncio atrai o paciente de alto ticket e afasta o curioso.",
  },
  {
    nome: "Conversão",
    texto: "O interesse vira procedimento, sem depender da memória de ninguém.",
  },
  {
    nome: "Operação",
    texto: "A decisão passa a ser por dado, e o ciclo recomeça sozinho.",
  },
];

/** Em que tempo a virada acontece: os nós migram e o anel se fecha. */
const VIRADA = 8;
/** Em que tempo a primeira fase do F.O.C.O. começa a se pintar. */
const INICIO_FASES = 10;

const CenaAlta = styled.section`
  position: relative;
  height: ${(p) => (p.$estatico ? "auto" : alturaDaCena(FRASES.length, 24))};
  z-index: 1;

  ${Media.TabletSmall} {
    height: ${(p) => (p.$estatico ? "auto" : alturaDaCena(FRASES.length, 21))};
  }
`;

const Palco = styled.div`
  position: ${(p) => (p.$estatico ? "static" : "sticky")};
  top: 0;
  height: ${(p) => (p.$estatico ? "auto" : "100dvh")};
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: ${(p) => (p.$estatico ? "var(--respiro) 0" : "0")};
`;

const Grade = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  align-items: center;
  gap: 48px;

  ${Media.TabletSmall} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const GraficoWrap = styled.div`
  width: 100%;
  max-width: min(520px, 60vh);
  margin: 0 auto;
  position: relative;
  z-index: 1;

  /* O teto de altura existe porque o palco é uma tela só e o gráfico
     divide o espaço com a caixa de legendas (min(240px, 30vh)). Somando
     o gap, o pior caso ocupa 70vh e sempre cabe.

     Ele já foi 240px, e nessa medida os nós ficavam com 39px e os
     rótulos com 8px reais numa tela de 390 — pequenos demais para o
     desenho que carrega o argumento da página. */
  ${Media.TabletSmall} {
    max-width: min(420px, 46vh);
  }

  /* No telemóvel o gráfico sai do Inner e ocupa a largura inteira da
     tela. A margem de texto de 5% não serve a um desenho, e ali cada
     pixel de largura vira tamanho de nó. O Palco tem overflow hidden,
     que segura qualquer sobra lateral.

     🔑 A altura é explícita de propósito. A câmera anima o viewBox, e
     com altura automática o aspecto mudaria a cada frame: a caixa
     cresceria e encolheria, e a página inteira pularia junto. Com a
     caixa fixa e preserveAspectRatio no padrão, quem escala é o
     conteúdo, dentro dela, sem cortar nada.

     ⚠️ Nada de crase em comentário aqui dentro — isto é um template
     literal, e a crase fecha o template no meio do CSS. */
  ${Media.PhoneLarge} {
    width: 100vw;
    max-width: 100vw;
    margin-left: calc(50% - 50vw);
    height: min(96vw, 52vh);
  }
`;

/** O nome da fase, acima da frase dela. */
const NomeFase = styled.span`
  display: block;
  font-family: "Poppins", sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--acento);
  margin-bottom: 14px;
`;

export default function Cena() {
  const menosMovimento = useMenosMovimento();
  const ehCelular = useEhCelular();
  const cenaAltaRef = useRef(null);
  const graficoRef = useRef(null);
  const frasesRefs = useRef([]);

  const escopo = useContextoGsap(() => {
    if (menosMovimento) {
      // Sem movimento a marcação já nasce no estado final, o ciclo
      // pronto. Falta só o enquadramento: no telemóvel, deixar o quadro
      // aberto devolveria o desenho pequeno com margem morta em volta,
      // que é justamente o que esta rodada veio resolver.
      const parado = graficoRef.current;
      if (ehCelular && parado?.svg) {
        gsap.set(parado.svg, { attr: { viewBox: CAMERA.ciclo } });
      }
      return;
    }
    if (!graficoRef.current || !cenaAltaRef.current) return;

    const refs = graficoRef.current;
    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: gatilhoDeCena(cenaAltaRef.current, 0.6),
    });

    // ── A câmera, só no telemóvel ────────────────────────────────────
    //
    // O `viewBox` acompanha a narrativa: fecha em cima do que está em
    // cena e abre só o necessário. É o que permite o desenho aparecer
    // grande numa tela estreita, e ele fecha mais justamente quando
    // sobra menos coisa — os nós somem em VIRADA + 1.5, e a moldura que
    // eles ocupavam vira tamanho para o ciclo.
    //
    // No desktop nada disto roda: lá o gráfico tem 520px e espaço de
    // sobra, e mexer no enquadramento só arriscaria uma dobra pronta.
    if (ehCelular && refs.svg) {
      tl.fromTo(
        refs.svg,
        { attr: { viewBox: CAMERA.caos } },
        { attr: { viewBox: CAMERA.anel }, duration: 0.9 },
        VIRADA + 0.1
      ).to(
        refs.svg,
        { attr: { viewBox: CAMERA.ciclo }, duration: 0.9 },
        VIRADA + 1.6
      );
    }

    // ── O caos, tempos 0 a 7 ─────────────────────────────────────────
    // As setas de culpa se desenham devagar ao longo das primeiras
    // frases: o desenho acompanha a lista de queixas em vez de aparecer
    // pronto antes de ela ser lida.
    tl.fromTo(refs.culpaGrupo, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
      .fromTo(
        refs.culpaTracos,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, stagger: 0.9, duration: 1.2 },
        0.2
      )
      .fromTo(refs.interrogacao, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 4);

    // ── A virada, tempo 8 ────────────────────────────────────────────
    tl.to(refs.culpaGrupo, { opacity: 0, duration: 0.4 }, VIRADA)
      .to(refs.interrogacao, { opacity: 0, duration: 0.4 }, VIRADA)
      .fromTo(
        refs.nos,
        { x: (i) => NOS[i].xA, y: (i) => NOS[i].yA },
        {
          x: (i) => NOS[i].xB,
          y: (i) => NOS[i].yB,
          stagger: 0.08,
          duration: 0.7,
        },
        VIRADA + 0.1
      )
      .fromTo(
        refs.raios,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, stagger: 0.07, duration: 0.35 },
        VIRADA + 0.6
      )
      .fromTo(
        refs.nucleoCirculo,
        { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, duration: 0.3 },
        VIRADA + 0.75
      )
      .fromTo(
        refs.nucleoTextoB,
        { opacity: 0 },
        { opacity: 1, duration: 0.25 },
        VIRADA + 0.85
      );

    // ── O Habitat se fecha, tempo 9 ──────────────────────────────────
    tl.fromTo(
      refs.anel,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.5 },
      VIRADA + 1
    )
      // Os cinco nós saem antes de os arcos entrarem: eles moram no
      // mesmo raio do anel, e ficar significa colidir com os rótulos das
      // fases. Narrativamente também fecha, as frentes já se integraram.
      .to(refs.nos, { opacity: 0, duration: 0.3, stagger: 0.04 }, VIRADA + 1.5);

    // ── As quatro fases, tempos 10 a 13 ──────────────────────────────
    for (let i = 0; i < 4; i += 1) {
      const t = INICIO_FASES + i;
      tl.fromTo(refs.arcosGrupos[i], { opacity: 0 }, { opacity: 1, duration: 0.3 }, t)
        .fromTo(
          refs.arcosTracos[i],
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.6 },
          t
        )
        .fromTo(
          refs.setasArco[i],
          { opacity: 0, scale: 0, transformOrigin: "center" },
          { opacity: 1, scale: 1, duration: 0.2 },
          t + 0.55
        );
    }

    tl.to(refs.nucleoTextoB, { opacity: 0, duration: 0.2 }, INICIO_FASES + 3.2)
      .fromTo(
        refs.nucleoTextoC,
        { opacity: 0 },
        { opacity: 1, duration: 0.25 },
        INICIO_FASES + 3.3
      );

    // ── As frases: uma por tempo, e a anterior sempre sai ────────────
    //
    // O desfoque é o que dá o "foco de câmera" pedido: a frase chega de
    // baixo fora de foco, assenta nítida, e sai para cima desfocando de
    // novo. Um fade simples parece interface; isto parece narrativa.
    // 🔑 A saída de uma frase e a entrada da seguinte acontecem no MESMO
    // instante (`i + 0.7` = `(i+1) - 0.3`). É um cruzamento, não uma
    // sequência: uma escurece enquanto a outra acende. Com a saída
    // terminando antes de a próxima começar sobrava um vão de rolagem em
    // que as duas estavam quase invisíveis, e a tela parecia vazia — foi
    // isso que o Tiago viu como "várias rolagens em branco".
    frasesRefs.current.filter(Boolean).forEach((frase, i) => {
      // 🔑 A primeira frase NÃO entra na timeline. Ela nasce visível e
      // fica: é o que a pessoa vê enquanto a cena ainda está subindo
      // para prender. Sem isso, o gatilho em "top top" (ver
      // `gatilhoDeCena`) devolveria a seção entrando em branco.
      if (i > 0) {
        tl.fromTo(
          frase,
          { opacity: 0, y: 34, filter: "blur(9px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3 },
          i - 0.3
        );
      }

      // A última fica até o fim da cena.
      if (i < FRASES.length - 1) {
        tl.to(
          frase,
          { opacity: 0, y: -30, filter: "blur(9px)", duration: 0.3 },
          i + 0.7
        );
      }
    });

  }, [menosMovimento, ehCelular]);

  return (
    <CenaAlta ref={cenaAltaRef} $estatico={menosMovimento}>
      <Palco ref={escopo} $estatico={menosMovimento}>
        <Inner>
          <Grade>
            <GraficoWrap>
              <CenaOrganismo ref={graficoRef} />
            </GraficoWrap>

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
                  {frase.nome && <NomeFase>{frase.nome}</NomeFase>}
                  {frase.texto}
                </Legenda>
              ))}
            </CaixaDeLegendas>
          </Grade>
        </Inner>
      </Palco>
    </CenaAlta>
  );
}
