/**
 * Sistema de grafismos da home.
 *
 * Não são ícones e não são desenhos avulsos: são **um alfabeto só**,
 * usado a página inteira, que muda de estado conforme a história avança.
 * Três elementos formam todos eles:
 *
 *   PONTO    o paciente, a unidade que entra
 *   LINHA    o caminho, a rota que ele faz (ou não faz)
 *   CAMPO    a operação, a moldura que sustenta o resto
 *
 * E a sequência é a mesma da página, nesta ordem:
 *
 *   1. RUPTURAS   pontos dispersos, linha interrompida, campo incompleto
 *   2. MÉTODO     a linha se organiza: base → feixe → funil → leitura
 *   3. ENTREGAS   o mesmo alfabeto aplicado a cada frente de trabalho
 *   4. PROVA      os pontos chegam ordenados e a linha assenta
 *
 * Por isso todos partilham a mesma caixa (120x60), o mesmo raio de ponto
 * e a mesma linha de base na altura 52: passando de uma dobra à outra, o
 * olho reconhece que é o mesmo desenho evoluindo, e não figura nova.
 *
 * Regra técnica que vale para todos: traço de 1px em `currentColor`, sem
 * preenchimento. Assim a mesma peça serve navy e creme sem ajuste, e
 * nunca compete com o texto ao lado.
 */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
};

/** Caixa comum. Mudar aqui muda o sistema inteiro, que é o ponto. */
const CAIXA = { width: 120, height: 60, viewBox: "0 0 120 60" };
const CHAO = 52;
const R = 2.8;

const Svg = ({ children }) => (
  <svg {...CAIXA} aria-hidden="true">
    <g {...base}>{children}</g>
  </svg>
);

/** O chão: a linha de base que atravessa o sistema todo. */
const Chao = ({ opacidade = 0.45 }) => (
  <path d={`M2 ${CHAO} H118`} strokeOpacity={opacidade} />
);

/* ── 1. Rupturas: o estado desorganizado ───────────────────────────── */

/** Não falta paciente, falta caminho: os pontos existem, a rota não. */
export const Caminho = () => (
  <Svg>
    <Chao />
    <circle cx="12" cy="18" r={R} />
    <circle cx="34" cy="34" r={R} />
    <circle cx="20" cy="42" r={R} />
    <circle cx="44" cy="14" r={R} />
    <path d="M58 30 H76" strokeDasharray="3 5" strokeOpacity="0.6" />
    <path d="M92 12 V44" strokeOpacity="0.8" />
    <path d="M86 18 L92 12 L98 18" strokeOpacity="0.8" />
  </Svg>
);

/** Não falta presença, falta percepção: o que se entrega e o que se vê. */
export const Percepcao = () => (
  <Svg>
    <Chao />
    <rect x="10" y="14" width="30" height={CHAO - 14} />
    <rect x="54" y="36" width="30" height={CHAO - 36} strokeOpacity="0.55" />
    <path d="M98 14 V52" strokeDasharray="3 4" strokeOpacity="0.75" />
    <path d="M94 14 H102" />
    <path d="M94 52 H102" />
  </Svg>
);

/** Não falta atendimento, falta cadência: as batidas se espaçam. */
export const Cadencia = () => (
  <Svg>
    <path d="M2 30 H118" strokeOpacity="0.25" />
    <path d="M10 16 V44" />
    <path d="M32 20 V40" strokeOpacity="0.8" />
    <path d="M60 24 V36" strokeOpacity="0.55" />
    <path d="M96 27 V33" strokeOpacity="0.3" />
    <circle cx="10" cy="30" r={R} />
  </Svg>
);

/** Não falta esforço, falta estrutura: metade se apoia no vazio. */
export const Estrutura = () => (
  <Svg>
    <Chao opacidade={0.6} />
    <path d={`M14 ${CHAO} V22 H58 V${CHAO}`} />
    <path d="M14 36 H58" strokeOpacity="0.6" />
    <path d={`M78 ${CHAO} V30`} strokeDasharray="3 4" strokeOpacity="0.5" />
    <path d={`M100 ${CHAO} V40`} strokeDasharray="3 4" strokeOpacity="0.35" />
  </Svg>
);

