import { useRef, useState } from "react";
import styled from "styled-components";
import { Cta, H2, Inner, Lead, Media, Section } from "../style";
import { Seta, Whatsapp } from "../icones";
import {
  capturarUtm,
  enviarLead,
  formatarTelefone,
  gerarLeadId,
  linkWhatsApp,
  somenteDigitos,
  telefoneValido,
  track,
} from "../lead";
import { EASE, gsap, useContextoGsap, useMenosMovimento } from "../animacao";

/**
 * Dobra 7 (arquivo `08.Form.jsx`, o número do arquivo ficou do desenho
 * original). Quatro campos, um envio. Nada na lógica de validação e
 * envio deste arquivo mudou nesta reforma — só a entrada visual.
 *
 * O fio dourado termina aqui: a pequena seta ao lado do rótulo "Seu
 * nome" se desenha quando a seção entra na tela, como se o traço que
 * atravessou a página inteira apontasse para o primeiro campo.
 *
 * A cidade não é enfeite: é ela que amarra o formulário à promessa de
 * exclusividade regional feita na dobra anterior. Pedir cidade logo
 * depois de dizer "uma clínica por região" faz o campo parecer
 * consequência, não burocracia.
 */

const CAMPOS = [
  { id: "nome", rotulo: "Seu nome", tipo: "text", auto: "name" },
  { id: "whatsapp", rotulo: "WhatsApp", tipo: "tel", auto: "tel" },
  {
    id: "especialidade",
    rotulo: "Especialidade",
    tipo: "text",
    dica: "Oftalmologia, dermatologia, cirurgia plástica",
  },
  {
    id: "cidade",
    rotulo: "Cidade",
    tipo: "text",
    auto: "address-level2",
    dica: "É por ela que checamos se a região está aberta",
  },
];

const Faixa = styled(Section)`
  scroll-margin-top: 24px;
`;

const Coluna = styled.div`
  position: relative;
`;

/** A ponta final do fio dourado: uma seta curta que aponta para o
 * primeiro campo, como se o traço que atravessou a página chegasse
 * exatamente aqui. */
const Chegada = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 26px;

  svg {
    flex: none;
  }
`;

const Grade = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 64px;
  align-items: start;

  ${Media.Tablet} {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Caixa = styled.form`
  background: var(--navy-800);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 16px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${Media.PhoneLarge} {
    padding: 24px 20px;
  }
`;

const Campo = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;

  .rotulo {
    font-family: "Poppins", sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--off-white);
  }

  input {
    width: 100%;
    background: var(--navy-900);
    border: 1px solid
      ${(p) => (p.$erro ? "var(--erro)" : "rgba(255,255,255,0.12)")};
    border-radius: 9px;
    padding: 14px 16px;
    color: var(--white);
    font-family: "Nunito Sans", sans-serif;
    font-size: 1rem;
    transition: border-color 180ms ease, box-shadow 180ms ease;

    &::placeholder {
      color: #5c6479;
    }

    &:focus {
      outline: none;
      border-color: var(--gold);
      box-shadow: 0 0 0 3px var(--gold-soft);
    }
  }

  .dica {
    font-size: 0.78rem;
    color: ${(p) => (p.$erro ? "var(--erro)" : "var(--apagado)")};
  }
`;

const Aviso = styled.p`
  font-size: 0.84rem;
  color: var(--apagado);
  margin: 0;
  text-align: center;
`;

const Sucesso = styled.div`
  text-align: center;
  padding: 18px 0;

  h3 {
    font-family: "Poppins", sans-serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--white);
    margin: 0 0 12px;
  }

  p {
    font-size: 0.98rem;
    color: var(--off-white);
    margin: 0 0 24px;
  }

  a {
    text-decoration: none;
    display: block;
  }
`;

const vazio = { nome: "", whatsapp: "", especialidade: "", cidade: "" };

