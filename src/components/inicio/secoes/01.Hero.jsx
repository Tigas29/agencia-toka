import { useRef } from "react";
import styled from "styled-components";
/**
 * O lockup oficial em navy, porque o herói agora é papel claro (o
 * branco, `logo-toka-branco.png`, continua servindo qualquer faixa
 * escura). Não é o SVG de `assets/landingpage/`: aquele traz o wordmark
 * em sans, e o "TOKA" da identidade é serifado, o mesmo desenho que a
 * página usa nos títulos. Veio de
 * `ID. VISUAL/LOGO E VARIAÇÕES/SEM TAGLINE/22.png`, recortado e
 * reduzido, com a marca intacta: nada aqui é redesenhado.
 */
import logoToka from "../../../assets/homepage/logo-toka-navy.png";
import { Cta, H1, Inner, Mascara, Media, Section } from "../style";
import { CicloFrentes, Seta } from "../grafismos";
import { EASE, gsap, useContextoGsap, useMenosMovimento } from "../../habitat/animacao";

/**
 * Dobra 1. Uma ideia só: quem a Toka atende e por que ela existe.
 *
 * O título é serifado e enorme porque é ele que dá o tom de toda a
 * página. Cada linha nasce de dentro do próprio corte, o que é diferente
 * de "vir voando de fora": em serifada fina, movimento lateral borra a
 * letra e denuncia a animação.
 *
 * Os números da casa (5 anos, +R$16M, +R$6M) viviam aqui e saíram: eles
 * puxavam a leitura para "o que a Toka já fez" logo no primeiro contato,
 * quando o que a dobra precisa entregar é o que ela FAZ e para quem.
 */

const Faixa = styled.header`
  width: 100%;
  padding: 30px 0 0;
  position: relative;
  z-index: 2;
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

  nav {
    display: flex;
    align-items: center;
    gap: 34px;

    a {
      font-family: "Poppins", sans-serif;
      font-size: 0.84rem;
      font-weight: 400;
      color: var(--tinta-corpo);
      transition: color 200ms ease;

      &:hover {
        color: var(--tinta);
      }
    }
  }

  ${Media.TabletSmall} {
    nav {
      display: none;
    }
  }
`;

/**
 * A medida do herói vive em `rem`, nunca em `ch`.
 *
 * `ch` é a largura do "0" da fonte DO PRÓPRIO elemento, e este contêiner
 * herda a Nunito Sans de 16px do corpo. Um `20ch` aqui daria uns 190px e
 * quebraria o título serifado de 5rem em uma palavra por linha, com o
 * build passando e nada acusando. Medida em `ch` só faz sentido no
 * elemento que carrega a fonte, e é lá dentro que ela está.
 */
/**
 * O ciclo das cinco frentes, girando devagar.
 *
 * Ele diz o que a Toka faz na primeira tela, sem gastar uma linha de
 * texto, e o movimento contínuo é o que dá vida ao herói sem competir
 * com a headline. Não é releitura da folha da marca: logo a gente usa,
 * não redesenha.
 *
 * Some abaixo de 1000px. Ali o herói já ocupa a largura toda e o desenho
 * ou empurraria a headline ou viraria miniatura ilegível.
 */
const ArteHeroi = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--tinta-corpo);
  opacity: 0.6;

  svg {
    width: clamp(320px, 30vw, 440px);
    height: auto;
  }

  ${Media.Tablet} {
    display: none;
  }
`;

const Corpo = styled.div`
  padding: clamp(72px, 12vw, 150px) 0 0;
  max-width: 62rem;

  /* Cada máscara é uma linha do título, e a medida existe só para
     impedir que a linha quebre sozinha dentro dela: com 15ch, "A sua
     agenda não deveria" partia em duas e sobrava um "deveria" órfão. */
  h1 {
    max-width: 21ch;
  }

  ${Media.Tablet} {
    max-width: 100%;
  }
`;

const Abertura = styled.p`
  font-size: clamp(1.04rem, 1.6vw, 1.2rem);
  color: var(--tinta-corpo);
  margin: 40px 0 44px;
  max-width: 40rem;
`;

/**
 * A linha do que a Toka faz, no lugar onde antes ficavam os números da
 * casa. Ela existe porque o herói dizia para quem a Toka é, mas não o
 * que ela entrega: quem chega sem contexto lia a headline e não sabia se
 * isto era agência, software ou consultoria.
 *
 * É lista de verdade, não texto com separador digitado: o ponto médio
 * entre os itens vem do CSS, então o leitor de tela ouve quatro itens e
 * não uma frase com bolinhas no meio.
 */
const Frentes = styled.ul`
  list-style: none;
  margin: clamp(56px, 8vw, 92px) 0 0;
  padding: 26px 0 0;
  border-top: 1px solid var(--linha);
  display: flex;
  flex-wrap: wrap;
  gap: 10px 0;

  li {
    font-family: "Poppins", sans-serif;
    font-size: 0.72rem;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
    display: flex;
    align-items: center;

    &::after {
      content: "·";
      margin: 0 18px;
      opacity: 0.6;
    }

    &:last-child::after {
      content: none;
    }
  }

  ${Media.PhoneLarge} {
    gap: 8px 0;

    li::after {
      margin: 0 12px;
    }
  }
`;

const Acoes = styled.div`
  display: flex;
  align-items: center;
  gap: 14px 30px;
  flex-wrap: wrap;

  .secundario {
    font-family: "Poppins", sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--tinta-corpo);
    background: none;
    border: none;
    padding: 4px 0;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: color 200ms ease;

    &::after {
      content: "";
      width: 26px;
      height: 1px;
      background: currentColor;
      transition: width 240ms ease;
    }

    &:hover {
      color: var(--tinta);

      &::after {
        width: 40px;
      }
    }
  }

  ${Media.PhoneLarge} {
    width: 100%;

    .secundario {
      margin: 2px auto 0;
    }
  }
`;

const FRENTES = [
  "Terceirização comercial",
  "Geração de demanda",
  "Estruturação e gestão",
  "Marketing",
];

export default function Hero({ aoClicar, aoVerMetodo }) {
  const menosMovimento = useMenosMovimento();
  const linhasRef = useRef([]);
  const aberturaRef = useRef(null);
  const acaoRef = useRef(null);
  const frentesRef = useRef(null);
  const arteRef = useRef(null);

  const escopo = useContextoGsap(() => {
    if (menosMovimento) return;

    const tl = gsap.timeline({ defaults: { ease: EASE } });

    tl.from(linhasRef.current.filter(Boolean), {
      yPercent: 106,
      duration: 1.05,
      stagger: 0.11,
    })
      .from(aberturaRef.current, { opacity: 0, y: 16, duration: 0.75 }, "-=0.5")
      .from(acaoRef.current, { opacity: 0, y: 14, duration: 0.65 }, "-=0.45")
      .from(frentesRef.current, { opacity: 0, y: 12, duration: 0.6 }, "-=0.35");

    // O ciclo entra num fade calmo e passa a girar sozinho. O giro roda
    // em `repeat: -1`, fora da timeline de entrada, senão pararia junto
    // com ela.
    if (arteRef.current) {
      tl.from(arteRef.current, { opacity: 0, duration: 1.1 }, 0.4);

      const horario = arteRef.current.querySelector('[data-gira="horario"]');
      const antihorario = arteRef.current.querySelector('[data-gira="antihorario"]');
      if (horario) {
        gsap.to(horario, { rotation: 360, duration: 48, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      }
      if (antihorario) {
        gsap.to(antihorario, { rotation: -360, duration: 72, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      }
    }
  }, [menosMovimento]);

  return (
    <Section className="faixa-clara" ref={escopo} style={{ paddingTop: 0 }}>
      <Faixa>
        <Inner>
          <Topo>
            <img src={logoToka} alt="Toka" />
            <nav>
              <a href="#metodo">Método</a>
              <a href="#resultados">Resultados</a>
              <a href="#comeco">Como começa</a>
            </nav>
          </Topo>
        </Inner>
      </Faixa>

      <Inner>
        <ArteHeroi ref={arteRef}>
          <CicloFrentes />
        </ArteHeroi>

        <Corpo>
          <H1>
            <Mascara>
              <span ref={(el) => (linhasRef.current[0] = el)}>
                Existimos para médicos
              </span>
            </Mascara>
            <Mascara>
              <span ref={(el) => (linhasRef.current[1] = el)}>
                que querem crescer sem
              </span>
            </Mascara>
            <Mascara>
              <span ref={(el) => (linhasRef.current[2] = el)}>
                deixar de ser <em>médicos</em>.
              </span>
            </Mascara>
          </H1>

          <Abertura ref={aberturaRef}>
            A Toka constrói a operação comercial que leva o paciente certo até
            a sua sala.
          </Abertura>

          <Acoes ref={acaoRef}>
            <Cta type="button" $tom="tinta" onClick={aoClicar}>
              Diagnosticar minha operação
              <Seta />
            </Cta>
            <button type="button" className="secundario" onClick={aoVerMetodo}>
              Ver o método
            </button>
          </Acoes>

          <Frentes ref={frentesRef}>
            {FRENTES.map((frente) => (
              <li key={frente}>{frente}</li>
            ))}
          </Frentes>
        </Corpo>

      </Inner>
    </Section>
  );
}
