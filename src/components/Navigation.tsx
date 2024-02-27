import React from 'react'
import ContactButton from './Whatsapp'

interface NavigationProps {
  currentPage: string
}

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        {currentPage === 'home' && (
          <div>
            <li className="nav-item">
              <a href="/devs" className="nav-link">
                Area Devs
              </a>
            </li>
            <li className="nav-item">
              <a href="/about-us" className="nav-link">
                Sobre Nós
              </a>
            </li>
            <ContactButton />
          </div>
        )}
        {currentPage === 'about-us' && (
          <div>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Pagina Principal
              </a>
            </li>
            <li className="nav-item">
              <a href="/devs" className="nav-link">
                Area Devs
              </a>
            </li>
          </div>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
