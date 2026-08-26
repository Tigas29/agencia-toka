import { useCallback, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Emenda, Page, Tokens } from "../../estilo/ds";
import { ScrollTrigger, useMenosMovimento, useRolagemSuave } from "../habitat/animacao";
import { track } from "../habitat/lead";
import { buscarProposta } from "./dados";
import { Coluna } from "./style";

import Capa from "./secoes/01.Capa";
import Culpa from "./secoes/02.Culpa";
import Domino from "./secoes/03.Domino";
import Entrega from "./secoes/04.Entrega";
import Preco from "./secoes/05.Preco";
import Conta from "./secoes/06.Conta";
import Indicacao from "./secoes/07.Indicacao";
import Risco from "./secoes/08.Risco";
import Passos from "./secoes/09.Passos";

/**
 * Rota de proposta, uma por cliente, endereçada por slug.
 *
 * Cada proposta é um objeto em `dados.js`. Não há nada de um cliente
 * específico neste arquivo, e é isso que faz a próxima proposta custar
 * um objeto em vez de uma página.
 *
 * A leitura é assíncrona: a pessoa abre um link recebido no WhatsApp e
 * lê sozinha, sem ninguém conduzindo. Por isso a ordem das dobras é a
 * de página de vendas de produto pago (emoção, lógica, medo, pedido) e
 * não a do deck de call, que depende de pausas e perguntas feitas em
 * voz alta.
 */

const Rodape = styled.footer`
  padding: 34px 0 52px;
  border-top: 1px solid var(--linha);
  background: var(--fundo);

  p {
    margin: 0;
    font-size: 0.8rem;
    color: var(--tinta-fraca);
  }
`;

export default function PaginaProposta() {
  const { cliente } = useParams();
  const dados = buscarProposta(cliente);
  const menosMovimento = useMenosMovimento();

  useRolagemSuave(menosMovimento);

  /**
   * Proposta é documento endereçado a uma pessoa, não conteúdo de site:
   * a rota sai do índice de busca. O `robots.txt` cobre o rastreador
   * bem comportado; esta meta cobre o caso de alguém chegar pelo link
   * direto e o buscador tentar indexar a URL que viu.
   */
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    if (!dados) return;
    const anterior = document.title;
    document.title = `Proposta ${dados.cliente.nome} | Toka`;
    track("ViewContent", { content_name: `proposta-${dados.slug}` });
    return () => {
      document.title = anterior;
    };
  }, [dados]);

  /**
   * Rede de segurança para a navegação SPA: cada dobra reverte o próprio
   * contexto do GSAP no unmount, e esta varredura pega o que escapar
   * (um recarregamento no meio de um HMR, uma seção que falhou ao
   * montar). Sem ela dá para sair da página com listener pendurado.
   */
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const rolarPara = useCallback((id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!dados) return <Navigate to="/" replace />;

  return (
    <>
      <Tokens />
      <Emenda />
      <Page className="toka">
        <Capa dados={dados} aoClicar={() => rolarPara("leitura")} />
        <Culpa dados={dados} />
        <Domino dados={dados} />
        <Entrega dados={dados} />
        <Preco dados={dados} />
        <Conta dados={dados} />
        <Indicacao dados={dados} />
        <Risco dados={dados} />
        <Passos dados={dados} />

        <Rodape className="faixa-escura">
          <Coluna>
            <p>
              Toka Company · Proposta para {dados.cliente.nome}. Documento
              particular, não é material de divulgação.
            </p>
          </Coluna>
        </Rodape>
      </Page>
    </>
  );
}
