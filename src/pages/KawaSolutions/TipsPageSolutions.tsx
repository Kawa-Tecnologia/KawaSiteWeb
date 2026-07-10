import React from 'react';
import '../../assets/styles/Tips.css';
import Header from './Header';
import { Link } from 'react-router-dom';

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

function TipsPageSolutions() {
  return (
    <div className='App'>
      <Header />
      <div className='tips-page'>
        <section className='tips-hero'>
          <div className='tips-hero-content'>
            <p className='tips-eyebrow'>Guia estratégico</p>
            <h1>Planejar é o primeiro grande diferencial de qualquer projeto de tecnologia.</h1>
            <p>
              A Kawa transforma ideias em soluções com foco em clareza, crescimento e experiência de uso.
            </p>
            <div className='tips-actions'>
              <Link to='/solutions' className='tips-secondary'>Voltar para soluções</Link>
            </div>
          </div>

          <div className='tips-hero-card'>
            <h3>Em que fase você está?</h3>
            <ul>
              <li>Precisa de posicionamento digital</li>
              <li>Quer vender mais online</li>
              <li>Deseja automatizar processos</li>
            </ul>
          </div>
        </section>

        <section className='tips-section'>
          <div className='tips-section-header'>
            <p className='tips-eyebrow'>Conhecimento útil</p>
            <h2>Antes de decidir, revise estes pontos-chave</h2>
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
      </div>
    </div>
  );
}

export default TipsPageSolutions;