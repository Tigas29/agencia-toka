/**
 * Rasterizacao e entrega do PDF da demo (ver pdf.jsx para a area fora da tela).
 * html-to-image e jspdf entram por import dinamico no clique.
 */

export const LARGURA = 794;
export const ALTURA = 1123;

export function ehInstagram() {
  const ua = typeof navigator === "undefined" ? "" : navigator.userAgent || "";
  return /Instagram|FBAN|FBAV/i.test(ua);
}

const ehIOS = () => {
  const ua = navigator.userAgent || "";
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
};

/** Fontes das folhas precisam estar prontas antes de virar imagem. */
async function fontesProntas() {
  if (!document.fonts?.load) return;
  const faces = [
    "400 20px 'EB Garamond'",
    "500 20px 'EB Garamond'",
    "italic 400 20px 'EB Garamond'",
    "600 20px 'Poppins'",
    "400 14px 'Nunito Sans'",
    "600 14px 'Nunito Sans'",
    "700 14px 'Nunito Sans'",
  ];
  await Promise.all(faces.map((f) => document.fonts.load(f, "AaÇãÉ0123 R$").catch(() => null)));
  await document.fonts.ready;
}

const FAMILIAS = ["EB Garamond", "Poppins", "Nunito Sans"];

const paraDataUrl = (blob) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(blob);
  });

/**
 * CSS das fontes embutido (woff2 em data URL), so o subconjunto latin das tres
 * familias das folhas. Montado a mao porque o html-to-image nao le as regras
 * da folha do Google Fonts (cross-origin) sem logar erro; se algo falhar,
 * devolve null e a biblioteca tenta o proprio caminho.
 */
let cacheFontes = null;
async function cssDeFontes() {
  if (cacheFontes) return cacheFontes;
  try {
    const link = document.querySelector('link[href*="fonts.googleapis.com/css"]');
    if (!link) return null;
    const css = await (await fetch(link.href)).text();
    const blocos = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)]
      .filter(([, sub, bloco]) => sub === "latin" && FAMILIAS.some((f) => bloco.includes(`'${f}'`) || bloco.includes(`"${f}"`)))
      .map(([, , bloco]) => bloco);
    if (!blocos.length) return null;
    const saida = await Promise.all(
      blocos.map(async (bloco) => {
        const url = bloco.match(/url\(([^)]+)\)/)[1].replace(/['"]/g, "");
        const dados = await paraDataUrl(await (await fetch(url)).blob());
        return bloco.replace(/url\([^)]+\)/, `url(${dados})`);
      }),
    );
    cacheFontes = saida.join("\n");
    return cacheFontes;
  } catch {
    return null;
  }
}

export function nomeArquivo(pessoa) {
  const limpo = String(pessoa || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `Proposta-demonstracao-${limpo || "paciente"}.pdf`;
}

/**
 * Rasteriza as paginas da `area` e devolve o PDF como Blob.
 * Em Safari/iOS a primeira rasterizacao costuma sair sem fonte ou imagem:
 * a pagina 1 e gerada duas vezes e a primeira e descartada.
 */
export async function gerarBlobPdf(area) {
  const [{ toPng, getFontEmbedCSS }, { jsPDF }] = await Promise.all([import("html-to-image"), import("jspdf")]);
  await fontesProntas();
  const paginas = Array.from(area.querySelectorAll("[data-pagina-pdf]"));
  const fontEmbedCSS = (await cssDeFontes()) ?? (await getFontEmbedCSS(paginas[0]));
  const opcoes = { pixelRatio: 2, width: LARGURA, height: ALTURA, backgroundColor: "#ffffff", fontEmbedCSS, cacheBust: false };
  if (ehIOS()) await toPng(paginas[0], opcoes).catch(() => null);

  const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait", compress: true });
  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();
  for (let i = 0; i < paginas.length; i += 1) {
    const png = await toPng(paginas[i], opcoes);
    if (i > 0) pdf.addPage();
    pdf.addImage(png, "PNG", 0, 0, w, h, undefined, "FAST");
  }
  return pdf.output("blob");
}

/**
 * Entrega o arquivo. iOS: tenta o menu de compartilhar com o arquivo; se o
 * navegador recusar (o gesto do toque expira durante a rasterizacao), cai no
 * download comum. Cancelar o menu nao baixa nada.
 */
export async function entregarPdf(blob, nome) {
  const arquivo = new File([blob], nome, { type: "application/pdf" });
  if (ehIOS() && navigator.canShare?.({ files: [arquivo] })) {
    try {
      await navigator.share({ files: [arquivo], title: nome });
      return "compartilhado";
    } catch (err) {
      if (err?.name === "AbortError") return "cancelado";
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
  return "baixado";
}
