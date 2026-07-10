import React from 'react'
import '../assets/styles/AboutUs.css'
import HeaderPrincipal from '../components/HeaderPrincipal'
import Footer from '../components/Footer'

const pillars = [
  {
    title: 'Missão',
    text:
      'Ajudar pessoas e empresas a transformar ideias em soluções digitais com ética, clareza e impacto real.'
  },
  {
    title: 'Visão',
    text:
      'Ser referência em tecnologia aplicada ao crescimento profissional e empresarial, criando experiências que geram resultado.'
  },
  {
    title: 'Valores',
    text:
      'Excelência, colaboração, integridade, inovação e comunidade orientam cada projeto e cada relacionamento.'
  }
]

const values = [
  'Excelência em execução e atendimento',
  'Colaboração como forma de construir melhor',
  'Integridade em cada decisão e comunicação',
  'Empoderamento para crescer com autonomia',
  'Inovação como combustível para evoluir',
  'Comunidade como base de conexão e respeito'
]

const AboutUs: React.FC = () => {
  return (
    <div>
      <HeaderPrincipal />
      <div className='sobre-nos'>
        <section className='about-hero'>
          <div className='about-hero-content'>
            <p className='about-eyebrow'>Quem somos</p>
            <h1>Construímos soluções digitais com propósito, estratégia e visão de futuro.</h1>
            <p>
              A Kawa é uma empresa que une tecnologia, criatividade e entendimento de negócio para transformar desafios em oportunidades.
            </p>
          </div>
          <div className='about-hero-card'>
            <h3>Por que a Kawa existe?</h3>
            <p>
              Para tornar a tecnologia acessível, inteligente e útil para quem quer crescer com mais autonomia e presença digital.
            </p>
          </div>
        </section>

        <main className='about-main'>
          <div className='about-grid'>
            {pillars.map(item => (
              <section className='section-box' key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </section>
            ))}
          </div>

          <section className='section-box section-box-wide'>
            <h2>Valores que guiam a nossa forma de trabalhar</h2>
            <ul>
              {values.map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default AboutUs
