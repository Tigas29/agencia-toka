import { useEffect } from "react";
import * as S from "../aplicacao/style";
import logo from "../../assets/logo.svg";
import { URL_LIVE, track } from "../aplicacao/lead";

const INSTAGRAM = "toka.med";

/**
 * Destino de quem não passou na triagem de /aplicacao.
 *
 * O funil não descarta ninguém: quem não qualifica hoje vira audiência.
 * Enquanto a live não existe, o próximo passo é o Instagram. Quando
 * VITE_TOKA_URL_LIVE for preenchida, o bloco da aula aparece sozinho.
 */
export default function Obrigado() {
  useEffect(() => {
    track("ViewContent", { pagina: "obrigado-nao-qualificado" });
  }, []);

  const temLive = URL_LIVE && URL_LIVE !== "/";

  return (
    <>
      <S.Tokens />
      <S.Page className="toka-aplicacao">
        <S.Topbar>
          <img src={logo} alt="Toka" />
          <span>Aplicação · Blefaroplastia</span>
        </S.Topbar>

        <S.Main>
          <S.Panel>
            <S.Kicker>Aplicação recebida</S.Kicker>
            <S.Title $small>Obrigado por dedicar esses minutos.</S.Title>

            <S.Body>
              {
                "Nós lemos cada resposta. O nosso programa foi desenhado para um momento específico de operação, e é por isso que não abrimos vaga para todo mundo que se candidata.\n\nIsso não diz nada sobre a sua competência como cirurgião. Diz sobre o estágio em que a sua operação comercial está hoje. E estágio muda.\n\nEnquanto esse dia não chega, a gente publica de graça o que usa com os médicos que já estão dentro: como estruturar a oferta, como sair da guerra de preço e como fazer a agenda cirúrgica parar de oscilar."
              }
            </S.Body>

            <S.Actions>
              <S.Primary
                as="a"
                href={`https://www.instagram.com/${INSTAGRAM}/`}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("Contact", { etapa: "seguir_instagram" })}
              >
                Seguir @{INSTAGRAM} no Instagram
              </S.Primary>

              {temLive && (
                <S.Ghost as="a" href={URL_LIVE} target="_blank" rel="noreferrer">
                  Assistir a aula gratuita →
                </S.Ghost>
              )}
            </S.Actions>

            <S.Nota>
              Quando a sua operação mudar de estágio, a porta continua aberta.
              É só voltar aqui.
            </S.Nota>
          </S.Panel>
        </S.Main>
      </S.Page>
    </>
  );
}
