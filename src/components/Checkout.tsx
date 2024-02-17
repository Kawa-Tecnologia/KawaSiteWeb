import React from 'react'
import '../assets/styles/Checkout.css'

// interface User {
//   points: number;
// }

// interface Training {
//   points: number;
// }

// interface Props {
//   user: User;
// }

const Checkout: React.FC = () => {
  const handlePurchase = () => {
    // Lógica para processar a compra, por exemplo, enviar para um servidor
    console.log('Compra realizada!')
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="points-info">
        <p>Pontos disponíveis: {'user?.points'}</p>
        <p>Pontos Necessários: {'training.points'}</p>
      </div>
      <button onClick={handlePurchase}>Finalizar compra</button>
    </div>
  )
}

export default Checkout
