// import styled as * from "./style.js"
import Header from "../../components/GLOBAL/header/index.jsx";
import Banner from "../../components/home/banner/index.jsx";
import * as Styled from "./style.js";

export default function Home() {
  return (
    <Styled.Container>
      <Header />
      <Banner />
    </Styled.Container>
  );
}
