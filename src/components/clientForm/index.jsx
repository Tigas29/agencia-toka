import React, { useState, useRef, useEffect } from "react";
import * as Styled from "./style";

const revenueOptions = [
  "Até R$10 mil/mês",
  "Entre R$50 mil e R$200 mil/mês",
  "Mais de R$200 mil/mês",
];

const segmentOptions = ["Saúde", "Educação", "Tecnologia", "Comércio", "Outro"];

const FormContainer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    revenue: "",
    segment: "",
    otherSegment: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const companyRef = useRef(null);
  const otherSegmentRef = useRef(null);

  useEffect(() => {
    if (step === 1) nameRef.current?.focus();
    if (step === 2) emailRef.current?.focus();
    if (step === 3) phoneRef.current?.focus();
    if (step === 4) companyRef.current?.focus();
    if (step === 6 && formData.segment === "Outro") {
      setTimeout(() => otherSegmentRef.current?.focus(), 150);
    }
  }, [step, formData.segment]);

  const validateForm = () => {
    if (step === 1 && !formData.name) return setError("Insira seu nome.");
    if (step === 2 && !/\S+@\S+\.\S+/.test(formData.email))
      return setError("Insira um e-mail válido.");
    if (step === 3 && !/^[0-9]{10,15}$/.test(formData.phone))
      return setError("Insira um telefone válido.");
    if (step === 4 && !formData.company)
      return setError("Insira o nome da empresa.");
    if (step === 5 && !formData.revenue)
      return setError("Selecione o faturamento.");
    if (step === 6 && !formData.segment)
      return setError("Selecione o segmento.");
    if (step === 6 && formData.segment === "Outro" && !formData.otherSegment)
      return setError("Informe o segmento.");
    setError("");
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

    const data = {
      nome_da_empresa: formData.company,
      telefone_de_contato: formData.phone,
      email_de_contato: formData.email,
      observa_es: "Preenchido pelo site",
      observa_es_2: "--",
      faturamento: formData.revenue,
      segmento:
        formData.segment === "Outro" ? formData.otherSegment : formData.segment,
      fonte: "Outros",
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
              {
                field_id: "nome_da_empresa",
                field_value: data.nome_da_empresa,
              },
              {
                field_id: "telefone_de_contato",
                field_value: data.telefone_de_contato,
              },
              {
                field_id: "email_de_contato",
                field_value: data.email_de_contato,
              },
              { field_id: "observa_es", field_value: data.observa_es },
              { field_id: "observa_es_2", field_value: data.observa_es_2 },
              { field_id: "faturamento", field_value: data.faturamento },
              { field_id: "segmento", field_value: data.segmento },
              { field_id: "fonte", field_value: data.fonte },
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
  };

  return (
    <Styled.ContainerBackground>
      <form onSubmit={step === 6 ? handleSubmit : handleNext}>
        <Styled.ProgressBar>
          <div style={{ width: `${(step / 6) * 100}%` }} />
        </Styled.ProgressBar>

        <Styled.Container>
          <div className="box">
            {showFinalMessage ? (
              <Styled.EndMessage>
                <p>Obrigado! Em breve entraremos em contato.</p>
              </Styled.EndMessage>
            ) : (
              <>
                {step === 1 && (
                  <Styled.InputContainer>
                    <label>Qual seu nome?</label>
                    <input
                      ref={nameRef}
                      type="text"
                      placeholder="Insira seu nome completo"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </Styled.InputContainer>
                )}

                {step === 2 && (
                  <Styled.InputContainer>
                    <label>E-mail corporativo</label>
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder="ex: email@empresa.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </Styled.InputContainer>
                )}

                {step === 3 && (
                  <Styled.InputContainer>
                    <label>Qual seu número de telefone?</label>
                    <input
                      ref={phoneRef}
                      type="text"
                      placeholder="Ex: 5511999999999"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </Styled.InputContainer>
                )}

                {step === 4 && (
                  <Styled.InputContainer>
                    <label>Qual o nome da sua empresa?</label>
                    <input
                      ref={companyRef}
                      type="text"
                      placeholder="Ex: Agência Toka"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                    />
                  </Styled.InputContainer>
                )}

                {step === 5 && (
                  <Styled.InputContainer>
                    <label>Qual o faturamento mensal da sua empresa?</label>
                    <Styled.RevenueOptions>
                      {revenueOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={formData.revenue === opt ? "selected" : ""}
                          onClick={() => handleInputChange("revenue", opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </Styled.RevenueOptions>
                  </Styled.InputContainer>
                )}

                {step === 6 && (
                  <Styled.InputContainer>
                    <label>Qual o seu segmento?</label>
                    <Styled.RevenueOptions>
                      {segmentOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={formData.segment === opt ? "selected" : ""}
                          onClick={() => handleInputChange("segment", opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </Styled.RevenueOptions>
                    {formData.segment === "Outro" && (
                      <input
                        ref={otherSegmentRef}
                        type="text"
                        placeholder="Digite seu segmento"
                        value={formData.otherSegment}
                        onChange={(e) =>
                          handleInputChange("otherSegment", e.target.value)
                        }
                        style={{
                          marginTop: "1rem",
                          width: "50%",
                          padding: "10px",
                          fontSize: "16px",
                          backgroundColor: "transparent",
                          color: "white",
                          borderBottom: "1px solid #ccc",
                        }}
                      />
                    )}
                  </Styled.InputContainer>
                )}

                <Styled.Buttons>
                  {step < 6 ? (
                    <button type="button" onClick={handleNext}>
                      Próximo
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Finalizar"}
                    </button>
                  )}
                </Styled.Buttons>

                {step > 1 && !showFinalMessage && (
                  <Styled.Navigation>
                    <button type="button" className="back" onClick={handleBack}>
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
    </Styled.ContainerBackground>
  );
};

export default FormContainer;
