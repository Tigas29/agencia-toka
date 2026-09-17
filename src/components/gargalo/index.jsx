import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import logoBranco from "../../assets/homepage/logo-toka-branco.png";
import logoNavy from "../../assets/homepage/logo-toka-navy.png";
import { ABERTURA, AUTOR, FECHO, TOPO, TRILHA, WHATSAPP } from "./spec";
import {
  avaliarGate,
  limparInstagram,
  montarPayload,
  preencher,
  primeiroNome,
  validar,
} from "./engine";
import { mascaraTelefone } from "../aplicacao/engine";
import {
  capturarUtm,
  carregarProgresso,
  enviarLead,
  gerarLeadId,
  getKommoLeadId,
  setKommoLeadId,
  limparProgresso,
  salvarProgresso,
  somenteDigitos,
  track,
} from "../aplicacao/lead";

/**
 * A aplicação da Toka em formato de conversa.
 *
 * O motor não conhece nenhuma pergunta pelo nome: ele anda pela TRILHA
 * de spec.js, mostra as falas do passo com um "digitando" entre elas,
 * abre a doca certa para o tipo de resposta, e a resposta vira bolha à
 * direita. Quem recarrega a página volta ao mesmo ponto, com a
 * conversa remontada sem as pausas.
 *
 * O lead nasce no CRM no milestone do Instagram, antes de qualquer
 * corte, e o mesmo card é atualizado no fim.
 */

/** Direção visual: "faixa-escura" (A) ou "faixa-clara" (B). */
const TEMA = "faixa-clara";

const PROGRESSO_CHAVE = "toka-gargalo-progresso-v1";

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

/* Pausa proporcional ao tamanho da fala: leitura tem ritmo, e uma fala
   de duas linhas que aparece no mesmo instante que a anterior soa como
   formulário disfarçado. */
const tempoDeDigitar = (texto) => Math.min(1500, 450 + texto.length * 12);

/** "**negrito**" da spec vira <b>. Só isso: a spec não carrega HTML. */
const Fala = ({ texto }) => {
  const partes = texto.split(/\*\*(.+?)\*\*/g);
  return partes.map((parte, i) => (i % 2 ? <b key={i}>{parte}</b> : parte));
};

const Seta = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path
      d="M8 13V3M3.5 7.5 8 3l4.5 4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const linkWhatsApp = (nome) =>
  `https://api.whatsapp.com/send/?phone=${WHATSAPP.numero}&text=${encodeURIComponent(
    WHATSAPP.mensagem(nome),
  )}&type=phone_number&app_absent=0`;

/* Uma fala emenda na anterior quando a anterior é do mesmo autor: o
   avatar some e a bolha encosta. É o histórico que decide, não quem
   chama, para a remontagem e o fluxo vivo baterem. */
const emendar = (h, fala) => [
  ...h,
  { ...fala, continua: h[h.length - 1]?.de === fala.de },
];

const mostrarResposta = (passo, valor) => {
  if (passo.tipo === "chips")
    return passo.choices.find((c) => c.id === valor)?.label || valor;
  if (passo.tipo === "instagram") return `@${valor}`;
  return valor;
};

export default function Gargalo() {
  const navigate = useNavigate();

  /* A conversa é uma lista de falas. Cada uma sabe de quem é e se
     emenda na anterior (mesmo autor, sem resposta no meio). */
  const [historico, setHistorico] = useState([]);
  const [passo, setPasso] = useState(-1); // -1 = ainda na abertura
  const [respostas, setRespostas] = useState({});
  const [digitando, setDigitando] = useState(false);
  const [docaAberta, setDocaAberta] = useState(false);
  const [fim, setFim] = useState(null); // { aprovado }
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState("");
  const [bump, setBump] = useState(false);

  const leadId = useRef(null);
  const utm = useRef({});
  const milestoneEnviado = useRef(false);
  const inputRef = useRef(null);
  const fimRef = useRef(null);
  /* Token da montagem. Cada laço assíncrono guarda o valor com que
     nasceu e para quando ele muda: é o que impede o StrictMode (monta,
     desmonta, monta de novo) de deixar dois laços falando ao mesmo tempo. */
  const sessao = useRef(0);
  const vivo = useCallback((token) => sessao.current === token, []);

  const atual = passo >= 0 ? TRILHA[passo] : null;
  const total = TRILHA.length;
  const respondidos = Math.min(passo, total);

  const falar = useCallback((texto) => {
    setHistorico((h) => emendar(h, { de: "bot", texto }));
  }, []);

  /** Mostra as falas de um passo com o ritmo de digitação. */
  const dizer = useCallback(
    async (falas, respostasAtuais) => {
      const token = sessao.current;
      setDocaAberta(false);
      for (let i = 0; i < falas.length; i += 1) {
        const texto = preencher(falas[i], respostasAtuais);
        setDigitando(true);
        await dormir(tempoDeDigitar(texto));
        if (!vivo(token)) return false;
        setDigitando(false);
        falar(texto);
        await dormir(180);
        if (!vivo(token)) return false;
      }
      return true;
    },
    [falar, vivo],
  );

  const abrirPasso = useCallback(
    async (indice, respostasAtuais) => {
      setPasso(indice);
      const ok = await dizer(TRILHA[indice].falas, respostasAtuais);
      if (!ok) return;
      setValor("");
      setErro("");
      setDocaAberta(true);
    },
    [dizer],
  );

  // ── Boot: UTM, lead_id, retomada ──────────────────────────────────
  useEffect(() => {
    sessao.current += 1;
    utm.current = capturarUtm();
    track("ViewContent", { form: "gargalo" });

    const salvo = carregarProgresso(PROGRESSO_CHAVE);
    if (salvo?.leadId && salvo.passo >= 0 && salvo.passo < total) {
      leadId.current = salvo.leadId;
      milestoneEnviado.current = Boolean(salvo.milestoneEnviado);
      setKommoLeadId(salvo.kommoLeadId);
      setRespostas(salvo.respostas || {});

      // remonta a conversa até o passo salvo, sem pausas
      const r = salvo.respostas || {};
      let h = [];
      const bot = (t) =>
        (h = emendar(h, { de: "bot", texto: preencher(t, r) }));
      ABERTURA.forEach(bot);
      for (let i = 0; i < salvo.passo; i += 1) {
        const p = TRILHA[i];
        p.falas.forEach(bot);
        if (r[p.id])
          h = emendar(h, { de: "eu", texto: mostrarResposta(p, r[p.id]) });
        (p.depois || []).forEach(bot);
      }
      TRILHA[salvo.passo].falas.forEach(bot);
      setHistorico(h);
      setPasso(salvo.passo);
      setDocaAberta(true);
    } else {
      leadId.current = gerarLeadId();
      (async () => {
        const ok = await dizer(ABERTURA, {});
        if (ok) await abrirPasso(0, {});
      })();
    }

    return () => {
      sessao.current += 1;
    };
    // roda uma vez: o boot decide entre retomar e começar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Autosave ──────────────────────────────────────────────────────
  useEffect(() => {
    if (passo < 0 || passo >= total || fim) return;
    salvarProgresso(
      {
        leadId: leadId.current,
        passo,
        respostas,
        milestoneEnviado: milestoneEnviado.current,
        kommoLeadId: getKommoLeadId(),
      },
      PROGRESSO_CHAVE,
    );
  }, [passo, respostas, fim, total]);

  // ── Rolagem e foco ────────────────────────────────────────────────
  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [historico, digitando, docaAberta, fim]);

  useEffect(() => {
    if (!docaAberta) return;
    const t = setTimeout(
      () => inputRef.current?.focus({ preventScroll: true }),
      120,
    );
    return () => clearTimeout(t);
  }, [docaAberta]);

  useEffect(() => {
    setBump(true);
    const t = setTimeout(() => setBump(false), 220);
    return () => clearTimeout(t);
  }, [respondidos]);

  // ── Encerramento ──────────────────────────────────────────────────
  const finalizar = useCallback(
    async (respostasFinais, aprovado, motivo) => {
      const payload = montarPayload({
        respostas: respostasFinais,
        leadId: leadId.current,
        utm: utm.current,
        qualificado: aprovado,
        motivo,
        parcial: false,
      });
      enviarLead(payload);

      const user = {
        nome: respostasFinais.nome,
        email: respostasFinais.email,
        telefone: somenteDigitos(respostasFinais.telefone),
      };
      track("Lead", { qualificado: aprovado, score: payload.score }, user);
      if (aprovado)
        track(
          "CompleteRegistration",
          { qualificado: true, score: payload.score },
          user,
        );

      limparProgresso(PROGRESSO_CHAVE);
      setPasso(total);
      const ok = await dizer(
        FECHO[aprovado ? "aprovado" : "reprovado"].falas,
        respostasFinais,
      );
      if (ok) setFim({ aprovado });
    },
    [dizer, total],
  );

  const dispararMilestone = useCallback((respostasAtuais) => {
    if (milestoneEnviado.current) return;
    milestoneEnviado.current = true;
    const payload = montarPayload({
      respostas: respostasAtuais,
      leadId: leadId.current,
      utm: utm.current,
      parcial: true,
    });
    enviarLead(payload).then(() => {
      const salvo = carregarProgresso(PROGRESSO_CHAVE);
      if (salvo)
        salvarProgresso(
          { ...salvo, kommoLeadId: getKommoLeadId() },
          PROGRESSO_CHAVE,
        );
    });
    track("InitiateCheckout", { etapa: "milestone_instagram" });
  }, []);

  // ── Resposta ──────────────────────────────────────────────────────
  const responder = useCallback(
    async (bruto) => {
      if (!atual || !docaAberta) return;

      let v = typeof bruto === "string" ? bruto.trim() : bruto;
      if (atual.tipo === "instagram") v = limparInstagram(v);

      const problema = validar(atual, v);
      if (problema) {
        setErro(problema);
        return;
      }

      const atualizadas = { ...respostas, [atual.id]: v || "" };
      setRespostas(atualizadas);
      setDocaAberta(false);
      setErro("");
      if (v)
        setHistorico((h) =>
          emendar(h, { de: "eu", texto: mostrarResposta(atual, v) }),
        );

      if (atual.isMilestone) dispararMilestone(atualizadas);

      const token = sessao.current;
      if (atual.depois?.length) {
        await dormir(220);
        if (!(await dizer(atual.depois, atualizadas))) return;
      }

      if (atual.isGate) {
        const { aprovado, motivo } = avaliarGate(atualizadas);
        if (!aprovado) return finalizar(atualizadas, false, motivo);
      }

      if (passo === total - 1) return finalizar(atualizadas, true, null);

      await dormir(atual.depois?.length ? 120 : 260);
      if (vivo(token)) abrirPasso(passo + 1, atualizadas);
      return undefined;
    },
    [
      atual,
      docaAberta,
      respostas,
      passo,
      total,
      dispararMilestone,
      dizer,
      finalizar,
      abrirPasso,
      vivo,
    ],
  );

  const enviarTexto = (e) => {
    e.preventDefault();
    responder(valor);
  };

  const digitar = (v) => {
    setValor(atual?.tipo === "telefone" ? mascaraTelefone(v) : v);
    if (erro) setErro("");
  };

  const pronto = atual && (atual.required ? Boolean(valor.trim()) : true);

  // ── Doca por tipo ─────────────────────────────────────────────────
  const doca = () => {
    if (!atual || !docaAberta) return null;

    if (atual.tipo === "chips") {
      return (
        <S.Doca
          onSubmit={(e) => e.preventDefault()}
          aria-label={preencher(atual.falas[0], respostas)}
        >
          <S.Chips role="group">
            {atual.choices.map((c) => (
              <S.Chip key={c.id} type="button" onClick={() => responder(c.id)}>
                {c.label}
              </S.Chip>
            ))}
          </S.Chips>
        </S.Doca>
      );
    }

    if (atual.tipo === "longo") {
      return (
        <S.Doca onSubmit={enviarTexto}>
          <S.Rotulo htmlFor={`campo-${atual.id}`}>{atual.rotulo}</S.Rotulo>
          <S.Area>
            <textarea
              id={`campo-${atual.id}`}
              ref={inputRef}
              value={valor}
              placeholder={atual.placeholder}
              onChange={(e) => digitar(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
                  enviarTexto(e);
              }}
            />
            <div className="acoes">
              {atual.pular && (
                <S.Pular type="button" onClick={() => responder("")}>
                  {atual.pular}
                </S.Pular>
              )}
              <S.Enviar
                type="submit"
                disabled={!valor.trim()}
                aria-label="Enviar"
              >
                <Seta />
              </S.Enviar>
            </div>
          </S.Area>
          {erro && <S.Erro role="alert">{erro}</S.Erro>}
        </S.Doca>
      );
    }

    const inputMode =
      atual.tipo === "telefone"
        ? "tel"
        : atual.tipo === "email"
          ? "email"
          : "text";

    return (
      <S.Doca onSubmit={enviarTexto}>
        <S.Rotulo htmlFor={`campo-${atual.id}`}>{atual.rotulo}</S.Rotulo>
        <S.Campo>
          {atual.prefixo && <span className="prefixo">{atual.prefixo}</span>}
          <input
            id={`campo-${atual.id}`}
            ref={inputRef}
            type={
              atual.tipo === "email"
                ? "email"
                : atual.tipo === "telefone"
                  ? "tel"
                  : "text"
            }
            inputMode={inputMode}
            autoComplete={
              atual.id === "nome"
                ? "name"
                : atual.id === "email"
                  ? "email"
                  : atual.id === "telefone"
                    ? "tel"
                    : "off"
            }
            autoCapitalize={atual.tipo === "texto" ? "words" : "none"}
            value={valor}
            placeholder={atual.placeholder}
            onChange={(e) => digitar(e.target.value)}
          />
          <S.Enviar type="submit" disabled={!pronto} aria-label="Enviar">
            <Seta />
          </S.Enviar>
        </S.Campo>
        {erro && <S.Erro role="alert">{erro}</S.Erro>}
        {passo === 0 && <S.Lgpd>{TOPO.lgpd}</S.Lgpd>}
      </S.Doca>
    );
  };

  const logo = TEMA === "faixa-clara" ? logoNavy : logoBranco;

  return (
    <>
      <S.Tokens />
      {/* o DS escreve ".toka .faixa-clara" (descendente), então a faixa
          não pode estar no mesmo elemento que ".toka" */}
      <div className="toka">
        <S.Page className={TEMA}>
          <S.Barra aria-hidden="true">
            <div style={{ width: `${(respondidos / total) * 100}%` }} />
          </S.Barra>

          <S.Topo>
            <div className="marca">
              <img src={logo} alt="Toka" />
              <h1>{TOPO.titulo}</h1>
            </div>
            <S.Pilula data-bump={bump} aria-live="polite">
              {respondidos} de {total}
            </S.Pilula>
          </S.Topo>

          <S.Fio aria-live="polite">
            {historico.map((fala, i) =>
              fala.de === "eu" ? (
                <S.Linha key={i} $eu>
                  <S.Bolha $eu>{fala.texto}</S.Bolha>
                </S.Linha>
              ) : (
                <S.Linha key={i} $continua={fala.continua}>
                  <S.Avatar aria-hidden="true">
                    {AUTOR.foto ? (
                      <img src={AUTOR.foto} alt="" />
                    ) : (
                      AUTOR.inicial
                    )}
                  </S.Avatar>
                  <S.Bolha>
                    <Fala texto={fala.texto} />
                  </S.Bolha>
                </S.Linha>
              ),
            )}

            {digitando && (
              <S.Linha
                $continua={historico[historico.length - 1]?.de === "bot"}
              >
                <S.Avatar aria-hidden="true">
                  {AUTOR.foto ? <img src={AUTOR.foto} alt="" /> : AUTOR.inicial}
                </S.Avatar>
                <S.Digitando aria-label={`${AUTOR.nome} está digitando`}>
                  <i />
                  <i />
                  <i />
                </S.Digitando>
              </S.Linha>
            )}

            {doca()}

            {fim && (
              <S.Fim>
                {fim.aprovado ? (
                  <S.Cta
                    as="a"
                    href={linkWhatsApp(primeiroNome(respostas.nome))}
                    target="_blank"
                    rel="noreferrer"
                    $tamanho="medio"
                    onClick={() => track("Contact", { canal: "whatsapp" })}
                  >
                    {FECHO.aprovado.botao}
                  </S.Cta>
                ) : (
                  <S.Cta
                    type="button"
                    $tamanho="medio"
                    onClick={() => navigate("/obrigado")}
                  >
                    {FECHO.reprovado.botao}
                  </S.Cta>
                )}
              </S.Fim>
            )}

            <S.Sentinela ref={fimRef} />
          </S.Fio>
        </S.Page>
      </div>
    </>
  );
}
