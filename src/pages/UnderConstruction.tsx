import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/UnderConstruction.css'
import HeaderPrincipal from '../components/HeaderPrincipal'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

const UnderConstruction: React.FC = () => {
  return (
    <div className='page-shell'>
      <Seo
        title='Página em construção | Kawa Tecnologia'
        description='Esta página da Kawa Tecnologia ainda está em desenvolvimento.'
        path='/under-construction'
        noindex
      />
      <HeaderPrincipal />
      <main className='page-main'>
        <section className='panel under-container'>
          <span className='pill'>Em breve</span>
          <h1>Página em Construção</h1>
          <p>
            Esta página ainda está em desenvolvimento. Volte em breve para ver
            o conteúdo completo!
          </p>
          <img
            src={require('../assets/images/underconstruction.png')}
            alt='Em Construção'
            loading='lazy'
          />
          <Link to='/' className='cta-button'>
            Voltar para o início
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default UnderConstruction
