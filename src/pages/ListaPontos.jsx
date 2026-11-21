import { useState } from "react"
import {useEffect} from "react"

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
   
}

export default ListaPontos