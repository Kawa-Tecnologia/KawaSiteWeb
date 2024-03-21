import React, { useEffect } from 'react'
import '../../assets/styles/RequestDevs.css'
import Register from './Register'
import LeftContainerDevs from '../../components/LeftContainerDevs'
import RightContainerDevs from '../../components/RightContainerDevs'
import HeaderDevs from '../../components/HeaderDevs'




const RegisterPage: React.FC = () => {

  useEffect(() => {
    const fetchData = async () => {
 
    }

    fetchData()
  }, [])

  return (
    <div>
      <HeaderDevs/>
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
          <p>&copy; 2024 Kawa Tecnologia. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  )
}

export default RegisterPage
