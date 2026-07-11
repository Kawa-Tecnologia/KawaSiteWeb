import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/Services.css'

const services = [
  'Desenvolvimento de Websites',
  'Desenvolvimento de Softwares',
  'Desenvolvimento de Plataformas',
  'Desenvolvimento de Lojas Virtuais',
  'Integrações com Redes Sociais',
  'Suporte Técnico',
  'Suporte Operacional',
  'E muito mais...'
]

const ServicesSection = () => {
  return (
    <section id='services-solutions' className='services-solutions-section'>
      <div className='services-solutions-section__header'>
        <span className='services-solutions-section__eyebrow'>O que oferecemos</span>
        <h2>Resoluções completas para crescer com tecnologia.</h2>
        <p>Da estratégia inicial ao suporte contínuo, entregamos soluções com foco em velocidade, escalabilidade e experiência do usuário.</p>
      </div>

      <div className='services-solutions-grid'>
        {services.map(service => (
          <div key={service} className='services-solutions-card'>
            <span>✓</span>
            <p>{service}</p>
          </div>
        ))}
      </div>

      <Link to='/solutions/tips' className='services-solutions-link'>
        Ver dicas e boas práticas
      </Link>
    </section>
  )
}

export default ServicesSection
