import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { H2, Inner, Lead, Media, Section, Selo } from "../style";
import { FunilMetodo } from "../grafismos";
import { gsap, useContextoGsap, useMenosMovimento } from "../../habitat/animacao";

/**
 * A peça central da página: o método.
 *
 * As iniciais das quatro fases soletram **F.O.C.O.**, e isso não é um
 * acróstico inventado para o site: é como a /habitat já nomeia as fases
 * (`secoes/05.Foco.jsx`, campo `letra`). A lista existe para deixar o
 * nome visível sem precisar dizê-lo, e é por isso que a inicial é a
 * coisa maior de cada linha.
 *
 * O desenho carrega o argumento: não é uma grade de quatro cartões
 * iguais, que diria "escolha um". É uma ORDEM, e a ordem é o método,
 * porque anúncio antes de posicionamento é verba comprando a percepção
 * errada.
 *
 * A fase ativa muda por quatro caminhos, e todos precisam existir. A
 * rolagem conduz quem só desce a página. O ponteiro abre a fase sem
 * exigir clique, que é como a maioria explora uma lista assim. O clique
 * e o foco de teclado atendem quem usa toque e quem navega por Tab.
 *
 * Depois de qualquer interação a rolagem fica travada por 2,5s: sem
 * isso, a fase que a pessoa acabou de abrir seria roubada de volta pelo
 * `scrub` no primeiro movimento de scroll.
 */

const FASES = [
  {
    letra: "F",
    numero: "01",
    nome: "Fundação",
    resumo: "Antes do primeiro real em anúncio.",
    texto:
      "Posicionamento, oferta e marca, até a sua proposta ficar difícil de comparar.",
  },
  {
    letra: "O",
    numero: "02",
    nome: "Origem",
    resumo: "A verba concentrada em um alvo.",
    texto:
      "Um procedimento por vez, e um criativo que nomeia o sintoma que o paciente sente.",
  },
  {
    letra: "C",
    numero: "03",
    nome: "Conversão",
    resumo: "Onde quase toda clínica perde o que já gastou.",
    texto:
      "Cada paciente que chega fica registrado, com responsável e etapa, e a IA responde em segundos.",
  },
  {
    letra: "O",
    numero: "04",
    nome: "Operação",
    resumo: "A decisão deixa de ser opinião.",
    texto:
      "O painel mostra o custo por procedimento realizado. A verba segue o dado.",
  },
];

/**
 * A linha que avisa que a lista responde ao clique.
 *
 * Sem ela, quem não passa o mouse nem rola até o fim lê as quatro fases
 * como rótulos mortos e nunca vê o que há dentro de três delas. O texto
 * some para quem chega pelo toque, onde não existe "passar o mouse" e a
 * própria lista já convida a tocar.
 */
const Instrucao = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.76rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: var(--tinta-fraca);
  margin: 22px 0 0;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "";
    width: 18px;
    height: 1px;
    background: var(--acento);
  }
`;

const Palco = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 0 80px;
  margin-top: 72px;
  align-items: start;

  ${Media.Tablet} {
    grid-template-columns: 1fr;
    gap: 44px;
  }
`;

const Lista = styled.div`
  border-top: 1px solid var(--linha);
`;

