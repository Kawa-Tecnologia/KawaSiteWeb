import React from 'react'

const LastNews: React.FC = () => {
  // Aqui você pode obter o histórico de divulgação de treinamentos
  const trainingHistory = [
    {
      trainer: 'Treinador 1',
      devTag: 'Dev',
      date: '10/02/2024',
      time: '10:00',
    },
    {
      trainer: 'Treinador 2',
      devTag: 'Dev',
      date: '11/02/2024',
      time: '11:00',
    },
    // Adicione mais itens de histórico de treinamento, se necessário
  ]

  return (
    <div className="training-history">
      <h2>Últimas Notícias</h2>
      <ul>
        {trainingHistory.map((training, index) => (
          <li key={index}>
            <p>Autor: {training.trainer}</p>
            <p>Assunto: {training.devTag}</p>
            <p>Insira o texto aqui</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LastNews
