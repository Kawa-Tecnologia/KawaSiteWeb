import React, { useEffect, useState } from 'react'
import Navigation from '../../components/Navigation'
import RequestDevs from './RequestDevs'
import RightContainer from './RightContainer'
import LeftContainer from './LeftContainer'
import '../../assets/styles/RequestDevs.css'
import DeveloperList from './Developers'
import axios from 'axios'

interface ProfessionalData {
  presentation: string
  skills: string[]
  tools: string[]
}

interface DeveloperType {
  id: number
  fullname: string
  avaliation: number
  ProfessionalInfo: ProfessionalData
}

const RequestDevsPage: React.FC = () => {
  const [developers, setDevelopers] = useState<DeveloperType[]>([
    {
      id: 0,
      fullname: '',
      avaliation: 0,
      ProfessionalInfo: {
        presentation: '',
        skills: [''],
        tools: ['']
      }
    }
  ])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user?type=service&page=1`,
          {
            headers: {
              Authorization: `Bearer 1234`
            }
          }
        )
        if (data.users) {
          setDevelopers(data.users)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
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
          <DeveloperList developers={developers} />


        <footer>
          <p>&copy; © 2024 Kawa Tecnologia. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  )
}

export default RequestDevsPage
