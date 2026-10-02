import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import styled from "styled-components";
import { FolhaN } from "./folhas";
import { reduzMovimento } from "./movimento";

/**
 * Visualizador em tela cheia das quatro folhas, como um PDF aberto no
 * celular: arrastar para o lado vira a pagina (com a virada em 3D), rolar
 * para baixo le a folha. Setas do teclado e botoes fazem o mesmo.
 */

const Fundo = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  background: rgba(10, 14, 26, 0.96);
  color: #f4f3ee;
  font-family: "Nunito Sans", sans-serif;

  .barra {
    flex: none;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 56px;
    padding: 0 8px 0 14px;
    background: #121a30;
  }

  .titulo {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: #f4f3ee;
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    background: rgba(244, 243, 238, 0.12);
  }

  button:disabled {
    opacity: 0.3;
    cursor: default;
  }

  button:focus-visible {
    outline: 2px solid #e0b65a;
    outline-offset: 1px;
  }

  .palco {
    position: relative;
    flex: 1;
    min-height: 0;
    perspective: 1400px;
    overflow: hidden;
  }

  .rolagem {
    position: absolute;
    inset: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px 12px 24px;
    touch-action: pan-y;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  .pagina {
    width: min(720px, 100%);
    margin: 0 auto;
    transform-style: preserve-3d;
    will-change: transform;
  }

  .pe {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 6px 0 calc(8px + env(safe-area-inset-bottom));
    background: #121a30;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    letter-spacing: 0.1em;
    color: #e0b65a;
  }

  .pe span {
    min-width: 56px;
    text-align: center;
  }
`;

const Icone = ({ d, ...r }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...r}>
    {d.map((x) => (
      <path key={x} d={x} />
    ))}
  </svg>
);

export default function Visualizador({ p, e, nomeArquivo, inicial = 0, aoFechar, aoVirar }) {
  const [pagina, setPagina] = useState(inicial);
  const paginaRef = useRef(pagina);
  paginaRef.current = pagina;
  const alvo = useRef(null);
  const rolagem = useRef(null);
  const fechar = useRef(null);
  const direcao = useRef(0);
  const ocupado = useRef(false);
  const pedida = useRef(inicial);
  const fila = useRef(null);
  const toque = useRef(null);
  const ultimoFoco = useRef(null);

  /* Trava a rolagem do fundo e cuida do foco. */
  useEffect(() => {
    ultimoFoco.current = document.activeElement;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    fechar.current?.focus();
    return () => {
      document.body.style.overflow = anterior;
      ultimoFoco.current?.focus?.();
    };
  }, []);

  const ir = useCallback(
    (novo) => {
      if (novo < 0 || novo > 3) {
        if (alvo.current && !ocupado.current) gsap.to(alvo.current, { x: 0, rotateY: 0, duration: 0.2, ease: "power2.out" });
        return;
      }
      pedida.current = novo;
      /* Toque no meio da virada: guarda o pedido e executa quando acabar. */
      if (ocupado.current) {
        fila.current = novo;
        return;
      }
      const atual = paginaRef.current;
      if (novo === atual) {
        if (alvo.current) gsap.to(alvo.current, { x: 0, rotateY: 0, duration: 0.2, ease: "power2.out" });
        return;
      }
      const dir = novo > atual ? 1 : -1;
      direcao.current = dir;
      const el = alvo.current;
      const troca = () => {
        setPagina(novo);
        aoVirar?.(novo);
      };
      if (!el || reduzMovimento()) {
        troca();
        return;
      }
      ocupado.current = true;
      gsap.to(el, {
        x: -dir * 60,
        rotateY: -dir * 62,
        opacity: 0,
        transformOrigin: dir > 0 ? "0% 50%" : "100% 50%",
        duration: 0.18,
        ease: "power2.in",
        onComplete: troca,
      });
    },
    [aoVirar],
  );

  const mover = useCallback((delta) => ir(Math.max(0, Math.min(3, pedida.current + delta))), [ir]);

  /* Entrada da pagina nova, depois que o React trocou o conteudo. */
  useLayoutEffect(() => {
    const el = alvo.current;
    if (rolagem.current) rolagem.current.scrollTop = 0;
    if (!el || !direcao.current) return undefined;
    const dir = direcao.current;
    direcao.current = 0;
    if (reduzMovimento()) {
      gsap.set(el, { clearProps: "all" });
      ocupado.current = false;
      return undefined;
    }
    const t = gsap.fromTo(
      el,
      { x: dir * 60, rotateY: dir * 62, opacity: 0, transformOrigin: dir > 0 ? "100% 50%" : "0% 50%" },
      {
        x: 0,
        rotateY: 0,
        opacity: 1,
        duration: 0.24,
        ease: "power2.out",
        clearProps: "transform,opacity,transformOrigin",
        onComplete: () => {
          ocupado.current = false;
          const proxima = fila.current;
          fila.current = null;
          if (proxima !== null && proxima !== paginaRef.current) ir(proxima);
        },
      },
    );
    return () => {
      t.kill();
      ocupado.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina]);

  useEffect(() => {
    const tecla = (ev) => {
      if (ev.key === "Escape") aoFechar();
      else if (ev.key === "ArrowRight") mover(1);
      else if (ev.key === "ArrowLeft") mover(-1);
      else if (ev.key === "Tab") {
        /* Foco preso no dialogo. */
        const itens = Array.from(document.querySelectorAll("[data-visualizador] button:not(:disabled)"));
        if (!itens.length) return;
        const primeiro = itens[0];
        const ultimo = itens[itens.length - 1];
        if (ev.shiftKey && document.activeElement === primeiro) {
          ev.preventDefault();
          ultimo.focus();
        } else if (!ev.shiftKey && document.activeElement === ultimo) {
          ev.preventDefault();
          primeiro.focus();
        }
      }
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [aoFechar, mover]);

  /* Arrastar: acompanha o dedo; passou de 70px (ou foi rapido), vira. */
  const largura = () => alvo.current?.offsetWidth || 360;
  const aoTocar = (ev) => {
    if (ev.pointerType === "mouse" && ev.button !== 0) return;
    toque.current = { x: ev.clientX, y: ev.clientY, t: Date.now(), ativo: false, id: ev.pointerId };
  };
  const aoMover = (ev) => {
    const s = toque.current;
    if (!s || ocupado.current) return;
    const dx = ev.clientX - s.x;
    const dy = ev.clientY - s.y;
    if (!s.ativo) {
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      s.ativo = true;
      ev.currentTarget.setPointerCapture?.(s.id);
    }
    const lim = (dx > 0 && paginaRef.current === 0) || (dx < 0 && paginaRef.current === 3) ? 0.25 : 1;
    gsap.set(alvo.current, {
      x: dx * 0.5 * lim,
      rotateY: (dx / largura()) * -28 * lim,
      transformOrigin: dx < 0 ? "0% 50%" : "100% 50%",
    });
  };
  const aoSoltar = (ev) => {
    const s = toque.current;
    toque.current = null;
    if (!s?.ativo) return;
    const dx = ev.clientX - s.x;
    const veloz = Math.abs(dx) / Math.max(1, Date.now() - s.t) > 0.5;
    if (Math.abs(dx) > 70 || (veloz && Math.abs(dx) > 30)) {
      /* A virada de saida parte de onde o dedo largou. */
      mover(dx < 0 ? 1 : -1);
    } else if (alvo.current) {
      gsap.to(alvo.current, { x: 0, rotateY: 0, duration: 0.2, ease: "power2.out" });
    }
  };

  return createPortal(
    <Fundo role="dialog" aria-modal="true" aria-label={nomeArquivo} data-visualizador>
      <div className="barra">
        <button ref={fechar} type="button" aria-label="Fechar" onClick={aoFechar}>
          <Icone d={["M18 6 6 18", "m6 6 12 12"]} />
        </button>
        <span className="titulo">{nomeArquivo}</span>
      </div>
      <div className="palco">
        <div
          className="rolagem"
          ref={rolagem}
          onPointerDown={aoTocar}
          onPointerMove={aoMover}
          onPointerUp={aoSoltar}
          onPointerCancel={aoSoltar}
        >
          <div className="pagina" ref={alvo} aria-live="polite" data-pagina-atual={pagina + 1}>
            <FolhaN n={pagina} p={p} e={e} />
          </div>
        </div>
      </div>
      <div className="pe">
        <button type="button" aria-label="Página anterior" disabled={pedida.current === 0 && pagina === 0} onClick={() => mover(-1)}>
          <Icone d={["m15 18-6-6 6-6"]} />
        </button>
        <span>{pagina + 1} / 4</span>
        <button type="button" aria-label="Próxima página" disabled={pedida.current === 3 && pagina === 3} onClick={() => mover(1)}>
          <Icone d={["m9 18 6-6-6-6"]} />
        </button>
      </div>
    </Fundo>,
    document.body,
  );
}
