import React from 'react'
import { useNavigate } from 'react-router-dom'
import './assets/styles/Banner.css'
import './assets/styles/App.css'
import HeaderPrincipal from './components/HeaderPrincipal'
import Footer from './components/Footer'

const App: React.FC = () => {
  const navigate = useNavigate()

  const highlights = [
    {
      title: 'Estratégia digital',
      text: 'Planejamento claro para transformar ideias em produtos com presença forte.'
    },
    {
      title: 'Arquitetura escalável',
      text: 'Soluções pensadas para crescer junto com a sua operação e o seu público.'
    },
    {
      title: 'Experiência premium',
      text: 'Interfaces modernas, fluídas e preparadas para gerar confiança e conversão.'
    }
  ]

  const metrics = [
    { value: '+20', label: 'projetos entregues' },
    { value: '24/7', label: 'suporte e acompanhamento' },
    { value: '100%', label: 'foco em resultado' }
  ]

  return (
    <div className='home-shell'>
      <HeaderPrincipal />

      <main className='home-main'>
        <section className='hero-section'>
          <div className='hero-copy'>
            <span className='hero-badge'>🚀 Soluções digitais de alto impacto</span>
            <h1>Construímos produtos e experiências tecnológicas que convertem.</h1>
            <p>
              Da ideia ao lançamento, unimos design, engenharia e estratégia para elevar
              sua presença digital com velocidade, precisão e inovação.
            </p>
            <div className='hero-actions'>
              <a href={`mailto:${process.env.REACT_APP_MAIL}`} className='cta-button'>
                Fale com a equipe
              </a>
              <button className='secondary-button' onClick={() => navigate('/request-devs')}>
                Solicitar serviço
              </button>
            </div>
            <div className='hero-metrics'>
              {metrics.map((item) => (
                <div key={item.label} className='metric-card'>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='hero-visual'>
            <div className='visual-card'>
              <div className='visual-ring' />
              <div className='visual-content'>
                <p className='visual-label'>Atendimento ágil</p>
                <h3>Uma parceria tecnológica moderna, estratégica e próxima.</h3>
                <ul>
                  <li>Interfaces de alto impacto</li>
                  <li>Integração com sistemas e APIs</li>
                  <li>Suporte contínuo e evolução</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className='highlights-section'>
          <div className='section-panel'>
            <div className='section-heading'>
              <span className='pill'>Por que a Kawa</span>
              <h2>Mais do que tecnologia: uma parceria estratégica.</h2>
            </div>
            <div className='feature-grid'>
              {highlights.map((item) => (
                <article key={item.title} className='feature-card'>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className='container-home'>
          <div className='left'>
            <section className='banner'>
              <div className='banner-left'>
                <img
                  src={require('./assets/images/kawa.png')}
                  alt='Kawa Tecnologia'
                />
              </div>
              <div className='banner-center'>
                <h1>Bem-vindo à Kawa Tecnologia</h1>
                <h2>
                  Transformando ideias criativas em negócios rentáveis e lucrativos.
                </h2>
                <h3>
                  Tire seu projeto do papel e veja o que podemos construir juntos.
                </h3>
                <p>
                  <a href={`mailto:${process.env.REACT_APP_MAIL}`} className='cta-button'>
                    Contate-nos
                  </a>
                </p>
              </div>
            </section>

            <div className='info-grid'>
              <div className='info-card'>
                <h3>Desenvolvimento sob medida</h3>
                <p>Plataformas, apps e integrações feitos para o seu contexto.</p>
              </div>
              <div className='info-card'>
                <h3>Performance e crescimento</h3>
                <p>Estratégia, design e tecnologia alinhados para gerar valor.</p>
              </div>
            </div>
          </div>
        </section>

        <section id='sobre-nos' className='about-section'>
          <div className='about-grid'>
            <article className='about-card'>
              <h2>Sobre Nós</h2>
              <p>
                Estamos focados em transformar experiências com tecnologia em algo vivo,
                útil e memorável para as pessoas e negócios.
              </p>
            </article>
            <article className='about-card'>
              <h2>Projetos</h2>
              <p>
                Explore nossos ambientes digitais e veja como a Kawa conecta estratégia,
                produto e execução.
              </p>
              <p>
                <a href={process.env.REACT_APP_URL + '/solutions'} className='devs-link' title='Entre na Kawa Solutions'>
                  Kawa Solutions
                </a>
              </p>
            </article>
            <article className='about-card'>
              <h2>Contato</h2>
              <p>Entre em contato conosco pelo Whatsapp: (11) 91428-7025.</p>
              <p>Estamos prontos para transformar a sua próxima ideia em realidade.</p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
