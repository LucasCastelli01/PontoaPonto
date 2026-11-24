import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { excluirPonto, listarPontos } from "../services/api.js";
import MapaPontos from "../components/MapaPontos.jsx";

function ListaPontos() {
  const [pontos, setPontos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarPontos() {
    setCarregando(true);
    setErro("");
    try {
      setPontos(await listarPontos());
    } catch (error) {
      setErro(error.message || "Não foi possível carregar os pontos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPontos();
  }, []);

  const pontosFiltrados = useMemo(() => {
    const termo = filtro.trim().toLocaleLowerCase("pt-BR");
    return pontos
      .filter((ponto) => `${ponto.name} ${ponto.description || ""}`.toLocaleLowerCase("pt-BR").includes(termo))
      .sort((a, b) => ordemAscendente ? a.name.localeCompare(b.name, "pt-BR") : b.name.localeCompare(a.name, "pt-BR"));
  }, [filtro, ordemAscendente, pontos]);

  async function handleExcluir(ponto) {
    if (!window.confirm(`Deseja excluir o ponto "${ponto.name}"?`)) return;
    setErro("");
    try {
      await excluirPonto(ponto.id);
      setPontos((atuais) => atuais.filter((item) => item.id !== ponto.id));
    } catch (error) {
      setErro(error.message || "Não foi possível excluir o ponto.");
    }
  }

  return (
    <section className="pagina">
      <div className="titulo-linha">
        <div>
          <h1>Pontos geográficos</h1>
          <p className="texto-secundario">Visualize e organize os locais cadastrados.</p>
        </div>
        <Link className="botao botao-principal" to="/pontos/novo">+ Novo ponto</Link>
      </div>

      <label className="campo campo-filtro" htmlFor="filtro-pontos">
        <span>Buscar</span>
        <input id="filtro-pontos" type="search" placeholder="Busque por nome ou descrição" value={filtro} onChange={(event) => setFiltro(event.target.value)} />
      </label>
      <button className="botao botao-secundario botao-ordenar" type="button" onClick={() => setOrdemAscendente((ordem) => !ordem)}>
        Ordenar por nome {ordemAscendente ? "↑" : "↓"}
      </button>

      <MapaPontos className="mapa-lista" pontos={pontos} rotulo="Mapa dos pontos cadastrados" />

      {erro && <p className="aviso aviso-erro" role="alert">{erro} <button className="botao-texto" onClick={carregarPontos}>Tentar novamente</button></p>}
      {carregando ? <p className="aviso">Carregando pontos...</p> : !erro && pontosFiltrados.length === 0 ? <p className="aviso">{pontos.length === 0 ? "Nenhum ponto cadastrado." : "Nenhum ponto encontrado para esse filtro."}</p> : null}

      {!carregando && !erro && pontosFiltrados.length > 0 && (
        <div className="tabela-conteiner">
          <table>
            <thead><tr><th>Ponto</th><th>Latitude</th><th>Longitude</th><th>Ações</th></tr></thead>
            <tbody>{pontosFiltrados.map((ponto) => (
              <tr key={ponto.id}>
                <td><Link className="link-nome" to={`/pontos/${ponto.id}`}>{ponto.name}</Link><span className="descricao-ponto">{ponto.description || "Sem descrição"}</span></td>
                <td>{Number(ponto.latitude).toFixed(4)}</td><td>{Number(ponto.longitude).toFixed(4)}</td>
                <td className="acoes"><Link to={`/pontos/${ponto.id}`}>Ver</Link><Link to={`/pontos/${ponto.id}/editar`}>Editar</Link><button className="botao-texto botao-perigo" onClick={() => handleExcluir(ponto)}>Excluir</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ListaPontos;
