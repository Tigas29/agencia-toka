import { useRef } from "react";
import styled from "styled-components";
import {
  Bullets,
  Fecho,
  H2,
  Inner,
  Lead,
  Media,
  Numeral,
} from "../style";
import { EASE, gsap, useContextoGsap, useMenosMovimento } from "../animacao";
import CenaOrganismo, { NOS } from "../graficos/CenaOrganismo";

/**
 * Dobra 2, e a mais importante da página: o diagnóstico (antigo
 * `02.Problema.jsx`) e o mecanismo (antigo `03.Habitat.jsx`) fundidos
 * numa cena só. O gráfico fica fixo no centro da tela enquanto a
 * rolagem conta a história e o texto ao lado troca junto.
 *
 * São **sete tempos**, não três. Os quatro últimos são as letras do
 * F.O.C.O.: cada arco que se pinta traz, ao lado, a frase da fase que
 * ele representa. A pessoa entende cada pedaço no instante em que o
 * pedaço aparece, em vez de ler a lista inteira uma dobra depois. É
 * por isso que a dobra 04 pode falar só de entregáveis: o porquê de
 * cada fase já foi contado aqui.
 *
 * Uma única timeline de GSAP com `scrub` é alimentada por 460vh de
 * rolagem. Cada trecho usa `.fromTo(...)` no primeiro uso de um alvo e
 * `.to(...)` em todo reuso: assim, parar a rolagem em qualquer ponto
 * mostra um quadro coerente, porque o GSAP segura sozinho o valor de
 * "antes" e de "depois" de cada tween. Dois `.fromTo` no mesmo alvo
 * brigam, e vale o que foi adicionado por último.
 */

/**
 * As quatro fases, na ordem em que os arcos se pintam. O índice aqui é
 * o mesmo índice dos arrays `arcosGrupos`, `arcosTracos` e `setasArco`
 * que `CenaOrganismo` expõe, e é isso que mantém texto e desenho
 * falando da mesma fase sem nenhuma tabela de tradução no meio.
 */
const FASES = [
  {
    letra: "F",
    nome: "Fundação",
    texto:
      "Primeiro a clínica para de competir por preço. Posicionamento, identidade e arquitetura de oferta ficam de pé antes de qualquer anúncio ir ao ar.",
  },
  {
    letra: "O",
    nome: "Origem",
    texto:
      "Só então o anúncio entra. Ele existe para atrair o paciente de alto ticket e para afastar o curioso antes que ele ocupe a sua agenda.",
  },
  {
    letra: "C",
    nome: "Conversão",
    texto:
      "O interesse vira procedimento realizado. CRM, SDR de IA e equipe treinada, para nenhuma oportunidade depender da memória de alguém.",
  },
  {
    letra: "O",
    nome: "Operação",
    texto:
      "E a decisão passa a ser por dado. Painel, acompanhamento e compliance fecham o ciclo, e o que sai da Operação alimenta a Fundação de novo.",
  },
];

/** Quando o primeiro arco começa a se pintar. Antes disso é o organismo. */
const INICIO_FASES = 3;

const CenaAlta = styled.section`
  position: relative;
  height: ${(p) => (p.$estatico ? "auto" : "460vh")};
  z-index: 1;

  ${Media.TabletSmall} {
    height: ${(p) => (p.$estatico ? "auto" : "320vh")};
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
    grid-template-rows: auto 1fr;
    gap: 16px;
    padding-top: 28px;
  }
`;

/**
 * O organismo é o protagonista da cena, e a cena ocupa a tela inteira.
 * A 400px ele ficava perdido no meio de 900px de altura livre e a dobra
 * lia como vazia. Cresce até onde a altura da tela permite, com um teto
 * para não estourar em monitor alto.
 */
const GraficoWrap = styled.div`
  width: 100%;
  max-width: min(520px, 62vh);
  margin: 0 auto;
  position: relative;
  z-index: 1;

  ${Media.TabletSmall} {
    max-width: min(260px, 30vh);
  }
`;

/**
 * Os sete blocos ocupam o mesmo espaço, empilhados por posição, e se
 * revezam só por opacidade.
 *
 * Com `prefers-reduced-motion` nada os reveza, e sete blocos sobrepostos
 * viram uma mancha ilegível. Por isso o modo estático desfaz o
 * empilhamento e os põe em sequência vertical: a mesma história, lida
 * de uma vez em vez de contada aos poucos.
 */
const TextoWrap = styled.div`
  position: relative;
  min-height: ${(p) => (p.$estatico ? "0" : "360px")};
  z-index: 1;

  ${Media.Tablet} {
    min-height: ${(p) => (p.$estatico ? "0" : "430px")};
  }

  ${Media.PhoneLarge} {
    min-height: ${(p) => (p.$estatico ? "0" : "470px")};
  }
`;

