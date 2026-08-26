import { forwardRef, useImperativeHandle, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Media } from "../style";

/**
 * O gráfico único que carrega a dobra central da página: caos vira
 * ordem vira ciclo, sem cortar para um SVG novo a cada estado. Quem
 * orquestra a transição é `secoes/02.Cena.jsx`, que lê os refs expostos
 * por `useImperativeHandle` e monta uma timeline de GSAP em cima deles.
 * Este arquivo só sabe desenhar a geometria; não sabe nada de scroll.
 *
 * ─────────────────────────────────────────────────────────────────────
 * O padrão de "estado de repouso" usado na página inteira vale aqui em
 * dobro: a marcação abaixo já nasce no Estado C, o organismo pronto
 * (nós no anel, anel fechado, os quatro arcos do F.O.C.O. pintados,
 * núcleo dizendo "Demanda que se renova"). É o que a página mostra sem
 * nenhum JavaScript e é o estado final de quem pediu menos movimento.
 * O GSAP, quando roda, rebobina isso tudo para o Estado A antes de
 * reconstruir a história pela rolagem — nunca o contrário, porque um
 * `opacity: 0` de origem que só o script desfaz é exatamente o que a
 * página promete não ter.
 * ─────────────────────────────────────────────────────────────────────
 */

// Centro e raio compartilhados por todos os três estados: é o que
// permite os nós migrarem para o anel e os arcos do ciclo pintarem por
// cima dele sem remapear coordenada nenhuma.
const CX = 163;
const CY = 158;
const RAIO_ANEL = 108;
const RAIO_NO = 27;
const ESPESSURA_ARCO = 15;
const FOLGA_ARCO = 5; // graus de respiro entre um arco e o seguinte

/**
 * Estado A: as mesmas posições soltas que a dobra do diagnóstico usava
 * antes da fusão. Estado B/C: a mesma distribuição em anel que o
 * mecanismo usava. Ficam no mesmo array porque são o mesmo nó em dois
 * momentos, não dois desenhos diferentes.
 */
const anel = (i, total, raio = RAIO_ANEL, cx = CX, cy = CY) => {
  const angulo = (Math.PI * 2 * i) / total - Math.PI / 2;
  return { x: cx + raio * Math.cos(angulo), y: cy + raio * Math.sin(angulo) };
};

export const NOS = [
  { rotulo: "Tráfego", xA: 52, yA: 62 },
  { rotulo: "Site", xA: 214, yA: 44 },
  { rotulo: "Design", xA: 258, yA: 168 },
  { rotulo: "CRM", xA: 128, yA: 232 },
  { rotulo: "Equipe", xA: 34, yA: 162 },
].map((no, i) => ({ ...no, ...renomeia(anel(i, 5)) }));

function renomeia(ponto) {
  return { xB: ponto.x, yB: ponto.y };
}

/**
 * Diagonais, e não o perímetro: é o cruzamento no meio que faz o
 * desenho ler como confusão. Ligar vizinho com vizinho desenharia um
 * pentágono arrumado, exatamente o oposto do argumento. (Geometria
 * herdada de Fragmentacao.jsx — não mexer sem reler o motivo.)
 */
const CULPA = [
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 0],
  [4, 1],
];

const setaEntre = (a, b, folga = RAIO_NO + 5) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;

  const de = { x: a.x + ux * folga, y: a.y + uy * folga };
  const ate = { x: b.x - ux * folga, y: b.y - uy * folga };

  const nx = -uy;
  const ny = ux;
  const c = 7;
  const l = 4;
  const ponta = [
    `${ate.x} ${ate.y}`,
    `${ate.x - ux * c + nx * l} ${ate.y - uy * c + ny * l}`,
    `${ate.x - ux * c - nx * l} ${ate.y - uy * c - ny * l}`,
  ].join(" L ");

  return { traco: `M ${de.x} ${de.y} L ${ate.x} ${ate.y}`, ponta };
};

// ── O ciclo F.O.C.O. (herdado de CicloHabitat.jsx) ─────────────────────

export const FASES = [
  { letra: "F", nome: "Fundação", opacidade: 1 },
  { letra: "O", nome: "Origem", opacidade: 0.82 },
  { letra: "C", nome: "Conversão", opacidade: 0.64 },
  { letra: "O", nome: "Operação", opacidade: 0.46 },
];

const ponto = (graus, raio) => {
  const rad = ((graus - 90) * Math.PI) / 180;
  return { x: CX + raio * Math.cos(rad), y: CY + raio * Math.sin(rad) };
};

