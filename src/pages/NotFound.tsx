import React from 'react'
import { Link } from 'react-router-dom'
import HeaderPrincipal from '../components/HeaderPrincipal'
import Seo from '../components/Seo'
import '../assets/styles/App.css'

const NotFound: React.FC = () => {
  return (
    <div className='home-shell'>
      <Seo
        title='Página não encontrada | Kawa Tecnologia'
        description='Este endereço não existe. Volte para a página inicial da Kawa e conheça sites, lojas virtuais e software sob medida.'
        noindex
      />
      <HeaderPrincipal />
      <main className='home-main'>
        <section className='hero-section'>
          <div className='hero-copy'>
            <h1>Página não encontrada</h1>
            <p>O endereço que você abriu não existe ou foi movido.</p>
            <div className='hero-actions'>
              <Link to='/' className='cta-button'>Voltar para o início</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default NotFound
