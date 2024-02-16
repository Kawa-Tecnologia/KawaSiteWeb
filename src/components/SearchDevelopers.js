import React, { useState } from 'react';
import "../assets/styles/Search.css";
const SearchDevelopers = () => {
  // Estados para os filtros
  const [linguagem, setLinguagem] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [ferramenta, setFerramenta] = useState('');
  const [tecnologia, setTecnologia] = useState('');
  const [projeto, setProjeto] = useState('');

  // Função para lidar com a busca
  const handleSearch = () => {
    // Implemente aqui a lógica de busca com os filtros selecionados
    console.log('Buscando desenvolvedores com os seguintes filtros:');
    console.log('Linguagem:', linguagem);
    console.log('Experiência:', experiencia);
    console.log('Ferramenta:', ferramenta);
    console.log('Tecnologia:', tecnologia);
    console.log('Projeto:', projeto);
  };

  return (
    <div className="login">
    <div className="container">
      <h1>Página de Busca</h1>
      <div>
        <label>Linguagem de Programação:</label>
        <input type="text" value={linguagem} onChange={(e) => setLinguagem(e.target.value)} />
      </div>
      <div>
        <label>Anos de Experiência:</label>
        <input type="number" value={experiencia} onChange={(e) => setExperiencia(e.target.value)} />
      </div>
      <div>
        <label>Ferramenta:</label>
        <input type="text" value={ferramenta} onChange={(e) => setFerramenta(e.target.value)} />
      </div>
      <div>
        <label>Tecnologia:</label>
        <input type="text" value={tecnologia} onChange={(e) => setTecnologia(e.target.value)} />
      </div>
      <div>
        <label>Projeto:</label>
        <input type="text" value={projeto} onChange={(e) => setProjeto(e.target.value)} />
      </div>
      <button onClick={handleSearch}>Buscar</button>
    </div></div>
  );
};

export default SearchDevelopers;