const arco = (de, ate, raio) => {
  const a = ponto(de, raio);
  const b = ponto(ate, raio);
  const grande = ate - de > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${raio} ${raio} 0 ${grande} 1 ${b.x} ${b.y}`;
};

/** Ponta de seta apoiada na tangente do anel, para marcar o sentido. */
const seta = (graus, raio) => {
  const p = ponto(graus, raio);
  const t = (graus * Math.PI) / 180;
  const dx = Math.cos(t);
  const dy = Math.sin(t);
  const nx = -dy;
  const ny = dx;
  const c = 7;
  const l = 5;
  return [
    `${p.x + dx * c} ${p.y + dy * c}`,
    `${p.x - dx * 2 + nx * l} ${p.y - dy * 2 + ny * l}`,
    `${p.x - dx * 2 - nx * l} ${p.y - dy * 2 - ny * l}`,
  ].join(" L ");
};

const passo = 360 / FASES.length;

/**
 * ── A câmera ──────────────────────────────────────────────────────────
 *
 * No telemóvel o `viewBox` deixa de ser fixo e vira enquadramento: ele
 * fecha em cima do que está em cena naquele momento, que é o que permite
 * o desenho aparecer grande numa tela estreita. Quem anima é
 * `secoes/02.Cena.jsx`, nos mesmos tempos da narrativa.
 *
 * Os três quadros saem das constantes acima, nunca de olhômetro: cada um
 * é a caixa do que precisa estar visível, mais uma folga de 6. Mexer em
 * `RAIO_ANEL` ou `RAIO_NO` recalcula tudo sozinho.
 *
 * O terceiro quadro só existe porque os nós somem antes de os arcos
 * entrarem: sem eles em cena, sobra a moldura que eles ocupavam, e é
 * essa sobra que vira aumento.
 */
const folga = 6;
const caixa = (x0, y0, x1, y1) =>
  [x0 - folga, y0 - folga, x1 - x0 + folga * 2, y1 - y0 + folga * 2]
    .map((n) => Math.round(n))
    .join(" ");

const extremos = (pontos, raio) => [
  Math.min(...pontos.map((p) => p.x)) - raio,
  Math.min(...pontos.map((p) => p.y)) - raio,
  Math.max(...pontos.map((p) => p.x)) + raio,
  Math.max(...pontos.map((p) => p.y)) + raio,
];

export const QUADRO_ABERTO = "0 0 326 330";

export const CAMERA = {
  /** O caos: só a nuvem de nós soltos. */
  caos: caixa(
    ...extremos(
      NOS.map((n) => ({ x: n.xA, y: n.yA })),
      RAIO_NO
    )
  ),
  /** Os nós já pousados no anel, ainda visíveis. */
  anel: caixa(
    CX - RAIO_ANEL - RAIO_NO,
    CY - RAIO_ANEL - RAIO_NO,
    CX + RAIO_ANEL + RAIO_NO,
    CY + RAIO_ANEL + RAIO_NO
  ),
  /** Só o ciclo: anel, arcos e núcleo. O quadro mais fechado dos três. */
  ciclo: caixa(
    CX - RAIO_ANEL - ESPESSURA_ARCO / 2,
    CY - RAIO_ANEL - ESPESSURA_ARCO / 2,
    CX + RAIO_ANEL + ESPESSURA_ARCO / 2,
    CY + RAIO_ANEL + ESPESSURA_ARCO / 2
  ),
};

/**
 * O `viewBox` fechado só é possível porque os rótulos das fases saem de
 * cena no telemóvel. Eles vivem a `RAIO_ANEL + 30` do centro e eram eles
 * que obrigavam o quadro a ser 35% maior que o próprio anel.
 *
 * Some sem perda: o nome da fase aparece em garrafais douradas ao lado
 * do gráfico (`NomeFase`, em `02.Cena.jsx`), no mesmo tempo em que o
 * arco se pinta. Com o rótulo fora, a letra dentro do arco cresce e
 * assume o papel de marcar a fase no desenho.
 */
const Desenho = styled.svg`
  display: block;
  width: 100%;

  ${Media.PhoneLarge} {
    height: 100%;

    .rotulo-fase {
      display: none;
    }

    /* 15 e não mais: a letra mora dentro do traço do arco, que tem
       ESPESSURA_ARCO de espessura. Passando disso ela transborda para
       fora do dourado e lê como desalinhamento, não como destaque. */
    .letra-fase {
      font-size: 15px;
    }
  }
`;

/**
 * "?" do centro pulsando enquanto o caos domina a cena. CSS puro, e só
 * no `transform`, nunca no `opacity` — quem controla se o "?" está
 * visível é o GSAP, e uma animação CSS pesa mais que estilo inline no
 * cascade. Se as duas mexessem em `opacity`, a CSS venceria e o fade
 * de entrada/saída do GSAP nunca apareceria.
 *
 * O loop também é ambiente, não um passo da narrativa por scroll, e
 * assim ele já respeita `prefers-reduced-motion` sozinho, sem depender
 * do gate em JS que cobre o resto do componente.
 */
const pulsar = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
`;

const Interrogacao = styled.g`
  transform-origin: ${CX}px ${CY}px;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${pulsar} 2.2s ease-in-out infinite;
  }
`;

function No({ x, y, rotulo, groupRef }) {
  return (
    <g ref={groupRef} style={{ transform: `translate(${x}px, ${y}px)` }}>
      <circle
        cx="0"
        cy="0"
        r={RAIO_NO}
        fill="var(--superficie)"
        stroke="var(--acento-borda)"
        strokeWidth="1"
      />
      <text
        x="0"
        y="4"
        textAnchor="middle"
        fontSize="11"
        fontFamily="Poppins, sans-serif"
        fontWeight="500"
        fill="var(--acento)"
      >
        {rotulo}
      </text>
    </g>
  );
}

const CenaOrganismo = forwardRef(function CenaOrganismo(_props, refExterno) {
  const svgRef = useRef(null);
  const nosRefs = useRef([]);
  const culpaGrupoRef = useRef(null);
  const culpaTracosRefs = useRef([]);
  const interrogacaoRef = useRef(null);
  const raiosRefs = useRef([]);
  const nucleoCirculoRef = useRef(null);
  const nucleoTextoBRef = useRef(null);
  const nucleoTextoCRef = useRef(null);
  const anelRef = useRef(null);
  const arcosGruposRefs = useRef([]);
  const arcosTracosRefs = useRef([]);
  const setasArcoRefs = useRef([]);

  useImperativeHandle(refExterno, () => ({
    svg: svgRef.current,
    nos: nosRefs.current,
    culpaGrupo: culpaGrupoRef.current,
    culpaTracos: culpaTracosRefs.current,
    interrogacao: interrogacaoRef.current,
    raios: raiosRefs.current,
    nucleoCirculo: nucleoCirculoRef.current,
    nucleoTextoB: nucleoTextoBRef.current,
    nucleoTextoC: nucleoTextoCRef.current,
    anel: anelRef.current,
    arcosGrupos: arcosGruposRefs.current,
    arcosTracos: arcosTracosRefs.current,
    setasArco: setasArcoRefs.current,
  }));

  return (
    <Desenho
      ref={svgRef}
      viewBox={QUADRO_ABERTO}
      role="img"
      aria-labelledby="titulo-cena-organismo"
    >
      <title id="titulo-cena-organismo">
        Cinco fornecedores soltos se organizam em torno da clínica e viram um
        ciclo fechado de quatro fases que se realimenta
      </title>

      {/* Culpa cruzando o meio: some assim que os nós migram. As setas
          usam a posição solta (xA/yA) — é nelas que o caos existe. */}
      <g ref={culpaGrupoRef} opacity="0">
        {CULPA.map(([a, b], i) => {
          const { traco, ponta } = setaEntre(
            { x: NOS[a].xA, y: NOS[a].yA },
            { x: NOS[b].xA, y: NOS[b].yA }
          );
          return (
            <g key={`${a}-${b}`}>
              <path
                ref={(el) => {
                  culpaTracosRefs.current[i] = el;
                }}
                d={traco}
                stroke="rgba(233,150,122,0.55)"
                strokeWidth="1.4"
                strokeDasharray="1 1"
                pathLength="1"
                strokeDashoffset="0"
                fill="none"
              />
              <path d={`M ${ponta} Z`} fill="rgba(233,150,122,0.65)" />
            </g>
          );
        })}
      </g>

      {/* O "?" do centro vazio, só durante o caos. Mesmo eixo que o
          núcleo ocupa depois: os dois nunca ficam visíveis ao mesmo
          tempo, então dividir o centro não gera conflito nenhum. */}
      <Interrogacao ref={interrogacaoRef} opacity="0">
        <circle
          cx={CX}
          cy={CY}
          r={RAIO_NO}
          fill="var(--superficie)"
          stroke="rgba(233,150,122,0.34)"
          strokeWidth="1.2"
          strokeDasharray="3 6"
        />
        <text
          x={CX}
          y={CY + 8}
          textAnchor="middle"
          fontSize="24"
          fontFamily="Poppins, sans-serif"
          fontWeight="600"
          fill="var(--erro)"
        >
          ?
        </text>
      </Interrogacao>

      {/* Anel externo: fecha só na terceira fase. */}
      <circle
        ref={anelRef}
        cx={CX}
        cy={CY}
        r={RAIO_ANEL}
        fill="none"
        stroke="var(--acento-borda)"
        strokeWidth="1"
        pathLength="1"
        strokeDasharray="1 1"
        strokeDashoffset="0"
      />

      {/* Raios: aparecem quando os nós já pousaram no anel. */}
      {NOS.map((no, i) => (
        <line
          key={no.rotulo}
          ref={(el) => {
            raiosRefs.current[i] = el;
          }}
          x1={CX}
          y1={CY}
          x2={no.xB}
          y2={no.yB}
          stroke="var(--acento-borda)"
          strokeWidth="1.2"
          pathLength="1"
          strokeDasharray="1 1"
          strokeDashoffset="0"
        />
      ))}

      {/* Os quatro arcos do F.O.C.O., pintados por cima do anel. O
          `strokeOpacity` do traço carrega o degradê permanente entre as
          quatro fases; o `opacity` do grupo que o envolve é só a
          revelação temporal, then o texto nasce e desaparece junto com o
          arco em vez de ficar sempre visível por conta própria. */}
      {FASES.map((fase, i) => {
        const de = i * passo + FOLGA_ARCO;
        const ate = (i + 1) * passo - FOLGA_ARCO;
        const meio = (de + ate) / 2;
        const rotulo = ponto(meio, RAIO_ANEL + 30);
        const letra = ponto(meio, RAIO_ANEL);

        return (
          <g key={fase.nome}>
            <g
              ref={(el) => {
                arcosGruposRefs.current[i] = el;
              }}
              opacity="1"
            >
              <path
                ref={(el) => {
                  arcosTracosRefs.current[i] = el;
                }}
                d={arco(de, ate, RAIO_ANEL)}
                fill="none"
                stroke="var(--acento)"
                strokeOpacity={fase.opacidade}
                strokeWidth={ESPESSURA_ARCO}
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1 1"
                strokeDashoffset="0"
              />

              <text
                className="letra-fase"
                x={letra.x}
                y={letra.y + 5}
                textAnchor="middle"
                fontSize="13"
                fontFamily="Poppins, sans-serif"
                fontWeight="700"
                fill="var(--fundo)"
              >
                {fase.letra}
              </text>

              <text
                className="rotulo-fase"
                x={rotulo.x}
                y={rotulo.y + 4}
                textAnchor="middle"
                fontSize="11.5"
                fontFamily="Poppins, sans-serif"
                fontWeight="500"
                fill="var(--tinta-corpo)"
              >
                {fase.nome}
              </text>
            </g>

            {/* No meio do vão, não colada ao arco: o strokeLinecap
                arredondado estende o traço uns 4 graus além do fim
                declarado, e ali a ponta desaparecia dentro dele. */}
            <path
              ref={(el) => {
                setasArcoRefs.current[i] = el;
              }}
              d={`M ${seta(ate + FOLGA_ARCO, RAIO_ANEL)} Z`}
              fill="var(--acento-forte)"
            />
          </g>
        );
      })}

      {/* Nós: soltos no Estado A, pousados no anel a partir do B. */}
      {NOS.map((no, i) => (
        <No
          key={no.rotulo}
          x={no.xB}
          y={no.yB}
          rotulo={no.rotulo}
          groupRef={(el) => {
            nosRefs.current[i] = el;
          }}
        />
      ))}

      {/* Núcleo: um círculo só, dois textos que se revezam. */}
      <g ref={nucleoCirculoRef} opacity="1">
        <circle cx={CX} cy={CY} r="40" fill="var(--acento-veu)" />
        <circle
          cx={CX}
          cy={CY}
          r="40"
          fill="none"
          stroke="var(--acento)"
          strokeWidth="1.4"
        />
      </g>

      <g ref={nucleoTextoBRef} opacity="0">
        <text
          x={CX}
          y={CY - 3}
          textAnchor="middle"
          fontSize="11"
          fontFamily="Poppins, sans-serif"
          fontWeight="600"
          fill="var(--acento)"
        >
          SUA
        </text>
        <text
          x={CX}
          y={CY + 11}
          textAnchor="middle"
          fontSize="11"
          fontFamily="Poppins, sans-serif"
          fontWeight="600"
          fill="var(--acento)"
        >
          CLÍNICA
        </text>
      </g>

      <g ref={nucleoTextoCRef} opacity="1">
        <text
          x={CX}
          y={CY - 5}
          textAnchor="middle"
          fontSize="12.5"
          fontFamily="Poppins, sans-serif"
          fontWeight="600"
          fill="var(--tinta)"
        >
          Demanda
        </text>
        <text
          x={CX}
          y={CY + 11}
          textAnchor="middle"
          fontSize="11.5"
          fontFamily="Nunito Sans, sans-serif"
          fill="var(--acento)"
        >
          que se renova
        </text>
      </g>
    </Desenho>
  );
});

export default CenaOrganismo;
