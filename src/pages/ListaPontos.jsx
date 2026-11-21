import { useState } from "react"
import {useEffect} from "react"
import { Link } from "react-router-dom"

function ListaPontos() {
    const [pontos, setPontos] = useState([]);

    useEffect(() => {
    buscarPontos();
    }, []);

    async function buscarPontos() {
    const resposta = await fetch("https://geopoint-6x4u.onrender.com/api/points");
    if (!resposta.ok){
        console.log("ERRO 404")
        return;
    }
    const dados = await resposta.json();
    console.log(dados);
    setPontos(dados)


}
   
return (
    <>
        <h1>Meus pontos geográficos</h1>

        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Ações</th>
                </tr>

            </thead>

            <tbody>
                {pontos.map((ponto) => {
                    return (
                        <tr key={ponto.id}>
                            <td>{ponto.name}</td>
                            <td>{ponto.description}</td>
                            <td>{ponto.latitude}</td>
                            <td>{ponto.longitude}</td>
                            <td>
                                <Link to={`/pontos/${ponto.id}`}>Ver</Link>
                                <button>Editar</button>
                                <button>Excluir</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
);

}

export default ListaPontos