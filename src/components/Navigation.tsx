import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ContactButton from './Whatsapp'
import '../assets/styles/Navigation.css' 

// Links internos usam <Link> do react-router para navegação SPA
// (sem recarregar a página inteira a cada clique no menu).

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
          <Link to='/tips' className='nav-link'>
            Dicas
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/' className='nav-link'>
            Pagina Principal
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/about-us' className='nav-link'>
            Sobre Nós
          </Link>
        </li>
        <li className='nav-item'>
          <ContactButton />
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
