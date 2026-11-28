import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
          <Link to='/' className='nav-link'>
            Página inicial
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/about-us' className='nav-link'>
            Sobre Nós
          </Link>
        </li>
        <li className='nav-item'>
          <EmailButton />
        </li>
      </ul>
    </nav>
  )
}

export default NavigationDev
