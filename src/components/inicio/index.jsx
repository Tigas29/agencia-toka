import { useCallback, useEffect } from "react";
import { Emenda, Page, Tokens } from "../../estilo/ds";
import { linkDiagnostico } from "./contato";
import { capturarUtm, track } from "../habitat/lead";
import {
  ScrollTrigger,
  useMenosMovimento,
  useRolagemSuave,
} from "../habitat/animacao";

import Preloader from "./Preloader";
import Hero from "./secoes/01.Hero";
import Teses from "./secoes/02.Teses";
import Resolve from "./secoes/03.Resolve";
import Metodo from "./secoes/04.Metodo";
import Entregas from "./secoes/05.Entregas";
import Comparativo from "./secoes/06.Comparativo";
import Jornada from "./secoes/06.Jornada";
import Prova from "./secoes/07.Prova";
import Tecnologia from "./secoes/08.Tecnologia";
import Fechamento from "./secoes/09.Cta";
import Passos from "./secoes/10.Passos";

/**
 * Home institucional.
 *
 * O arco de cor é parte do argumento: tese e crença em navy, o trabalho
 * (o que fazemos, o método, o que ele gera) em papel claro, e o convite
 * de volta ao navy. A página clareia quando passa a falar de operação e
 * escurece quando volta a falar com a pessoa.
 *
 * Da /habitat vem só lógica: `animacao.js` (gsap/ScrollTrigger/Lenis) e
 * `lead.js`. O estilo é próprio, com tokens semânticos por faixa, porque
 * os componentes de lá têm cor fixa de página escura. O `:root` laranja
 * legado de `src/reset.css` continua intocado.
 */

export default function PaginaInicio() {
  const menosMovimento = useMenosMovimento();

  // A UTM é lida no primeiro render, e não na hora do clique: quem chega
  // de anúncio e navega dentro da página perderia os parâmetros se a
  // leitura ficasse para depois.
  useEffect(() => {
    capturarUtm();
    track("ViewContent", { content_name: "home-institucional" });
  }, []);

  useRolagemSuave(menosMovimento);

  // Rede de segurança da navegação SPA: cada seção limpa os próprios
  // ScrollTriggers no unmount, mas se algum escapar (HMR, seção que
  // falhou ao montar) ninguém sai da página com listener pendurado.
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const irParaWhatsApp = useCallback(() => {
    track("Contact", { content_name: "home-diagnostico" });
    window.open(linkDiagnostico(), "_blank", "noopener,noreferrer");
  }, []);

  const irParaMetodo = useCallback(() => {
    document
      .getElementById("metodo")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <Tokens />
      <Emenda />
      <Page className="toka">
        <Preloader />
        <Hero aoClicar={irParaWhatsApp} aoVerMetodo={irParaMetodo} />
        <Teses />
        <Resolve />
        <Metodo />
        <Entregas />
        <Comparativo />
        <Jornada />
        <Prova />
        <Tecnologia />
        <Passos />
        <Fechamento aoClicar={irParaWhatsApp} />

      </Page>
    </>
  );
}
