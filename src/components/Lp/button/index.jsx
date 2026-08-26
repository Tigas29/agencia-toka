import { useNavigate } from "react-router-dom";
import { Cta } from "../../../estilo/ds";
import { Seta } from "../../habitat/icones";

/**
 * Botão de chamada da /LandingPage.
 *
 * Por dentro é o `Cta` do design system; por fora mantém a mesma API de
 * antes (`text`, `showIcon`, `to`), porque ele aparece seis vezes ao
 * longo da página e trocar a chamada em cada seção só produziria ruído
 * no diff sem mudar nada para quem visita.
 *
 * A seta virou o ícone vetorial da marca, o mesmo da /habitat: o antigo
 * era um SVG laranja de arquivo, que continuaria laranja mesmo com a
 * página inteira reconstruída — ícone com cor assada dentro não obedece
 * à faixa em que está.
 */
export default function Button({
  text,
  showIcon = true,
  to = "/clienteForm",
  className,
}) {
  const navigate = useNavigate();

  return (
    <Cta
      type="button"
      className={className}
      onClick={() => navigate(to)}
      aria-label={text}
    >
      {text}
      {showIcon && <Seta />}
    </Cta>
  );
}