/* ── 2. O método: a linha se organizando ───────────────────────────── */

/** Fundação: a base e o prumo, antes de qualquer construção. */
export const Base = () => (
  <Svg>
    <Chao opacidade={0.6} />
    <path d={`M22 ${CHAO} V26 H74 V${CHAO}`} />
    <path d="M48 6 V22" strokeDasharray="3 4" strokeOpacity="0.7" />
    <circle cx="48" cy="24" r={R} />
    <path d={`M92 ${CHAO} V38`} strokeOpacity="0.3" />
  </Svg>
);

/** Origem: os mesmos pontos, agora convergindo num alvo só. */
export const Feixe = () => (
  <Svg>
    <Chao opacidade={0.25} />
    <path d="M4 10 L74 30" strokeOpacity="0.55" />
    <path d="M4 30 H74" />
    <path d="M4 50 L74 30" strokeOpacity="0.55" />
    <circle cx="90" cy="30" r="11" />
    <circle cx="90" cy="30" r={R} />
  </Svg>
);

/** Conversão: o funil aperta, e o que passa sai do outro lado. */
export const Funil = () => (
  <Svg>
    <Chao opacidade={0.25} />
    <path d="M10 10 H82 L56 32 V48 L36 41 V32 Z" />
    <path d="M94 30 H116" strokeOpacity="0.75" />
    <circle cx="112" cy="30" r={R} strokeOpacity="0.75" />
  </Svg>
);

/** Operação: os pontos viram medida, e alguém lê a medida. */
export const PainelDados = () => (
  <Svg>
    <Chao opacidade={0.6} />
    <rect x="12" y="34" width="15" height={CHAO - 34} />
    <rect x="37" y="24" width="15" height={CHAO - 24} />
    <rect x="62" y="40" width="15" height={CHAO - 40} strokeOpacity="0.7" />
    <rect x="87" y="16" width="15" height={CHAO - 16} />
    <path d="M2 28 H118" strokeDasharray="4 5" strokeOpacity="0.45" />
  </Svg>
);

/* ── 3. Entregas: o alfabeto aplicado a cada frente ────────────────── */

/** Terceirização: o time opera fora do campo, ligado a ele por um fio. */
export const TimeFora = () => (
  <Svg>
    <rect x="4" y="16" width="34" height="30" />
    <path d="M38 31 H60" strokeDasharray="3 4" strokeOpacity="0.7" />
    <circle cx="74" cy="20" r="6" />
    <circle cx="96" cy="31" r="6" />
    <circle cx="74" cy="42" r="6" />
    <path d="M80 23 L90 28" strokeOpacity="0.5" />
    <path d="M80 39 L90 34" strokeOpacity="0.5" />
  </Svg>
);

/** Demanda: muitos entram, um sai qualificado. */
export const Filtro = () => (
  <Svg>
    <path d="M4 12 H42" strokeOpacity="0.4" />
    <path d="M4 24 H42" strokeOpacity="0.4" />
    <path d="M4 36 H42" strokeOpacity="0.4" />
    <path d="M4 48 H42" strokeOpacity="0.4" />
    <path d="M56 8 V52" strokeDasharray="3 4" />
    <path d="M68 30 H112" />
    <circle cx="112" cy="30" r={R} />
  </Svg>
);

/** Estruturação: as etapas, e um card descendo por elas. */
export const Etapas = () => (
  <Svg>
    <path d="M10 8 V52" strokeOpacity="0.35" />
    <path d="M60 8 V52" strokeOpacity="0.35" />
    <path d="M110 8 V52" strokeOpacity="0.35" />
    <rect x="16" y="14" width="30" height="12" />
    <rect x="66" y="30" width="30" height="12" strokeOpacity="0.7" />
    <path d="M46 20 H66" strokeDasharray="3 3" strokeOpacity="0.55" />
  </Svg>
);

