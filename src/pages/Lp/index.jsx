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

export default function LandingPage() {
  return (
    <>
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
    </>
  );
}