const Bloco = styled.div`
  position: ${(p) => (p.$estatico ? "static" : "absolute")};
  inset: ${(p) => (p.$estatico ? "auto" : "0")};
  max-width: 34rem;
  margin-bottom: ${(p) => (p.$estatico ? "44px" : "0")};

  ${Media.PhoneLarge} {
    max-width: 100%;
  }
`;

/**
 * O `Numeral` padrão nasceu para o `Corpo` do herói, um bloco alto de
 * sobra. Aqui o `TextoWrap` é baixo, e no mesmo tamanho o numeral vaza
 * para muito além da caixa e o contorno vira ruído atrás do gráfico.
 */
const NumeralCena = styled(Numeral)`
  font-size: clamp(5.5rem, 10vw, 8rem);
  top: -0.5em;
  right: -0.02em;
`;

/** Cabeçalho de uma fase: a letra do F.O.C.O. e o nome dela. */
const Fase = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;

  .letra {
    flex: none;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--gold-soft);
    border: 1px solid var(--gold);
    color: var(--gold);
    font-family: "Poppins", sans-serif;
    font-size: 1.28rem;
    font-weight: 600;
  }

  .nome {
    font-family: "Poppins", sans-serif;
    font-size: clamp(1.5rem, 2.8vw, 2.1rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--white);
    line-height: 1.1;
  }

  ${Media.PhoneLarge} {
    gap: 11px;

    .letra {
      width: 38px;
      height: 38px;
      font-size: 1.1rem;
    }
  }
