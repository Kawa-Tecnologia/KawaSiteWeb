import React from 'react'
import { Link } from 'react-router-dom'
import "../../assets/styles/Services.css"

const ServicesSection = () => {
  return (
    <section id='services-solutions'>
      <h2>Nossos Serviços</h2>
      <div className="service-grid">
        <Link to='/solutions/tips' className='black-button' title='Clique aqui para ver nossas dicas!'>
          <span className='service-item'>Desenvolvimento de Websites</span>
        </Link>
        <Link to='/solutions/tips' className='black-button' title='Clique aqui para ver nossas dicas!'>
          <span className='service-item'>Desenvolvimento de Softwares</span>
        </Link>
        <Link to='/solutions/tips' className='black-button' title='Clique aqui para ver nossas dicas!'>
          <span className='service-item'>Desenvolvimento de Plataformas</span>
        </Link>
        <Link to='/solutions/tips' className='black-button' title='Clique aqui para ver nossas dicas!'>
          <span className='service-item'>Desenvolvimento de Lojas Virtuais</span>
        </Link>
        <Link to='/solutions/tips' className='black-button' title='Clique aqui para ver nossas dicas!'>
          <span className='service-item'>Integrações com Redes Sociais</span>
        </Link>
        <Link to='/solutions/tips' className='black-button' title='Clique aqui para ver nossas dicas!'>
          <span className='service-item'>Suporte Técnico</span>
        </Link>
        <Link to='/solutions/tips' className='black-button' title='Clique aqui para ver nossas dicas!'>
          <span className='service-item'>Suporte Operacional</span>
        </Link>
        <Link to='/solutions/tips' className='black-button' title='Clique aqui para ver nossas dicas!'>
          <span className='service-item'>E muito mais...</span>
        </Link>
      </div>
    </section>
  )
}

export default ServicesSection