import { useRef } from "react";
import styled from "styled-components";
import { Bullets, Inner, Media } from "../style";
import TrilhaFoco from "../graficos/TrilhaFoco";
import {
  EASE,
  gsap,
  alturaDaCena,
  gatilhoDeCena,
  useContextoGsap,
  useMenosMovimento,
} from "../animacao";

/**
 * Dobra 4. O método, uma fase por tela.
 *
 * Duas decisões que vieram de crítica direta e não podem ser desfeitas
 * sem quebrar o pedido:
 *
 * 1. **Uma fase por vez, sem prévia das outras.** A versão anterior
 *    mostrava as quatro lado a lado, e mesmo esmaecidas as três
 *    seguintes eram prévia: a atenção nunca ficava numa coisa só. Agora
 *    cada fase ocupa a tela sozinha e as outras nem existem ainda.
 * 2. **Método, não entregável.** Antes eram nomes de produto
 *    ("Identidade visual e design system"). Nome de produto não explica
 *    nada a quem está decidindo; o que convence é o que a Toka faz e em
 *    que ordem. Cada movimento abaixo é uma ação, com sujeito.
 *
 * O fecho é o "tudo se junta": as quatro, já explicadas uma a uma,
 * aparecem juntas na trilha compacta, com as catorze frentes embaixo.
 */

const FASES = [
  {
    letra: "F",
    nome: "Fundação",
    linha: "antes de você gastar o primeiro real em anúncio",
    movimentos: [
      "Mapeamos quanto a sua região já paga pelo procedimento e onde você está nesse ranking",
      "Reconstruímos a marca até ela sustentar o preço que você quer cobrar",
      "Reescrevemos a oferta até ficar difícil de comparar com a do concorrente",
    ],
  },
  {
    letra: "O",
    nome: "Origem",
    linha: "o anúncio entra depois, nunca antes",
    movimentos: [
      "Concentramos a verba em um procedimento só, em vez de espalhar em vários",
      "O criativo nomeia o sintoma que a paciente sente, não o procedimento que você vende",
      "O clique cai numa página que qualifica antes de agendar",
    ],
  },
  {
    letra: "C",
    nome: "Conversão",
    linha: "onde quase toda clínica perde o dinheiro que já gastou",
    movimentos: [
      "Todo lead entra no CRM com origem, etapa e responsável",
      "A IA responde em segundos, dia e noite, e só passa adiante quem está pronto",
      "Treinamos a sua equipe para conduzir conversa de alto ticket",
    ],
  },
  {
    letra: "O",
    nome: "Operação",
    linha: "a decisão deixa de ser opinião",
    movimentos: [
      "O painel mostra quanto cada anúncio custou por cirurgia realizada",
      "Acompanhamento direto com você, sem intermediário no meio",
      "Tudo revisado contra a resolução do CFM antes de ir ao ar",
    ],
  },
];

const FRENTES = [
  "Diagnóstico",
  "Posicionamento estratégico",
  "Identidade visual",
  "Arquitetura de oferta",
  "Precificação",
  "Tráfego pago",
  "Site e páginas",
  "Copy e conteúdo",
  "Design comercial",
  "Script de venda",
  "CRM",
  "SDR de IA",
  "Treinamento e suporte",
  "Painel de métricas",
];

const CenaAlta = styled.section`
  position: relative;
  height: ${(p) => (p.$estatico ? "auto" : alturaDaCena(FASES.length + 1, 60))};
  z-index: 1;

  ${Media.TabletSmall} {
    height: ${(p) => (p.$estatico ? "auto" : alturaDaCena(FASES.length + 1, 52))};
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

const Palcos = styled.div`
  position: relative;
  width: 100%;
  min-height: ${(p) => (p.$estatico ? "0" : "440px")};

  ${Media.PhoneLarge} {
    min-height: ${(p) => (p.$estatico ? "0" : "470px")};
  }
`;

const Quadro = styled.div`
  position: ${(p) => (p.$estatico ? "static" : "absolute")};
  inset: ${(p) => (p.$estatico ? "auto" : "0")};
  margin-bottom: ${(p) => (p.$estatico ? "56px" : "0")};
  /* Centrado na altura do palco: as fases têm alturas diferentes, e
     alinhadas ao topo cada troca faria o bloco pular de posição. */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

/** A letra da fase, grande. Ela é o marcador de onde a pessoa está. */
const Cabeca = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;

  .letra {
    flex: none;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--gold-soft);
    border: 1px solid var(--gold);
    color: var(--gold);
    font-family: "Poppins", sans-serif;
    font-size: 2.1rem;
    font-weight: 600;
  }

  .nome {
    font-family: "Poppins", sans-serif;
    font-size: clamp(2rem, 4.4vw, 3.2rem);
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--white);
    line-height: 1.05;
    margin: 0;
  }

  ${Media.PhoneLarge} {
    gap: 14px;

    .letra {
      width: 54px;
      height: 54px;
      font-size: 1.5rem;
    }
  }
`;

const LinhaFase = styled.p`
  font-size: 1.05rem;
  color: var(--gold);
  margin: 0 0 30px 96px;

  ${Media.PhoneLarge} {
    margin: 0 0 24px 0;
    font-size: 0.98rem;
  }
