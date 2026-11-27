import { Link, Navigate, Route, Routes } from "react-router-dom";
import Cabecalho from "./components/Cabecalho.jsx";
import ListaPontos from "./pages/ListaPontos.jsx";
import DetalhePonto from "./pages/DetalhePonto.jsx";
import FormPonto from "./pages/FormPonto.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Cabecalho />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/pontos" replace />} />
          <Route path="/pontos" element={<ListaPontos />} />
          <Route path="/pontos/novo" element={<FormPonto />} />
          <Route path="/pontos/:id/editar" element={<FormPonto />} />
          <Route path="/pontos/:id" element={<DetalhePonto />} />
          <Route
            path="*"
            element={
              <section className="pagina">
                <h1>Página não encontrada</h1>
                <Link className="botao botao-principal" to="/pontos">
                  Voltar para os pontos
                </Link>
              </section>  //pag n encontrada
            } 
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
