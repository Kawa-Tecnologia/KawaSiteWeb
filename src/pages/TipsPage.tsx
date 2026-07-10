import React from 'react'
import '../assets/styles/Tips.css'
import HeaderPrincipal from '../components/HeaderPrincipal'

const tipGroups = [
  {
    title: 'Sites institucionais e landing pages',
    description:
      'Estruture a mensagem certa desde o primeiro contato e defina metas claras para o projeto.',
    bullets: ['Objetivo do site', 'Público-alvo', 'Estrutura de navegação', 'CTA claro']
  },
  {
    title: 'Lojas virtuais',
    description:
      'Organize produtos, pagamentos e entrega para oferecer uma experiência de compra segura e fluida.',
    bullets: ['Catálogo bem organizado', 'Pagamentos confiáveis', 'Entrega e pós-venda', 'Marketing digital']
  },
  {
    title: 'Sistemas e automações',
    description:
      'Antes de desenvolver, identifique os processos que precisam de escala, rastreio e eficiência.',
    bullets: ['Necessidades reais', 'Integrações', 'Usabilidade', 'Suporte contínuo']
  }
]

function TipsPage() {
  return (
    <div className='App'>
      <HeaderPrincipal />
      <div className='tips-page'>
        <section className='tips-hero'>
          <div className='tips-hero-content'>
            <p className='tips-eyebrow'>Guia de decisão</p>
            <h1>Antes de começar, transforme dúvida em estratégia.</h1>
            <p>
              A Kawa ajuda empresas a definir o caminho certo para websites, lojas e sistemas com mais clareza, velocidade e resultado.
            </p>
            <div className='tips-actions'>
              <a href='/request-devs' className='tips-primary'>Solicitar projeto</a>
              <a href='/about-us' className='tips-secondary'>Conhecer a Kawa</a>
            </div>
          </div>

          <div className='tips-hero-card'>
            <h3>Checklist rápido</h3>
            <ul>
              <li>Defina o objetivo do projeto</li>
              <li>Liste os públicos e necessidades</li>
              <li>Escolha a solução certa para escalar</li>
              <li>Prepare uma comunicação clara</li>
            </ul>
          </div>
        </section>

        <section className='tips-section'>
          <div className='tips-section-header'>
            <p className='tips-eyebrow'>O que merece atenção</p>
            <h2>Os pilares que fazem um projeto crescer com mais segurança</h2>
          </div>

          <div className='tips-grid'>
            {tipGroups.map(item => (
              <article className='tips-card' key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.bullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className='tips-section tips-section-alt'>
          <div className='tips-highlight'>
            <h3>Mais do que entregar tecnologia, construímos clareza para a decisão certa.</h3>
            <p>
              Com uma abordagem estratégica, a Kawa conecta planejamento, experiência e execução para transformar ideias em presença digital forte.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TipsPage