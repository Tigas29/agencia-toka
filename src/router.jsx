import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/GLOBAL/loading/index";

const Home = lazy(() => import("./pages/home/index"));
const Wpp = lazy(() => import("./pages/wpp/index"));
const ClientForm = lazy(() => import("./pages/clientForm/index"));
const QuizForm = lazy(() => import("./pages/quizForm/index"));
const Aplicacao = lazy(() => import("./pages/aplicacao/index"));
const Obrigado = lazy(() => import("./pages/obrigado/index"));
const Lp = lazy(() => import("./pages/Lp/index"));
const Habitat = lazy(() => import("./pages/habitat/index"));
const Proposta = lazy(() => import("./pages/proposta/index"));

/* Home v2: a mesma casa na fundação de marca nova, no ar em paralelo com
   a de `/` para as duas poderem ser lidas lado a lado antes da troca. */
const HomeV2 = lazy(() => import("./pages/home-v2/index"));

export function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/wpp" element={<Wpp />} />
        <Route path="/clienteForm" element={<ClientForm />} />
        <Route path="/quizForm-fisio" element={<QuizForm />} />
        <Route path="/aplicacao" element={<Aplicacao />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/LandingPage" element={<Lp />} />
        <Route path="/habitat" element={<Habitat />} />
        <Route path="/proposta/:cliente" element={<Proposta />} />
        <Route path="/v2" element={<HomeV2 />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
