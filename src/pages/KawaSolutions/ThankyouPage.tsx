import React from 'react'
import Seo from '../../components/Seo'
import HeaderPrincipal from '../../components/HeaderPrincipal'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import '../../assets/styles/ThankyouPage.css'

const ThankYouPage = () => {
  return (
    <div className='page-shell'>
      <Seo
        title='Obrigado pela sua avaliação | Kawa Tecnologia'
        description='Recebemos a sua avaliação. A Kawa agradece o retorno sobre o atendimento.'
        path='/solutions/thankyou'
        noindex
      />
      <HeaderPrincipal />
      <main className='page-main'>
        <div className='thank-you-container glass-card'>
          <img src={require('../../assets/images/kawa.png')} alt='Kawa Tecnologia' loading='lazy' />
          <p className='thank-you-brand'>Kawa Solutions</p>
          <h3>Transformando ideias em negócios lucrativos.</h3>
          <h1>Obrigado pela sua avaliação!</h1>
          <p className='thank-you-note'>
            Recebemos o seu retorno e usaremos ele para melhorar cada vez mais o
            nosso atendimento.
          </p>
          <Link to='/' className='cta-button'>
            Voltar para o início
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ThankYouPage
