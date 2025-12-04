import { useState } from "react";
import * as Styled from "./style.js";

import LuisImg from "../../../assets/landingpage/07.ResultsCarousel/Dr. Luís Felipe.webp";
import LudmillaImg from "../../../assets/landingpage/07.ResultsCarousel/Dra. Ludmilla Rangel.webp";
import BrunoImg from "../../../assets/landingpage/07.ResultsCarousel/Dr. Bruno.webp";
import KosImg from "../../../assets/landingpage/07.ResultsCarousel/Instituto Kós.webp";
import BomCustoImg from "../../../assets/landingpage/07.ResultsCarousel/Dr. Bom Custo.webp";

import KosLogo from "../../../assets/landingpage/kos-logo.svg";
import BomCustoLogo from "../../../assets/landingpage/bomcusto-logo.svg";

const cases = [
  {
    id: "luis",
    name: "Dr. Luís Felipe",
    image: LuisImg,
    videoUrl: "https://www.youtube.com/embed/w7f3fCiQGyY",
    tag: "De médico em clínicas a fundador do próprio hospital.",
    body: [
      "O Dr. Luís entrou sem histórico de marketing. Trabalhava em hospitais e clínicas parceiras, mas queria pacientes particulares.",
      "Em menos de um ano com a Toka, construiu uma operação previsível, <strong>trabalha menos de 5 horas por dia e fatura pelo menos R$ 200 mil por mês.</strong>",
    ],
    metrics: [
      { prefix: "+R$", value: "40", suffix: "k", caption: "Investimento" },
      {
        prefix: "",
        value: "400",
        suffix: "%",
        caption: "ROI no primeiro ciclo (e crescendo)",
      },
    ],
    footer:
      "De profissional dependente de terceiros a dono de um sistema próprio de crescimento.",
  },
  {
    id: "bruno",
    name: "Dr. Bruno",
    image: BrunoImg,
    videoUrl: "https://www.youtube.com/embed/rbXqA9P1XNs",
    tag: "De perder tempo e dinheiro a multiplicar faturamento.",
    body: [
      "O Dr. Bruno, fisioterapeuta, tinha tempo — mas não estratégia. Gastava energia com ações que não geravam retorno.",
      "Nas primeiras reuniões com a Toka, reposicionou seu serviço e criou <strong>atendimentos de R$ 1.500/mês. Em dois meses, já faturava R$ 5 mil a mais por mês.</strong>",
    ],
    metrics: [
      { prefix: "+R$", value: "12.900", suffix: "k", caption: "Investimento" },
      { prefix: "+R$", value: "5.000", suffix: "k", caption: "Lucro mensal" },
      { prefix: "", value: "38", suffix: "%", caption: "De retorno todo mês" },
    ],
    footer: "De estagnado a lucrativo — em menos de 60 dias.",
  },
  {
    id: "ludmilla",
    name: "Dra. Ludmilla Rangel",
    image: LudmillaImg,
    tag: "De funcionária desvalorizada a dona de uma clínica rentável.",
    body: [
      "A Dra. Ludmilla trabalhava em outra clínica e recebia comissões baixas, muito abaixo do valor que entregava.",
      "Ao abrir sua própria clínica, encontrou na Toka o suporte pra montar um <strong>sistema comercial e de marketing completo.</strong>",
      "<strong>Hoje atrai pacientes qualificados, constrói autoridade e domina sua agenda.</strong>",
    ],
    metrics: [],
    footer: "De funcionária a referência.",
  },
  {
    id: "kos",
    name: "Instituto Kós",
    image: KosImg,
    logo: KosLogo,
    tag: "De ideia a empresa multimilionária.",
    body: [
      "O Instituto Kós nasceu dentro da Toka. <strong>Fundamos a marca, criamos a estrutura e lançamos tudo com o nosso framework.",
    ],
    metrics: [
      {
        prefix: "+R$",
        value: "300",
        suffix: "k",
        caption: "Investidos em anúncios",
      },
      {
        prefix: "+R$",
        value: " 7,2",
        suffix: "mm",
        caption: "Em vendas de curso no lançamento",
      },
    ],
    footer: "De conceito no papel a operação de milhões.",
  },
  {
    id: "bomcusto",
    name: "Dr. Bom Custo",
    image: BomCustoImg,
    logo: BomCustoLogo,
    tag: "De hospital ocioso a operação milionária.",
    body: [
      "O Dr. Bom Custo tinha hospital parceiro, mas nenhuma cirurgia pra realizar.",
      "<strong>Criamos uma empresa e um sistema comercial pra ativar a demanda.",
    ],
    metrics: [
      {
        prefix: "+R$",
        value: "40",
        suffix: "k",
        caption: "Investimento em estrutura e marketing",
      },
      {
        prefix: "+R$",
        value: " 1",
        suffix: "mm",
        caption: "De faturamento por mês só em cirurgias",
      },
    ],
    footer: "De estrutura parada a máquina de resultado.",
  },
];

