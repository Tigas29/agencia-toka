import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/GLOBAL/loading/index";

const Home = lazy(() => import("./pages/home/index"));
const Wpp = lazy(() => import("./pages/wpp/index"));
const ClientForm = lazy(() => import("./pages/clientForm/index"));
export function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Wpp />} />
        <Route path="/clienteForm" element={<ClientForm />} />
        <Route path="/homepage" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
