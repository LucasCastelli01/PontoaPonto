import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buscarPonto, excluirPonto } from "../services/api.js";
import MapaPontos from "../components/MapaPontos.jsx";

function DetalhePonto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ponto, setPonto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    buscarPonto(id)
      .then((dados) => {
        if (ativo) setPonto(dados); // se a api responder guarda os dados em ponto
      })
      .catch((error) => {
        if (ativo)
          setErro(error.message || "Não foi possível carregar o ponto.");
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, [id]);

  async function handleExcluir() {
    if (!window.confirm(`Deseja excluir o ponto "${ponto.name}"?`)) return;
    try {
      await excluirPonto(id);
      navigate("/pontos", { replace: true }); // se excluiu com sucesso volta pra /pontos
    } catch (error) {
      setErro(error.message || "Não foi possível excluir o ponto.");
    }
  }

  if (carregando)
    return (
      <section className="pagina">
        <p className="aviso">Carregando ponto...</p>
      </section>
    );
  if (erro && !ponto)
    return (
      <section className="pagina">
        <p className="aviso aviso-erro" role="alert">
          {erro}
        </p>
        <Link className="botao botao-secundario" to="/pontos">
          Voltar para os pontos
        </Link>
      </section>
    );
  if (!ponto) return null; // se n tem ponto pra exibir retorna null n renderiza nada

  return (
    <section className="pagina">
      <div className="acoes-cabecalho">
        <Link className="botao botao-secundario" to="/pontos">
          ← Voltar aos pontos
        </Link>
        <Link className="botao botao-secundario" to={`/pontos/${id}/editar`}>
          Editar ponto
        </Link>
        <button
          className="botao botao-secundario botao-excluir"
          onClick={handleExcluir}
          aria-label="Excluir ponto"
        >
          Excluir
        </button>
      </div>
      <h1 className="titulo-detalhe">{ponto.name}</h1>
      <p className="texto-secundario descricao-detalhe">
        {ponto.description || "Ponto geográfico cadastrado."}
      </p>
      {erro && (
        <p className="aviso aviso-erro" role="alert">
          {erro}
        </p>
      )}
      <div className="detalhe-layout">
        <MapaPontos
          className="mapa-detalhe"
          pontos={[ponto]}
          centro={[Number(ponto.latitude), Number(ponto.longitude)]}
          zoom={14}
          rotulo={`Mapa de ${ponto.name}`} // passa o ponto para o mapa 
        />
        <dl className="detalhes-card">
          <dt className="cabecalho-informacoes">INFORMAÇÕES DO PONTO</dt>
          <div>
            <dt>Nome</dt>
            <dd>{ponto.name}</dd>
          </div>
          <div>
            <dt>Descrição</dt>
            <dd>{ponto.description || "Sem descrição"}</dd>
          </div>
          <div>
            <dt>Latitude</dt>
            <dd>{ponto.latitude}</dd>
          </div>
          <div>
            <dt>Longitude</dt>
            <dd>{ponto.longitude}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default DetalhePonto;
