import React, { useEffect, useState } from 'react'
import Header from './Header'
import ServicesSection from './Services'
import Footer from './Footer'
import RequestDevs from './RequestDevs'
import DeveloperList from '../../components/Developers'
import '../../assets/styles/AppSolutions.css'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
interface ProfessionalData {
  presentation: string
  skills: string[]
  tools: string[]
  imageSrc: string
  job_title: string
}

interface DeveloperType {
  id: number
  fullname: string
  avaliation: number
  ProfessionalInfo: ProfessionalData
}
const AppSolutions = () => {
  const [developers, setDevelopers] = useState<DeveloperType[]>([
    {
      id: 0,
      fullname: '',
      avaliation: 0,
      ProfessionalInfo: {
        presentation: '',
        skills: [''],
        tools: [''],
        imageSrc: '',
        job_title: ''
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
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
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

  const navigate = useNavigate(); 

  const handleCadastroClick = () => {
    navigate('/devs/register'); 
  };


  return (
    <div className='App'>
      <Header />
      <ServicesSection />
      <button onClick={handleCadastroClick}>
        Prestador, quer aparecer abaixo para ser contactado pelo Solicitante? Clique aqui
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
          <DeveloperList developers={developers} />
      <Footer />
    </div>
  )
}

export default AppSolutions
