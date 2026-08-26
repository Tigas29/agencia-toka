/**
 * Guarda contra o erro que já quebrou o build três vezes neste projeto:
 * uma crase dentro de um comentário CSS de um bloco `styled`.
 *
 * A crase encerra o template literal, e o esbuild reclama de sintaxe
 * numa linha adiante ("Expected ; but found X"), longe da causa. O dev
 * server devolve 500 na rota inteira. Nada no editor avisa antes.
 *
 * A varredura ignora comentários JSDoc (`/** ... *\/` na coluna zero,
 * fora de qualquer template) e olha só o miolo dos blocos styled/css/
 * createGlobalStyle, que é onde a crase é fatal.
 *
 *   node scripts/checa-crase-styled.mjs [dir]
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const raiz = process.argv[2] ?? "src";
const ABRE = /\b(styled(?:\.[A-Za-z0-9]+|\([^)]*\))?|css|createGlobalStyle|keyframes)(?:\.attrs\([^)]*\))?`/g;

function arquivos(dir) {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) return arquivos(caminho);
    return [".js", ".jsx", ".ts", ".tsx"].includes(extname(nome)) ? [caminho] : [];
  });
}

const problemas = [];

for (const caminho of arquivos(raiz)) {
  const txt = readFileSync(caminho, "utf8");
  for (const abre of txt.matchAll(ABRE)) {
    const inicio = abre.index + abre[0].length;
    // O fim do template é a próxima crase que não esteja escapada.
    let i = inicio;
    while (i < txt.length) {
      if (txt[i] === "\\") { i += 2; continue; }
      if (txt[i] === "`") break;
      i += 1;
    }
    const corpo = txt.slice(inicio, i);
    // Uma crase dentro de um comentário CSS já terminou o template acima,
    // então o que sobra é procurar comentário aberto e não fechado.
    const comentarios = corpo.match(/\/\*[^]*?\*\//g) ?? [];
    const soltos = corpo.split("/*").length - 1 !== comentarios.length;
    if (soltos) {
      const linha = txt.slice(0, i).split("\n").length;
      problemas.push(`${caminho}:${linha} comentário CSS não fechado (crase dentro dele?)`);
    }
  }
}

if (problemas.length) {
  console.error("Crase dentro de bloco styled:\n" + problemas.join("\n"));
  process.exit(1);
}
console.log("ok: nenhuma crase suspeita em bloco styled");
