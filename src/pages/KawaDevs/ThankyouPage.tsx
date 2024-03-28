import React from 'react'
import '../../assets/styles/ThankyouPage.css'

const ThankYouPage = () => {
  return (
    <div className='thank-you-container'>
      <img src={require('../../assets/images/kawa.jpg')} alt='Kawa Devs' loading="lazy" />
      <h1>Kawa Devs</h1>
      <h3>Transformando sua carreira através de pessoas.</h3>

      <h1>Obrigado pela sua compra!</h1>
      <p>Agradecemos por adquirir pontos em nossa plataforma.</p>
      <p>Em instantes os pontos serão creditados na sua conta.</p>
    </div>
  )
}

export default ThankYouPage
