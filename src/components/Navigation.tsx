import React from 'react'
import ContactButton from './Whatsapp'

const Navigation: React.FC = () => {
  return (
    <nav className='nav'>
      <ul className='nav-list'>
        {
          <div>
            {/* <li className='nav-item'>
              <a href='/donations' className='nav-link'>
                Ajude Quem Precisa
              </a>
            </li> */}
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
            <ContactButton />
          </div>
        }
      </ul>
    </nav>
  )
}

export default Navigation