export default function Form() {
  const [dados, setDados] = useState(vazio);
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const menosMovimento = useMenosMovimento();
  const chegadaRef = useRef(null);
  const colunaItensRef = useRef([]);
  const caixaRef = useRef(null);

  const escopo = useContextoGsap(() => {
    if (menosMovimento) return;

    // Ritmo dado pela rolagem. A caixa do formulário fica de fora da
    // cascata e entra junto com a primeira peça: um campo que só aparece
    // depois de a pessoa terminar de rolar o texto ao lado é atrito
    // gratuito bem em cima da conversão.
    gsap.fromTo(
      [chegadaRef.current, ...colunaItensRef.current].filter(Boolean),
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        duration: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: escopo.current,
          start: "top 78%",
          end: "bottom 78%",
          scrub: 0.5,
        },
      }
    );

    gsap.fromTo(
      caixaRef.current,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: EASE,
        scrollTrigger: {
          trigger: escopo.current,
          start: "top 78%",
          once: true,
        },
      }
    );

  }, [menosMovimento]);

  const mudar = (id) => (evento) => {
    const bruto = evento.target.value;
    const valor = id === "whatsapp" ? formatarTelefone(bruto) : bruto;
    setDados((d) => ({ ...d, [id]: valor }));
    if (erros[id]) setErros((e) => ({ ...e, [id]: null }));
  };

  const validar = () => {
    const novos = {};
    if (dados.nome.trim().length < 2) novos.nome = "Escreva o seu nome";
    if (!telefoneValido(dados.whatsapp))
      novos.whatsapp = "Precisa de DDD e número completo";
    if (!dados.especialidade.trim()) novos.especialidade = "Qual a sua área?";
    if (!dados.cidade.trim()) novos.cidade = "Em que cidade você atende?";
    setErros(novos);
    return Object.keys(novos).length === 0;
  };

  const enviar = async (evento) => {
    evento.preventDefault();
    if (enviando) return;
    if (!validar()) return;

    setEnviando(true);
    track("Lead", { content_name: "habitat-estrategico" });

    const payload = {
      ...dados,
      telefone: somenteDigitos(dados.whatsapp),
      lead_id: gerarLeadId(),
      origem: "lp-habitat",
      ...capturarUtm(),
    };

    // O retorno não decide nada: erro de CRM não pode prender quem preencheu.
    await enviarLead(payload);

    setEnviando(false);
    setEnviado(true);
    window.location.href = linkWhatsApp(dados);
  };

  return (
    <Faixa id="formulario" ref={escopo}>
      <Inner>
        <Grade>
          <Coluna>
            <Chegada ref={chegadaRef}>
              <Seta />O próximo passo
            </Chegada>
            <H2
              ref={(el) => {
                colunaItensRef.current[0] = el;
              }}
            >
              Vamos ver se a sua região ainda está&nbsp;aberta.
            </H2>
            <Lead
              ref={(el) => {
                colunaItensRef.current[1] = el;
              }}
            >
              Quatro campos. Depois disso a conversa segue no WhatsApp, com
              alguém da Toka olhando o seu caso antes de falar com você.
            </Lead>
            <Lead
              ref={(el) => {
                colunaItensRef.current[2] = el;
              }}
            >
              Se o Habitat não fizer sentido para a sua clínica agora, a gente
              diz isso na cara. É mais barato para os dois.
            </Lead>
          </Coluna>

          {enviado ? (
            <Caixa as="div" ref={caixaRef}>
              <Sucesso>
                <h3>Recebemos, {dados.nome.split(" ")[0]}.</h3>
                <p>
                  Estamos te levando para o WhatsApp. Se a janela não abrir
                  sozinha, use o botão abaixo.
                </p>
                <a href={linkWhatsApp(dados)}>
                  <Cta as="span" style={{ width: "100%" }}>
                    <Whatsapp />
                    Abrir conversa no WhatsApp
                  </Cta>
                </a>
              </Sucesso>
            </Caixa>
          ) : (
            <Caixa onSubmit={enviar} noValidate ref={caixaRef}>
              {CAMPOS.map((campo) => (
                <Campo key={campo.id} $erro={Boolean(erros[campo.id])}>
                  <span className="rotulo">{campo.rotulo}</span>
                  <input
                    type={campo.tipo}
                    name={campo.id}
                    autoComplete={campo.auto || "off"}
                    inputMode={campo.tipo === "tel" ? "numeric" : undefined}
                    value={dados[campo.id]}
                    onChange={mudar(campo.id)}
                    placeholder={campo.tipo === "tel" ? "(11) 90000-0000" : ""}
                    aria-invalid={Boolean(erros[campo.id])}
                  />
                  {(erros[campo.id] || campo.dica) && (
                    <span className="dica">
                      {erros[campo.id] || campo.dica}
                    </span>
                  )}
                </Campo>
              ))}

              <Cta type="submit" disabled={enviando}>
                {enviando ? "Enviando" : "Quero minha região exclusiva"}
                {!enviando && <Whatsapp />}
              </Cta>

              <Aviso>
                Seus dados ficam com a Toka. Nada de lista, nada de disparo em
                massa.
              </Aviso>
            </Caixa>
          )}
        </Grade>
      </Inner>
    </Faixa>
  );
}
