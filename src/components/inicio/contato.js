/**
 * Um destino de conversão só na home inteira: o WhatsApp da Toka.
 *
 * O número e o Instagram são os mesmos publicados no rodapé da
 * /LandingPage, e o e-mail é a caixa viva (`mkt@`, no domínio
 * tokacompany.com.br). O domínio `agenciatoka.com.br` está morto e não
 * pode voltar a aparecer.
 */

export const WHATSAPP = "5511996865057";
export const EMAIL = "mkt@tokacompany.com.br";
export const INSTAGRAM = "https://www.instagram.com/toka.med/";

const MENSAGEM =
  "Olá! Vim pelo site da Toka e quero diagnosticar a minha operação.";

export const linkDiagnostico = () =>
  `https://api.whatsapp.com/send/?phone=${WHATSAPP}&text=${encodeURIComponent(
    MENSAGEM
  )}&type=phone_number&app_absent=0`;
