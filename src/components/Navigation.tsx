import React, { useState } from 'react'
import ContactButton from './Whatsapp'
import '../assets/styles/Navigation.css' // Arquivo CSS para estilos

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
      <div className='nav-header' onClick={toggleMenu}>
        <div className='nav-toggle'></div>
      </div>
      <ul className='nav-list'>
        <li className='nav-item'>
          <a href='/tips' className='nav-link'>
            Dicas
          </a>
        </li>
        <li className='nav-item'>
          <a href='/' className='nav-link'>
            Pagina Principal
          </a>
        </li>
        <li className='nav-item'>
          <a href='/request-devs' className='nav-link'>
            Solicite um Serviço
          </a>
        </li>
        <li className='nav-item'>
          <a href='/devs' className='nav-link'>
            Area Devs
          </a>
        </li>
        <li className='nav-item'>
          <a href='/about-us' className='nav-link'>
            Sobre Nós
          </a>
        </li>
        <li className='nav-item'>
          <ContactButton />
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
