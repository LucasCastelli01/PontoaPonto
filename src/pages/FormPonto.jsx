import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { atualizarPonto, buscarPonto, criarPonto } from "../services/api.js";
import MapaDecorativo from "../components/MapaDecorativo.jsx";

const inicial = { name: "", description: "", latitude: "", longitude: "" };

function FormPonto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState(inicial);
  const [carregando, setCarregando] = useState(Boolean(id));
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!id) return;
    let ativo = true;
    buscarPonto(id)
      .then((ponto) => {
        if (ativo) setFormulario({ name: ponto.name ?? "", description: ponto.description ?? "", latitude: String(ponto.latitude ?? ""), longitude: String(ponto.longitude ?? "") });
      })
      .catch((error) => { if (ativo) setErro(error.message || "Não foi possível carregar o ponto."); })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, [id]);

  function alterarCampo(event) {
    setFormulario({ ...formulario, [event.target.name]: event.target.value });
  }

  async function salvar(event) {
    event.preventDefault();
    setErro("");
    const nome = formulario.name.trim();
    const latitude = Number(formulario.latitude);
    const longitude = Number(formulario.longitude);
    if (!nome) return setErro("Informe o nome do ponto.");
    if (nome.length > 100) return setErro("O nome deve ter no máximo 100 caracteres.");
    if (formulario.description.length > 255) return setErro("A descrição deve ter no máximo 255 caracteres.");
    if (formulario.latitude === "" || !Number.isFinite(latitude) || latitude < -90 || latitude > 90) return setErro("Informe uma latitude entre -90 e 90.");
    if (formulario.longitude === "" || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) return setErro("Informe uma longitude entre -180 e 180.");

    setSalvando(true);
    const ponto = { name: nome, description: formulario.description.trim(), latitude, longitude };
    try {
      const salvo = id ? await atualizarPonto(id, ponto) : await criarPonto(ponto);
      navigate(id ? `/pontos/${id}` : `/pontos/${salvo.id}`, { replace: true });
    } catch (error) {
      setErro(error.message || "Não foi possível salvar o ponto.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) return <section className="pagina"><p className="aviso">Carregando ponto...</p></section>;

  return (
    <section className="pagina pagina-formulario">
      <nav className="breadcrumb" aria-label="Trilha de navegação"><Link to="/pontos">Pontos</Link><span>/</span><span>{id ? "Editar ponto" : "Novo ponto"}</span></nav>
      <h1>{id ? "Editar ponto" : "Novo ponto"}</h1>
      <p className="texto-secundario">{id ? "Atualize os dados do ponto geográfico." : "Cadastre um local com nome, descrição e coordenadas."}</p>
      {erro && <p className="aviso aviso-erro" role="alert">{erro}</p>}
      <div className="form-layout">
        <form className="formulario" onSubmit={salvar}>
          <label className="campo" htmlFor="name"><span>Nome do ponto <b>*</b></span><input id="name" name="name" placeholder="Ex.: Mirante do Parque" required maxLength={100} value={formulario.name} onChange={alterarCampo} /></label>
          <label className="campo" htmlFor="description"><span>Descrição</span><textarea id="description" name="description" placeholder="Descreva este local" maxLength={255} rows={3} value={formulario.description} onChange={alterarCampo} /></label>
          <div className="campos-duplos">
            <label className="campo" htmlFor="latitude"><span>Latitude <b>*</b></span><input id="latitude" name="latitude" type="number" step="any" min="-90" max="90" placeholder="-28.2624" required value={formulario.latitude} onChange={alterarCampo} /></label>
            <label className="campo" htmlFor="longitude"><span>Longitude <b>*</b></span><input id="longitude" name="longitude" type="number" step="any" min="-180" max="180" placeholder="-52.4087" required value={formulario.longitude} onChange={alterarCampo} /></label>
          </div>
          <p className="dica-coordenadas">◎ &nbsp; Coordenadas em graus decimais</p>
          <div className="acoes-formulario"><button className="botao botao-principal" type="submit" disabled={salvando}>{salvando ? "Salvando..." : id ? "Salvar alterações" : "Cadastrar ponto"}</button><Link className="botao botao-secundario" to={id ? `/pontos/${id}` : "/pontos"}>Cancelar</Link></div>
          <p className="campos-obrigatorios">* Campos obrigatórios</p>
        </form>
        <aside className="previsao-localizacao"><p>PRÉVIA DA LOCALIZAÇÃO</p><MapaDecorativo className="mapa-formulario" rotulo="Prévia ilustrativa" /><span>As coordenadas identificam a posição do ponto.</span></aside>
      </div>
    </section>
  );
}

export default FormPonto;
