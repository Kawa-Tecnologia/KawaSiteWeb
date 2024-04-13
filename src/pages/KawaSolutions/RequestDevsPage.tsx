import React from 'react'
import RequestDevs from './RequestDevs'
import RightContainer from './RightContainer'
import LeftContainer from './LeftContainer'
import '../../assets/styles/RequestDevs.css'
import HeaderPrincipal from '../../components/HeaderPrincipal'
import Footer from '../../components/Footer'

const RequestDevsPage: React.FC = () => {
  return (
    <div>
      <HeaderPrincipal/>
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


        <Footer/>
      </div>
    </div>
  )
}

export default RequestDevsPage
