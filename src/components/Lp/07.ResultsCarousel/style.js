import styled from "styled-components";

const Media = {
  PhoneLarge: "@media(max-width:610px)",
  LaptopLarge: "@media(max-width:1450px)",
  Laptop: "@media(max-width:1150px)",
  Tablet: "@media(max-width:1000px)",
  TabletSmall: "@media(max-width:880px)",
  PhoneSmall: "@media(max-width:450px)",
};

export const Container = styled.section`
  width: 100%;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  padding: 2rem 0 5rem;
  min-width: 279px;

  ${Media.Tablet} {
    padding: 4rem 0;
  }

  .inner {
    width: 90%;
    max-width: 75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }

  .carousel {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;

    ${Media.Tablet} {
      gap: 1.5rem;
    }
  }

  .slideWrapper {
    width: 100%;
    padding-top: 3rem;
    overflow-x: hidden;
    padding-top: 2rem;
  }

  .slideTrack {
    display: flex;
    transition: transform 0.5s ease;
    will-change: transform;
  }

  .slide {
    min-width: 100%;
    padding: 0.2rem;
  }

  .card {
    display: flex;
    grid-template-columns: 1.05fr 1.4fr;
    background: #ffffff;
    border-radius: 2rem;
    align-items: start;

    ${Media.Tablet} {
      flex-direction: column;
      align-items: center;
    }
  }

  .cardImage {
    position: relative;
    width: 100%;

    ${Media.Tablet} {
      max-width: 100%;
    }

    img {
      width: 100%;
      max-width: 25rem;
      height: 35rem;
      object-fit: cover;
      display: block;
      border-radius: 20px;

      ${Media.Tablet} {
        max-width: 100%;
      }
    }
  }

  .cardImage,
  .videoWrapper {
    width: 100%;
    max-width: 25rem;
    min-height: 35rem;
    border-radius: 20px;

    ${Media.Tablet} {
      max-width: 100%;
    }

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }
  }

  .thumbButton {
    position: relative;
    width: 100%;
    max-width: 25rem;
    height: 35rem;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;

    ${Media.Tablet} {
      max-width: 100%;
    }
  }

  .thumbButton img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
    display: block;
  }

  .playIcon {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .playIcon::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 1.3rem solid #ffffff;
    border-top: 0.8rem solid transparent;
    border-bottom: 0.8rem solid transparent;
    transform: translateX(2px);
  }

  .thumbButton:hover .playIcon {
    background: rgba(0, 0, 0, 0.75);
  }

  .cardImageName {
    position: absolute;
    top: -25px;
    left: 50%;
    bottom: 2.5rem;
    transform: translateX(-50%);
    text-align: center;
    z-index: 2;
    pointer-events: none;

    p {
      margin: 0;
      font-family: "Poppins";
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
      padding: 0.5rem;
      background: #3a302c;
      border-radius: 0.7rem;
      border: 2px solid #ff8419;
      z-index: 2;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    ${Media.Laptop} {
      bottom: 2rem;

      p {
        font-size: 1.4rem;
      }
    }

    ${Media.PhoneLarge} {
      bottom: 1.7rem;

      p {
        font-size: 1.25rem;
      }
    }
  }

  .cardContent {
    min-height: 33rem;
    padding: 0rem 2rem 0rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #6c3200;

    ${Media.Tablet} {
      padding: 1rem 0rem 0rem;
      justify-content: center;
      gap: 2rem;
    }
  }

  .caseLogo {
    margin-bottom: -0.8rem;
  }

  .caseLogo img {
    max-width: 120px;
    display: block;
  }

  .tag {
    font-family: "Poppins";
    font-weight: 700;
    font-size: 1.3rem;
    line-height: 140%;
    color: #6c3200;

    ${Media.PhoneLarge} {
      font-size: 0.98rem;
    }
  }

  .bodyText {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    p {
      margin: 0;
      font-family: "Poppins";
      line-height: 150%;
    }

    p:nth-child(1) {
      font-size: 1rem;
      color: #a45200;
    }

    p:nth-child(2) {
      font-size: 1.2em;
      font-weight: 400;
      line-height: 120%;
      margin-top: 0.5rem;
      color: #6c3200;

      ${Media.Laptop} {
        font-size: 1rem;
      }

      ${Media.PhoneLarge} {
        font-size: 0.95rem;
      }
    }

    strong {
      font-weight: 800;
    }

    p:nth-child(3) {
      font-size: 1.4em;
      font-weight: 400;
      line-height: 100%;
      margin-top: 0.5rem;
      color: #6c3200;
    }
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 3.5rem;
    row-gap: 1.4rem;
    margin-top: 0.5rem;
    align-items: center;

    ${Media.Laptop} {
      column-gap: 2.5rem;
    }

    ${Media.PhoneLarge} {
      column-gap: 1.5rem;
    }
  }

  .metrics .metric:nth-child(3) {
    grid-column: 1 / -1;
    justify-self: center;
  }

  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-family: "Poppins";
  }

  .metricHighlight {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }

  .metricHighlight .prefix,
  .metricHighlight .suffix {
    font-size: 1.8rem;
    font-weight: 600;
    color: #6c3200;
    opacity: 0.9;

    ${Media.Laptop} {
      font-size: 1rem;
    }

    ${Media.PhoneLarge} {
      font-size: 0.85rem;
    }
  }

  .metricHighlight .value {
    font-size: 3.8rem;
    font-weight: 700;
    color: #6c3200;
    line-height: 100%;

    ${Media.Laptop} {
      font-size: 2.7rem;
    }

    ${Media.PhoneLarge} {
      font-size: 2.2rem;
    }
  }

  .metric--ghost .value {
    color: rgba(108, 50, 0, 0.5) !important;
  }

  .metric--ghost .prefix,
  .metric--ghost .suffix {
    color: rgba(108, 50, 0, 0.5) !important;
    opacity: 0.4;
  }

  .metricCaption {
    margin-top: 0.5rem;
    font-weight: 400;
    font-size: 1rem;
    text-transform: none;
    color: #6c3200;

    ${Media.PhoneLarge} {
      font-size: 0.75rem;
    }
  }

  .metric--ghost .metricCaption {
    color: rgba(108, 50, 0, 0.5) !important;
  }

  .footerTextCard {
    margin-top: 0.4rem;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 0.95rem;
    line-height: 150%;
    color: #6c3200;

    ${Media.Laptop} {
      font-size: 0.9rem;
    }

    ${Media.PhoneLarge} {
      font-size: 0.85rem;
    }
  }

  .navButton {
    border: none;
    outline: none;
    background: #ff8419;
    color: #6c3200;
    border-radius: 50%;
    width: 3.2rem;
    height: 3.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    flex-shrink: 0;
    position: relative;

    ${Media.PhoneLarge} {
      width: 2.8rem;
      height: 2.8rem;
      font-size: 1.5rem;
    }
  }

  .navButton:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
  }

  .navButton--left-desktop {
    p {
      position: absolute;
      top: 35%;
      right: 30%;
      font-size: 4rem;
    }

    ${Media.TabletSmall} {
      display: none;
    }
  }

  .navButton--right-desktop {
    p {
      position: absolute;
      top: 35%;
      left: 30%;
      font-size: 4rem;
    }

    ${Media.TabletSmall} {
      display: none;
    }
  }

  .buttom-mobile {
    display: none;

    .navButton {
      border: none;
      outline: none;
      background: #ff8419;
      color: #6c3200;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      flex-shrink: 0;
      position: relative;
    }

    .navButton:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
    }

    .navButton--left {
      p {
        position: absolute;
        top: 35%;
        right: 30%;
        font-size: 2.5rem;
      }
    }

    .navButton--right {
      p {
        position: absolute;
        top: 35%;
        left: 30%;
        font-size: 2.5rem;
      }
    }

    ${Media.TabletSmall} {
      display: flex;
      gap: 2rem;
      margin: -1rem 0 2rem;
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    border: none;
    background: #ffd1a3;
    cursor: pointer;
    padding: 0;
    transition: background 0.2s ease, width 0.2s ease;
  }

  .dot--active {
    background: #ff8419;
    width: 1.2rem;
  }
`;
