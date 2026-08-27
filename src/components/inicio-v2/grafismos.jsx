/**
 * Grafismos próprios da v2.
 *
 * Por enquanto só um: o desenho do herói. Todo o resto continua vindo de
 * `components/inicio/grafismos.jsx`, sem cópia.
 */

/* Mesmo traço do resto da casa: 1px, ponta redonda, sem preenchimento. É
   o que faz o desenho parecer da mesma mão que os das outras dobras. */
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/**
 * Os três nós sobem da esquerda para a direita porque o que eles
 * descrevem é um percurso, não um arranjo: o paciente passa por eles em
 * ordem, e só chega ao terceiro se os dois primeiros deram certo.
 *
 * Esta é a diferença para o `CicloFrentes` da home em `/`, que desenha
 * cinco frentes em roda. A roda estava certa para frentes de trabalho,
 * que rodam juntas e sem começo; estaria errada aqui, porque sugeriria
 * que os três momentos acontecem ao mesmo tempo.
 */
const MOMENTOS = [
  { nome: "Encontrado", x: 118, y: 322 },
  { nome: "Entendido", x: 250, y: 222 },
  { nome: "Escolhido", x: 382, y: 122 },
];

const RAIO_NO = 26;

const icones = {
  /* Encontrado: um alfinete de mapa, reduzido ao essencial. */
  0: (x, y) => (
    <>
      <path d={`M${x} ${y + 8} C${x - 9} ${y - 2} ${x - 7} ${y - 10} ${x} ${y - 10} C${x + 7} ${y - 10} ${x + 9} ${y - 2} ${x} ${y + 8} Z`} />
      <circle cx={x} cy={y - 4} r="2.4" />
    </>
  ),
  /* Entendido: duas ondas saindo de um ponto. A mensagem alcançando. */
  1: (x, y) => (
    <>
      <circle cx={x - 8} cy={y} r="2.4" />
      <path d={`M${x - 1} ${y - 7} A 9 9 0 0 1 ${x - 1} ${y + 7}`} strokeOpacity="0.85" />
      <path d={`M${x + 5} ${y - 11} A 14 14 0 0 1 ${x + 5} ${y + 11}`} strokeOpacity="0.5" />
    </>
  ),
  /* Escolhido: o certo. É o único dos três que é um desfecho. */
  2: (x, y) => <path d={`M${x - 8} ${y} L${x - 2} ${y + 6} L${x + 9} ${y - 7}`} />,
};

export const CaminhoMomentos = () => {
  const [a, b, c] = MOMENTOS;

  /* A linha para na borda do nó, não no centro dele: encostar no círculo
     deixaria um traço atravessando o ícone. */
  const segmento = (de, para) => {
    const ang = Math.atan2(para.y - de.y, para.x - de.x);
    const x1 = de.x + Math.cos(ang) * (RAIO_NO + 6);
    const y1 = de.y + Math.sin(ang) * (RAIO_NO + 6);
    const x2 = para.x - Math.cos(ang) * (RAIO_NO + 6);
    const y2 = para.y - Math.sin(ang) * (RAIO_NO + 6);
    return `M${x1} ${y1} L${x2} ${y2}`;
  };

  return (
    <svg width="500" height="420" viewBox="0 0 500 420" aria-hidden="true">
      <g {...base}>
        {/* O anel de fundo é o que sobrou de movimento na dobra: gira
            devagar atrás do percurso, sem competir com ele. O Hero
            procura estes `data-gira` e ignora em silêncio quem não os
            tiver, então o desenho continua correto sem JavaScript. */}
        <g data-gira="horario" style={{ transformOrigin: "250px 222px" }}>
          <circle cx="250" cy="222" r="168" strokeOpacity="0.34" strokeDasharray="2 8" />
        </g>
        <g data-gira="antihorario" style={{ transformOrigin: "250px 222px" }}>
          <circle cx="250" cy="222" r="138" strokeOpacity="0.14" strokeDasharray="1 10" />
        </g>

        <path d={segmento(a, b)} strokeOpacity="0.3" />
        <path d={segmento(b, c)} strokeOpacity="0.3" />

        {MOMENTOS.map((m, i) => (
          <g key={m.nome}>
            {/* O terceiro nó é o desfecho e por isso é o único de traço
                cheio. Os dois primeiros são passagem. */}
            <circle cx={m.x} cy={m.y} r={RAIO_NO} strokeOpacity={i === 2 ? "0.9" : "0.55"} />
            {icones[i](m.x, m.y)}
          </g>
        ))}
      </g>

      {MOMENTOS.map((m) => (
        <text
          key={m.nome}
          x={m.x}
          y={m.y + 48}
          textAnchor="middle"
          fill="currentColor"
          fillOpacity="0.8"
          style={{
            font: '400 10px "Poppins", sans-serif',
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {m.nome}
        </text>
      ))}
    </svg>
  );
};
