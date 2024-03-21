import React from 'react'
import Navigation from './Navigation'

const HeaderPrincipal = () => {
  return (
    <header className='header'>
      <div className='logo-container'>
        <img
          className='logo'
          src={require('../assets/images/kawa1.png')}
          alt='Kawa Tecnologia'
        />
      </div>
      <Navigation />
    </header>
  )
}

export default HeaderPrincipal
