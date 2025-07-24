import React, { useState, useRef, useEffect } from "react";
import * as Styled from "./style";
import logo from "../../assets/logo.svg";

const FormContainer = () => {
  const questions = [
    {
      question: "O quão fácil é para você captar pacientes particulares?",
      options: [
        "Tenho facilidade de preencher a agenda com pacientes assim",
        "Ainda atraio muitos pacientes de convênio",
        "Não consigo preencher a agenda com particulares",
        "Minha agenda está vazia",
      ],
    },
    {
      question:
        "Qual das respostas representa melhor a região onde você atende?",
      options: ["Capital", "Região Metropolitana", "Interior", "Apenas Online"],
    },
    {
      question:
        "Como você acha que é percebido(a) na sua especialidade e região?",
      options: [
        "Sou a referência nº 1 da minha especialidade na região que atendo",
        "Sou uma das principais referências, mas não a 1ª",
        'Vejo colegas "menos capacitados" vendendo mais que eu',
        "Não consigo me diferenciar",
      ],
    },
    {
      question: "Como está a sua habilidade de vendas?",
      options: [
        "Vendo bem. Converto boa parte dos leads em pacientes",
        "Esforçado, mas tenho um bom espaço para melhorar",
        "Zero habilidade. Atendo bem, mas vendo mal",
        "Nunca vendi nada",
      ],
    },
    {
      question:
        "Qual é o ticket médio que um paciente deixa no seu consultório (em cada visita)?",
      options: [
        "Entre R$ 500 e R$ 1.000",
        "Entre R$ 1.000 e R$ 2.000",
        "Entre R$ 2.000 e R$ 5.000",
        "Entre R$ 5.000 e R$ 10.000",
        "Mais de R$ 10.000",
      ],
    },
    {
      question: "Você já trabalha com Planos de Acompanhamento?",
      options: [
        "Sim, e vendo muito",
        "Sim, mas não vendo muito",
        "Sim, mas nunca vendo",
        "Ainda não",
      ],
    },
    {
      question: "Qual é o seu principal canal de aquisição de pacientes?",
      options: [
        "Indicação de pacientes, amigos e familiares",
        "Indicação de outros profissionais",
        "Instagram (orgânico)",
        "Tráfego pago",
        "Plano de saúde",
        "Prospecção ativa",
      ],
    },
    {
      question:
        "Dentre os entregáveis abaixo, quantos já fazem parte da sua oferta?",
      options: ["Todos", "4 de 5", "3 de 5", "2 de 5", "1 de 5", "Nenhum"],
    },
    {
      question: "Qual é o seu faturamento mensal atualmente?",
      options: [
        "Até R$ 30.000",
        "Entre R$ 30.000 e R$ 50.000",
        "Entre R$ 50.000 e R$ 100.000",
        "Entre R$ 100.000 e R$ 300.000",
        "Entre R$ 300.000 e R$ 500.000",
        "Acima de R$ 500.000",
      ],
    },
    {
      question:
        "Forneça o @ do seu Instagram para que a nossa IA possa analisar:",
      input: {
        name: "instagram",
        placeholder: "Digite o @ do seu Instagram",
      },
    },
    {
      question: "Qual é a especialidade que você atende?",
      input: {
        name: "specialty",
        placeholder: "Cardiologia, Cirurgia, Neurologia... etc",
      },
    },
  ];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (step > 0 && step <= questions.length && questions[step - 1].input) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [step]);

  const validateForm = () => {
    if (step <= questions.length) {
      const currentQuestion = questions[step - 1];
      if (currentQuestion.options) {
        if (!formData[`step${step}`]) {
          setError("Por favor, selecione uma opção.");
          return false;
        }
      } else if (currentQuestion.input) {
        if (!formData[currentQuestion.input.name]) {
          setError("Por favor, preencha o campo.");
          return false;
        }
      }
      setError("");
      return true;
    }
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    // Collect data from formData keys step1..step9 plus instagram and specialty
    const data = {
      q1: formData.step1 || "",
      q2: formData.step2 || "",
      q3: formData.step3 || "",
      q4: formData.step4 || "",
      q5: formData.step5 || "",
      q6: formData.step6 || "",
      q7: formData.step7 || "",
      q8: formData.step8 || "",
      q9: formData.step9 || "",
      instagram: formData.instagram || "",
      specialty: formData.specialty || "",
    };

    try {
      const response = await fetch("https://api.pipefy.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQaXBlZnkiLCJpYXQiOjE3MjUzODg0NzUsImp0aSI6Ijc0YTYyYTJiLTg4NzEtNDZiNy05MmRiLTdmNWMxMDUxYmE5OCIsInN1YiI6MzAzMjEzNDM3LCJ1c2VyIjp7ImlkIjozMDMyMTM0MzcsImVtYWlsIjoidGlhZ29hbG1laWRhc2FudG9zMDRAZ21haWwuY29tIn19.jJdEiAbINcjf0YmaNJMumP-B5iUaaff_EA8XgESCP-WSFEyyJmGgseOG_victBzPPlcO2vKv9o9O9JNn1mPNng",
        },
        body: JSON.stringify({
          query: `
            mutation CreateCard($pipe_id: ID!, $phase_id: ID!, $fields: [FieldValueInput!]!) {
              createCard(input: {
                pipe_id: $pipe_id,
                phase_id: $phase_id,
                fields_attributes: $fields
              }) {
                card { id }
              }
            }
          `,
          variables: {
            pipe_id: 306193587,
            phase_id: "337326403",
            fields: [
              { field_id: "q1", field_value: data.q1 },
              { field_id: "q2", field_value: data.q2 },
              { field_id: "q3", field_value: data.q3 },
              { field_id: "q4", field_value: data.q4 },
              { field_id: "q5", field_value: data.q5 },
              { field_id: "q6", field_value: data.q6 },
              { field_id: "q7", field_value: data.q7 },
              { field_id: "q8", field_value: data.q8 },
              { field_id: "q9", field_value: data.q9 },
              { field_id: "instagram", field_value: data.instagram },
              { field_id: "specialty", field_value: data.specialty },
            ],
          },
        }),
      });

      const result = await response.json();
      if (result.errors) {
        alert("Erro ao enviar formulário.");
        return;
      }
      setShowFinalMessage(true);
    } catch (err) {
      alert("Erro ao conectar com o Pipefy.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    const currentQuestion = questions[step - 1];
    if (!currentQuestion.input) {
      setTimeout(() => setStep((prev) => prev + 1), 300);
    }
  };

  return (
    <Styled.ContainerBackground>
      {!quizStarted ? (
        <Styled.Container>
          <Styled.StartScreen>
            <Styled.LogoWrapper>
              <img src={logo} alt="Logo" />
              <Styled.ProgressBar>
                <div style={{ width: "10%" }} />
              </Styled.ProgressBar>
            </Styled.LogoWrapper>
            <h1>TESTE DE ESCALA PARA CONSULTÓRIOS</h1>
            <p>
              Descubra o quanto de dinheiro seu consultório médico está deixando
              na mesa todos os meses.
            </p>
            <button onClick={() => setQuizStarted(true)}>
              INICIAR O TESTE
            </button>
          </Styled.StartScreen>
        </Styled.Container>
      ) : (
        <form onSubmit={step === questions.length ? handleSubmit : handleNext}>
          <Styled.ProgressBar>
            <div style={{ width: `${(step / questions.length) * 100}%` }} />
          </Styled.ProgressBar>
          <Styled.Container>
            <div className="box">
              {showFinalMessage ? (
                <Styled.EndMessage>
                  <p>Obrigado! Em breve entraremos em contato.</p>
                </Styled.EndMessage>
              ) : (
                <>
                  {step <= questions.length && (
                    <Styled.InputContainer>
                      <label>{questions[step - 1].question}</label>
                      {questions[step - 1].options ? (
                        <Styled.RevenueOptions>
                          {questions[step - 1].options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={
                                formData[`step${step}`] === opt
                                  ? "selected"
                                  : ""
                              }
                              onClick={() =>
                                handleInputChange(`step${step}`, opt)
                              }
                            >
                              {opt}
                            </button>
                          ))}
                        </Styled.RevenueOptions>
                      ) : (
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder={questions[step - 1].input.placeholder}
                          value={formData[questions[step - 1].input.name] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              questions[step - 1].input.name,
                              e.target.value
                            )
                          }
                        />
                      )}
                    </Styled.InputContainer>
                  )}

                  {questions[step - 1].input && (
                    <Styled.Buttons>
                      {step < questions.length ? (
                        <button type="button" onClick={handleNext}>
                          Próximo
                        </button>
                      ) : (
                        <button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Enviando..." : "Finalizar"}
                        </button>
                      )}
                    </Styled.Buttons>
                  )}

                  {step > 1 && !showFinalMessage && (
                    <Styled.Navigation>
                      <button
                        type="button"
                        className="back"
                        onClick={handleBack}
                      >
                        ←
                      </button>
                    </Styled.Navigation>
                  )}

                  {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
                </>
              )}
            </div>
          </Styled.Container>
        </form>
      )}
    </Styled.ContainerBackground>
  );
};

export default FormContainer;
