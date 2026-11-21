import React from 'react'
import HeaderPrincipal from '../../components/HeaderPrincipal'
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
    <div className='page-shell solutions-shell'>
      <Seo
        title='Kawa Solutions | Sites, lojas e software sob medida'
        description='Peça sites, lojas virtuais, software e treinamentos. A Kawa une design, engenharia e estratégia, da ideia ao lançamento do seu projeto. Conte o seu projeto.'
        path='/solutions'
      />
      <HeaderPrincipal />
      {!isMobile ? (
        <div className='App solutions-page'>
          <main className='page-main'>
            <Header />
            <ServicesSection />
            <p className='solutions-cta-wrap'>
              <button onClick={handleCadastroClick} className='cta-button'>
                Solicitar atendimento
              </button>
            </p>

            <section className='panel section-box-solutions'>
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
          </main>
          <Footer />
        </div>
      ) : (
        <div className='App solutions-page'>
          <main className='page-main'>
            <Header />
            <p className='solutions-cta-wrap'>
              <button onClick={handleCadastroClick} className='cta-button'>
                Solicitar atendimento
              </button>
            </p>

            <section className='panel section-box-solutions'>
              <div className='container-wrapper'>
                <div className='center-container-request-dev'>
                  <RequestDevs heading='h2' />
                </div>
              </div>
            </section>
            <ServicesSection />
            <section className='panel section-box-solutions'>
              <div className='container-wrapper'>
                <div className='left-container-request-dev'>
                  <LeftContainer />
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default AppSolutions
