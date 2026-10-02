import { Fragment, useState } from "react";
import { Cartao, Cartoes, CampoInline, Folha } from "./style";

/* ---------- formatacao ---------- */

const soDigitos = (v, max) => String(v).replace(/\D/g, "").slice(0, max);

function reais(n) {
  const inteiro = Math.abs(n % 1) < 0.005;
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: inteiro ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

/** Valor de cada parcela, ou null quando nao ha divisao que faca sentido. */
function parcela(total, vezes) {
  const t = Number(total);
  const n = Number(vezes);
  if (!(t > 0) || !(n > 1)) return null;
  return t / n;
}

/* ---------- campo editavel inline ---------- */

/**
 * Texto: aceita o que a pessoa digitar. Numero: so digitos, e o milhar
 * aparece quando o campo perde o foco (formatar enquanto digita joga o
 * cursor para o fim).
 */
export function Campo({ valor, aoMudar, rotulo, numero = false, milhar = false, max = 40, minimo = 3 }) {
  const [foco, setFoco] = useState(false);
  const mostrado = numero && milhar && !foco && valor !== "" ? reais(Number(valor)) : valor;
  const ch = Math.max(String(mostrado).length, minimo) + 0.7;
  return (
    <CampoInline
      type="text"
      value={mostrado}
      aria-label={rotulo}
      inputMode={numero ? "numeric" : "text"}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      maxLength={numero ? undefined : max}
      style={{ width: `${ch}ch` }}
      onFocus={(ev) => {
        setFoco(true);
        /* Seleciona tudo: quem vem trocar o valor digita por cima. */
        const el = ev.target;
        setTimeout(() => el.select(), 0);
      }}
      onBlur={() => setFoco(false)}
      onChange={(e) => aoMudar(numero ? soDigitos(e.target.value, max) : e.target.value)}
    />
  );
}

/** Troca "{qtd}" no texto pelo campo da quantidade. */
function comQtd(texto, campo) {
  const partes = texto.split("{qtd}");
  return partes.map((parte, i) => (
    <Fragment key={i}>
      {parte}
      {i < partes.length - 1 ? campo : null}
    </Fragment>
  ));
}

/* ---------- as quatro folhas ---------- */

function Topo({ p, e }) {
  return (
    <div className="topo">
      <span className="ouro">Proposta do seu {p.plano.titulo.replace("O seu ", "")}</span>
      <span>{e.pessoa || "..."}</span>
    </div>
  );
}

function Pe({ p, e, n }) {
  return (
    <div className="pe">
      <span>
        {p.profissao} {e.prof || "..."}
        {p.registro ? ` · ${p.registro}` : ""}
      </span>
      <span>{n} / 4</span>
    </div>
  );
}

export function Folha1({ p, e, mudar }) {
  return (
    <Folha>
      <div className="logo">seu logo</div>
      <h3 className="titulo-capa">{p.tituloCapa}</h3>
      <div>
        <div className="linha">
          <span className="k">{p.pessoa}</span>
          <span className="v">
            <Campo valor={e.pessoa} aoMudar={(v) => mudar({ pessoa: v })} rotulo={`Nome da ${p.pessoa.toLowerCase()}`} />
          </span>
        </div>
        <div className="linha">
          <span className="k">{p.dataRotulo}</span>
          <span className="v">{p.data}</span>
        </div>
      </div>
      <div className="espaco" />
      <div className="assina">
        <div className="nome">
          {p.profissao}{" "}
          <Campo valor={e.prof} aoMudar={(v) => mudar({ prof: v })} rotulo="Seu nome" />
        </div>
        {p.registro && <div className="miudo">{p.registro}</div>}
        <div className="miudo">{p.contato}</div>
      </div>
    </Folha>
  );
}

export function Folha2({ p, e }) {
  const a = p.avaliacao;
  return (
    <Folha>
      <Topo p={p} e={e} />
      <h3>{a.titulo}</h3>
      <p className="rotulo" style={{ marginTop: 4 }}>O que te trouxe aqui</p>
      <p className="quote">“{a.trouxe}”</p>
      <p className="rotulo">{a.achadosRotulo}</p>
      <ol className="itens">
        {a.achados.map((t, i) => (
          <li key={t}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
      <p className="rotulo">O que a gente vai trabalhar</p>
      <ol className="itens">
        {a.trabalhar.map((t, i) => (
          <li key={t}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
      <p className="fecho">{a.fecho}</p>
      <div className="espaco" />
      <Pe p={p} e={e} n={2} />
    </Folha>
  );
}

function Cartao3({ o, i, p, e, mudarLista }) {
  const parcelado = p.plano.modo === "parcelado";
  const valor = e.valor[i];
  const vezes = e.parcelas[i];
  const cada = parcelado ? parcela(valor, vezes) : null;
  const qtd = (
    <Campo valor={e.qtd[i]} numero max={3} minimo={2} rotulo={`Opção ${i + 1}: quantidade`} aoMudar={(v) => mudarLista("qtd", i, v)} />
  );
  return (
    <Cartao className={o.recomendada ? "rec" : ""}>
      {o.recomendada && <span className="selo">A que eu recomendo</span>}
      <div className="op">Opção {i + 1}</div>
      <div className="tit">{comQtd(o.titulo, qtd)}</div>
      <div className="det">
        {o.detalhe.map((linha) => (
          <div key={linha}>{comQtd(linha, qtd)}</div>
        ))}
      </div>
      <div className="quem">{o.quem}</div>
      <div className="valor">
        <div className="k">{parcelado ? "Valor" : "Mensalidade"}</div>
        <div className="v">
          R${" "}
          <Campo
            valor={valor}
            numero
            milhar
            max={6}
            minimo={3}
            rotulo={`Opção ${i + 1}: ${parcelado ? "valor total" : "mensalidade"}`}
            aoMudar={(v) => mudarLista("valor", i, v)}
          />
          {!parcelado && <span style={{ fontSize: "0.95rem", marginLeft: "0.35em" }}>por mês</span>}
        </div>
        {parcelado && (
          <div className="parc">
            ou{" "}
            <Campo
              valor={vezes}
              numero
              max={2}
              minimo={1}
              rotulo={`Opção ${i + 1}: número de parcelas`}
              aoMudar={(v) => mudarLista("parcelas", i, v)}
            />
            x{cada !== null ? ` de R$ ${reais(cada)}` : ""}
          </div>
        )}
      </div>
    </Cartao>
  );
}

export function Folha3({ p, e, mudar, mudarLista }) {
  const pl = p.plano;
  return (
    <Folha>
      <Topo p={p} e={e} />
      <h3>{pl.titulo}</h3>
      <Cartoes>
        {pl.opcoes.map((o, i) => (
          <Cartao3 key={i} o={o} i={i} p={p} e={e} mudarLista={mudarLista} />
        ))}
      </Cartoes>
      <div className="incluido">
        <b>Incluído nos três</b>
        <ul>
          {pl.incluido.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <p className="nota">
        {pl.avulsaPrefixo} R${" "}
        <Campo valor={e.avulsa} numero milhar max={5} minimo={2} rotulo="Valor da avulsa" aoMudar={(v) => mudar({ avulsa: v })} />
        . {pl.rodape}
      </p>
      <div className="espaco" />
      <div className="assinaturas">
        <div>{p.pessoa} · {e.pessoa || "..."}</div>
        <div>{p.profissao} · {e.prof || "..."}</div>
      </div>
      <Pe p={p} e={e} n={3} />
    </Folha>
  );
}

export function Folha4({ p, e }) {
  const r = p.regras;
  return (
    <Folha>
      <Topo p={p} e={e} />
      <h3>{r.titulo}</h3>
      <ul className="regras">
        {r.itens.map(([titulo, texto]) => (
          <li key={titulo}>
            <b>{titulo}</b> {texto}
          </li>
        ))}
      </ul>
      <div className="proximo">
        <b>Próximo passo</b>
        {r.proximo}
      </div>
      <div className="espaco" />
      <Pe p={p} e={e} n={4} />
    </Folha>
  );
}
