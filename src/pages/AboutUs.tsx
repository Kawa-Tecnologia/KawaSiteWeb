import React from 'react'
import '../assets/styles/AboutUs.css'
import HeaderPrincipal from '../components/HeaderPrincipal'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

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
    <div className='page-shell'>
      <Seo
        title='Sobre a Kawa Tecnologia | Propósito, visão e valores'
        description='Conheça a missão, a visão e os valores da Kawa e como unimos tecnologia e estratégia para transformar ideias em presença digital. Fale com a equipe.'
        path='/about-us'
      />
      <HeaderPrincipal />
      <main className='about-main'>
        <section className='about-hero'>
          <div className='about-hero-content'>
            <p className='pill'>Quem somos</p>
            <h1>Construímos soluções digitais com propósito, estratégia e visão de futuro.</h1>
            <p>
              A Kawa é uma empresa que une tecnologia, criatividade e entendimento de negócio para transformar desafios em oportunidades.
            </p>
          </div>
          <div className='about-hero-card glass-card'>
            <h3>Por que a Kawa existe?</h3>
            <p>
              Para tornar a tecnologia acessível, inteligente e útil para quem quer crescer com mais autonomia e presença digital.
            </p>
          </div>
        </section>

        <div className='about-grid'>
          {pillars.map(item => (
            <section className='section-box glass-card' key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </section>
          ))}
        </div>

        <section className='section-box section-box-wide glass-card'>
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
  )
}

export default AboutUs
