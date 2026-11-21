import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function DetalhePonto() {
    const { id } = useParams();
    const [ponto, setPonto] = useState(null);

    useEffect(() => {
    buscarPonto();
    }, []);

    async function buscarPonto() {
    const resposta = await fetch(`https://geopoint-6x4u.onrender.com/api/points/${id}`);
    if (!resposta.ok){
        console.log("Erro 404")
        return 
    }
    const dados = await resposta.json();
    setPonto(dados  )
        
    }


    return (
        <>
            <h1>Detalhes do ponto</h1>
            {ponto && <p>{ponto.name}, {ponto.description}, {ponto.latitude}, {ponto.longitude}</p>}
        </>
        
    );
    
}

export default DetalhePonto;