import React from 'react'
import '../../assets/styles/RequestDevs.css'

import RegisterDev from './RegisterDev'
import RightContainerDevsOpen from '../../components/RightContainerDevsOpen'
import LeftContainerDevsOpen from '../../components/LeftContainerDevsOpen'
import HeaderDevs from '../../components/HeaderDevs'
import Footer from '../../components/Footer'




const RegisterDevPage: React.FC = () => {

  return (
    <div>
      <HeaderDevs/>
      <div className='register'>
          <section className='section-box-register'>
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


        <Footer/>
      </div>
    </div>
  )
}

export default RegisterDevPage
