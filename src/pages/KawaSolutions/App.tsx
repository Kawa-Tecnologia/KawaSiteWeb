import React from 'react'
import Header from './Header'
import ServicesSection from './Services'
import Footer from '../../components/Footer'
import RequestDevs from './RequestDevs'
import '../../assets/styles/AppSolutions.css'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import { useNavigate } from 'react-router-dom'
import Seo from '../../components/Seo'
import { useMediaQuery } from 'react-responsive'

const AppSolutions = () => {
  const navigate = useNavigate()

  const handleCadastroClick = () => {
    navigate('/request-devs')
  }
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <>
      <Seo
        title='Kawa Solutions | Sites, lojas e software sob medida'
        description='Peça sites, lojas virtuais, software e treinamentos. A Kawa une design, engenharia e estratégia, da ideia ao lançamento do seu projeto. Conte o seu projeto.'
        path='/solutions'
      />
      {!isMobile ? (
        <div className='App'>
          <Header />
          <ServicesSection />
          <p style={{ textAlign: 'center' }}>
            <button
              onClick={handleCadastroClick}
              style={{ alignItems: 'center' }}
            >
              Solicitar atendimento
            </button>
          </p>

          <section className='section-box-solutions'>
            <div className='container-wrapper'>
              <div className='right-container-request-dev'>
                <RightContainer />
              </div>
              <div className='center-container-request-dev'>
                <RequestDevs heading='h2' />
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
              Solicitar atendimento
            </button>
          </p>

          <section className='section-box'>
            <div className='container-wrapper'>
              <div className='center-container-request-dev'>
                <RequestDevs heading='h2' />
              </div>
            </div>
          </section>
          <ServicesSection />
          <section className='section-box'>
            <div className='container-wrapper'>
              <div className='left-container-request-dev'>
                <LeftContainer />
              </div>
            </div>
          </section>
          <Footer />
        </div>
      )}
    </>
  )
}

export default AppSolutions
