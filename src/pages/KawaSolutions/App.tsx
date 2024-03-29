import React from 'react'
import Header from './Header'
import ServicesSection from './Services'
import Footer from './Footer'
import RequestDevs from './RequestDevs'
import '../../assets/styles/AppSolutions.css'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useMediaQuery } from 'react-responsive'

const AppSolutions = () => {
  const navigate = useNavigate()

  const handleCadastroClick = () => {
    navigate('/devs/register')
  }
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <Layout
      pageTitle='Kawa Devs'
      pageDescription='Plataforma para solicitação de criação de lojas virtuais, sites institucionais, desenvolvimento de software e treinamentos para desenvolvedores.'
    >
      {!isMobile ? (
        <div className='App'>
          <Header />
          <ServicesSection />
          <p style={{ textAlign: 'center' }}>
            <button
              onClick={handleCadastroClick}
              style={{ alignItems: 'center' }}
            >
              Prestador, realize seu cadastro. Clique aqui
            </button>
          </p>

          <section className='section-box'>
            <div className='container-wrapper'>
              <div className='right-container-request-dev'>
                <RightContainer />
              </div>
              <div className='center-container-request-dev'>
                <RequestDevs />
              </div>
              <div className='left-container-request-dev'>
                <LeftContainer />
              </div>
            </div>
          </section>
          <Footer />
        </div>
      ) : (
        <div className='App'>
          <Header />
          <p style={{ textAlign: 'center' }}>
            <button
              onClick={handleCadastroClick}
              style={{ alignItems: 'center' }}
            >
              Prestador, realize seu cadastro. Clique aqui
            </button>
          </p>

          <section className='section-box'>
            <div className='container-wrapper'>
              <div className='right-container-request-dev'>
                <RightContainer />
              </div>
              <div className='center-container-request-dev'>
                <RequestDevs />
              </div>
              <div className='left-container-request-dev'>
                <LeftContainer />
              </div>
            </div>
          </section>
          <ServicesSection />

          <Footer />
        </div>
      )}
    </Layout>
  )
}

export default AppSolutions
