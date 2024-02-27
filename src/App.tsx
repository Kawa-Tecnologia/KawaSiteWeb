import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './assets/styles/DevsCard.css'
import './assets/styles/Banner.css'
import './assets/styles/App.css'
import Navigation from './components/Navigation'
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

const App: React.FC = () => {
  const navigate = useNavigate()
  const [developers, setDevelopers] = useState<Dev[]>([])

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/user', {
          headers: {
            Authorization: `Bearer 1234` // Inclua o token JWT no cabeçalho de autorização
          }
        })
        setDevelopers(data.users)
      } catch (error) {
        console.error('Error fetching developers:', error)
      }
    }
    fetchDevelopers()
  }, [])

  const handleFindDevsClick = () => {
    navigate('/search-devs')
  }

  return (
    <div>
      <header className='header'>
        <div className='logo-container'>
          <img
            className='logo'
            src={require('./assets/images/kawa.jpg')}
            alt='Kawa Tecnologia'
          />
        </div>
        <Navigation currentPage={'home'} />
      </header>

      <div className='container'>
        <div className='left'>
          <section className='banner'>
            <div className='banner-left'>
              <img
                src={require('./assets/images/kawa.jpg')}
                alt='Kawa Tecnologia'
              />
            </div>
            <div className='banner-center'>
              <h1>Bem-vindo à Kawa Tecnologia</h1>
              <h3>
                Transformando Ideias Criativas em Negócios Rentáveis e
                Lucrativos
              </h3>
              Tire seu projeto do papel, bora ver do que somos capazes juntos!
              <p>
                <a href='#contato' className='cta-button'>
                  Contate-nos
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className='right'>
          <div className='banner-right'>
            <section id='devs' className='devs-section'>
              <div className='devs-content'>
                <h2>Desenvolvedores Open to Work</h2>
                <div className='dev-cards-container'>
                  {/* Iterar sobre os desenvolvedores e renderizar os cartões */}
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
              <p>
                <button
                  className='find-dev-button'
                  onClick={handleFindDevsClick}
                >
                  Clique aqui e encontre o DEV que estava procurando!
                </button>
              </p>
            </section>
          </div>
        </div>
      </div>

      <section id='sobre-nos'>
        <h2>Sobre Nós</h2>
        <p>
          Estamos focados em transformar as experiências com tecnologia em algo
          incrível na vida das pessoas.
        </p>
      </section>
      <section id='projetos'>
        <h2>Projetos</h2>
        <p>Aqui estão alguns dos nossos projetos recentes:</p>
        Kawa Devs
      </section>
      <section id='contato'>
        <h2>Contato</h2>
        <p>Entre em contato conosco Whatsapp: (11)91428-7025.</p>
        {/* Formulário de contato */}
      </section>
      <section id='partners'>
        <h2>Nossos Parceiros</h2>
        <p>Entre em contato conosco para tornar-se um parceiro.</p>
        {/* Logos dos parceiros */}
      </section>

      <footer>
        <p>&copy; 2024 Kawa Tecnologia. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default App
