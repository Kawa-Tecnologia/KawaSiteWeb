import React, { useState } from 'react'
import '../assets/styles/Search.css'
import axios from 'axios'
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
  const [linguagem, setLinguagem] = useState<string>('')
  const [experiencia, setExperiencia] = useState<string>('')
  const [ferramenta, setFerramenta] = useState<string>('')
  const [tecnologia, setTecnologia] = useState<string>('')
  const [projeto, setProjeto] = useState<string>('')
  const [developers, setDevelopers] = useState<Dev[]>([])

  // Função para lidar com a busca
  const handleSearch = async (): Promise<void> => {
    const searchData = {
      linguagem,
      experiencia,
      ferramenta,
      tecnologia,
      projeto
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
    <div className='login'>
      <div className='container-search'>
        <h1>Página de Busca</h1>
        <div>
          <label>Linguagem de Programação:</label>
          <input
            type='text'
            value={linguagem}
            onChange={e => setLinguagem(e.target.value)}
          />
        </div>
        <div>
          <label>Anos de Experiência:</label>
          <input
            type='number'
            value={experiencia}
            onChange={e => setExperiencia(e.target.value)}
          />
        </div>
        <div>
          <label>Ferramenta:</label>
          <input
            type='text'
            value={ferramenta}
            onChange={e => setFerramenta(e.target.value)}
          />
        </div>
        <div>
          <label>Tecnologia:</label>
          <input
            type='text'
            value={tecnologia}
            onChange={e => setTecnologia(e.target.value)}
          />
        </div>
        <div>
          <label>Projeto:</label>
          <input
            type='text'
            value={projeto}
            onChange={e => setProjeto(e.target.value)}
          />
        </div>
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className='dev-cards-container'>
        <br/>
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
  )
}

export default SearchDevelopers
