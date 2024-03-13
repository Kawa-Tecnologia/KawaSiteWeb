import React from 'react'
import EmailButton from './Mail'

const NavigationDev: React.FC = () => {
  return (
    <nav className='nav'>
      <ul className='nav-list'>
        {
          <div>
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
            <EmailButton />
          </div>
        }
      </ul>
    </nav>
  )
}

export default NavigationDev
