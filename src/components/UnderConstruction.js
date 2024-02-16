import React from 'react';
import '../assets/styles/UnderConstruction.css'; // Importe o arquivo de estilo

const UnderConstruction = () => {
    return (
        <div className="under-container">
            <h1>Em Construção</h1>
            <p>Esta página ainda está em desenvolvimento. Volte em breve para ver o conteúdo completo!</p>
            <img src={require("../assets/images/underconstruction.png")} alt="Em Construção" />
        </div>
    );
};

export default UnderConstruction;