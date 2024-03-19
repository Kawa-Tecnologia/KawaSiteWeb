import React, { useEffect, useState } from 'react'
import DeveloperList from '../../components/Developers'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from './Header'
import ServicesSection from './Services'

interface ProfessionalData {
  presentation: string
  skills: string[]
  tools: string[]
  imageSrc: string
  job_title: string
}

interface Avaliation {
  content: string
  avaliation: number
}
interface DeveloperType {
  id: number
  fullname: string
  avaliation: number
  ProfessionalInfo: ProfessionalData
  Avaliation: Avaliation
}
function DevelopersPage () {
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
      },
      Avaliation: {
        avaliation: 0,
        content: ''
      }
    }
  ])
  const { id } = useParams()

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
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const body = {
      user_id_requested: parseInt(formData.get('search') as string)
    }

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/request-devs/${id}`,
        body,
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
      console.error('Error searching for developers:', error)
    }
  }

  return (
    <div className='App'>
    <Header />
    <ServicesSection />
      <h1>Desenvolvedores da Plataforma</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor='search'>Informe o ID do desenvolvedor:</label>
        <input type='text' id='search' name='search' required />
        <button type='submit'>Enviar</button>
      </form>
      <DeveloperList developers={developers} />
    </div>
  )
}

export default DevelopersPage
