import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './assets/styles/DevsCard.css'
import './assets/styles/Banner.css'
import './assets/styles/App.css'
import axios from 'axios'
import ErrorNotification from './components/Error'
import HeaderPrincipal from './components/HeaderPrincipal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faGithub,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons'
import { faFileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'

interface Dev {
  fullname: string
  email: string
  phone: string
  ProfessionalInfo: Professional
}

interface Professional {
  job_title: string
  skills: string[]
  Tag: Tag
  cv_link: string
  presentation: string
  profile_linkedin: string
  profile_github: string
  tools: string[]
  url: string
  imageSrc: string
  experience_years: number
}

interface Tag {
  tag: string
}

const DevCard: React.FC<Dev> = ({
  ProfessionalInfo,
  fullname,
  email,
  phone
}) => {
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
  const fullNameArray = fullname.split(' ')
  const firstName = fullNameArray[0]
  const lastName =
    fullNameArray.length > 1 ? fullNameArray[fullNameArray.length - 1] : ''

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
          require('./assets/images/2206015-icone-de-trabalho-de-desenvolvedor-vetor.jpg')
        }
        alt={fullname}
        onClick={handleCardClick}
        style={{ width: '60%', height: '40%' }}
        title='Clique aqui para mais detalhes do desenvolvedor!'
      />
      <h4>
        {firstName} {lastName}
      </h4>
      <p>{ProfessionalInfo.job_title}</p>
      <p>{ProfessionalInfo.Tag.tag}</p>
      <div className='icons-container'>
        {ProfessionalInfo.profile_linkedin && (
          <a
            href={ensureHttps(ProfessionalInfo.profile_linkedin)}
            target='_blank'
            rel='noreferrer'
            title='Link do Linkedin'
          >
            <FontAwesomeIcon icon={faLinkedin} className='icon' />
          </a>
        )}
        {ProfessionalInfo.profile_github && (
          <a
            href={ensureHttps(ProfessionalInfo.profile_github)}
            target='_blank'
            rel='noreferrer'
            title='Link do Github'
          >
            <FontAwesomeIcon icon={faGithub} className='icon' />
          </a>
        )}
        {ProfessionalInfo.cv_link && (
          <a
            href={ensureHttps(ProfessionalInfo.cv_link)}
            target='_blank'
            rel='noreferrer'
            title='Link do Curriculo'
          >
            <FontAwesomeIcon icon={faFileAlt} className='icon' />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            target='_blank'
            rel='noreferrer'
            title='Email'
          >
            <FontAwesomeIcon icon={faEnvelope} className='icon' />
          </a>
        )}
        {phone && (
          <a
            href={ensureHttps(`https://web.whatsapp.com/send?phone=${phone}`)}
            target='_blank'
            rel='noreferrer'
            title='Telefone'
          >
            <FontAwesomeIcon icon={faWhatsapp} className='icon' />
          </a>
        )}
      </div>
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
            <p>
              <strong>Nome:</strong> {fullname}
            </p>
            <p>
              <strong>Cargo:</strong> {ProfessionalInfo.job_title}
            </p>
            <p>
              <strong>Nivel:</strong> {ProfessionalInfo.Tag.tag}
            </p>
            <p>
              <strong>Experiência:</strong> {ProfessionalInfo.experience_years}{' '}
              anos
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
            )}
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
            )}
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
            )}
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
            )}
            <p>
              <strong>Projetos e Avaliações (Kawa Tecnologia):</strong>
              {ProfessionalInfo.presentation}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

const App: React.FC = () => {
  const navigate = useNavigate()
  const [developers, setDevelopers] = useState<Dev[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user?type=platform`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
            }
          }
        )   
        setDevelopers(data.users)
      } catch (error) {
        setError('Ocorreu um erro ao buscar os desenvolvedores.')
      }
    }
    fetchDevelopers()
  }, [])

  const handleFindDevsClick = () => {
    navigate('/search-devs')
  }

  const handleRegisterDevsClick = () => {
    navigate('/devs/register-devs')
  }

  return (
    <div>
      <HeaderPrincipal />
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
                  <p>
                    <button
                      className='find-dev-button'
                      onClick={handleRegisterDevsClick}
                    >
                      Dev, quer aparecer na busca, cadastre seu perfil!
                    </button>
                  </p>
                  <h5 style={{ color: 'black' }}>
                    *Clique na imagem para mais detalhes do Desenvolvedor
                  </h5>

                  <div className='dev-cards-container'>
                    {developers?.map((dev, index) => (
                      <DevCard
                        key={index}
                        ProfessionalInfo={dev.ProfessionalInfo}
                        fullname={dev.fullname}
                        email={dev.email}
                        phone={dev.phone}
                      />
                    ))}
                  </div>
                </div>
                <p>
                  <br />
                  <button
                    className='find-dev-button'
                    onClick={handleFindDevsClick}
                  >
                    Recrutador, não encontrou quem estava procurando? Clique
                    aqui!
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
          <a href={process.env.REACT_APP_URL + '/devs'}>Kawa Devs</a> |{' '}
          <a href={process.env.REACT_APP_URL + '/solutions'}>Kawa Solutions</a>
        </p>
        <br />
        <h2>Contato</h2>
        <p>Entre em contato conosco Whatsapp: (11)91428-7025.</p>
        <br />
        <h2>Nossos Parceiros</h2>
        <p>Entre em contato conosco para tornar-se um parceiro.</p>
      </section>

      <footer>
        <p>&copy; 2024 Kawa Tecnologia. Todos os direitos reservados.</p>
      </footer>
      {error && <ErrorNotification message={error} severity='error' />}
    </div>
  )
}

export default App
