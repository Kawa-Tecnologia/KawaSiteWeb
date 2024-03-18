import React from 'react'
import '../../assets/styles/RequestDevs.css'

import RegisterDev from './RegisterDev'
import RightContainerDevsOpen from '../../components/RightContainerDevsOpen'
import LeftContainerDevsOpen from '../../components/LeftContainerDevsOpen'
import NavigationDev from '../../components/NavigationDevs'




const RegisterDevPage: React.FC = () => {

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
        <NavigationDev />
      </header>
      <div className='sobre-nos'>
          <section className='section-box'>
            <div className='container-wrapper'>
              <div className='right-container-request-dev'>
                <RightContainerDevsOpen />
              </div>
              <div className='center-container-request-dev'>
                <RegisterDev />
              </div>
              <div className='left-container-request-dev'>
                <LeftContainerDevsOpen />
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

export default RegisterDevPage
