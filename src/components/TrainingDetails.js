import React from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/TrainingDetails.css";
import Menu from "./Menu";
import UserContainer from "./UserContainer";
const TrainingDetails = () => {
  const { id } = useParams();
  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.min(Math.round(rating), 5); // Limita o valor máximo de rating a 5
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= roundedRating ? "filled" : ""}>
          ★
        </span>
      );
    }
    return stars;
  };
  // Aqui você pode buscar os detalhes do treinamento com base no id
  // Isso pode ser feito chamando uma API, acessando um banco de dados, ou usando um array pré-definido, como neste exemplo
  const trainingDetails = [
    {
      id: 1,
      trainer: "John Doe",
      devTag: "Frontend Developer",
      date: "15/02/2024",
      time: "09:00",
      details:
        "Este treinamento abordará os fundamentos do desenvolvimento frontend, incluindo HTML, CSS e JavaScript. Não é necessário conhecimento prévio.",
      duration: "2 horas",
      developer_review: 4,
    },
    {
      id: 2,
      trainer: "Jane Smith",
      devTag: "Backend Developer",
      date: "20/02/2024",
      time: "14:00",
      details:
        "Este treinamento abordará os fundamentos do desenvolvimento backend, incluindo Node.js, Express e MongoDB. É recomendado algum conhecimento prévio em programação.",
      duration: "3 horas",
      developer_review: 3,
    },
    // Adicione mais detalhes de treinamento, se necessário
  ];

  // Encontre o detalhe do treinamento com base no id
  const selectedTraining = trainingDetails.find(
    (training) => training.id === parseInt(id)
  );

  if (!selectedTraining) {
    return <div>Detalhes do treinamento não encontrados para o ID {id}</div>;
  }

  return (
    <div className="dashboard">
      <div className="left-container">
        <UserContainer />
        <Menu />
      </div>
      <div className="training-details">
        <h2>Detalhes do Treinamento</h2>
        <div className="detail-item">
          <h3>Treinador:</h3>
          <p>{selectedTraining.trainer}</p>
        </div>
        <div className="detail-item">
          <h3>Tag de Dev:</h3>
          <p>{selectedTraining.devTag}</p>
        </div>
        <div className="detail-item">
          <h3>Titulo:</h3>
          <p>{selectedTraining.title}</p>
        </div>
        <div className="detail-item">
          <h3>Detalhes:</h3>
          <p>{selectedTraining.details}</p>
        </div>
        <div className="detail-item">
          <h3>Tempo de Duração:</h3>
          <p>{selectedTraining.duration}</p>
        </div>
        <div className="detail-item">
          <h3>Data:</h3>
          <p>{selectedTraining.date}</p>
        </div>
        <div className="detail-item">
          <h3>Hora:</h3>
          <p>{selectedTraining.time}</p>
        </div>
        <p>Avaliação do Dev: {selectedTraining.developer_review}</p>
        <div className="stars">
          {renderStars(selectedTraining.developer_review)}
        </div>

        <button className="join-button">Participar</button>
      </div>
    </div>
  );
};

export default TrainingDetails;