const Linha = styled.button`
  display: grid;
  grid-template-columns: 92px 1fr auto auto;
  align-items: center;
  gap: 0 8px;
  width: 100%;
  padding: 26px 0;
  border: none;
  border-bottom: 1px solid var(--linha);
  background: none;
  text-align: left;
  cursor: pointer;
  color: inherit;

  .letra {
    font-family: "EB Garamond", Georgia, serif;
    font-size: 3.4rem;
    font-weight: 400;
    line-height: 0.9;
    color: var(--tinta-fraca);
    opacity: 0.34;
    transition: opacity 420ms ease, color 420ms ease;
  }

  .nome {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.7rem, 2.6vw, 2.15rem);
    font-weight: 400;
    line-height: 1.15;
    color: var(--tinta-fraca);
    transition: color 420ms ease;
  }

  .numero {
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.16em;
    color: var(--tinta-fraca);
    opacity: 0.6;
    transition: opacity 420ms ease, color 420ms ease;
    padding-left: 20px;
  }

  /* A seta é o sinal de "esta é a que você está vendo". Ela existe em
     todas as linhas e só aparece na ativa e sob o ponteiro, então o
     espaço dela nunca muda e a lista não pula ao trocar de fase. */
  .seta {
    width: 22px;
    height: 1px;
    background: var(--acento);
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 300ms ease, transform 300ms ease;
  }

  &[data-ativa="true"] {
    .letra {
      opacity: 1;
      color: var(--acento);
    }

    .nome {
      color: var(--tinta);
    }

    .numero {
      opacity: 1;
      color: var(--acento);
    }

    .seta {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* O hover muda a linha inteira, não só a cor do nome: com uma mudança
     tão pequena, quem passa o mouse não percebe que aquilo responde. */
  &:hover {
    .nome,
    .letra {
      color: var(--tinta);
      opacity: 1;
    }

    .seta {
      opacity: 0.55;
      transform: translateX(0);
    }
  }

  &:focus-visible {
    outline: 1px solid var(--tinta);
    outline-offset: 3px;
  }

  ${Media.PhoneLarge} {
    grid-template-columns: 60px 1fr auto;
    padding: 20px 0;

    .letra {
      font-size: 2.5rem;
    }

    .seta {
      display: none;
    }
  }
`;

const Painel = styled.div`
  border-top: 1px solid var(--linha);
  padding-top: 26px;
  /* Trava a altura mínima no maior texto da lista: sem isso, trocar de
     fase encolhe o painel e empurra a página para cima debaixo do dedo
     de quem está lendo. */
  min-height: 240px;

  /* Grudado, como na referência: a lista rola ao lado e o painel fica
     parado no campo de visão, então a troca de fase acontece onde o olho
     já está. Sem isso, a fase 04 acende com o painel fora da tela.
     Depende de nenhum ancestral ter overflow diferente de "visible" no
     eixo vertical, e é por isso que a Page usa overflow-x: clip. */
  position: sticky;
  top: 22vh;

  .rotulo {
    font-family: "Poppins", sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--acento);
    margin: 0 0 20px;
  }

  .resumo {
    font-family: "EB Garamond", Georgia, serif;
    font-size: clamp(1.35rem, 2vw, 1.62rem);
    font-weight: 400;
    font-style: italic;
    line-height: 1.28;
    color: var(--tinta);
    margin: 0 0 18px;
  }

  .texto {
    font-size: 1rem;
    line-height: 1.62;
    color: var(--tinta-fraca);
    margin: 0;
  }

  /* O funil fecha o painel, e é ele que carrega a explicação visual do
     método inteiro. A faixa acesa acompanha a fase ativa da lista. */
  .arte {
    margin-top: 30px;
    color: var(--tinta-corpo);

    svg {
      width: 100%;
      max-width: 400px;
      height: auto;
    }
  }

  ${Media.Tablet} {
    min-height: 0;
    position: static;

    .arte {
      margin-top: 24px;
    }
  }

  ${Media.PhoneLarge} {
    .arte svg {
      max-width: 100%;
    }
  }
`;

