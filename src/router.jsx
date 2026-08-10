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
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
