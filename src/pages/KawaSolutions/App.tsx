import React from 'react'
import Header from './Header'
import ServicesSection from './Services'
import Footer from './Footer'
import RequestDevs from './RequestDevs'
import '../../assets/styles/AppSolutions.css'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import { useNavigate } from 'react-router-dom'

const AppSolutions = () => {
  

  const navigate = useNavigate()

  const handleCadastroClick = () => {
    navigate('/devs/register')
  }

  return (
    <div className='App'>
      <Header />
      <ServicesSection />
      <button onClick={handleCadastroClick}>
        Prestador, quer aparecer abaixo para ser contactado pelo Solicitante?
        Clique aqui
      </button>
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
  )
}

export default AppSolutions