`;

export default function Cena() {
  const menosMovimento = useMenosMovimento();
  const cenaAltaRef = useRef(null);
  const graficoRef = useRef(null);
  const numeralRef = useRef(null);

  const blocoARef = useRef(null);
  const blocoBRef = useRef(null);
  const blocoCRef = useRef(null);
  const fasesRefs = useRef([]);

  const escopo = useContextoGsap(() => {
    if (menosMovimento || !graficoRef.current || !cenaAltaRef.current) return;

    const refs = graficoRef.current;
    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: {
        trigger: cenaAltaRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });

    // O numeral "02" ganha o mesmo parallax lento das demais dobras, só
    // que preso à timeline principal em vez de um ScrollTrigger próprio:
    // o container dele (`TextoWrap`) mora dentro do palco `sticky`, e um
    // elemento fixado na tela não tem faixa normal de rolagem para medir.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1001px)", () => {
      if (numeralRef.current) {
        tl.fromTo(
          numeralRef.current,
          { yPercent: 0 },
          { yPercent: 14, duration: 7, ease: "none" },
          0
        );
      }
    });

    // ── Tempo 1: o caos [0, 1] ───────────────────────────────────────
    tl.fromTo(refs.culpaGrupo, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0)
      .fromTo(
        refs.culpaTracos,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, stagger: 0.14, duration: 0.3 },
        0
      )
      .fromTo(refs.interrogacao, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)

      // ── Tempo 2: a ordem [1, 2] ────────────────────────────────────
      .to(refs.culpaGrupo, { opacity: 0, duration: 0.2 }, 1)
      .to(refs.interrogacao, { opacity: 0, duration: 0.2 }, 1)
      .fromTo(
        refs.nos,
        { x: (i) => NOS[i].xA, y: (i) => NOS[i].yA },
        { x: (i) => NOS[i].xB, y: (i) => NOS[i].yB, stagger: 0.06, duration: 0.75 },
        1.05
      )
      .fromTo(
        refs.raios,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, stagger: 0.08, duration: 0.35 },
        1.65
      )
      .fromTo(
        refs.nucleoCirculo,
        { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, duration: 0.3 },
        1.8
      )
      .fromTo(refs.nucleoTextoB, { opacity: 0 }, { opacity: 1, duration: 0.22 }, 1.92)

      // ── Tempo 3: o anel fecha [2, 3] ───────────────────────────────
      .fromTo(refs.anel, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4 }, 2)

      // Os cinco nós saem de cena antes de os arcos entrarem. Eles moram
      // no mesmo raio do anel, então ficar significa colidir: o rótulo
      // "Origem" some por trás do nó "Design" e as letras das fases
      // brigam com os nomes das frentes. Narrativamente também fecha, as
      // frentes já se integraram e quem passa a falar é o ciclo.
      .to(refs.nos, { opacity: 0, duration: 0.3, stagger: 0.04 }, 2.45);

    // ── Tempos 4 a 7: uma fase do F.O.C.O. por tempo ─────────────────
    // O arco, a seta e o texto da mesma fase entram no mesmo instante.
    // É a sincronia que faz a letra significar alguma coisa: vê-la
    // aparecer antes ou depois do próprio arco quebraria a associação.
    FASES.forEach((_, i) => {
      const t = INICIO_FASES + i;

      tl.fromTo(refs.arcosGrupos[i], { opacity: 0 }, { opacity: 1, duration: 0.3 }, t)
        .fromTo(
          refs.arcosTracos[i],
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.55 },
          t
        )
        .fromTo(
          refs.setasArco[i],
          { opacity: 0, scale: 0, transformOrigin: "center" },
          { opacity: 1, scale: 1, duration: 0.2 },
          t + 0.5
        );
    });

    // O núcleo só anuncia "demanda que se renova" quando o último arco
    // fecha o anel. Antes disso a frase seria uma promessa sem desenho
    // que a sustente.
    tl.to(refs.nucleoTextoB, { opacity: 0, duration: 0.2 }, INICIO_FASES + 3.3)
      .fromTo(
        refs.nucleoTextoC,
        { opacity: 0 },
        { opacity: 1, duration: 0.25 },
        INICIO_FASES + 3.4
      );

    // ── O texto ao lado, peça por peça ───────────────────────────────
    //
    // O bloco não entra inteiro. Cada peça dele (o título, depois cada
    // parágrafo) entra no seu próprio instante dentro do tempo daquele
    // bloco. É o que faz a pessoa ler rolando em vez de parar de rolar
    // para ler um bloco que apareceu pronto. A saída, essa sim, é do
    // bloco todo de uma vez: despedida em peças só atrasaria a chegada
    // da próxima ideia.
    const blocos = [
      blocoARef.current,
      blocoBRef.current,
      blocoCRef.current,
      ...fasesRefs.current,
    ];

    blocos.forEach((bloco, i) => {
      if (!bloco) return;

      // Uma lista conta como vários itens, não como uma peça só: o
      // objetivo é cada bullet entrar na sua própria rolagem. Contar a
      // `<ul>` inteira como uma peça devolveria o muro de texto que os
      // bullets vieram desfazer.
      const pecas = [...bloco.children].flatMap((filho) =>
        filho.tagName === "UL" ? [...filho.children] : [filho]
      );
      const entrada = i === 0 ? 0 : i - 0.05;

      if (i > 0) {
        // As peças se dividem os primeiros 60% do tempo do bloco, e o
        // resto é o respiro para terminar de ler antes da troca.
        const janela = 0.6;
        const passo = janela / Math.max(pecas.length, 1);

        pecas.forEach((peca, j) => {
          tl.fromTo(
            peca,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: passo * 0.9 },
            entrada + passo * j
          );
        });
      }

      // O último bloco fica na tela até o fim da cena.
      if (i < blocos.length - 1) {
        tl.to(bloco, { opacity: 0, y: -14, duration: 0.22 }, i + 0.85);
      }
    });

  }, [menosMovimento]);

  return (
    <CenaAlta ref={cenaAltaRef} $estatico={menosMovimento}>
      <Palco ref={escopo} $estatico={menosMovimento}>
        <Inner>
          <Grade>
            <GraficoWrap>
              <CenaOrganismo ref={graficoRef} />
            </GraficoWrap>

            <TextoWrap $estatico={menosMovimento}>
              <NumeralCena ref={numeralRef}>02</NumeralCena>

              <Bloco ref={blocoARef} $estatico={menosMovimento}>
                <H2>Você já trocou de&nbsp;fornecedor.</H2>
                <Bullets>
                  <li>Trocou de agência</li>
                  <li>Trocou de gestor de tráfego</li>
                  <li>Contratou um designer melhor</li>
                </Bullets>
                <Fecho>
                  Seis meses depois, a mesma conversa, com nomes diferentes.
                </Fecho>
              </Bloco>

              <Bloco ref={blocoBRef} $estatico={menosMovimento}>
                <H2>Cada um acerta o próprio&nbsp;indicador.</H2>
                <Bullets>
                  <li>O tráfego mostra CPL baixo</li>
                  <li>O designer mostra o feed bonito</li>
                  <li>A recepção mostra que atendeu</li>
                  <li>
                    E o seu <strong>faturamento não se move</strong>
                  </li>
                </Bullets>
                <Fecho>Não é azar. É arquitetura.</Fecho>
              </Bloco>

              <Bloco ref={blocoCRef} $estatico={menosMovimento}>
                <H2>
                  Habitat&nbsp;Estratégico<em>©</em>
                </H2>
                <Bullets>
                  <li>Um responsável só, do posicionamento à cadeira</li>
                  <li>Quatro fases, e nenhuma começa antes da anterior</li>
                  <li>A saída de uma volta a alimentar a entrada da outra</li>
                </Bullets>
                <Fecho>É assim que a demanda deixa de depender de sorte.</Fecho>
              </Bloco>

              {FASES.map((fase, i) => (
                <Bloco
                  key={fase.nome}
                  $estatico={menosMovimento}
                  ref={(el) => {
                    fasesRefs.current[i] = el;
                  }}
                >
                  <Fase>
                    <span className="letra" aria-hidden="true">
                      {fase.letra}
                    </span>
                    <span className="nome">{fase.nome}</span>
                  </Fase>
                  <Lead>{fase.texto}</Lead>
                </Bloco>
              ))}
            </TextoWrap>
          </Grade>
        </Inner>
      </Palco>
    </CenaAlta>
  );
}
