export function reais(n) {
  const inteiro = Math.abs(n % 1) < 0.005;
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: inteiro ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
