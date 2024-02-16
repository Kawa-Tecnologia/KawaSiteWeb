import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContainer = () => {
  const [pontos, setPontos] = useState(0);

  // Aqui você pode acessar as informações do usuário, como nome, tag de dev e quantidade de pontos
  const userName = "Usuário Exemplo";
  const devTag = "Dev";
  const points = 100;
  const navigate = useNavigate();

  const handleAdquirirPontos = () => {
    // Aqui você pode adicionar lógica para adquirir pontos
    // Por exemplo, você pode fazer uma solicitação para o backend para adicionar pontos ao usuário
    // Atualize o estado dos pontos após adquiri-los
    const novosPontos = pontos + 100; // Exemplo: adicionar 100 pontos
    setPontos(novosPontos);
  };

  const handleProfile = () => {
    navigate("/devs/profile");
  };
  return (
    <div className="user-container">
      <h3>{userName}</h3>
      <button onClick={handleProfile}>Perfil do Usuario</button>

      <p>Avaliação: {points}</p>
      <p>Tag de Dev: {devTag}</p>
      <p>Pontos: {points}</p>
      <button onClick={handleAdquirirPontos}>Adquirir Pontos</button>
    </div>
  );
};

export default UserContainer;
