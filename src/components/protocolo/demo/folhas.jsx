import { Cartao, Cartoes, Folha } from "./style";
import { reais } from "./formato";
import { varsTema } from "./tema";

/**
 * As quatro folhas da proposta, so para ler: quem escolhe os valores e a
 * cor e a conversa. `e` = { prof, logo, pessoa, valor[], cor }, `p` = a
 * proposta montada (proposta.js). `pdf` renderiza no tamanho A4 fixo que
 * vira imagem na exportacao.
 */

/** Valor de cada parcela, ou null quando nao ha divisao que faca sentido. */
function parcela(total, vezes) {
  const t = Number(total);
  const n = Number(vezes);
  if (!(t > 0) || !(n > 1)) return null;
  return t / n;
}

/** Troca "{qtd}" pelo numero do caso. */
const comQtd = (texto, qtd) => texto.replaceAll("{qtd}", qtd);

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

function FolhaBase({ e, pdf, children, ...resto }) {
  return (
    <Folha $pdf={pdf} style={varsTema(e.cor)} data-folha {...resto}>
      {children}
    </Folha>
  );
}

export function Folha1({ p, e, pdf }) {
  return (
    <FolhaBase e={e} pdf={pdf}>
      {e.logo ? (
        <img className="logo-img" src={e.logo} alt="" style={{ alignSelf: "flex-start", maxWidth: 200, maxHeight: 72, objectFit: "contain" }} />
      ) : (
        <div className="logo">seu logo</div>
      )}
      <h3 className="titulo-capa">{p.tituloCapa}</h3>
      <div>
        <div className="linha">
          <span className="k">{p.pessoa}</span>
          <span className="v">{e.pessoa}</span>
        </div>
        <div className="linha">
          <span className="k">{p.dataRotulo}</span>
          <span className="v">{p.data}</span>
        </div>
      </div>
      <div className="espaco" />
      <div className="assina">
        <div className="nome">
          {p.profissao} {e.prof}
        </div>
        {p.registro && <div className="miudo">{p.registro}</div>}
        <div className="miudo">{p.contato}</div>
      </div>
    </FolhaBase>
  );
}

export function Folha2({ p, e, pdf }) {
  const a = p.avaliacao;
  return (
    <FolhaBase e={e} pdf={pdf}>
      <Topo p={p} e={e} />
      <h3>{a.titulo}</h3>
      <p className="rotulo" style={{ marginTop: 4 }}>{a.trouxeRotulo}</p>
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
    </FolhaBase>
  );
}

function Cartao3({ o, i, p, e }) {
  const parcelado = p.plano.modo === "parcelado";
  const valor = e.valor[i];
  const cada = parcelado ? parcela(valor, o.parcelas) : null;
  return (
    <Cartao className={o.recomendada ? "rec" : ""}>
      {o.recomendada && <span className="selo">A que eu recomendo</span>}
      <div className="op">Opção {i + 1}</div>
      <div className="tit">{comQtd(o.titulo, o.qtd)}</div>
      <div className="det">
        {o.detalhe.map((linha) => (
          <div key={linha}>{comQtd(linha, o.qtd)}</div>
        ))}
      </div>
      <div className="quem">{o.quem}</div>
      <div className="valor">
        {o.semValor ? (
          <>
            <div className="k">Valor</div>
            <div className="v" style={{ fontSize: "1.4rem" }}>{o.semValor}</div>
          </>
        ) : (
          <>
            <div className="k">{parcelado ? "Valor" : "Mensalidade"}</div>
            <div className="v">
              R$ {reais(Number(valor))}
              {!parcelado && <span style={{ fontSize: "0.95rem", marginLeft: "0.35em" }}>por mês</span>}
            </div>
            {parcelado && cada !== null && (
              <div className="parc">
                ou {o.parcelas}x de R$ {reais(cada)}
              </div>
            )}
          </>
        )}
      </div>
    </Cartao>
  );
}

export function Folha3({ p, e, pdf }) {
  const pl = p.plano;
  return (
    <FolhaBase e={e} pdf={pdf}>
      <Topo p={p} e={e} />
      <h3>{pl.titulo}</h3>
      {pl.sub && <p className="sub">{pl.sub}</p>}
      <Cartoes $pdf={pdf}>
        {pl.opcoes.map((o, i) => (
          <Cartao3 key={i} o={o} i={i} p={p} e={e} />
        ))}
      </Cartoes>
      <div className="incluido">
        <b>{pl.incluidoTitulo}</b>
        <ul>
          {pl.incluido.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <p className="nota">
        {pl.avulsaPrefixo} R$ {reais(Number(e.avulsa))}
        {pl.avulsaSufixo}. {pl.rodape}
      </p>
      <div className="espaco" />
      <div className="assinaturas">
        <div>{p.pessoa} · {e.pessoa || "..."}</div>
        <div>{p.profissao} · {e.prof || "..."}</div>
      </div>
      <Pe p={p} e={e} n={3} />
    </FolhaBase>
  );
}

export function Folha4({ p, e, pdf }) {
  const r = p.regras;
  return (
    <FolhaBase e={e} pdf={pdf}>
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
    </FolhaBase>
  );
}

export function FolhaN({ n, ...props }) {
  const C = [Folha1, Folha2, Folha3, Folha4][n];
  return <C {...props} />;
}
