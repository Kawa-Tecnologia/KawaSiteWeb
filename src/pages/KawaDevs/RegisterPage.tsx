import React, { useEffect } from 'react'
import '../../assets/styles/RequestDevs.css'
import Register from './Register'
import LeftContainerDevs from '../../components/LeftContainerDevs'
import RightContainerDevs from '../../components/RightContainerDevs'
import NavigationDev from '../../components/NavigationDevs'




const RegisterPage: React.FC = () => {

  useEffect(() => {
    const fetchData = async () => {
 
    }

    fetchData()
  }, [])

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
                <RightContainerDevs />
              </div>
              <div className='center-container-request-dev'>
                <Register />
              </div>
              <div className='left-container-request-dev'>
                <LeftContainerDevs />
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

export default RegisterPage
