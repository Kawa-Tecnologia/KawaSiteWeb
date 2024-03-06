import React, { useEffect, useState } from 'react'
import Header from './Header'
import ServicesSection from './Services'
import Footer from './Footer'
import RequestDevs from './RequestDevs'
import DeveloperList from './Developers'
import '../../assets/styles/AppSolutions.css'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
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
const AppSolutions = () => {
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
    <div className='App'>
      <Header />
      <ServicesSection />
      <div className='main-content-solution'>
        <div className='left-container'>
          <LeftContainer />
        </div>
        <div className='center-container'>
          <RequestDevs />
        </div>
        <div className='right-container'>
          <RightContainer />
        </div>
      </div>
      <DeveloperList developers={developers} />
      <Footer />
    </div>
  )
}

export default AppSolutions
