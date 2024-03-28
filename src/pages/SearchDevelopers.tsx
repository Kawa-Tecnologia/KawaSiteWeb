import React, { ChangeEvent, useState } from 'react'
import '../assets/styles/Search.css'
import axios from 'axios'
import HeaderPrincipal from '../components/HeaderPrincipal'
interface Dev {
  fullname: string
  ProfessionalInfo: Professional
}

interface Professional {
  job_title: string
  skills: string[]
  tag_id: number
  cv_link: string
  presentation: string
  profile_linkedin: string
  profile_github: string
  tools: string[]
  url: string
  imageSrc: string
}
interface NivelTexts {
  [key: number]: string
}
const DevCard: React.FC<Dev> = ({ ProfessionalInfo, fullname }) => {
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

  const nivelTexts: NivelTexts = {
    1: 'Principiante',
    2: 'Junior',
    3: 'Pleno',
    4: 'Senior',
    5: 'Especialista'
  }

  const ensureHttps = (url: string) => {
    if (!url.startsWith('https://')) {
      return 'https://' + url
    }
    return url
  }

  return (
    <div className='dev-card'>
      <img
        src={
          ProfessionalInfo?.imageSrc ||
          require('../assets/images/2206015-icone-de-trabalho-de-desenvolvedor-vetor.jpg')
        }
        alt={fullname}
        onClick={handleCardClick}
        style={{ width: '60%', height: '40%' }}
        title='Clique aqui para mais detalhes do desenvolvedor!'
        loading="lazy" 
      />
      <h3>Nome: {fullname}</h3>
      <p>Cargo: {ProfessionalInfo.job_title}</p>
      {ProfessionalInfo.profile_linkedin ? (
        <p>
          <a
            href={ensureHttps(ProfessionalInfo.profile_linkedin)}
            target='_blank'
            rel='noreferrer'
          >
            Perfil do Linkedin
          </a>
        </p>
      ) : (
        ''
      )}{' '}
      {ProfessionalInfo.cv_link ? (
        <p>
          <a
            href={ensureHttps(ProfessionalInfo.cv_link)}
            target='_blank'
            rel='noreferrer'
          >
            Link do Curriculo
          </a>
        </p>
      ) : (
        ''
      )}{' '}
      {showModal && (
        <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <h2>Detalhes do Desenvolvedor</h2>
            <p>
              <strong>Nome:</strong> {fullname}
            </p>
            <p>
              <strong>Cargo:</strong> {ProfessionalInfo.job_title}
            </p>
            <p>
              <strong>Nivel:</strong>{' '}
              {nivelTexts[ProfessionalInfo.tag_id] || 'Nível não especificado'}
            </p>
            {ProfessionalInfo.cv_link ? (
              <p>
                <a
                  href={ensureHttps(ProfessionalInfo.cv_link)}
                  target='_blank'
                  rel='noreferrer'
                >
                  <strong>Link do Curriculo</strong>
                </a>
              </p>
            ) : (
              ''
            )}{' '}
            <p>
              <strong>Habilidades:</strong> {ProfessionalInfo.skills.join(', ')}
            </p>
            <p>
              <strong>Ferramentas:</strong> {ProfessionalInfo.tools.join(', ')}
            </p>
            <p>
              <strong>Apresentação:</strong> {ProfessionalInfo.presentation}
            </p>
            {ProfessionalInfo.url ? (
              <p>
                <a
                  href={ensureHttps(ProfessionalInfo.url)}
                  target='_blank'
                  rel='noreferrer'
                >
                  <strong>Site</strong>
                </a>
              </p>
            ) : (
              ''
            )}{' '}
            {ProfessionalInfo.profile_github ? (
              <p>
                <a
                  href={ensureHttps(ProfessionalInfo.profile_github)}
                  target='_blank'
                  rel='noreferrer'
                >
                  <strong>Perfil GitHub</strong>
                </a>
              </p>
            ) : (
              ''
            )}{' '}
            {ProfessionalInfo.profile_linkedin ? (
              <p>
                <a
                  href={ensureHttps(ProfessionalInfo.profile_linkedin)}
                  target='_blank'
                  rel='noreferrer'
                >
                  <strong>Perfil Linkedin</strong>
                </a>
              </p>
            ) : (
              ''
            )}{' '}
          </div>
        </div>
      )}
    </div>
  )
}
interface UserData {
  skills: string[]
  tools: string[]
  keywords: string
  tag_id: number
  programmingLanguage: string
  level: string
}
const SearchDevelopers: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    skills: [''],
    tools: [''],
    keywords: '',
    tag_id: 1,
    programmingLanguage: '',
    level: '3'
  })
  const [developers, setDevelopers] = useState<Dev[]>([])

  const handleSearch = async (): Promise<void> => {
    const body = userData
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/professional/search`,
        body,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
          }
        }
      )
      setDevelopers(data.users)
    } catch (error) {
      console.error('Erro ao realizar a busca:', error)
    }
  }

  const handleProfessionalDataChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'skills' || name === 'tools') {
      const arrayValue = value.split(',')
      setUserData(prevState => ({
        ...prevState,

        [name]: arrayValue
      }))
    } else {
      setUserData(prevState => ({
        ...prevState,

        [name]: value
      }))
    }
  }
  return (
    <div>
      <HeaderPrincipal />
      <div className='login'>
        <div className='container-search'>
          <h2>Desenvolvedores &gt;&gt;Open to Work&lt;&lt;</h2>
          <div>
            <label>Linguagem de Programação:</label>
            <input
              type='text'
              name='programmingLanguage'
              value={userData.programmingLanguage}
              onChange={handleProfessionalDataChange}
            />
          </div>
          <div>
            <label>
              Nível Técnico:
              <select
                name='tag_id'
                value={userData.tag_id}
                onChange={handleProfessionalDataChange}
              >
                <option value='1'>Principiante</option>
                <option value='2'>Junior</option>
                <option value='3'>Pleno</option>
                <option value='4'>Senior</option>
                <option value='5'>Especialista</option>
              </select>
            </label>
          </div>
          <div>
            <label>Habilidades:</label>
            <input
              type='text'
              name='skills'
              value={userData.skills}
              onChange={handleProfessionalDataChange}
            />
          </div>
          <div>
            <label>Ferramentas:</label>
            <input
              type='text'
              name='tools'
              value={userData.tools}
              onChange={handleProfessionalDataChange}
            />
          </div>
          <div>
            <label>Palavras-Chaves:</label>
            <input
              type='text'
              name='keywords'
              value={userData.keywords}
              onChange={handleProfessionalDataChange}
            />
          </div>
          <div>
            <label htmlFor='level'>Nível de Busca:</label>
            <select
              id='level'
              name='level'
              value={userData.level}
              onChange={handleProfessionalDataChange}
            >
              <option value='1'>1 - Mais preciso</option>
              <option value='2'>2 - Intermediario</option>
              <option value='3'>3 - Menos preciso</option>
            </select>
          <div className='button-container'>
          <button onClick={handleSearch}>Buscar</button>
          </div>
        </div>
        </div>
      </div>
      <div className='result-container'>
        <div className='dev-cards-container-search'>
          <br />
          {developers.length === 0 ? (
            <h2>Nenhum desenvolvedor encontrado.</h2>
          ) : (
            developers.map((dev, index) => (
              <DevCard
                key={index}
                ProfessionalInfo={dev.ProfessionalInfo}
                fullname={dev.fullname}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchDevelopers
