import { useRef } from "react";
import styled from "styled-components";
import { H2, SectionTela, Texto } from "../../../estilo/ds";
import { Inner, Media } from "../style";
import fotoLuis from "../../../assets/habitat/dr-luis-felipe.webp";
import {
  EASE,
  gsap,
  useContextoGsap,
  useMenosMovimento,
} from "../animacao";

/**
 * Dobra 5 (arquivo `06.Prova.jsx`). Prova. Tom deliberadamente factual,
 * sem exclamação: em B2B de alto ticket, número seco convence mais que
 * entusiasmo. Os três números do placar contam a partir de zero quando
 * entram na tela — é a única concessão a "entusiasmo" que a seção se dá.
 *
 * ─────────────────────────────────────────────────────────────────────
 * COM_NOME controla as duas versões do estudo de caso.
 *
 *   true  → cita Dr. Luís Felipe pelo nome. Exige autorização dele por
 *           escrito, porque é cliente real num anúncio pago.
 *   false → versão anonimizada, sem valor absoluto de faturamento. É o
 *           plano B se a conta de anúncios levar reprova por promessa de
 *           renda: o Meta analisa a página de destino, não só o criativo.
 *
 * Trocar uma linha muda a página inteira. Não duplicar seção.
 * ─────────────────────────────────────────────────────────────────────
 */
const COM_NOME = true;

const CASE = COM_NOME
  ? {
      nome: "Dr. Luís Felipe",
      arroba: "@drluisfelipebortolan",
      especialidade: "Oftalmologia · blefaroplastia",
      foto: fotoLuis,
      saltos: [
        { de: "20 mil", para: "130 mil", oque: "seguidores" },
        { de: "R$ 20 mil", para: "R$ 300 mil", oque: "por mês, recorrente" },
      ],
      linhas: [
        "R$ 20 mil por mês em anúncio, concentrados em um procedimento só",
        "Menos de seis meses entre o começo e o faturamento recorrente",
        "Parou de depender de hospital e de clínica parceira",
      ],
    }
  : {
      nome: "Um oftalmologista",
      arroba: null,
      especialidade: "Blefaroplastia · interior de São Paulo",
      foto: null,
      saltos: [
        { de: "20 mil", para: "130 mil", oque: "seguidores" },
        { de: "1x", para: "15x", oque: "o faturamento de antes" },
      ],
      linhas: [
        "Verba mensal concentrada num procedimento só, sem dispersar",
        "Menos de seis meses entre o começo e o faturamento recorrente",
        "Parou de depender de hospital e de clínica parceira",
      ],
    };

/**
 * `alvo` é o número que conta. `prefixo`/`sufixo` ficam de fora da
 * contagem — ninguém precisa ver "R$ 0,3 milhões" no meio do caminho.
 */
const NUMEROS = [
  { alvo: 5, prefixo: "", sufixo: " anos", nota: "atuando só no ramo da medicina" },
  {
    alvo: 6,
    prefixo: "R$ ",
    sufixo: " milhões",
    nota: "em mídia gerenciada",
  },
  {
    alvo: 17,
    prefixo: "R$ ",
    sufixo: " milhões",
    nota: "em faturamento gerado para parceiros",
  },
];

/**
 * Sem faixa nem borda: o fundo contínuo da página atravessa aqui.
 *
 * A altura extra não é enfeite. São doze peças a revelar nesta dobra
 * (título, texto, três números e sete pedaços do case), e numa tela só
 * a revelação não cabia: a pessoa chegava ao fim da seção com metade do
 * estudo de caso ainda por aparecer, e a dobra seguinte já entrando.
 */
const Faixa = styled(SectionTela)`
  position: relative;
  min-height: 145dvh;

  ${Media.TabletSmall} {
    min-height: 0;
  }
`;

