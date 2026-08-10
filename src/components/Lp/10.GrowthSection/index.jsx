import * as Styled from "./style";

import Button from "../button/index";
import TokaIcon from "../../../assets/landingpage/10.GrowthSection/LogoOrange.svg";
import Task from "../../../assets/landingpage/10.GrowthSection/task.svg";
import logoToka from "../../../assets/landingpage/logo.svg";

import Linkedin from "../../../assets/landingpage/10.GrowthSection/Linkedin.svg";
import Facebook from "../../../assets/landingpage/10.GrowthSection/Facebook.svg";
import Instagram from "../../../assets/landingpage/10.GrowthSection/Instagram.svg";
import WhatsApp from "../../../assets/landingpage/10.GrowthSection/WhatsApp.svg";
import Email from "../../../assets/landingpage/10.GrowthSection/Email.svg";

export default function GrowthSection() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Styled.Container>
      <div className="inner">
        <img src={TokaIcon} alt="Toka" className="iconTop" />

        <h2 className="title">
          Se você está
          <br />
          decidido a crescer,
          <br />
          agora é o momento
        </h2>

        <p className="smallGray">Vagas limitadas por acompanhamento.</p>

        <p className="bonusTitle">Para quem entrar agora, liberamos bônus:</p>

        <div className="grid">
          <div className="item">
            <img src={Task} alt="" /> Diagnóstico estratégico completo
          </div>
          <div className="item">
            <img src={Task} alt="" /> Script de atendimento para WhatsApp
          </div>
          <div className="item">
            <img src={Task} alt="" /> Calendário de conteúdo de 30 dias
          </div>
          <div className="item">
            <img src={Task} alt="" /> Auditoria comercial inicial
          </div>
          <div className="item">
            <img src={Task} alt="" /> Suporte próximo nas primeiras semanas
          </div>
        </div>

        <Button text="Quero entrar agora" showIcon={true} className="cta" />
      </div>

      <footer className="footer">
        <div className="footerTop">
          <div className="footerCol footerCol--brand">
            <img src={logoToka} alt="Toka" className="footerLogo" />

            <div className="footerSocial">
              <a
                href="https://www.linkedin.com/company/toka-marketing/"
                target="_blank"
              >
                <span className="socialIcon">
                  <img src={Linkedin} />
                </span>
              </a>
              <a href="https://www.instagram.com/toka.med/" target="_blank">
                <span className="socialIcon">
                  <img src={Instagram} />
                </span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61574134596655"
                target="_blank"
              >
                <span className="socialIcon">
                  <img src={Facebook} />
                </span>
              </a>
            </div>
          </div>

          <div className="footerCol">
            <h4 className="footerHeading">CONTATOS</h4>
            <p className="footerTextLine">
              <img src={WhatsApp} /> (11) 95682-9886
            </p>
            <p className="footerTextLine">
              <img src={Email} /> marketing@agenciatoka.com.br
            </p>
          </div>

          <div className="footerCol">
            <h4 className="footerHeading">MAPA DO SITE</h4>

            <p
              className="footerLink"
              onClick={() => scrollToSection("para-quem-e")}
            >
              Para quem é
            </p>

            <p
              className="footerLink"
              onClick={() => scrollToSection("beneficios")}
            >
              Benefícios
            </p>

            <p
              className="footerLink"
              onClick={() => scrollToSection("entregaveis")}
            >
              Entregáveis
            </p>

            <p
              className="footerLink"
              onClick={() => scrollToSection("por-que-funciona")}
            >
              Por que funciona
            </p>

            <p
              className="footerLink"
              onClick={() => scrollToSection("resultados")}
            >
              Resultados
            </p>

            <p className="footerLink" onClick={() => scrollToSection("faq")}>
              FAQ
            </p>
          </div>

          <div className="footerCol footerCol--legal">
            <a href="">
              <p className="footerLink">Política de privacidade</p>
            </a>
            <a href="">
              <p className="footerLink">Termos de uso</p>
            </a>
          </div>
        </div>

        <div className="footerBottom">
          <p>© 2025 Toka. Todos os direitos reservados.</p>
        </div>
      </footer>
    </Styled.Container>
  );
}
