import { useCallback, useEffect } from "react";
import { Emenda, Page, Tokens } from "../../estilo/ds";
import { linkDiagnostico } from "../inicio/contato";
import { capturarUtm, track } from "../habitat/lead";
import {
  ScrollTrigger,
  useMenosMovimento,
  useRolagemSuave,
} from "../habitat/animacao";

import Preloader from "../inicio/Preloader";

/* As quatro dobras que a v2 reescreve. */
import Hero from "./secoes/01.Hero";
import Teses from "./secoes/02.Teses";
import Framework from "./secoes/03.Framework";
import Entregas from "./secoes/05.Entregas";

/* As seis que continuam valendo palavra por palavra vêm de `inicio/` por
   importação, e não por cópia. Duplicá-las custaria mil e quinhentas
   linhas e criaria duas verdades para o mesmo texto: a correção feita em
   uma delas não apareceria na outra, e ninguém lembraria disso daqui a
   duas semanas. Se alguma precisar mudar na v2, aí sim ela ganha versão
   própria aqui — uma de cada vez, e por um motivo escrito. */
import Metodo from "../inicio/secoes/04.Metodo";
import Comparativo from "../inicio/secoes/06.Comparativo";
import Jornada from "../inicio/secoes/06.Jornada";
import Prova from "../inicio/secoes/07.Prova";
import Tecnologia from "../inicio/secoes/08.Tecnologia";
import Passos from "../inicio/secoes/10.Passos";
import Fechamento from "../inicio/secoes/09.Cta";

/**
 * Home v2, servida em `/v2` enquanto a de `/` segue no ar.
 *
 * A v2 existe porque a fundação de marca mudou: a página passa a abrir
 * por "um bom médico precisa de uma empresa à altura" e a organizar tudo
 * pelos três momentos em que o paciente decide (ser encontrado, ser
 * entendido, ser escolhido), em vez de por lista de serviços.
 *
 * Quatro dobras foram reescritas e seis vieram intactas. O arco de cor
 * da página é o mesmo e nenhum token do design system foi tocado: o que
 * muda aqui é o que se diz e em que ordem, não como se parece.
 *
 * Vive em rota separada de propósito. Um push em `main` sobe direto para
 * a Vercel, e a home em `/` tem tráfego: com as duas no ar dá para ler
 * uma ao lado da outra antes de trocar.
 */

export default function PaginaInicioV2() {
  const menosMovimento = useMenosMovimento();

  // A UTM é lida no primeiro render, e não na hora do clique: quem chega
  // de anúncio e navega dentro da página perderia os parâmetros se a
  // leitura ficasse para depois.
  useEffect(() => {
    capturarUtm();
    track("ViewContent", { content_name: "home-institucional-v2" });
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
    track("Contact", { content_name: "home-v2-diagnostico" });
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
        <Framework />
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
