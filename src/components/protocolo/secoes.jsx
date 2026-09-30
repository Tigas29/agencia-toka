import { useEffect, useRef, useState } from "react";
import { Inner, Lead } from "../../estilo/ds";
import tiagoRetrato from "../../assets/protocolo/tiago-retrato.webp";
import {
  IlustraAula,
  IlustraExemplo,
  IlustraGuia,
  IlustraMensagens,
  IlustraModelo,
  Miniatura,
} from "./ilustracoes";
import {
  Autoridade,
  Bloco,
  Check,
  Kicker,
  Linha,
  Numeros,
  Peca,
  Pecas,
  Pilha,
  Preco,
  Titulo2,
} from "./style";
import { Microcopy } from "../../estilo/ds";

function ilustracao(i, peca, nicho) {
  switch (i) {
    case 0: return <IlustraModelo nicho={nicho} />;
    case 1: return <IlustraExemplo nicho={nicho} />;
    case 2: return <IlustraMensagens conversa={peca.conversa} />;
    case 3: return <IlustraGuia passos={peca.passos} />;
    default: return <IlustraAula selo={peca.selo} />;
  }
}

/** As cinco pecas, uma por bloco, alternando o lado no desktop. */
export function SecaoPecas({ d }) {
  const total = d.recebe.pecas.length;
  return (
    <Bloco className="faixa-clara">
      <Inner>
        <Kicker>{d.recebe.kicker}</Kicker>
        <Pecas>
          {d.recebe.pecas.map((p, i) => (
            <Peca key={p.titulo} data-peca={i + 1} className={i % 2 ? "inverte" : ""}>
              <div>{ilustracao(i, p, d.slug)}</div>
              <div>
                <p className="rotulo">Peça {i + 1} de {total}</p>
                <h3>{p.titulo}</h3>
                <p className="texto">{p.texto}</p>
              </div>
            </Peca>
          ))}
        </Pecas>
        <PilhaSomada d={d} />
      </Inner>
    </Bloco>
  );
}

/** Cartao que recapitula o que a pessoa leva. Cada linha entra ao rolar. */
function PilhaSomada({ d }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Pilha ref={ref} className={`faixa-escura${on ? " on" : ""}`} data-pilha>
      <h3>{d.pilha.titulo}</h3>
      <ul>
        {d.pilha.itens.map((t, i) => (
          <li key={t} style={{ "--i": i }}>
            <Miniatura indice={i} nicho={d.slug} />
            <span className="t">{t}</span>
            <Check viewBox="0 0 22 22" aria-hidden="true">
              <circle cx="11" cy="11" r="10" fill="none" stroke="#E0B65A" strokeWidth="1.2" />
              <path d="M6.5 11.4l3 3 6-6.4" fill="none" stroke="#E0B65A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </Check>
          </li>
        ))}
      </ul>
      <div className="fecho">
        <Preco>
          <span className="de">De {d.hero.precoDe}</span>
          <span className="por">{d.hero.precoPor}</span>
        </Preco>
        {d.botaoPilha}
        <Microcopy>{d.hero.micro}</Microcopy>
      </div>
    </Pilha>
  );
}

/** Secao de autoridade: foto, linha do tempo, numeros e fecho. */
export function SecaoAutoridade({ d }) {
  const q = d.quem;
  return (
    <Bloco className="faixa-escura" data-quem>
      <Inner>
        <Autoridade>
          <figure>
            <img src={tiagoRetrato} width="900" height="1125" alt="Tiago Santos" />
            <figcaption>Tiago Santos · fundador da Toka</figcaption>
          </figure>
          <div>
            <Kicker>{q.kicker}</Kicker>
            <Titulo2>{q.titulo}</Titulo2>
            <Linha>
              {q.marcos.map((m) => (
                <li key={m.rotulo}>
                  <span className="rotulo">{m.rotulo}</span>
                  <span className="desc">{m.texto}</span>
                </li>
              ))}
            </Linha>
            <Numeros>
              {q.numeros.map((n) => (
                <div key={n.n}>
                  <span className="n">{n.n}</span>
                  <span className="l">{n.legenda}</span>
                </div>
              ))}
            </Numeros>
            <Lead style={{ marginBottom: 0 }}>{q.fecho}</Lead>
          </div>
        </Autoridade>
      </Inner>
    </Bloco>
  );
}
