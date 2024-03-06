import React, { useState } from 'react'
import '../assets/styles/Search.css'
import axios from 'axios'
import Navigation from '../components/Navigation'
interface Dev {
  fullname: string
  avaliation: number
  ProfessionalInfo: Professional
}

interface Professional {
  job_title: string
  skills: string
  tag_id: number
  cv_link: string
  presentation: string
  profile_linkedin: string
  profile_github: string
  tools: string
  url: string
  imageSrc: string
}

const DevCard: React.FC<Dev> = ({ ProfessionalInfo, fullname, avaliation }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleCardClick = () => {
    openModal()
  }

  return (
    <div className='dev-card'>
      <img
        src={ProfessionalInfo.imageSrc}
        alt={fullname}
        onClick={handleCardClick}
      />
      <h3>Nome: {fullname}</h3>
      <p>Cargo: {ProfessionalInfo.job_title}</p>
      <p>Avaliação: {avaliation}</p>
      {showModal && (
        <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <h2>Detalhes do Desenvolvedor</h2>
            <p>Nome: {fullname}</p>
            <p>Cargo: {ProfessionalInfo.job_title}</p>
            <p>Nivel: {ProfessionalInfo.tag_id}</p>
            <p>Avaliação: {avaliation}</p>
            <p>Curriculo: {ProfessionalInfo.cv_link}</p>
            <p>Habilidades: {ProfessionalInfo.skills}</p>
            <p>Ferramentas: {ProfessionalInfo.tools}</p>
            <p>Apresentação: {ProfessionalInfo.presentation}</p>
            <p>Site: {ProfessionalInfo.url}</p>
            <p>Perfil GitHub: {ProfessionalInfo.profile_linkedin}</p>

            <p>Perfil Linkedin: {ProfessionalInfo.profile_linkedin}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const SearchDevelopers: React.FC = () => {
  // Estados para os filtros
  const [programmingLanguage, setProgrammingLanguage] = useState<string>('')
  const [tag, setTag] = useState<string>('')
  const [tools, setTools] = useState<string>('')
  const [skills, setSkills] = useState<string>('')
  const [keywords, setKeywords] = useState<string>('')
  const [developers, setDevelopers] = useState<Dev[]>([])
  const [level, setLevel] = useState<string>('3')

  // Função para lidar com a busca
  const handleSearch = async (): Promise<void> => {
    const searchData = {
      programmingLanguage,
      tag,
      tools,
      skills,
      keywords,
      level
    }

    const queryString = new URLSearchParams(searchData).toString()
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/user?${queryString}`,
        {
          headers: {
            Authorization: `Bearer 1234` // Inclua o token JWT no cabeçalho de autorização
          }
        }
      )
      setDevelopers(data.users)

      // Faça o que precisar com a resposta da busca
    } catch (error) {
      console.error('Erro ao realizar a busca:', error)
      // Trate o erro de acordo com sua necessidade
    }
  }

  return (
    <div>
      <header className='header'>
        <div className='logo-container'>
          <img
            className='logo'
            src={require('../assets/images/kawa.jpg')}
            alt='Kawa Tecnologia'
          />
        </div>
        <Navigation />
      </header>
      <div className='login'>
        <div className='container-search'>
          <h1>Pagina de Busca</h1>
          <div>
            <label>Linguagem de Programação:</label>
            <input
              type='text'
              value={programmingLanguage}
              onChange={e => setProgrammingLanguage(e.target.value)}
            />
          </div>
          <div>
            <label>Nivel:</label>
            <input
              type='text'
              value={tag}
              onChange={e => setTag(e.target.value)}
            />
          </div>
          <div>
            <label>Habilidades:</label>
            <input
              type='text'
              value={tools}
              onChange={e => setTools(e.target.value)}
            />
          </div>
          <div>
            <label>Ferramentas:</label>
            <input
              type='text'
              value={skills}
              onChange={e => setSkills(e.target.value)}
            />
          </div>
          <div>
            <label>Palavras-Chaves:</label>
            <input
              type='text'
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='nivelBusca'>Nível de Busca:</label>
            <select
              id='nivelBusca'
              value={level}
              onChange={e => setLevel(e.target.value)}
            >
              <option value='1'>1 - Mais preciso</option>
              <option value='2'>2 - Intermediario</option>
              <option value='3'>3 - Menos preciso</option>
            </select>
          </div>
          <button onClick={handleSearch}>Buscar</button>
        </div>

        <div className='dev-cards-container'>
          <br />
          {developers.map((dev, index) => (
            <DevCard
              key={index}
              ProfessionalInfo={dev.ProfessionalInfo}
              fullname={dev.fullname}
              avaliation={dev.avaliation}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchDevelopers
