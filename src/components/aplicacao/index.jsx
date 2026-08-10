import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as S from "./style";
import logo from "../../assets/logo.svg";
import { WELCOME, SCREENS, activeFields } from "./spec";
import {
  avaliarGateEstrutura,
  avaliarGateProtocolo,
  mascaraTelefone,
  montarPayload,
  validarCampo,
} from "./engine";
import {
  URL_LIVE,
  capturarUtm,
  carregarProgresso,
  enviarLead,
  gerarLeadId,
  limparProgresso,
  linkWhatsApp,
  salvarProgresso,
  track,
} from "./lead";

const LETRAS = "ABCDEFGH";

export default function Aplicacao() {
  const fields = useMemo(() => activeFields(), []);
  const perguntas = useMemo(
    () => fields.filter((f) => f.type !== "statement_video"),
    [fields]
  );

  const [tela, setTela] = useState("welcome");
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const leadId = useRef(null);
  const utm = useRef({});
  const milestoneEnviado = useRef(false);
  const inputRef = useRef(null);

  const campo = fields[passo];

  // ── Boot: UTM, lead_id e retomada do progresso ────────────────────
  useEffect(() => {
    utm.current = capturarUtm();

    const salvo = carregarProgresso();
    if (salvo?.leadId) {
      leadId.current = salvo.leadId;
      setRespostas(salvo.respostas || {});
      setPasso(Math.min(salvo.passo || 0, fields.length - 1));
      milestoneEnviado.current = Boolean(salvo.milestoneEnviado);
      setTela("form");
    } else {
      leadId.current = gerarLeadId();
    }

    track("ViewContent", { form: "aplicacao-blefaroplastia" });
  }, [fields.length]);

  // ── Autosave ──────────────────────────────────────────────────────
  useEffect(() => {
    if (tela !== "form") return;
    salvarProgresso({
      leadId: leadId.current,
      passo,
      respostas,
      milestoneEnviado: milestoneEnviado.current,
    });
  }, [tela, passo, respostas]);

  useEffect(() => {
    if (campo?.type === "multiple_choice" || campo?.type === "statement_video") return;
    const t = setTimeout(() => inputRef.current?.focus(), 160);
    return () => clearTimeout(t);
  }, [passo, campo]);

  // ── Encerramento ──────────────────────────────────────────────────
  const finalizar = useCallback(async (respostasFinais, qualificado, motivo) => {
    setEnviando(true);

    const payload = montarPayload({
      respostas: respostasFinais,
      leadId: leadId.current,
      utm: utm.current,
      qualificado,
      motivo,
      parcial: false,
    });

    await enviarLead(payload);
    track(qualificado ? "CompleteRegistration" : "Lead", {
      qualificado,
      score: payload.score,
    });

    limparProgresso();
    setEnviando(false);
    setTela(qualificado ? "aprovado" : "reprovado");
    window.scrollTo({ top: 0 });
  }, []);

  /** Disparo do milestone. O lead é capturado aqui, não no submit. */
  const dispararMilestone = useCallback((respostasAtuais) => {
    if (milestoneEnviado.current) return;
    milestoneEnviado.current = true;

    const payload = montarPayload({
      respostas: respostasAtuais,
      leadId: leadId.current,
      utm: utm.current,
      parcial: true,
    });

    enviarLead(payload, true);
    track("Lead", { etapa: "milestone_instagram" });
  }, []);

  // ── Navegação ─────────────────────────────────────────────────────
  const avancar = useCallback(
    (respostasAtuais) => {
      const atual = fields[passo];

      if (atual.isMilestone) dispararMilestone(respostasAtuais);

      if (atual.id === "estrutura_atendimento") {
        const { aprovado, motivo } = avaliarGateEstrutura(respostasAtuais);
        if (!aprovado) return finalizar(respostasAtuais, false, motivo);
      }

      if (atual.id === "vende_protocolo_completo") {
        const { aprovado, motivo } = avaliarGateProtocolo(respostasAtuais);
        if (!aprovado) return finalizar(respostasAtuais, false, motivo);
      }

      if (passo === fields.length - 1) {
        return finalizar(respostasAtuais, true, null);
      }

      setErro("");
      setPasso((p) => p + 1);
      return undefined;
    },
    [fields, passo, dispararMilestone, finalizar]
  );

  const escolher = useCallback(
    (choiceId) => {
      const atualizadas = { ...respostas, [campo.id]: choiceId };
      setRespostas(atualizadas);
      setErro("");
      setTimeout(() => avancar(atualizadas), 220);
    },
    [respostas, campo, avancar]
  );

  const continuar = useCallback(() => {
    const problema = validarCampo(campo, respostas[campo.id]);
    if (problema) {
      setErro(problema);
      return;
    }
    avancar(respostas);
  }, [campo, respostas, avancar]);

  const voltar = () => {
    setErro("");
    setPasso((p) => Math.max(0, p - 1));
  };

  const digitar = (valor) => {
    const tratado = campo.type === "phone" ? mascaraTelefone(valor) : valor;
    setRespostas((r) => ({ ...r, [campo.id]: tratado }));
    if (erro) setErro("");
  };

  // ── Atalhos de teclado nas opções ─────────────────────────────────
  useEffect(() => {
    if (tela !== "form" || campo?.type !== "multiple_choice") return;

    const onKey = (e) => {
      // atalho não pode roubar Cmd+R, Ctrl+A e afins, nem disparar
      // enquanto o foco está num campo de digitação
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const alvo = e.target?.tagName;
      if (alvo === "INPUT" || alvo === "TEXTAREA") return;

      const indice = LETRAS.indexOf(e.key.toUpperCase());
      if (indice >= 0 && indice < campo.choices.length) {
        e.preventDefault();
        escolher(campo.choices[indice].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tela, campo, escolher]);

  // ── Telas ─────────────────────────────────────────────────────────
  const moldura = (conteudo, progresso) => (
    <>
      <S.Tokens />
      <S.Page className="toka-aplicacao">
        <S.Progress>
          <div style={{ width: `${progresso}%` }} />
        </S.Progress>
        <S.Topbar>
          <img src={logo} alt="Toka" />
          <span>Aplicação · Blefaroplastia</span>
        </S.Topbar>
        <S.Main>
          <S.Panel key={progresso}>{conteudo}</S.Panel>
        </S.Main>
      </S.Page>
    </>
  );

  if (tela === "welcome") {
    return moldura(
      <>
        <S.Kicker>{WELCOME.kicker}</S.Kicker>
        <S.Title>{WELCOME.title}</S.Title>
        <S.Lead>{WELCOME.description}</S.Lead>
        <S.Body>{WELCOME.body}</S.Body>
        <S.Actions>
          <S.Primary type="button" onClick={() => setTela("form")}>
            {WELCOME.buttonText}
          </S.Primary>
        </S.Actions>
      </>,
      3
    );
  }

  if (tela === "aprovado" || tela === "reprovado") {
    const t = SCREENS[tela];
    const aprovado = tela === "aprovado";

    return moldura(
      <>
        <S.Kicker>{t.kicker}</S.Kicker>
        <S.Title $small>{t.title}</S.Title>
        <S.Body>{t.body}</S.Body>
        <S.Actions>
          <S.Primary
            as="a"
            href={aprovado ? linkWhatsApp(respostas.nome) : URL_LIVE}
            target={aprovado ? "_blank" : undefined}
            rel="noreferrer"
          >
            {t.buttonText}
          </S.Primary>
        </S.Actions>
      </>,
      100
    );
  }

  // ── Tela de campo ─────────────────────────────────────────────────
  const progresso = ((passo + 1) / fields.length) * 100;
  const numero = perguntas.findIndex((p) => p.id === campo.id) + 1;

  if (campo.type === "statement_video") {
    return moldura(
      <>
        <S.Kicker>Quem já está com a gente</S.Kicker>
        <S.Title $small>{campo.title}</S.Title>
        {campo.videoUrl && (
          <S.VideoFrame>
            <iframe
              src={campo.videoUrl}
              title={campo.objecao}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </S.VideoFrame>
        )}
        <S.Actions>
          <S.Primary type="button" onClick={() => avancar(respostas)}>
            {campo.buttonText}
          </S.Primary>
          {passo > 0 && (
            <S.Ghost type="button" onClick={voltar}>
              ← Voltar
            </S.Ghost>
          )}
        </S.Actions>
      </>,
      progresso
    );
  }

  const ehTexto = campo.type !== "multiple_choice";

  return moldura(
    <form
      onSubmit={(e) => {
        e.preventDefault();
        continuar();
      }}
    >
      {campo.warning ? (
        <S.Warning>⚠ {campo.warning}</S.Warning>
      ) : (
        <S.Counter>
          Pergunta {numero} de {perguntas.length}
        </S.Counter>
      )}

      <S.Title $small>{campo.title}</S.Title>
      {campo.description && <S.Description>{campo.description}</S.Description>}

      {campo.type === "multiple_choice" ? (
        <S.Options>
          {campo.choices.map((opcao, i) => (
            <button
              key={opcao.id}
              type="button"
              className={respostas[campo.id] === opcao.id ? "selected" : ""}
              onClick={() => escolher(opcao.id)}
            >
              <span className="key">{LETRAS[i]}</span>
              {opcao.label}
            </button>
          ))}
        </S.Options>
      ) : (
        <S.Field>
          {campo.type === "long_text" ? (
            <textarea
              ref={inputRef}
              placeholder={campo.placeholder}
              value={respostas[campo.id] || ""}
              onChange={(e) => digitar(e.target.value)}
            />
          ) : (
            <input
              ref={inputRef}
              type={campo.type === "email" ? "email" : "text"}
              inputMode={campo.type === "phone" ? "tel" : undefined}
              placeholder={campo.placeholder}
              value={respostas[campo.id] || ""}
              onChange={(e) => digitar(e.target.value)}
            />
          )}
        </S.Field>
      )}

      {(ehTexto || !campo.required) && (
        <S.Actions>
          <S.Primary type="submit" disabled={enviando}>
            {enviando
              ? "Enviando"
              : passo === fields.length - 1
              ? "Finalizar aplicação"
              : "Continuar"}
          </S.Primary>
          {passo > 0 && (
            <S.Ghost type="button" onClick={voltar}>
              ← Voltar
            </S.Ghost>
          )}
        </S.Actions>
      )}

      {campo.type === "multiple_choice" && passo > 0 && (
        <S.Actions>
          <S.Ghost type="button" onClick={voltar}>
            ← Voltar
          </S.Ghost>
        </S.Actions>
      )}

      {erro && <S.Error>{erro}</S.Error>}

      {campo.type === "multiple_choice" && (
        <S.Hint>Use as teclas {LETRAS.slice(0, campo.choices.length).split("").join(", ")} para responder mais rápido.</S.Hint>
      )}
    </form>,
    progresso
  );
}
