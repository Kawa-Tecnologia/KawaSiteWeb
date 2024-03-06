import React from 'react'
import ContactButton from './Whatsapp'



const Navigation: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        {(
          
          <div>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Pagina Principal
              </a>
            </li>
               <li className="nav-item">
              <a href="/request-devs" className="nav-link">
                Solicite um Dev
              </a>
            </li>
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
        
      </ul>
    </nav>
  )
}

export default Navigation
