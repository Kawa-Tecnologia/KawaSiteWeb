import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/Services.css'
const ServicesSection = () => {
  return (
    <section id='services-solutions'>
      <h2>Nossos Serviços</h2>
      <Link to='/solutions/tips'>
        <button
          className='black-button'
          title='Clique aqui para ver nossas dicas!'
        >
          <ul>
            <li>Desenvolvimento de Websites</li>
            <li>Desenvolvimento de Softwares</li>
            <li>Desenvolvimento de Plataformas</li>
            <li>Desenvolvimento de Lojas Virtuais</li>
            <li>Integrações com Redes Sociais</li>
            <li>Suporte Tecnico</li>
            <li>Suporte Operacional</li>
            <li>E muito mais...</li>
          </ul>
        </button>
      </Link>
    </section>
  )
}

export default ServicesSection