`;

const Movimentos = styled(Bullets)`
  margin-left: 96px;
  max-width: 46rem;

  ${Media.PhoneLarge} {
    margin-left: 0;
  }
`;

const Fecho = styled.div`
  text-align: center;

  h2 {
    font-family: "Poppins", sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.3rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--white);
    margin: 0 0 40px;
  }
`;

const Frentes = styled.div`
  margin-top: 52px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  .rotulo {
    font-size: 0.94rem;
    color: var(--apagado);
    margin: 0 0 18px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  li {
    font-size: 0.84rem;
    color: var(--off-white);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    padding: 7px 14px;
    white-space: nowrap;
  }

  ${Media.PhoneSmall} {
    li {
      font-size: 0.78rem;
      padding: 6px 11px;
    }
  }
`;

export default function Foco() {
  const menosMovimento = useMenosMovimento();
  const cenaAltaRef = useRef(null);
  const quadrosRefs = useRef([]);
  const fechoRef = useRef(null);
  const trilhaRef = useRef(null);
  const frentesRef = useRef(null);

  const escopo = useContextoGsap(() => {
    if (menosMovimento || !cenaAltaRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: gatilhoDeCena(cenaAltaRef.current, 0.5),
    });

    // ── Uma fase por tempo ───────────────────────────────────────────
    FASES.forEach((_fase, i) => {
      const quadro = quadrosRefs.current[i];
      if (!quadro) return;

      // Dentro da fase, cada peça entra na sua própria rolagem: a
      // cabeça, a linha de contexto e cada movimento, um a um.
      const pecas = [...quadro.children].flatMap((filho) =>
        filho.tagName === "UL" ? [...filho.children] : [filho]
      );
      const passo = 0.62 / pecas.length;

      // 🔑 A fase entra a partir de `i - 0.25`, que é o mesmo instante em
      // que a anterior começa a sair. Cruzamento, não sequência: com a
      // saída terminando antes de a próxima começar sobrava rolagem em
      // que a tela ficava em branco, e foi isso que o Tiago viu como
      // "entra e fica várias rolagens vazio".
      const entrada = i === 0 ? 0 : i - 0.25;
      pecas.forEach((peca, j) => {
        tl.fromTo(
          peca,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: passo * 0.9 },
          entrada + passo * j
        );
      });

      tl.to(quadro, { opacity: 0, y: -16, duration: 0.3 }, i + 0.75);
    });

    // ── O fecho: as quatro se juntam ─────────────────────────────────
    // Mesmo cruzamento das fases: o fecho começa quando a última sai.
    const inicioFecho = FASES.length - 0.25;
    const trilha = trilhaRef.current;

    if (fechoRef.current) {
      // O quadro do fecho mora empilhado sobre as fases. Sem esta
      // entrada ele ficaria visível por trás delas desde o começo, que é
      // exatamente a prévia que esta dobra veio eliminar.
      tl.fromTo(
        fechoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 },
        inicioFecho - 0.05
      ).fromTo(
        fechoRef.current.querySelector("h2"),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.25 },
        inicioFecho
      );
    }

    if (trilha?.linha) {
      tl.fromTo(
        trilha.linha,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "none" },
        inicioFecho + 0.2
      )
        .fromTo(
          trilha.marcos,
          { opacity: 0, scale: 0.7, transformOrigin: "center" },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.12 },
          inicioFecho + 0.2
        )
        .fromTo(
          trilha.nomes,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.12 },
          inicioFecho + 0.32
        );
    }

    if (frentesRef.current) {
      tl.fromTo(
        [
          frentesRef.current.querySelector(".rotulo"),
          ...frentesRef.current.querySelectorAll("li"),
        ],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.045 },
        inicioFecho + 0.7
      );
    }

  }, [menosMovimento]);

  return (
    <CenaAlta ref={cenaAltaRef} $estatico={menosMovimento}>
      <Palco ref={escopo} $estatico={menosMovimento}>
        <Inner>

          <Palcos $estatico={menosMovimento}>
            {FASES.map((fase, i) => (
              <Quadro
                key={fase.nome + i}
                $estatico={menosMovimento}
                ref={(el) => {
                  quadrosRefs.current[i] = el;
                }}
              >
                <Cabeca>
                  <span className="letra" aria-hidden="true">
                    {fase.letra}
                  </span>
                  <h2 className="nome">{fase.nome}</h2>
                </Cabeca>
                <LinhaFase>{fase.linha}</LinhaFase>
                <Movimentos>
                  {fase.movimentos.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </Movimentos>
              </Quadro>
            ))}

            <Quadro
              $estatico={menosMovimento}
              ref={fechoRef}
              style={menosMovimento ? undefined : { pointerEvents: "none" }}
            >
              <Fecho>
                <h2>As quatro fases, uma operação&nbsp;só.</h2>
                <TrilhaFoco ref={trilhaRef} />

                <Frentes ref={frentesRef}>
                  <p className="rotulo">
                    Catorze frentes, um único responsável por todas.
                  </p>
                  <ul>
                    {FRENTES.map((frente) => (
                      <li key={frente}>{frente}</li>
                    ))}
                  </ul>
                </Frentes>
              </Fecho>
            </Quadro>
          </Palcos>
        </Inner>
      </Palco>
    </CenaAlta>
  );
}