const Placar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin: 44px 0 var(--respiro-curto);

  ${Media.TabletSmall} {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;

const Numero = styled.div`
  border-left: 2px solid var(--acento);
  padding-left: 20px;

  strong {
    display: block;
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.7rem, 3vw, 2.3rem);
    font-weight: 500;
    color: var(--tinta);
    line-height: 1.12;
    letter-spacing: -0.01em;
    /* A Garamond traz algarismo old-style por padrão, em que o 1 tem
       altura de minúscula e o 3 desce da linha de base: num placar isso
       vira letra e o número deixa de ser lido como número. */
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: "lnum" 1;
  }

  span {
    display: block;
    margin-top: 6px;
    font-size: 0.9rem;
    color: var(--tinta-fraca);
  }
`;

const Case = styled.div`
  border: 1px solid var(--acento-borda);
  border-radius: 16px;
  padding: 40px;
  background: var(--acento-veu);
  display: grid;
  grid-template-columns: 168px 1fr;
  gap: 40px;
  align-items: start;

  ${Media.TabletSmall} {
    grid-template-columns: 1fr;
    gap: 26px;
    justify-items: center;
    text-align: center;
  }

  ${Media.PhoneLarge} {
    padding: 28px 22px;
  }
`;

/**
 * O retrato já vem circular e com a borda dissolvida do arquivo, e o
 * fundo dele foi dessaturado para o navy da página. O anel dourado aqui
 * é o que costura a foto ao resto da identidade.
 */
const Retrato = styled.div`
  width: 168px;
  height: 168px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--acento-borda);
  box-shadow: 0 0 0 6px var(--acento-veu);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  ${Media.PhoneLarge} {
    width: 136px;
    height: 136px;
  }
`;

const Identidade = styled.div`
  margin-bottom: 26px;

  h3 {
    font-family: "Poppins", sans-serif;
    font-size: clamp(1.35rem, 2.4vw, 1.75rem);
    font-weight: 600;
    color: var(--tinta);
    margin: 0 0 6px;
    letter-spacing: -0.02em;
  }

  .arroba {
    font-size: 0.94rem;
    color: var(--acento);
    margin: 0 0 4px;
  }

  .especialidade {
    font-size: 0.9rem;
    color: var(--tinta-fraca);
    margin: 0;
  }
`;

/** O salto de antes para depois. É o número que faz o case funcionar. */
const Saltos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px 40px;
  margin-bottom: 26px;

  ${Media.TabletSmall} {
    justify-content: center;
  }

  .salto {
    .valores {
      display: flex;
      align-items: baseline;
      gap: 9px;
      font-family: "Poppins", sans-serif;
      line-height: 1.1;
    }

    .de {
      font-size: 1rem;
      color: var(--tinta-fraca);
      text-decoration: line-through;
      text-decoration-color: rgba(141, 147, 163, 0.5);
    }

    .seta {
      color: var(--acento);
      font-size: 0.9rem;
    }

    .para {
      font-size: clamp(1.5rem, 2.6vw, 2rem);
      font-weight: 600;
      color: var(--acento);
      letter-spacing: -0.02em;
    }

    .oque {
      display: block;
      margin-top: 5px;
      font-family: "Nunito Sans", sans-serif;
      font-size: 0.86rem;
      color: var(--tinta-fraca);
    }
  }
`;

const Linhas = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 11px;
  text-align: left;

  li {
    font-size: 0.98rem;
    color: var(--tinta-corpo);
    padding-left: 20px;
    position: relative;
    line-height: 1.45;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 9px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--acento);
    }
  }
`;

export default function Prova() {
  const menosMovimento = useMenosMovimento();
  const numerosRefs = useRef([]);
  const colunasRefs = useRef([]);
  const cabecaRefs = useRef([]);
  const caseRef = useRef(null);

  const escopo = useContextoGsap(() => {
    if (menosMovimento || !escopo.current) return;

    // Os três nascem no valor final na marcação, que é o que a página
    // mostra sem script nenhum. Assim que o script assume, zera os três:
    // sem isso, o segundo e o terceiro ficavam parados em "R$ 17 milhões"
    // até a rolagem chegar neles e só então voltavam a zero para contar,
    // um salto que entrega o truque.
    //
    // 🔑 Por `gsap.set`, e não por escrita direta em `textContent`: o
    // `ctx.revert()` deste contexto só desfaz o que o GSAP fez. Zerando
    // à mão, quem ligasse "reduzir movimento" com a página aberta ficava
    // com os três números presos em zero para sempre, porque o efeito
    // reexecuta, retorna cedo e nada restaura o texto.
    numerosRefs.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, {
          textContent: `${NUMEROS[i].prefixo}0${NUMEROS[i].sufixo}`,
        });
      }
    });

    // Uma timeline só, amarrada à rolagem da seção: título, parágrafo,
    // os três números um a um e o case linha por linha. Antes tudo
    // disparava junto ao entrar na tela e a pessoa parava de rolar para
    // ler; agora quem dita o ritmo é ela.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: escopo.current,
        // Termina junto com a seção, não depois dela: com o fim mais
        // adiante, as últimas peças do case só apareciam quando a dobra
        // seguinte já estava entrando na tela, e duas coisas dividiam a
        // atenção.
        start: "top 92%",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    cabecaRefs.current.filter(Boolean).forEach((el, i) => {
      tl.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, i * 0.5);
    });

    NUMEROS.forEach((num, i) => {
      const coluna = colunasRefs.current[i];
      const alvo = numerosRefs.current[i];
      if (!coluna || !alvo) return;

      const t = 1.1 + i * 0.7;

      tl.fromTo(coluna, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4 }, t);

      // A contagem de cada número dispara junto com a entrada da coluna
      // dele, não com a das três. Ver os três girando ao mesmo tempo era
      // ruído; um de cada vez é leitura.
      const contador = { valor: 0 };
      tl.to(
        contador,
        {
          valor: num.alvo,
          duration: 0.6,
          ease: EASE,
          onUpdate: () => {
            alvo.textContent = `${num.prefixo}${Math.round(contador.valor)}${num.sufixo}`;
          },
        },
        t
      );
    });

    if (caseRef.current) {
      const inicioCase = 1.1 + NUMEROS.length * 0.7 + 0.2;
      tl.fromTo(
        caseRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.4 },
        inicioCase
      ).fromTo(
        // Retrato, identidade, cada salto e cada linha, um por rolagem.
        [
          caseRef.current.querySelector("img"),
          caseRef.current.querySelector("h3"),
          ...caseRef.current.querySelectorAll(".salto"),
          ...caseRef.current.querySelectorAll("li"),
        ].filter(Boolean),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.4 },
        inicioCase + 0.2
      );
    }

  }, [menosMovimento]);

  const registrarCabeca = (i) => (el) => {
    cabecaRefs.current[i] = el;
  };

  return (
    <Faixa ref={escopo} className="faixa-clara">
      <Inner>

        <H2 ref={registrarCabeca(0)}>Cinco anos, um nicho&nbsp;só.</H2>
        <Texto ref={registrarCabeca(1)}>
          Não estamos testando no seu bolso. A Toka trabalha exclusivamente
          com medicina, e os números abaixo são de clínicas que já passaram
          por aqui.
        </Texto>

        <Placar>
          {NUMEROS.map((n, i) => (
            <Numero
              key={n.nota}
              ref={(el) => {
                colunasRefs.current[i] = el;
              }}
            >
              <strong
                ref={(el) => {
                  numerosRefs.current[i] = el;
                }}
              >
                {n.prefixo}
                {n.alvo}
                {n.sufixo}
              </strong>
              <span>{n.nota}</span>
            </Numero>
          ))}
        </Placar>

        <Case ref={caseRef}>
          {CASE.foto && (
            <Retrato>
              <img
                src={CASE.foto}
                alt={CASE.nome}
                width="168"
                height="168"
                loading="lazy"
              />
            </Retrato>
          )}

          <div>
            <Identidade>
              <h3>{CASE.nome}</h3>
              {CASE.arroba && (
                <p className="arroba">
                  <a
                    href={`https://instagram.com/${CASE.arroba.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {CASE.arroba}
                  </a>
                </p>
              )}
              <p className="especialidade">{CASE.especialidade}</p>
            </Identidade>

            <Saltos>
              {CASE.saltos.map((s) => (
                <div className="salto" key={s.oque}>
                  <div className="valores">
                    <span className="de">{s.de}</span>
                    <span className="seta" aria-hidden="true">
                      →
                    </span>
                    <span className="para">{s.para}</span>
                  </div>
                  <span className="oque">{s.oque}</span>
                </div>
              ))}
            </Saltos>

            <Linhas>
              {CASE.linhas.map((linha) => (
                <li key={linha}>{linha}</li>
              ))}
            </Linhas>
          </div>
        </Case>
      </Inner>
    </Faixa>
  );
}
