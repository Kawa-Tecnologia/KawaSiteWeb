import React from 'react'
import Navigation from '../../components/Navigation'
import RequestDevs from './RequestDevs'
import RightContainer from './RightContainer'
import LeftContainer from './LeftContainer'
import '../../assets/styles/RequestDevs.css'

const RequestDevsPage: React.FC = () => {
  return (
    <div>
      <header className='header'>
        <div className='logo-container'>
          <img
            className='logo'
            src={require('../../assets/images/kawa.jpg')}
            alt='Kawa Tecnologia'
          />
        </div>
        <Navigation />
      </header>
      <div className='sobre-nos'>
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


        <footer>
          <p>&copy; © 2024 Kawa Tecnologia. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  )
}

export default RequestDevsPage
