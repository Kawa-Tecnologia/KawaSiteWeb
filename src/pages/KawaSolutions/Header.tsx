import React from 'react'

const Header = () => {
  return (
    <header className='solutions-hero'>
      <div className='solutions-hero__content'>
        <span className='solutions-hero__badge'>Kawa Solutions</span>
        <h1>Transforme ideias em produtos digitais com excelência.</h1>
        <p>
          Criamos websites, lojas virtuais, plataformas e soluções sob medida para impulsionar resultados reais.
        </p>
        <div className='solutions-hero__actions'>
          <a href='#services-solutions' className='solutions-hero__primary'>Conhecer serviços</a>
          <a href='/request-devs' className='solutions-hero__secondary'>Solicitar atendimento</a>
        </div>
      </div>
    </header>
  )
}

export default Header