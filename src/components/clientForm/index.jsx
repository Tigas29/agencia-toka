import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import * as Styled from "./style";

const FormContainer = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    isDoctor: "",
    name: "",
    crm: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  // Referências para os campos de input
  const nameRef = useRef(null);
  const crmRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  // Efeito para focar no campo ativo quando o "step" muda
  useEffect(() => {
    if (step === 1) nameRef.current?.focus();
    if (step === 2) crmRef.current?.focus();
    if (step === 3) emailRef.current?.focus();
    if (step === 4) phoneRef.current?.focus();
  }, [step]);

  const validateForm = () => {
    if (step === 1 && !formData.name) {
      setError("Por favor, insira seu nome.");
      return false;
    }
    if (step === 2 && !/^\d{4,6}$/.test(formData.crm)) {
      setError("Por favor, insira um CRM válido.");
      return false;
    }
    if (step === 3 && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Por favor, insira um email válido.");
      return false;
    }
    if (step === 4 && !/^\d{10,11}$/.test(formData.phone)) {
      setError("Por favor, insira um telefone válido.");
      return false;
    }
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
      nome: formData.name,
      email: formData.email,
      telefone: formData.phone,
      crm: formData.crm,
      origem: "Google",
      observacoes: "Inscrição para o curso de blefaro.",
    };

    try {
      const response = await fetch("https://api.pipefy.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer SEU_TOKEN`,
        },
        body: JSON.stringify({
          query: `
            mutation CreateCard($pipe_id: ID!, $phase_id: ID!, $fields: [FieldValueInput!]!) {
              createCard(input: {
                pipe_id: $pipe_id,
                phase_id: $phase_id,
                fields_attributes: $fields
              }) {
                card {
                  id
                }
              }
            }
          `,
          variables: {
            pipe_id: 304487644,
            phase_id: "327107253",
            fields: [
              { field_id: "nome", field_value: data.nome },
              { field_id: "email", field_value: data.email },
              { field_id: "telefone", field_value: data.telefone },
              { field_id: "m_dico_1", field_value: data.crm },
              { field_id: "origem", field_value: data.origem },
              { field_id: "observa_es", field_value: data.observacoes },
            ],
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error("Erro no Pipefy:", result.errors);
        alert("Ocorreu um erro ao enviar o formulário.");
        return;
      }

      setShowFinalMessage(true);
    } catch (error) {
      console.error("Erro na integração com o Pipefy:", error);
      alert("Ocorreu um erro. Tente novamente mais tarde.");
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

  const handleDoctorSelection = (isDoctor) => {
    setFormData({ ...formData, isDoctor });
    if (isDoctor === "Sim") {
      setStep(1);
    } else {
      setStep(0);
      setShowFinalMessage(false);
    }
  };

  return (
    <Styled.ContainerBackground>
      <form
        className="formBLefaro"
        onSubmit={step === 4 ? handleSubmit : handleNext}
      >
        <Styled.ProgressBar>
          {formData.isDoctor === "Sim" && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          )}
        </Styled.ProgressBar>
        <Styled.Container>
          <div className="box">
            {formData.isDoctor === "" && (
              <Styled.Question>
                <p>Você é médico?</p>
                <Styled.Options>
                  <button
                    type="button"
                    onClick={() => handleDoctorSelection("Sim")}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDoctorSelection("Não")}
                  >
                    Não
                  </button>
                </Styled.Options>
              </Styled.Question>
            )}

            {formData.isDoctor === "Não" && (
              <Styled.EndMessage>
                <p>
                  Nosso curso é exclusivo para médicos formados. Agradecemos
                  pela compreensão.
                </p>
              </Styled.EndMessage>
            )}

            {showFinalMessage && formData.isDoctor === "Sim" && (
              <Styled.EndMessage>
                <p>
                  Obrigado por entrar em contato! Em breve, retornaremos para
                  você.
                </p>
              </Styled.EndMessage>
            )}

            {!showFinalMessage && formData.isDoctor === "Sim" && step > 0 && (
              <>
                {step === 1 && (
                  <Styled.InputContainer>
                    <label htmlFor="name">
                      Queremos te conhecer melhor! Como podemos te chamar?
                    </label>
                    <input
                      id="name"
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
                    <label htmlFor="crm">Informe o seu CRM:</label>
                    <input
                      id="crm"
                      ref={crmRef}
                      type="text"
                      placeholder="Ex: 123456"
                      value={formData.crm}
                      onChange={(e) => handleInputChange("crm", e.target.value)}
                    />
                  </Styled.InputContainer>
                )}
                {step === 3 && (
                  <Styled.InputContainer>
                    <label htmlFor="email">Coloque o seu melhor e-mail:</label>
                    <input
                      id="email"
                      ref={emailRef}
                      type="email"
                      placeholder="Ex: email@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </Styled.InputContainer>
                )}
                {step === 4 && (
                  <Styled.InputContainer>
                    <label htmlFor="phone">
                      Por último, o seu telefone de contato:
                    </label>
                    <input
                      id="phone"
                      ref={phoneRef}
                      type="text"
                      placeholder="Ex: 11912345678"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </Styled.InputContainer>
                )}
                <Styled.Buttons>
                  {step === 4 ? (
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Finalizar"}
                    </button>
                  ) : (
                    <button type="button" onClick={handleNext}>
                      Próximo
                    </button>
                  )}
                </Styled.Buttons>
                {step > 1 && (
                  <Styled.Navigation>
                    <button
                      type="button"
                      className="buttonModal"
                      onClick={handleBack}
                    >
                      ←
                    </button>
                  </Styled.Navigation>
                )}
              </>
            )}

            {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
          </div>
        </Styled.Container>
      </form>
    </Styled.ContainerBackground>
  );
};

export default FormContainer;
