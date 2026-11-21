import React, { useEffect, useState } from 'react'
import DeveloperList from '../../components/Developers'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import HeaderPrincipal from '../../components/HeaderPrincipal'
import Footer from '../../components/Footer'
import Seo from '../../components/Seo'
import "../../assets/styles/DevelopersSearch.css"
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
    <div className='page-shell'>
      <Seo
        title='Escolha um desenvolvedor para o seu serviço | Kawa Tecnologia'
        description='Informe o ID do desenvolvedor para atribuir o seu serviço na plataforma da Kawa Tecnologia.'
        path={`/request-devs/${id ?? ''}`}
        noindex
      />
      <HeaderPrincipal />
      <main className='page-main developers-search'>
        <section className='panel developers-search-panel'>
          <span className='pill'>Atribuir serviço</span>
          <h1>Desenvolvedores da Plataforma</h1>
          <form onSubmit={handleSearch} className='developers-search-form'>
            <div className='form-group'>
              <label htmlFor='search'>Informe o ID do desenvolvedor:</label>
              <input
                className='glass-input'
                type='text'
                id='search'
                name='search'
                placeholder='Ex.: 1'
                required
              />
            </div>
            <button type='submit' className='cta-button'>Enviar</button>
          </form>
        </section>
        <DeveloperList developers={developers} />
      </main>
      <Footer />
    </div>
  )
}

export default DevelopersPage
