import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NovoPonto(){
    


    return (<> 
    
        <h1>Cadastrar novo ponto</h1>
        <p>Preencha os dados do ponto geográfico.</p>
        

        <form>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required />

            <label htmlFor="Descricao">Descrição:</label>
            <input type="text" id="Descricao" name="Descricao" />

            <label htmlFor="Longitude">Longitude:</label>
            <input type="number" id="Longitude" name="Longitude" required />

            <label htmlFor="Latitude">Latitude:</label>
            <input type="number" id="Latitude" name="Latitude" required />

            <button type="submit">Cadastrar ponto</button>

        </form>
    </>)
    
}