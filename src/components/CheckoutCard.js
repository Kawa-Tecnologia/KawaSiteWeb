import React from 'react';

const CheckoutCards = () => {
  // Aqui você pode obter os cards criados pelos treinadores
  const trainingCards = [
    { trainer: 'Treinador 1', content: 'Conteúdo do Card 1' },
    { trainer: 'Treinador 2', content: 'Conteúdo do Card 2' },
    // Adicione mais cards de treinamento, se necessário
  ];

  return (
    <div className="checkout-cards">
      <h2>Checkouts</h2>
      {trainingCards.map((card, index) => (
        <div className="card" key={index}>
          <h3>Treinador: {card.trainer}</h3>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CheckoutCards;