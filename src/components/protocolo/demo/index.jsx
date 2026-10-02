import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Inner, Lead, Microcopy, Page, Tokens } from "../../../estilo/ds";
import logoToka from "../../../assets/landingpage/logo.svg";
import { buscarProtocolo } from "../dados";
import { cliqueComprar, eventoClarity, iniciarClarity, linkCheckout } from "../checkout";
import { IlustraMensagens } from "../ilustracoes";
import { Bloco, Botao, Kicker, Titulo1, Titulo2, Topo } from "../style";
import { ALEM_TITULO, buscarDemo } from "./dados-demo";
import { PROPOSTAS, estadoInicial } from "./proposta";
import { Folha1, Folha2, Folha3, Folha4 } from "./folhas";
import { Alem, Ferramentas, Folhas, Pagina } from "./style";

/**
 * Demo do low ticket Protocolo de Proposta: /protocolo/:nicho/demo.
 * A pessoa chega por link no chat (DM, WhatsApp) antes do checkout e abre
 * a proposta de verdade, trocando os campos marcados pelos dela. O estado
 * vive so em memoria: nada vai para localStorage, nada e enviado, e nao
 * ha download nem impressao.
 *
 * Nenhum InitiateCheckout aqui: a campanha otimiza por ele no checkout.
 */

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

export default function PaginaDemo() {
  const { nicho } = useParams();
  const d = buscarProtocolo(nicho);
  const demo = buscarDemo(nicho);
  if (!d || !demo) return <Navigate to="/" replace />;
  return <Demo key={nicho} d={d} demo={demo} />;
}

function Demo({ d, demo }) {
  const p = PROPOSTAS[d.slug];
  const inicial = useMemo(() => estadoInicial(d.slug), [d.slug]);
  const [e, setE] = useState(inicial);
  const editou = useRef(false);
  const mexido = useMemo(() => JSON.stringify(e) !== JSON.stringify(inicial), [e, inicial]);

  const href = useMemo(() => linkCheckout(d.checkout, d.slug, `demo-protocolo-${d.slug}`), [d]);

  useEffect(() => {
    iniciarClarity(d.slug, "demo");
  }, [d.slug]);

  useEffect(() => {
    const anterior = document.title;
    document.title = demo.seo.title;
    const desfaz = definirMeta("description", demo.og.description);
    return () => {
      document.title = anterior;
      desfaz();
    };
  }, [demo]);

  /* O primeiro toque que muda alguma coisa vira um evento so. */
  const avisaEdicao = () => {
    if (editou.current) return;
    editou.current = true;
    eventoClarity("demo_editou");
  };

  const mudar = (parte) => {
    avisaEdicao();
    setE((atual) => ({ ...atual, ...parte }));
  };

  const mudarLista = (campo, i, valor) => {
    avisaEdicao();
    setE((atual) => ({ ...atual, [campo]: atual[campo].map((v, j) => (j === i ? valor : v)) }));
  };

  const aoClicar = (ev) => {
    cliqueComprar(d.slug, "demo");
    if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button !== 0) return;
    ev.preventDefault();
    setTimeout(() => window.location.assign(href), 180);
  };

  const conversa = d.recebe.pecas[2].conversa;

  return (
    <>
      <Tokens />
      <Page className="toka">
        <Topo className="faixa-escura">
          <Inner>
            <img src={logoToka} alt="Toka" />
          </Inner>
        </Topo>

        <Bloco as="header" className="faixa-clara" style={{ paddingTop: 40, paddingBottom: 28 }}>
          <Inner>
            <Kicker>{demo.kicker}</Kicker>
            <Titulo1>{demo.titulo}</Titulo1>
            <Lead>{demo.sub}</Lead>
          </Inner>
        </Bloco>

        <Bloco as="main" className="faixa-clara" style={{ paddingTop: 0 }}>
          <Inner>
            <Folhas>
              <Ferramentas>
                <span className="dica">
                  <span className="amostra" aria-hidden="true" />
                  {demo.dica}
                </span>
                <button type="button" disabled={!mexido} onClick={() => setE(inicial)}>
                  {demo.reset}
                </button>
              </Ferramentas>

              {[
                <Folha1 key={1} p={p} e={e} mudar={mudar} />,
                <Folha2 key={2} p={p} e={e} />,
                <Folha3 key={3} p={p} e={e} mudar={mudar} mudarLista={mudarLista} />,
                <Folha4 key={4} p={p} e={e} />,
              ].map((folha, i) => (
                <Pagina key={i} aria-label={`Página ${i + 1} de 4`}>
                  <div className="legenda">
                    <span>Página {i + 1} de 4</span>
                    <span className="etiqueta">{demo.etiqueta}</span>
                  </div>
                  {folha}
                </Pagina>
              ))}
            </Folhas>
          </Inner>
        </Bloco>

        <Bloco className="faixa-escura">
          <Inner>
            <Kicker>{ALEM_TITULO}</Kicker>
            <Alem>
              <IlustraMensagens conversa={conversa} />
              <ol>
                {demo.alemDaProposta.map((t, i) => (
                  <li key={t}>
                    <span className="n">{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </Alem>
          </Inner>
        </Bloco>

        <Bloco as="footer" className="faixa-clara">
          <Inner>
            <Titulo2>{demo.final.titulo}</Titulo2>
            <div style={{ maxWidth: 420 }}>
              <Botao href={href} onClick={aoClicar} $tom="tinta">
                {demo.final.cta}
              </Botao>
            </div>
            <Microcopy>{demo.final.micro}</Microcopy>
          </Inner>
        </Bloco>
      </Page>
    </>
  );
}
