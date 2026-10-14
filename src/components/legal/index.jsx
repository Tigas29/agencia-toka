import { useEffect } from "react";
import styled from "styled-components";
import { H1, Inner, Media, Page, Tokens, Topo, numerais } from "../../estilo/ds";
import logo from "../../assets/logo.svg";
import { EMAIL } from "../inicio/contato";

/**
 * Política de Privacidade e Termos de Uso.
 *
 * Nasceram em 14/out/2026 porque o Google só publica o app OAuth da API
 * do Google Ads (projeto "Toka Google Ads") com links de privacidade e
 * termos no domínio da Toka. O texto descreve o que o site faz hoje:
 * formulário que vai para o CRM, GTM + Pixel da Meta + Clarity, checkout
 * da Hubla. Se uma dessas peças mudar, o texto muda junto.
 */

const POLITICA_GOOGLE = "https://developers.google.com/terms/api-services-user-data-policy";
const PERMISSOES_GOOGLE = "https://myaccount.google.com/permissions";

const Corpo = styled.main`
  padding: 40px 0 140px;

  ${Media.PhoneLarge} {
    padding: 16px 0 90px;
  }
`;

const Coluna = styled.article`
  max-width: 680px;

  h2 {
    font-family: "EB Garamond", Georgia, serif;
    font-weight: 400;
    font-size: clamp(1.5rem, 2.6vw, 1.9rem);
    line-height: 1.15;
    color: var(--tinta);
    margin: 56px 0 14px;
  }

  p {
    margin: 0 0 16px;
    color: var(--tinta-corpo);
  }

  a {
    color: var(--acento);
    text-underline-offset: 3px;
  }
`;

const Data = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--tinta-fraca) !important;
  margin: 22px 0 40px !important;
  ${numerais};
`;

const Rodape = styled.p`
  margin-top: 64px !important;
  padding-top: 24px;
  border-top: 1px solid var(--linha);
  font-size: 0.92rem;