export default function ResultsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const handlePrev = () => {
    setPlayingVideoId(null);
    setActiveIndex((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setPlayingVideoId(null);
    setActiveIndex((prev) => (prev === cases.length - 1 ? 0 : prev + 1));
  };

  return (
    <Styled.Container id="resultados">
      <div className="inner">
        <div className="carousel">
          <button
            type="button"
            className="navButton navButton--left-desktop"
            onClick={handlePrev}
            aria-label="Anterior"
          >
            <p>←</p>
          </button>

          <div className="slideWrapper">
            <div
              className="slideTrack"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {cases.map((item) => (
                <article key={item.id} className="slide">
                  <div className="card">
                    <div className="cardImage">
                      {item.videoUrl ? (
                        playingVideoId === item.id ? (
                          <div className="videoWrapper">
                            <iframe
                              src={`${item.videoUrl}?autoplay=1`}
                              title={item.name}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="thumbButton"
                            onClick={() => setPlayingVideoId(item.id)}
                          >
                            <img src={item.image} alt={item.name} />
                            <span className="playIcon" />
                          </button>
                        )
                      ) : (
                        <img src={item.image} alt={item.name} />
                      )}

                      <div className="cardImageName">
                        <p>{item.name}</p>
                      </div>
                    </div>

                    <div className="cardContent">
                      {item.logo && (
                        <div className="caseLogo">
                          <img src={item.logo} alt={`Logo ${item.name}`} />
                        </div>
                      )}
                      <p className="tag">{item.tag}</p>
                      <div className="bodyText">
                        {item.body.map((paragraph, index) => (
                          <p
                            key={index}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          />
                        ))}
                      </div>
                      {item.metrics.length > 0 && (
                        <div className="metrics">
                          {item.metrics.map((metric, index) => (
                            <div
                              key={index}
                              className={`metric ${
                                index === 0 ? "metric--ghost" : ""
                              }`}
                            >
                              <span className="metricHighlight">
                                <span className="prefix">{metric.prefix}</span>
                                <span className="value">{metric.value}</span>
                                <span className="suffix">{metric.suffix}</span>
                              </span>

                              <span className="metricCaption">
                                {metric.caption}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="footerTextCard">{item.footer}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="navButton navButton--right-desktop"
            onClick={handleNext}
            aria-label="Próximo"
          >
            <p>→</p>
          </button>
        </div>

        <div className="buttom-mobile">
          <button
            type="button"
            className="navButton navButton--left"
            onClick={handlePrev}
            aria-label="Anterior"
          >
            <p>←</p>
          </button>

          <button
            type="button"
            className="navButton navButton--right"
            onClick={handleNext}
            aria-label="Próximo"
          >
            <p>→</p>
          </button>
        </div>

        <div className="dots">
          {cases.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`dot ${index === activeIndex ? "dot--active" : ""}`}
              onClick={() => {
                setPlayingVideoId(null);
                setActiveIndex(index);
              }}
              aria-label={`Ir para o case ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Styled.Container>
  );
}
