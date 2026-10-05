import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { buscarProtocolo } from "../dados";
import { iniciarClarity } from "../checkout";
import { buscarDemo } from "./dados-demo";
import Tour from "./tour";

/**
 * Demo do low ticket Protocolo de Proposta: /protocolo/:nicho/demo.
 * A pessoa chega por link no chat (DM, WhatsApp) antes do checkout e percorre
 * um tour guiado de 5 passos: cada passo mostra uma parte da proposta, diz por
 * que ela ajuda a paciente a decidir e deixa a profissional personalizar ali.
 * O estado vive so em memoria: nada vai para localStorage e nada e enviado.
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

  return <Tour d={d} demo={demo} />;
}