/** Gestão: o mostrador que alguém lê toda semana. */
export const Mostrador = () => (
  <Svg>
    <path d="M22 50 A 38 38 0 0 1 98 50" />
    <path d="M60 50 L84 28" />
    <circle cx="60" cy="50" r={R} />
    <path d="M60 8 V13" strokeOpacity="0.55" />
  </Svg>
);

/** Marketing: o sinal que se propaga a partir de um ponto. */
export const Sinal = () => (
  <Svg>
    <circle cx="26" cy="30" r={R} />
    <path d="M40 16 A 20 20 0 0 1 40 44" strokeOpacity="0.8" />
    <path d="M54 6 A 32 32 0 0 1 54 54" strokeOpacity="0.5" />
    <path d="M68 2 A 40 40 0 0 1 68 58" strokeOpacity="0.28" />
  </Svg>
);

/* ── 4. Prova: o estado ordenado ───────────────────────────────────── */

/** Previsibilidade: a linha oscila e assenta. */
export const Estabiliza = () => (
  <Svg>
    <path d="M2 30 L14 12 L26 46 L38 16 L50 42 L62 24 L74 32 L84 29 H116" />
    <circle cx="116" cy="29" r={R} />
  </Svg>
);

/** Consistência: a grade da agenda preenchendo. */
export const Agenda = () => (
  <Svg>
    <rect x="4" y="8" width="112" height="44" strokeOpacity="0.5" />
    <path d="M4 20 H116" strokeOpacity="0.5" />
    <path d="M32 8 V52" strokeOpacity="0.28" />
    <path d="M60 8 V52" strokeOpacity="0.28" />
    <path d="M88 8 V52" strokeOpacity="0.28" />
    <path d="M10 28 H26" />
    <path d="M38 28 H54" />
    <path d="M66 28 H82" />
    <path d="M10 40 H26" strokeOpacity="0.7" />
    <path d="M94 28 H110" strokeOpacity="0.45" />
  </Svg>
);

/* ── Peças de interface ────────────────────────────────────────────── */

/** Seta fina do botão. */
export const Seta = () => (
  <svg width="17" height="10" viewBox="0 0 17 10" aria-hidden="true">
    <g {...base}>
      <path d="M0 5 H15.4" />
      <path d="M11.6 1 L15.8 5 L11.6 9" />
    </g>
  </svg>
);

/** WhatsApp em traço, para casar com o resto. */
export const Whatsapp = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
    <g {...base}>
      <path d="M10 1.6a8.4 8.4 0 0 0-7.2 12.7L1.7 18.3l4.1-1.06A8.4 8.4 0 1 0 10 1.6Z" />
      <path d="M7 6.4c.3-.1.6 0 .8.3l.8 1.3c.1.3.1.6-.1.8l-.5.5c-.1.2-.2.4 0 .6a6 6 0 0 0 2.1 2.1c.2.1.4.1.6-.1l.5-.5c.2-.2.5-.2.8-.1l1.3.8c.3.2.4.5.3.8-.2.7-.9 1.2-1.7 1.2-2.6 0-5.9-3.3-5.9-5.9 0-.8.4-1.5 1-1.8Z" />
    </g>
  </svg>
);

/* ── O funil do método ─────────────────────────────────────────────── */

/**
 * Quatro faixas empilhadas, uma por fase do F.O.C.O., do largo ao
 * estreito, com o rótulo à direita ligado por linha pontilhada.
 *
 * Duas coisas o separam do funil clássico de marketing, e as duas são de
 * propósito:
 *
 *   1. A primeira faixa é a **Fundação**, que não é etapa de captação e
 *      sim o que sustenta as outras três. Ela é a mais larga porque tudo
 *      acontece dentro dela, não porque entra mais gente ali.
 *   2. Existe uma **seta de retorno** do fim ao topo. O método não
 *      termina na conversão: a Operação lê o resultado e devolve a
 *      decisão para a Fundação. Funil que só desce não é o que a Toka faz.
 *
 * `ativa` acende uma faixa; `data-traco` marca o que se escreve quando a
 * dobra entra na tela.
 */