`;

const Email = () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

function Privacidade() {
  return (
    <>
      <p>
        Esta página explica quais dados a Toka Company recebe quando você usa o site
        tokacompany.com.br, o que fazemos com eles e como pedir que sejam apagados. Ela vale
        também para as ferramentas da Toka que se conectam a contas do Google.
      </p>

      <h2>O que você nos manda</h2>
      <p>
        Quando você preenche um formulário no site, recebemos o que escreveu: nome, telefone ou
        WhatsApp, e-mail, especialidade, cidade e as respostas às perguntas do formulário. Junto
        chega a origem da visita (os parâmetros utm, gclid e fbclid do link em que você clicou),
        que mostra de qual anúncio ou página você veio.
      </p>

      <h2>O que o site registra sozinho</h2>
      <p>
        O site usa o Google Tag Manager, o Pixel da Meta e o Microsoft Clarity. Eles registram as
        páginas vistas, os cliques e o caminho da visita, e usam cookies para isso. O Clarity
        grava a navegação sem identificar quem você é; é assim que vemos em que ponto uma página
        confunde quem lê. Você pode bloquear esses cookies no navegador, e o site continua
        funcionando.
      </p>

      <h2>Para que usamos</h2>
      <p>
        Para falar com você sobre o que pediu no formulário, para saber quais anúncios trazem
        contatos e para melhorar as páginas. Os contatos ficam no CRM da Toka, o sistema em que
        organizamos as conversas comerciais. A Toka não vende nem aluga dados a ninguém.
      </p>

      <h2>Pagamentos</h2>
      <p>
        As compras feitas pelo site são processadas pela Hubla, na página de checkout dela. A Toka
        não recebe nem guarda número de cartão. O que você informa no pagamento segue a política
        de privacidade da Hubla.
      </p>

      <h2>Dados de contas do Google (API do Google Ads)</h2>
      <p>
        A Toka administra contas de anúncio no Google para clientes e usa a API do Google Ads para
        ler os números dessas contas: investimento, cliques, impressões e conversões por campanha.
        Também devolve ao Google, sem nome, telefone ou e-mail, o código do clique de quem virou
        conversa, agendamento ou comparecimento, para o anúncio aprender com o resultado real.
        Isso vale apenas para as contas que a pessoa autorizou na tela de permissão do Google e
        serve para montar relatórios e painéis para o próprio dono da conta e melhorar os anúncios
        dele. Esses dados não são vendidos nem usados para qualquer outro fim.
      </p>
      <p>
        O uso e a transferência, pela Toka, de informações recebidas das APIs do Google seguem a{" "}
        <a href={POLITICA_GOOGLE} target="_blank" rel="noreferrer">
          Política de Dados do Usuário dos Serviços de API do Google
        </a>
        , incluindo os requisitos de Uso Limitado.
      </p>
      <p>
        Quem autorizou pode tirar o acesso quando quiser, em{" "}
        <a href={PERMISSOES_GOOGLE} target="_blank" rel="noreferrer">
          myaccount.google.com/permissions
        </a>
        .
      </p>

      <h2>Por quanto tempo guardamos</h2>
      <p>
        Enquanto existir a conversa comercial ou o contrato, ou enquanto o dado for necessário
        para o que está descrito aqui. Se você pedir, apagamos antes.
      </p>

      <h2>Seus direitos</h2>
      <p>
        A Lei Geral de Proteção de Dados (Lei 13.709/2018) garante que você pode saber quais dados
        temos sobre você, corrigir, pedir que sejam apagados e saber com quem foram compartilhados.
        Para qualquer um desses pedidos, escreva para <Email />.
      </p>

      <h2>Mudanças</h2>
      <p>Quando esta política mudar, a data no topo muda junto.</p>
    </>
  );
}

function Termos() {
  return (
    <>
      <p>
        Estes termos valem para quem usa o site tokacompany.com.br e as ferramentas da Toka
        Company ligadas a ele.
      </p>

      <h2>O site</h2>
      <p>
        O site apresenta o trabalho da Toka em marketing para profissionais de saúde e recebe
        pedidos de contato. Os exemplos e as demonstrações mostram como o trabalho funciona e não
        são promessa de resultado para o seu caso.
      </p>

      <h2>Formulários</h2>
      <p>
        Ao enviar um formulário, você confirma que os dados são seus (ou que tem permissão para
        enviá-los) e aceita ser procurado pela Toka sobre o assunto do formulário, por telefone,
        WhatsApp ou e-mail. O que fazemos com esses dados está na{" "}
        <a href="/privacidade">Política de Privacidade</a>.
      </p>

      <h2>Compras</h2>
      <p>
        Os produtos vendidos pelo site são cobrados pela Hubla. Preço, entrega e reembolso aparecem
        na oferta e no checkout, e valem os direitos do Código de Defesa do Consumidor.
      </p>

      <h2>Ferramentas ligadas ao Google</h2>
      <p>
        A Toka usa ferramentas próprias que se conectam à API do Google Ads para ler os dados das
        contas de anúncio que administra para os clientes e informar ao Google quais cliques viraram
        contato, sem dado pessoal. Quem autorizou o acesso pode removê-lo
        quando quiser, em{" "}
        <a href={PERMISSOES_GOOGLE} target="_blank" rel="noreferrer">
          myaccount.google.com/permissions
        </a>
        .
      </p>

      <h2>Marca e conteúdo</h2>
      <p>
        Os textos, as imagens e a marca Toka não podem ser copiados para uso comercial sem
        autorização.
      </p>

      <h2>Limites</h2>
      <p>
        O site pode mudar ou sair do ar sem aviso. Links para outros sites (Instagram, WhatsApp,
        Hubla) seguem as regras de cada um.
      </p>
      <p>Estes termos seguem a lei brasileira.</p>
    </>
  );
}

const PAGINAS = {
  privacidade: { titulo: "Política de Privacidade", data: "Atualizada em 14 de outubro de 2026", Texto: Privacidade },
  termos: { titulo: "Termos de Uso", data: "Atualizados em 14 de outubro de 2026", Texto: Termos },
};

export default function PaginaLegal({ tipo }) {
  const { titulo, data, Texto } = PAGINAS[tipo];

  useEffect(() => {
    document.title = `${titulo} | Toka`;
  }, [titulo]);

  return (
    <>
      <Tokens />
      <Page className="toka">
        <Topo>
          <a href="/" aria-label="Toka, página inicial">
            <img src={logo} alt="Toka" />
          </a>
          <span>{tipo === "privacidade" ? "Privacidade" : "Termos"}</span>
        </Topo>

        <Corpo>
          <Inner>
            <Coluna>
              <H1>{titulo}</H1>
              <Data>{data}</Data>
              <Texto />
              <Rodape>
                Contato: <Email />
              </Rodape>
            </Coluna>
          </Inner>
        </Corpo>
      </Page>
    </>
  );
}
