// import styled as * from "./style.js"
import Footer from "../../components/GLOBAL/footer/index.jsx";
import Header from "../../components/GLOBAL/header/index.jsx";
import Banner from "../../components/home/banner/index.jsx";
import Contact from "../../components/home/contact/index.jsx";
import Doing from "../../components/home/doing/index.jsx";
import Faq from "../../components/home/faq/index.jsx";
import ForWho from "../../components/home/forWho/index.jsx";
import Habitat from "../../components/home/habitatEstrategico/index.jsx";
import WhowWorks from "../../components/home/howWorks/index.jsx";
import Who from "../../components/home/whoWeAre/index.jsx";
import * as Styled from "./style.js";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Who />
      <Doing />
      <Habitat />
      <Contact />
      <WhowWorks />
      <ForWho />
      <Faq />
      <Footer />
    </>
  );
}
