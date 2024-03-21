import React, { useState } from 'react'
import EmailButton from './Mail'
import '../assets/styles/NavigationDevs.css'

const NavigationDev: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className='nav'>
      <div className='nav-header' onClick={toggleMenu}>
        <div className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
      <ul className={`nav-list ${isMenuOpen ? 'open' : ''}`}>
        <li className='nav-item'>
          <a href='/' className='nav-link'>
            Pagina Principal
          </a>
        </li>
        <li className='nav-item'>
          <a href='/devs' className='nav-link'>
            Area Devs
          </a>
        </li>
        <li className='nav-item'>
          <a href='/devs/login' className='nav-link'>
            Login
          </a>
        </li>
        <li className='nav-item'>
          <a href='/devs/join-the-team' className='nav-link'>
            Entre na Equipe
          </a>
        </li>
        <li className='nav-item'>
          <a href='/devs/about-us' className='nav-link'>
            Sobre Nós Devs
          </a>
        </li>
        <li className='nav-item'>
          <EmailButton />
        </li>
      </ul>
    </nav>
  )
}

export default NavigationDev
