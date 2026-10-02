/**
 * Cartao de previa do link /protocolo/:nicho/demo.
 *
 * WhatsApp, Instagram e afins leem so o HTML cru e nao rodam JavaScript,
 * entao todo link do site mostrava o titulo da home. O vercel.json manda
 * para ca apenas quem se identifica como um desses leitores (user-agent) e
 * so nesta rota. O Googlebot nao esta na lista: ele recebe a mesma pagina
 * que qualquer pessoa.
 *
 * O navegador interno do Instagram tambem tem "Instagram" no user-agent e
 * cairia aqui. Para esse caso o script abaixo manda a pessoa para a mesma
 * URL com `semcard=1`, e a condicao `missing` do rewrite deixa a pagina de
 * verdade passar. Leitor de previa nao executa o script e fica com o card.
 */
import DEMO from "../src/components/protocolo/demo/dados-demo.js";

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

export default function handler(req, res) {
  const url = new URL(req.url, "http://x");
  const nicho = url.searchParams.get("nicho") || "";
  const d = Object.hasOwn(DEMO, nicho) ? DEMO[nicho] : null;

  if (!d) {
    res.status(404).setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("Não encontrado");
    return;
  }

  const host = req.headers["x-forwarded-host"] || req.headers.host || "tokacompany.com.br";
  const origem = `https://${host}`;
  const pagina = `${origem}/protocolo/${nicho}/demo`;
  const imagem = `${origem}/og/protocolo-demo-${nicho}.jpg`;
  const titulo = esc(d.seo.title);
  const descricao = esc(d.og.description);

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>${titulo}</title>
<meta name="description" content="${descricao}">
<link rel="canonical" href="${pagina}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Toka">
<meta property="og:url" content="${pagina}">
<meta property="og:title" content="${titulo}">
<meta property="og:description" content="${descricao}">
<meta property="og:image" content="${imagem}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${titulo}">
<meta name="twitter:description" content="${descricao}">
<meta name="twitter:image" content="${imagem}">
</head>
<body>
<p><a href="${pagina}">${titulo}</a></p>
<script>
(function () {
  var q = location.search;
  location.replace(location.pathname + (q ? q + "&" : "?") + "semcard=1");
})();
</script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  res.setHeader("Vary", "User-Agent");
  res.status(200).send(html);
}
