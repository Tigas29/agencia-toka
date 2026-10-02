import { forwardRef } from "react";
import styled from "styled-components";
import { FolhaN } from "./folhas";
import { ALTURA, LARGURA } from "./pdf-export";

/**
 * Exportacao em PDF da demo. As quatro folhas sao montadas fora da tela em
 * A4 (794 x 1123, 96 dpi), recebem a marca DEMONSTRACAO e a faixa navy do pe
 * DENTRO do mesmo no, e so entao viram imagem: a marca nao e uma camada de
 * PDF que um editor apaga, e pixel. html-to-image e jspdf entram por import
 * dinamico no clique.
 *
 * Marca e faixa seguem o canvas PDF-marca (595 x 842) escalado por 1,334:
 * tres faixas a -32 graus, Poppins 600, rgba(155,52,18,0.10).
 */


const Area = styled.div`
  position: fixed;
  left: -12000px;
  top: 0;
  width: ${LARGURA}px;
  pointer-events: none;
`;

const Pagina = styled.div`
  position: relative;
  width: ${LARGURA}px;
  height: ${ALTURA}px;
  overflow: hidden;
  background: #fff;

  .marca {
    position: absolute;
    left: -80px;
    right: -80px;
    text-align: center;
    transform: rotate(-32deg);
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 93px;
    line-height: 1.5;
    letter-spacing: 13px;
    white-space: nowrap;
    color: rgba(155, 52, 18, 0.1);
  }

  .faixa {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 45px;
    box-sizing: border-box;
    padding: 0 32px;
    background: #121a30;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: "Nunito Sans", sans-serif;
    font-size: 12.7px;
    line-height: 1.3;
    color: #f4f3ee;
  }
`;

const TOPOS_MARCA = [200, 534, 867];

/** As 4 paginas A4 com marca, fora da tela. */
export const AreaPdf = forwardRef(function AreaPdf({ p, e, marca, faixa }, ref) {
  return (
    <Area ref={ref} aria-hidden="true">
      {[0, 1, 2, 3].map((n) => (
        <Pagina key={n} data-pagina-pdf>
          <FolhaN n={n} p={p} e={e} pdf />
          {TOPOS_MARCA.map((top) => (
            <div key={top} className="marca" style={{ top }}>
              {marca}
            </div>
          ))}
          <div className="faixa">{faixa}</div>
        </Pagina>
      ))}
    </Area>
  );
});

