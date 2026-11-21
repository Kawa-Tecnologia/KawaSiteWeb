import React from 'react'
import Seo from '../../components/Seo'
import '../../assets/styles/ThankyouPage.css'

const ThankYouPage = () => {
  return (
    <div className='thank-you-container'>
      <Seo
        title='Obrigado pela sua avaliação | Kawa Tecnologia'
        description='Recebemos a sua avaliação. A Kawa agradece o retorno sobre o atendimento.'
        path='/solutions/thankyou'
        noindex
      />
      <img src={require('../../assets/images/kawa.png')} alt='Kawa Tecnologia' loading="lazy" />
      <p className='thank-you-brand'>Kawa Solutions</p>
      <h3>Transformando ideias em negócios lucrativos.</h3>
      <h1>Obrigado pela sua avaliação!</h1>
    </div>
  )
}

export default ThankYouPage
