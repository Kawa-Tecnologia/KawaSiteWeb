import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './assets/styles/DevsCard.css'
import './assets/styles/Banner.css'
import './assets/styles/App.css'
import Navigation from './components/Navigation'
import axios from 'axios'
import ErrorNotification from './components/Error'

interface Dev {
  fullname: string
  avaliation: number
  ProfessionalInfo: Professional
}

interface Professional {
  job_title: string
  skills: string
  Tag: Tag
  cv_link: string
  presentation: string
  profile_linkedin: string
  profile_github: string
  tools: string
  url: string
  imageSrc: string
  experience_years: number
}

interface Tag {
  tag: string
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
      <p>Apresentação: {ProfessionalInfo.presentation}</p>
      <p>Nivel: {ProfessionalInfo.Tag.tag}</p>

      <p>Avaliação: {avaliation}</p>
      {showModal && (
        <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <div className='modal-header'>
              <img
                src='https://s2-techtudo.glbimg.com/4_tizBHk3h8ZgpqZXoRoF4XMJ30=/0x0:6000x4000/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/f/w/FQkUYHRJq3H1gscf2qrA/content-pixie-wnanpxm6bn8-unsplash.jpg'
                alt='Imagem'
                className='modal-image'
              />
            </div>
            <h2>Detalhes do Desenvolvedor</h2>
            <p>Nome: {fullname}</p>
            <p>Cargo: {ProfessionalInfo.job_title}</p>
            <p>Nivel: {ProfessionalInfo.Tag.tag}</p>
            <p>Experiência: {ProfessionalInfo.experience_years} anos</p>
            <p>Avaliação: {avaliation}</p>
            <p>Curriculo: {ProfessionalInfo.cv_link}</p>
            <p>Habilidades: {ProfessionalInfo.skills}</p>
            <p>Ferramentas: {ProfessionalInfo.tools}</p>
            <p>Apresentação: {ProfessionalInfo.presentation}</p>
            <p>Site: {ProfessionalInfo.url}</p>
            <p>Perfil GitHub: {ProfessionalInfo.profile_github}</p>
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
  const [error, setError] = useState<string>('') // Novo estado para controlar erros

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user?type=platform`,
          {
            headers: {
              Authorization: `Bearer 1234`
            }
          }
        )
        setDevelopers(data.users)
      } catch (error) {
        setError('Ocorreu um erro ao buscar os desenvolvedores.') // Definindo o erro para mostrar na tela
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
        <Navigation />
      </header>
      <div className='container-geral'>

      <div className='container-home'>
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
                <h2>Desenvolvedores &gt;&gt; Open to Work &lt;&lt;</h2>
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
</div>
      <section id='sobre-nos'>
        <h2>Sobre Nós</h2>
        <p>
          Estamos focados em transformar as experiências com tecnologia em algo
          incrível na vida das pessoas.
        </p>
        <br />
        <h2>Projetos</h2>
        <p>Aqui estão alguns dos nossos projetos recentes:</p>
        <p>
          <a href={process.env.REACT_APP_URL +'/devs'}>Kawa Devs</a> |{' '}
          <a href={process.env.REACT_APP_URL + '/solutions'}>Kawa Solutions</a>
        </p>
        <br />
        <h2>Contato</h2>
        <p>Entre em contato conosco Whatsapp: (11)91428-7025.</p>
        {/* Formulário de contato */}
        <br />
        <h2>Nossos Parceiros</h2>
        <p>Entre em contato conosco para tornar-se um parceiro.</p>
        {/* Logos dos parceiros */}
      </section>

      <footer>
        <p>&copy; 2024 Kawa Tecnologia. Todos os direitos reservados.</p>
      </footer>
      {error && <ErrorNotification message={error} severity='error' />}
    </div>
  )
}

export default App
