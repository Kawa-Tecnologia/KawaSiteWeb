import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'

const HeaderPrincipal = () => {
  return (
    <header className='header'>
      <Link to='/' className='logo-container'>
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
      </Link>
      <Navigation />
    </header>
  )
}

export default HeaderPrincipal