export default function Metodo() {
  const menosMovimento = useMenosMovimento();
  const listaRef = useRef(null);
  const painelRef = useRef(null);
  const [ativa, setAtiva] = useState(0);
  const ultima = useRef(0);
  // Enquanto a pessoa está navegando no clique, a rolagem não pode
  // roubar a fase de volta. O bloqueio se solta sozinho.
  const travadoAte = useRef(0);

  const escolher = useCallback((i) => {
    travadoAte.current = performance.now() + 2500;
    ultima.current = i;
    setAtiva(i);
  }, []);

  /**
   * O retorno do `useContextoGsap` PRECISA ser preso a um elemento.
   *
   * O hook só executa quando `escopo.current` existe, e este `escopo`
   * tinha ficado sem `ref` numa refatoração anterior: o efeito nunca
   * rodava, e a fase ativa parava para sempre na Fundação por mais que a
   * pessoa rolasse. Só o clique e o ponteiro funcionavam, o que escondia
   * o defeito de quem testa mexendo no mouse.
   */
  const escopo = useContextoGsap(() => {
    // O funil se escreve uma vez, quando a dobra encosta na tela. Sem
    // `scrub`: o desenho precisa terminar mesmo se a pessoa rolar rápido,
    // e meio funil não comunica nada.
    const tracos = [
      ...(painelRef.current?.querySelectorAll("[data-traco]") ?? []),
    ];

    if (menosMovimento) {
      gsap.set(tracos, { strokeDasharray: "none", strokeDashoffset: 0 });
    } else {
      tracos.forEach((el, i) => {
        const tamanho = el.getTotalLength ? el.getTotalLength() : 500;
        gsap.fromTo(
          el,
          { strokeDasharray: tamanho, strokeDashoffset: tamanho },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: painelRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }

    if (menosMovimento || !listaRef.current) return;

    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: listaRef.current,
          start: "top 68%",
          end: "bottom 55%",
          scrub: 0.5,
          onUpdate: (self) => {
            if (performance.now() < travadoAte.current) return;
            const i = Math.min(
              FASES.length - 1,
              Math.floor(self.progress * FASES.length)
            );
            if (i === ultima.current) return;
            ultima.current = i;
            setAtiva(i);
          },
        },
      }
    );
  }, [menosMovimento]);

  // A troca do painel é um fade curto, e ele roda no conteúdo já
  // atualizado: animar a saída obrigaria a segurar o texto antigo em
  // estado, e o ganho não paga a complexidade.
  useEffect(() => {
    if (!painelRef.current) return undefined;

    /**
     * `useMenosMovimento` responde `false` no primeiro render e só vira
     * `true` no efeito seguinte. Sem a linha abaixo, o tween disparava
     * nesse primeiro render, o `cleanup` o matava no meio quando a
     * preferência chegava, e o painel ficava **congelado em opacidade
     * 0.42** para quem pediu menos movimento. Um `return` seco não
     * bastava: quem some com o movimento tem de receber o estado final,
     * não o quadro em que a animação foi interrompida.
     */
    if (menosMovimento) {
      gsap.set(painelRef.current, { opacity: 1, y: 0, clearProps: "all" });
      return undefined;
    }

    const tween = gsap.fromTo(
      painelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" }
    );
    return () => tween.kill();
  }, [ativa, menosMovimento]);

  const fase = FASES[ativa];

  return (
    <Section id="metodo" className="faixa-clara" ref={escopo}>
      <Inner>
        <Selo>O método</Selo>
        <H2>
          Método não é passo a passo. É a forma como a operação{" "}
          <em>aprende a crescer</em>.
        </H2>
        <Lead>
          Paramos de improvisar quando a decisão passou a sair do dado. A ordem
          abaixo é o que torna isso possível.
        </Lead>
        <Instrucao>Passe o mouse ou toque em cada fase para ver o que acontece nela</Instrucao>

        <Palco>
          <Lista ref={listaRef}>
            {FASES.map((f, i) => (
              <Linha
                key={f.nome}
                type="button"
                data-ativa={String(i === ativa)}
                aria-current={i === ativa ? "true" : undefined}
                onClick={() => escolher(i)}
                onFocus={() => escolher(i)}
                onMouseEnter={() => escolher(i)}
              >
                <span className="letra" aria-hidden="true">
                  {f.letra}
                </span>
                <span className="nome">{f.nome}</span>
                <span className="seta" aria-hidden="true" />
                <span className="numero">{f.numero}</span>
              </Linha>
            ))}
          </Lista>

          <Painel ref={painelRef} aria-live="polite">
            <p className="rotulo">
              {fase.numero} · {fase.nome}
            </p>
            <p className="resumo">{fase.resumo}</p>
            <p className="texto">{fase.texto}</p>
            <div className="arte">
              <FunilMetodo ativa={ativa} />
            </div>
          </Painel>
        </Palco>
      </Inner>
    </Section>
  );
}
