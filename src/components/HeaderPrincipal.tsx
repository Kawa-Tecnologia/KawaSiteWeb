import React from 'react'
import Navigation from './Navigation'

const HeaderPrincipal = () => {
  return (
    <header className='header'>
      <a href='/' className='logo-container'>
        <img
          className='logo'
          src={require('../assets/images/kawa1.png')}
          alt='Kawa Tecnologia'
          loading='lazy'
        />
        <div className='brand-copy'>
          <span className='brand-name'>KAWA</span>
          <span className='brand-subtitle'>Tecnologia</span>
        </div>
      </a>
      <Navigation />
    </header>
  )
}

export default HeaderPrincipal
