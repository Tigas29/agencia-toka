import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { buscarProtocolo } from "../dados";
import { iniciarClarity } from "../checkout";
import { buscarDemo } from "./dados-demo";
import Conversa from "./conversa";

/**
 * Demo do low ticket Protocolo de Proposta: /protocolo/:nicho/demo.
 * A pessoa chega por link no chat (DM, WhatsApp) antes do checkout e monta a
 * propria proposta numa conversa: nome, caso, valor, cor, e a proposta chega
 * como arquivo (visualizador + PDF com marca d'agua) seguida de um guia de
 * fechamento simulado. O estado vive so em memoria: nada vai para
 * localStorage e nada e enviado.
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

  return <Conversa d={d} demo={demo} />;
}
