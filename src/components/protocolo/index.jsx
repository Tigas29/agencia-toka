import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Inner, Lead, Microcopy, Page, Tokens } from "../../estilo/ds";
import logoToka from "../../assets/landingpage/logo.svg";
import mockupFisio from "../../assets/protocolo/mockup-fisio.webp";
import mockupEstetica from "../../assets/protocolo/mockup-estetica.webp";
import mockupPilates from "../../assets/protocolo/mockup-pilates.webp";
import { buscarProtocolo } from "./dados";
import { cliqueComprar, linkCheckout } from "./checkout";
import { SecaoAutoridade, SecaoPecas } from "./secoes";
import {
  Barra,
  Bloco,
  Botao,
  Duvidas,
  Garantia,
  HeroGrade,
  Kicker,
  Mockup,
  Preco,
  Titulo1,
  Titulo2,
  Topo,
} from "./style";

/**
 * Landing curta entre o anuncio e o checkout da Hubla (low ticket
 * Protocolo de Proposta, R$ 27). Uma rota, tres nichos: o que muda de um
 * para o outro mora em dados.js.
 *
 * Sem animacao de entrada de proposito: a pessoa vem de um clique de
 * anuncio no celular e precisa ver o documento na hora.
 */

const MOCKUPS = { fisio: mockupFisio, estetica: mockupEstetica, pilates: mockupPilates };

function definirMeta(nome, conteudo) {
  let el = document.head.querySelector(`meta[name="${nome}"]`);
  const criado = !el;
  if (criado) {
    el = document.createElement("meta");
    el.name = nome;
    document.head.appendChild(el);
  }
  const anterior = el.content;
  el.content = conteudo;
  return () => (criado ? el.remove() : (el.content = anterior));
}

function Selo7() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="Garantia de 7 dias">
      <circle cx="32" cy="32" r="30" fill="none" stroke="var(--acento)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="var(--acento)" strokeWidth="0.75" />
      <text x="32" y="36" textAnchor="middle" fontFamily="EB Garamond, Georgia, serif" fontSize="26" fill="var(--tinta)">7</text>
      <text x="32" y="47" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="7" letterSpacing="1.4" fill="var(--acento)">DIAS</text>
    </svg>
  );
}

export default function PaginaProtocolo() {
  const { nicho } = useParams();
  const d = buscarProtocolo(nicho);
  const heroRef = useRef(null);
  const finalRef = useRef(null);
  const [barra, setBarra] = useState(false);

  const href = useMemo(() => (d ? linkCheckout(d.checkout, d.slug) : ""), [d]);

  useEffect(() => {
    if (!d) return;
    const anterior = document.title;
    document.title = d.seo.title;
    const desfaz = definirMeta("description", d.seo.description);
    return () => {
      document.title = anterior;
      desfaz();
    };
  }, [d]);

  /* A barra aparece quando o hero sai por cima e some quando o bloco
     final (que ja tem botao) entra na tela. */
  useEffect(() => {
    if (!d) return;
    const estado = { hero: true, final: false };
    const atualiza = () => setBarra(!estado.hero && !estado.final);
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.target === heroRef.current) estado.hero = e.isIntersecting || e.boundingClientRect.top > 0;
        if (e.target === finalRef.current) estado.final = e.isIntersecting;
      });
      atualiza();
    });
    obs.observe(heroRef.current);
    obs.observe(finalRef.current);
    return () => obs.disconnect();
  }, [d]);

  if (!d) return <Navigate to="/" replace />;

  /* Modificadores (ctrl, cmd, botao do meio) seguem o comportamento
     nativo. No clique normal o evento sai antes da navegacao: sem a
     pequena espera o navegador pode cancelar o envio ao Pixel. */
  const aoClicar = (e) => {
    cliqueComprar(d.slug);
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setTimeout(() => window.location.assign(href), 180);
  };

  const botao = (extra = {}) => (
    <Botao href={href} onClick={aoClicar}>
      {extra.children || d.hero.cta}
    </Botao>
  );

  return (
    <>
      <Tokens />
      <Page className="toka">
        <Topo className="faixa-escura">
          <Inner>
            <img src={logoToka} alt="Toka" />
          </Inner>
        </Topo>

        <Bloco as="header" ref={heroRef} className="faixa-clara" style={{ paddingTop: 40 }}>
          <Inner>
            <HeroGrade>
              <div>
                <Kicker>{d.hero.kicker}</Kicker>
                <Titulo1>{d.hero.titulo}</Titulo1>
                <Lead>{d.hero.sub}</Lead>
              </div>
              <Mockup
                src={MOCKUPS[d.slug]}
                width="1200"
                height="900"
                alt="Proposta de 4 páginas: a página O seu plano, com três opções, ao lado da mesma proposta aberta no celular"
                fetchPriority="high"
              />
              <div>
                <Preco>
                  <span className="de">De {d.hero.precoDe}</span>
                  <span className="por">{d.hero.precoPor}</span>
                </Preco>
                {botao()}
                <Microcopy>{d.hero.micro}</Microcopy>
              </div>
            </HeroGrade>
          </Inner>
        </Bloco>

        <Bloco className="faixa-escura">
          <Inner>
            <Titulo2>{d.cena.titulo}</Titulo2>
            <Lead>{d.cena.texto}</Lead>
          </Inner>
        </Bloco>

        <SecaoPecas d={{ ...d, botaoPilha: botao({ children: d.pilha.cta }) }} />

        <SecaoAutoridade d={d} />

        <Bloco className="faixa-clara">
          <Inner>
            <Garantia style={{ marginTop: 0, paddingTop: 0, borderTop: 0 }}>
              <Selo7 />
              <p>{d.garantia}</p>
            </Garantia>
          </Inner>
        </Bloco>

        <Bloco className="faixa-escura">
          <Inner>
            <Titulo2>Perguntas</Titulo2>
            <Duvidas>
              {d.faq.map((f) => (
                <details key={f.p}>
                  <summary>{f.p}</summary>
                  <p>{f.r}</p>
                </details>
              ))}
            </Duvidas>
          </Inner>
        </Bloco>

        <Bloco as="footer" ref={finalRef} className="faixa-clara">
          <Inner>
            <Titulo2>{d.final.titulo}</Titulo2>
            <div style={{ maxWidth: 420 }}>
              <Botao href={href} onClick={aoClicar} $tom="tinta">
                {d.final.cta}
              </Botao>
            </div>
            <Microcopy>{d.hero.micro}</Microcopy>
          </Inner>
        </Bloco>

        <Barra className={`faixa-escura${barra ? " visivel" : ""}`} aria-hidden={!barra}>
          <span className="valor">{d.hero.precoPor}</span>
          <Botao href={href} onClick={aoClicar} tabIndex={barra ? 0 : -1}>
            {d.hero.cta}
          </Botao>
        </Barra>
      </Page>
    </>
  );
}