export const FunilMetodo = ({ ativa = 0 }) => {
  // topo, base e largura de cada faixa. A conta do trapézio sai daqui,
  // então mexer numa faixa não desalinha as outras.
  const faixas = [
    { y: 6, altura: 46, largura: 168, rotulo: "Fundação" },
    { y: 58, altura: 44, largura: 138, rotulo: "Origem" },
    { y: 108, altura: 42, largura: 108, rotulo: "Conversão" },
    { y: 156, altura: 40, largura: 78, rotulo: "Operação" },
  ];
  const centro = 118;

  return (
    <svg width="400" height="240" viewBox="0 0 400 240" aria-hidden="true">
      <g {...base}>
        {faixas.map((f, i) => {
          const proxima = faixas[i + 1];
          const baseLargura = proxima ? proxima.largura : f.largura - 26;
          const acesa = i === ativa;
          const x1 = centro - f.largura / 2;
          const x2 = centro + f.largura / 2;
          const x3 = centro + baseLargura / 2;
          const x4 = centro - baseLargura / 2;
          const meio = f.y + f.altura / 2;

          return (
            <g key={f.rotulo} strokeOpacity={acesa ? 1 : 0.34}>
              <path
                data-traco
                d={`M${x1} ${f.y} H${x2} L${x3} ${f.y + f.altura} H${x4} Z`}
              />
              <path
                d={`M${x2 - (f.largura - baseLargura) / 4} ${meio} H${266}`}
                strokeDasharray="3 5"
                strokeOpacity={acesa ? 0.8 : 0.22}
              />
              <circle cx="272" cy={meio} r="3" />
            </g>
          );
        })}

        {/* O ciclo: da última faixa de volta ao topo. */}
        <path
          data-traco
          d={`M${centro - 40} 206 H24 V16 H${centro - 96}`}
          strokeOpacity="0.5"
        />
        <path d={`M${centro - 90} 11 L${centro - 96} 16 L${centro - 90} 21`} strokeOpacity="0.5" />
      </g>

      {faixas.map((f, i) => (
        <text
          key={f.rotulo}
          x="284"
          y={f.y + f.altura / 2 + 4}
          fill="currentColor"
          fillOpacity={i === ativa ? 1 : 0.4}
          style={{
            font: '400 11px "Poppins", sans-serif',
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {f.rotulo}
        </text>
      ))}
    </svg>
  );
};

/** A rota que a Toka constrói: pontos dispersos virando caminho único. */
export const RotaAteVoce = () => (
  <svg width="360" height="240" viewBox="0 0 360 240" aria-hidden="true">
    <g {...base}>
      <circle cx="26" cy="52" r="3" strokeOpacity="0.65" />
      <circle cx="62" cy="24" r="3" strokeOpacity="0.65" />
      <circle cx="44" cy="104" r="3" strokeOpacity="0.65" />
      <circle cx="92" cy="76" r="3" strokeOpacity="0.65" />
      <circle cx="30" cy="150" r="3" strokeOpacity="0.5" />
      <circle cx="86" cy="140" r="3" strokeOpacity="0.5" />

      <path data-traco d="M26 52 C 96 52, 96 118, 158 118" strokeOpacity="0.5" />
      <path data-traco d="M62 24 C 120 24, 118 118, 158 118" strokeOpacity="0.5" />
      <path data-traco d="M44 104 C 100 104, 112 118, 158 118" strokeOpacity="0.5" />
      <path data-traco d="M92 76 C 126 76, 130 118, 158 118" strokeOpacity="0.5" />
      <path data-traco d="M30 150 C 96 150, 116 118, 158 118" strokeOpacity="0.35" />
      <path data-traco d="M86 140 C 118 140, 130 118, 158 118" strokeOpacity="0.35" />

      <path data-traco d="M158 118 H262" />
      <circle cx="158" cy="118" r="4" />

      <path d="M280 74 H344 V186 H280 Z" strokeOpacity="0.8" />
      <path d="M262 118 H280" />
      <path d="M300 186 V146 H326 V186" strokeOpacity="0.55" />
      <circle cx="320" cy="166" r="2" strokeOpacity="0.55" />
      <path d="M8 210 H352" strokeOpacity="0.25" />
    </g>
  </svg>
);

/** Marcas do comparativo, no traço da página. */
export const Cruz = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <g {...base}>
      <path d="M2 2 L12 12" />
      <path d="M12 2 L2 12" />
    </g>
  </svg>
);

export const Certo = () => (
  <svg width="15" height="12" viewBox="0 0 15 12" aria-hidden="true">
    <g {...base}>
      <path d="M1 6 L5.4 10.4 L14 1.6" />
    </g>
  </svg>
);

/* ── O ciclo do herói ──────────────────────────────────────────────── */

/**
 * As cinco frentes da Toka em volta de um círculo que gira devagar.
 *
 * Cada frente é um nó com **ícone dentro** e o rótulo logo abaixo. A
 * primeira versão colocava só texto ao redor, e ele saía cortado nas
 * laterais: `viewBox` não estica para caber `<text>`, e a palavra
 * simplesmente vazava da caixa. Aqui a caixa foi dimensionada a partir
 * do rótulo mais longo ("Terceirização"), com o texto centrado no nó.
 *
 * O ANEL gira, os NÓS não. Se o conjunto girasse, metade dos ícones e
 * dos rótulos ficaria de cabeça para baixo: o que gira é o traço
 * pontilhado em volta, e é ele que dá a sensação de ciclo vivo.
 */
const CENTRO = { x: 250, y: 200 };
const RAIO = 132;

/** Os ícones de cada frente, desenhados em torno do centro do nó. */
const icones = {
  time: (x, y) => (
    <>
      <circle cx={x - 8} cy={y - 4} r="3.6" />
      <circle cx={x + 8} cy={y - 4} r="3.6" />
      <circle cx={x} cy={y + 7} r="3.6" />
      <path d={`M${x - 5} ${y - 1} L${x - 2} ${y + 4}`} strokeOpacity="0.6" />
      <path d={`M${x + 5} ${y - 1} L${x + 2} ${y + 4}`} strokeOpacity="0.6" />
    </>
  ),
  funil: (x, y) => (
    <>
      <path d={`M${x - 11} ${y - 8} H${x + 11} L${x + 3} ${y + 2} V${y + 9} L${x - 3} ${y + 6} V${y + 2} Z`} />
    </>
  ),
  colunas: (x, y) => (
    <>
      <path d={`M${x - 9} ${y + 9} V${y - 3}`} />
      <path d={`M${x} ${y + 9} V${y - 9}`} />
      <path d={`M${x + 9} ${y + 9} V${y + 1}`} />
      <path d={`M${x - 13} ${y + 9} H${x + 13}`} strokeOpacity="0.5" />
    </>
  ),
  mostrador: (x, y) => (
    <>
      <path d={`M${x - 11} ${y + 6} A 11 11 0 0 1 ${x + 11} ${y + 6}`} />
      <path d={`M${x} ${y + 6} L${x + 7} ${y - 2}`} />
      <circle cx={x} cy={y + 6} r="1.8" />
    </>
  ),
  sinal: (x, y) => (
    <>
      <circle cx={x - 8} cy={y} r="2.4" />
      <path d={`M${x - 1} ${y - 7} A 9 9 0 0 1 ${x - 1} ${y + 7}`} strokeOpacity="0.85" />
      <path d={`M${x + 5} ${y - 11} A 14 14 0 0 1 ${x + 5} ${y + 11}`} strokeOpacity="0.5" />
    </>
  ),
};

const FRENTES_CICLO = [
  { nome: "Terceirização", icone: "time" },
  { nome: "Demanda", icone: "funil" },
  { nome: "Estruturação", icone: "colunas" },
  { nome: "Gestão", icone: "mostrador" },
  { nome: "Marketing", icone: "sinal" },
];

export const CicloFrentes = () => (
  <svg width="500" height="420" viewBox="0 0 500 420" aria-hidden="true">
    <g {...base}>
      {/* Os anéis que giram, e só eles. */}
      <g data-gira="horario" style={{ transformOrigin: `${CENTRO.x}px ${CENTRO.y}px` }}>
        <circle cx={CENTRO.x} cy={CENTRO.y} r={RAIO} strokeOpacity="0.42" strokeDasharray="2 8" />
      </g>
      <g data-gira="antihorario" style={{ transformOrigin: `${CENTRO.x}px ${CENTRO.y}px` }}>
        <circle cx={CENTRO.x} cy={CENTRO.y} r={RAIO - 30} strokeOpacity="0.16" strokeDasharray="1 10" />
      </g>

      <circle cx={CENTRO.x} cy={CENTRO.y} r="4.5" />

      {FRENTES_CICLO.map((f, i) => {
        const ang = (i / FRENTES_CICLO.length) * Math.PI * 2 - Math.PI / 2;
        const x = CENTRO.x + Math.cos(ang) * RAIO;
        const y = CENTRO.y + Math.sin(ang) * RAIO;
        return (
          <g key={f.nome}>
            <path
              d={`M${CENTRO.x + Math.cos(ang) * 16} ${CENTRO.y + Math.sin(ang) * 16} L${
                CENTRO.x + Math.cos(ang) * (RAIO - 26)
              } ${CENTRO.y + Math.sin(ang) * (RAIO - 26)}`}
              strokeOpacity="0.2"
            />
            <circle cx={x} cy={y} r="25" strokeOpacity="0.55" />
            {icones[f.icone](x, y)}
          </g>
        );
      })}
    </g>

    {FRENTES_CICLO.map((f, i) => {
      const ang = (i / FRENTES_CICLO.length) * Math.PI * 2 - Math.PI / 2;
      const x = CENTRO.x + Math.cos(ang) * RAIO;
      const y = CENTRO.y + Math.sin(ang) * RAIO;
      // Acima do nó quando ele está na metade de cima, abaixo quando está
      // na de baixo: assim o rótulo nunca cai sobre o anel.
      const acima = Math.sin(ang) < -0.2;
      return (
        <text
          key={f.nome}
          x={x}
          y={acima ? y - 36 : y + 46}
          textAnchor="middle"
          fill="currentColor"
          fillOpacity="0.8"
          style={{
            font: '400 10px "Poppins", sans-serif',
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {f.nome}
        </text>
      );
    })}
  </svg>
);

/**
 * A onda de fundo das faixas navy.
 *
 * Três senoides sobrepostas, larguíssimas e quase invisíveis, que
 * deslizam devagar em velocidades diferentes. O objetivo é só tirar o
 * navy de "cor chapada de tela": se a onda for percebida como desenho,
 * ela está forte demais.
 *
 * `preserveAspectRatio="none"` deixa a onda esticar na largura da faixa
 * sem deformar a espessura do traço, porque `vectorEffect` já segura o
 * 1px.
 */
export const OndaFundo = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1200 300"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <g {...base}>
      <path
        data-onda="1"
        d="M-600 150 C -450 90, -300 210, -150 150 C 0 90, 150 210, 300 150 C 450 90, 600 210, 750 150 C 900 90, 1050 210, 1200 150 C 1350 90, 1500 210, 1650 150 C 1800 90, 1950 210, 2100 150"
        strokeOpacity="0.5"
      />
      <path
        data-onda="2"
        d="M-600 190 C -420 130, -240 250, -60 190 C 120 130, 300 250, 480 190 C 660 130, 840 250, 1020 190 C 1200 130, 1380 250, 1560 190 C 1740 130, 1920 250, 2100 190"
        strokeOpacity="0.32"
      />
      <path
        data-onda="3"
        d="M-600 110 C -480 60, -360 160, -240 110 C -120 60, 0 160, 120 110 C 240 60, 360 160, 480 110 C 600 60, 720 160, 840 110 C 960 60, 1080 160, 1200 110 C 1320 60, 1440 160, 1560 110 C 1680 60, 1800 160, 1920 110 C 2040 60, 2160 160, 2280 110"
        strokeOpacity="0.2"
      />
    </g>
  </svg>
);
