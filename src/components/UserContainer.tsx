import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import "../assets/styles/PointsModal.css";

const UserContainer: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const devTag = localStorage.getItem('userEmail');
  const points = localStorage.getItem('userPoints');
const avaliation = 5;

  const handleAdquirirPontos = () => {
    setModalIsOpen(true);
  };

  const handleProfile = () => {
    navigate('/devs/profile');
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCompra = (quantidade: number, preco: number) => {
    // Lógica para processar a compra
    console.log(`Compra de ${quantidade} pontos realizada por R$${preco.toFixed(2)}`);
  };

  return (
    <div className="user-container">
      <h3>{userName}</h3>
      <button onClick={handleProfile}>Perfil do Usuario</button>

      <p>Avaliação: {avaliation}</p>
      <p>Tag de Dev: {devTag}</p>
      <p>Pontos: {points}</p>
      <button onClick={handleAdquirirPontos}>Adquirir Pontos</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal de Adquirir Pontos"
      >
        <h2>Escolha a quantidade de pontos:</h2>
        <div className="pontos-options-container">
          <div className="pontos-option">
            <p>1000 Pontos por R$10,00</p>
            <button onClick={() => handleCompra(1000, 10)}>Comprar</button>
          </div>
          <div className="pontos-option">
            <p>2000 Pontos por R$20,00</p>
            <button onClick={() => handleCompra(2000, 20)}>Comprar</button>
          </div>
          <div className="pontos-option">
            <p>5000 Pontos por R$50,00</p>
            <button onClick={() => handleCompra(5000, 50)}>Comprar</button>
          </div>
          <div className="pontos-option">
            <p>10000 Pontos por R$98,00</p>
            <button onClick={() => handleCompra(10000, 98)}>Comprar</button>
          </div>
        </div>
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
  );
};

export default UserContainer;