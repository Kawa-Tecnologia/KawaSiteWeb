import React from 'react'
import '../../assets/styles/ThankyouPage.css'

const ThankYouPage = () => {
  return (
    <div className='thank-you-container'>
      <img src={require('../../assets/images/kawa.jpg')} alt='Kawa Devs' />
      <h1>Kawa Solutions</h1>
      <h3>Transformando ideias em negócios lucrativos.</h3>

      <h1>Obrigado pela sua avaliação!</h1>
    </div>
  )
}

export default ThankYouPage
