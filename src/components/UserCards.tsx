import React from 'react'

interface TrainingCard {
  trainer: string
  content: string
}

const UserCards: React.FC = () => {
  // Aqui você pode obter os cards criados pelos treinadores
  const trainingCards: TrainingCard[] = [
    { trainer: 'Treinador 1', content: 'Conteúdo do Card 1' },
    { trainer: 'Treinador 2', content: 'Conteúdo do Card 2' },
    // Adicione mais cards de treinamento, se necessário
  ]

  return (
    <div className="training-cards">
      <h2>Cards Criados pelos Treinadores</h2>
      {trainingCards.map((card, index) => (
        <div className="card" key={index}>
          <h3>Treinador: {card.trainer}</h3>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  )
}

export default UserCards
