import { useRef } from "react";
import styled from "styled-components";
import logoToka from "../../../assets/homepage/logo-toka-branco.png";
import { Cta, Inner, Media, Onda, Section } from "../style";
import { OndaFundo, Seta } from "../grafismos";
import { EMAIL, INSTAGRAM, linkDiagnostico } from "../contato";
import { EASE, gsap, useContextoGsap, useMenosMovimento } from "../../habitat/animacao";

/**
 * O fecho e o rodapé, num bloco só.
 *
 * Eram duas peças: um convite centrado com botão no meio e, abaixo, uma
 * linha de rodapé com três links. Separados, o convite lia como banner
 * (a coisa que o olho aprendeu a pular) e o rodapé como sobra.
 *
 * Agora é uma faixa navy única: a frase ocupa a esquerda em corpo
 * grande, o convite vem logo abaixo dela, e o rodapé fecha a página com
 * a marca de um lado e os caminhos do outro. Alinhado à esquerda, não
 * centrado: depois de uma página inteira de dobras centradas, o fecho
 * alinhado é o que sinaliza "acabou o discurso, aqui é onde se resolve".
 */

const Bloco = styled(Section)`
  padding-bottom: 0;
`;

const Convite = styled.div`
  padding-bottom: clamp(70px, 9vw, 118px);

  h2 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(2.5rem, 5.6vw, 4.4rem);
    font-weight: 300;
    line-height: 1.05;
    letter-spacing: -0.005em;
    color: var(--tinta);
    margin: 0 0 30px;
    max-width: 15ch;

    em {
      font-style: normal;
      color: var(--acento);
    }
  }

  .convite {
    font-size: clamp(1rem, 1.5vw, 1.12rem);
    line-height: 1.62;
    color: var(--tinta-corpo);
    margin: 0 0 40px;
    max-width: 42ch;
  }

  .microcopy {
    font-family: "Poppins", sans-serif;
    font-size: 0.78rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: var(--tinta-fraca);
    margin: 18px 0 0;
  }

  ${Media.PhoneLarge} {
    h2 {
      max-width: 100%;
    }
  }
`;

/**
 * O rodapé nasce visível, e é o único bloco da página que não entra na
 * revelação por rolagem.
 *
 * Não é escolha estética: a revelação é amarrada ao `scrub`, e este é o
 * último bloco da página. Não existe rolagem depois dele para completar
 * o progresso do gatilho, então a última coluna (Contato, com WhatsApp,
 * Instagram e e-mail) ficava parada em **opacidade 0.07** e ninguém
 * conseguia ler os canais de contato. Medido, não suposto.
 */
const Rodape = styled.footer`
  border-top: 1px solid var(--linha);
  padding: 46px 0 52px;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) repeat(2, minmax(0, 1fr));
  gap: 40px;

  ${Media.Tablet} {
    grid-template-columns: 1fr 1fr;
    gap: 40px 30px;
  }

  ${Media.PhoneLarge} {
    grid-template-columns: 1fr;
    gap: 34px;
  }
`;

const Marca = styled.div`
  img {
    height: 26px;
    width: auto;
    margin-bottom: 16px;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--tinta-fraca);
    margin: 0;
    max-width: 30ch;
  }

  ${Media.Tablet} {
    grid-column: 1 / -1;
  }
`;

const Coluna = styled.nav`
  h3 {
    font-family: "Poppins", sans-serif;
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--tinta-fraca);
    margin: 0 0 20px;
  }

  a {
    display: block;
    font-size: 0.92rem;
    color: var(--tinta-corpo);
    margin-bottom: 13px;
    transition: color 200ms ease;

    &:hover {
      color: var(--tinta);
    }
  }
`;

const Assinatura = styled.p`
  grid-column: 1 / -1;
  margin: 22px 0 0;
  padding-top: 26px;
  border-top: 1px solid var(--linha);
  font-family: "Poppins", sans-serif;
  font-size: 0.74rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--tinta-fraca);
`;

const NAVEGAR = [
  { rotulo: "O que resolvemos", href: "#resolve" },
  { rotulo: "O método", href: "#metodo" },
  { rotulo: "O que entregamos", href: "#entregas" },
  { rotulo: "A jornada", href: "#jornada" },
];

export default function Fechamento({ aoClicar }) {
  const menosMovimento = useMenosMovimento();
  const pecas = useRef([]);

  /**
   * Este bloco NÃO usa a revelação por `scrub` do resto da página.
   *
   * O `scrub` amarra o progresso da animação ao progresso da rolagem, e
   * este é o último bloco: quando ele aparece, a página já acabou e não
   * sobra rolagem para levar o progresso até o fim. O resultado era o
   * fecho entrando pela metade e ficando assim, que foi exatamente o que
   * o Tiago viu ("não está rolando a animação quando eu finalizo a
   * página"). O mesmo já tinha acontecido com o rodapé.
   *
   * Aqui a entrada dispara UMA vez, quando o bloco encosta na tela, e
   * roda no próprio tempo até o fim, independente de quanto ainda dá
   * para rolar.
   */
  const escopo = useContextoGsap(() => {
    const alvos = pecas.current.filter(Boolean);
    if (!alvos.length) return;

    if (menosMovimento) {
      gsap.set(alvos, { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    gsap.from(alvos, {
      opacity: 0,
      y: 26,
      duration: 0.75,
      stagger: 0.12,
      ease: EASE,
      scrollTrigger: {
        trigger: escopo.current,
        start: "top 88%",
        once: true,
      },
    });
  }, [menosMovimento]);

  const guardar = (i) => (el) => (pecas.current[i] = el);

  return (
    <Bloco className="faixa-escura" ref={escopo}>
      <Onda>
        <OndaFundo />
      </Onda>

      <Inner>
        <Convite>
          <h2 ref={guardar(0)}>
            A sua técnica já existe. <em>Falta o mercado enxergar.</em>
          </h2>
          <p className="convite" ref={guardar(1)}>
            Quarenta minutos, gratuitos, sem compromisso. Se a Toka não for o
            caminho, você sai sabendo disso também.
          </p>
          <div ref={guardar(2)}>
            <Cta type="button" onClick={aoClicar}>
              Diagnosticar minha operação
              <Seta />
            </Cta>
            <p className="microcopy">
              Resposta no mesmo dia útil, direto com a equipe.
            </p>
          </div>
        </Convite>

        <Rodape>
          <Marca>
            <img src={logoToka} alt="Toka" />
            <p>Operação comercial para medicina de alto ticket.</p>
          </Marca>

          <Coluna>
            <h3>Navegar</h3>
            {NAVEGAR.map((item) => (
              <a key={item.href} href={item.href}>
                {item.rotulo}
              </a>
            ))}
          </Coluna>

          <Coluna>
            <h3>Contato</h3>
            <a href={linkDiagnostico()} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </Coluna>

          <Assinatura>Toka Company · Marketing Médico</Assinatura>
        </Rodape>
      </Inner>
    </Bloco>
  );
}
