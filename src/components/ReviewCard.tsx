import React from 'react'

interface ReviewCard {
  user: string
  content: string
  review: number
}

const ReviewCards: React.FC = () => {
  const reviewCards: ReviewCard[] = [
    { user: 'Treinador 1', content: 'Conteúdo do Card 1', review: 5 },
    { user: 'Treinador 2', content: 'Conteúdo do Card 2', review: 4 }
  ]

  return (
    <div className='dashboard'>
       <div className='review-cards'>
        <h2>Avaliações dos parceiros</h2>
        {reviewCards.map((card, index) => (
          <div className='card' key={index}>
            <h3>Usuario: {card.user}</h3>
            <p>{card.content}</p>
            <p>Avaliação: {card.review}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewCards
