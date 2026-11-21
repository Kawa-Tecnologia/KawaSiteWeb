import React from 'react'
import RequestDevs from './RequestDevs'
import RightContainer from './RightContainer'
import LeftContainer from './LeftContainer'
import '../../assets/styles/RequestDevs.css'
import HeaderPrincipal from '../../components/HeaderPrincipal'
import Footer from '../../components/Footer'
import Seo from '../../components/Seo'

const RequestDevsPage: React.FC = () => {
  return (
    <div className='page-shell'>
      <Seo
        title='Solicite um projeto de tecnologia | Kawa Tecnologia'
        description='Conte o que você precisa. A Kawa prepara uma proposta de site, loja virtual ou software sob medida para a sua empresa. Retornamos com clareza.'
        path='/request-devs'
      />
      <HeaderPrincipal />
      <main className='page-main'>
        <section className='panel request-devs-panel'>
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
      </main>
      <Footer />
    </div>
  )
}

export default RequestDevsPage
