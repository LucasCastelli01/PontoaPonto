import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NovoPonto(){
    


    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    
    function cadastrarPonto(e){
        e.preventDefault()
        console.log("Enviando formulário...")
    }

    return (<> 
    
        <h1>Cadastrar novo ponto</h1>
        <p>Preencha os dados do ponto geográfico.</p>
        





        <form onSubmit={cadastrarPonto}>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />

            <label htmlFor="Descricao">Descrição:</label>
            <input type="text" id="Descricao" name="Descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

            <label htmlFor="Longitude">Longitude:</label>
            <input type="number" id="Longitude" name="Longitude" required value={longitude} onChange={(e) => setLongitude(e.target.value)} />

            <label htmlFor="Latitude">Latitude:</label>
            <input type="number" id="Latitude" name="Latitude" required value={latitude} onChange={(e) => setLatitude(e.target.value)}/>

            <button type="submit">Cadastrar ponto</button>
            
            

        </form>
    </>)
    
}

export default NovoPonto