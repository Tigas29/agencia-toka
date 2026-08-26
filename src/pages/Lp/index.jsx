import { Emenda, Page, Tokens } from "../../estilo/ds";

import Banner from "../../components/Lp/01.Banner/index.jsx";
import MadeFor from "../../components/Lp/02.Madefor/index.jsx";
import TruthResults from "../../components/Lp/03.TruthResults/index.jsx";
import Execution from "../../components/Lp/04.Execution/index.jsx";
import WhyWorks from "../../components/Lp/05.WhyWorks/index.jsx";
import MethodResults from "../../components/Lp/06.MethodResults/index.jsx";
import ResultsCarousel from "../../components/Lp/07.ResultsCarousel/index.jsx";
import ImplementationSteps from "../../components/Lp/08.ImplementationSteps/index.jsx";
import Faq from "../../components/Lp/09.Faq/index.jsx";
import GrowthSection from "../../components/Lp/10.GrowthSection/index.jsx";

/**
 * Landing page do Habitat Estratégico.
 *
 * As dez seções e a copy são as mesmas de sempre; o que mudou foi a
 * casca, que era laranja com Inter e Nunito e agora é o design system do
 * site. O arco de cor segue a lógica da home: a página escurece quando
 * fala com a pessoa (a promessa, a prova, o convite) e clareia quando
 * fala de operação (o que é entregue, como funciona, em quanto tempo).
 */
export default function LandingPage() {
  return (
    <>
      <Tokens />
      <Emenda />
      <Page className="toka">
        <Banner />
        <MadeFor />
        <TruthResults />
        <Execution />
        <WhyWorks />
        <MethodResults />
        <ResultsCarousel />
        <ImplementationSteps />
        <Faq />
        <GrowthSection />
      </Page>
    </>
  );
}
