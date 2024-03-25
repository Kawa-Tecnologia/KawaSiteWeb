import React, { useEffect, useRef, useState } from 'react'
import '../../assets/styles/CadastroForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import ErrorNotification from '../../components/Error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'
import TermUseDevOpen from '../../contexts/TermUseDevOpen'

const Register: React.FC = () => {
  const [error, setError] = useState<string>('')
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    document_number: '',
    cep: '',
    password: '',
    agreeTerms: false,
    type: '',
    recommendation: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
   
    window.scrollTo(0, 0);

  }, []);
  
  const goToNextStep = () => {
    setFormStep(prevStep => prevStep + 1)
  }

  const goToPreviousStep = () => {
    setFormStep(prevStep => prevStep - 1)
  }

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) // Verificando se event.target é do tipo Node
      ) {
        closeModal()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showModal])

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleButtonClick = () => {
    const newAgreeTermsValue = !formData.agreeTerms
    setFormData(prevState => ({
      ...prevState,
      agreeTerms: newAgreeTermsValue
    }))
    if (newAgreeTermsValue) {
      openModal()
    }
  }
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/user`, formData, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
        }
      })
    } catch (error) {
      setError('Erro ao realizar o cadastro')
    }
    navigate('/devs/login')
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'type') {
      setFormData(prevState => ({
        ...prevState,
        type: value
      }))
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState)
  }

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer)
    }
    if (location.pathname === '/devs/register') {
      setTimer(setTimeout(handleFormAbandoned, 60000))
    }
  }

  const handleFormAbandoned = async () => {
    alert('Preencha seus dados, email, telefone celular')

    const body = formData

    if (
      body.email.includes('.com') ||
      body.phone.replace(/\D/g, '').length === 11
    ) {
      body.type = 'DevService'

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/abandoned-requests`,
          body,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
            }
          }
        )
      } catch (error) {
        setError('Erro ao criar o abandono de solicitação')
      }
    }
  }

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    localStorage.setItem('formDataRegister', JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [])
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <div className='register'>
      <div className='cadastro-container'>
        <h1>Cadastre-se</h1>
        {isMobile && formStep === 1 && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center'
            }}
          >
            <div>
              <label htmlFor='fullname'>Nome Completo:</label>
              <input
                type='text'
                id='fullname'
                name='fullname'
                value={formData.fullname}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='phone'>Telefone Celular (WhatsApp):</label>
              <InputMask
                mask='(99)99999-9999'
                maskChar=''
                type='tel'
                id='phone'
                name='phone'
                placeholder='XX-XXXXX-XXXX'
                value={formData.phone}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>{' '}
            <button type='button' onClick={goToNextStep}>
              Continuar
            </button>
          </form>
        )}
        {isMobile && formStep === 2 && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center'
            }}
          >
            <div>
              <label htmlFor='document_number'>CPF:</label>
              <input
                type='text'
                id='document_number'
                name='document_number'
                value={formData.document_number}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label>Endereço</label>
              <label htmlFor='cep'>CEP:</label>
              <input
                type='text'
                id='cep'
                name='cep'
                value={formData.cep}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='password'>Senha:</label>
              <div className='password-input'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
              <button type='button' onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
              </div>
            </div>
            <div>
              <label htmlFor='type'>Tipo de Cadastro:</label>
              <select
                id='type'
                name='type'
                value={formData.type}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              >
                <option value=''>Selecione o Tipo de Cadastro</option>
                <option value='service'>Serviço</option>
              </select>
            </div>
            <div>
              <label htmlFor='recommendation'>Email de Recomendação:</label>
              <input
                type='email'
                id='recommendation'
                name='recommendation'
                value={formData.recommendation}
                onChange={handleInputChange}
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  name='agreeTerms'
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                />{' '}
                Concordo com os termos de uso
                <div>
                  <a href='#' onClick={handleButtonClick}>
                    Ver Termos de Uso
                  </a>
                </div>
              </label>
            </div>
            <button type='button' onClick={goToPreviousStep}>
              Voltar
            </button>
            <button type='submit'>Enviar</button>
          </form>
        )}
        {!isMobile && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='fullname'>Nome Completo:</label>
              <input
                type='text'
                id='fullname'
                name='fullname'
                value={formData.fullname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='phone'>Telefone Celular (WhatsApp):</label>
              <InputMask
                mask='(99)99999-9999'
                maskChar=''
                type='tel'
                id='phone'
                name='phone'
                placeholder='XX-XXXXX-XXXX'
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='document_number'>CPF:</label>
              <input
                type='text'
                id='document_number'
                name='document_number'
                value={formData.document_number}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Endereço</label>
              <label htmlFor='cep'>CEP:</label>
              <input
                type='text'
                id='cep'
                name='cep'
                value={formData.cep}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='password'>Senha:</label>
              <div className='password-input'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type='button' onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
              </div>
            </div>
            <div>
              <label htmlFor='type'>Tipo de Cadastro:</label>
              <select
                id='type'
                name='type'
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value=''>Selecione o Tipo de Cadastro</option>
                <option value='service'>Serviço</option>
              </select>
            </div>
            <div>
              <label htmlFor='recommendation'>Email de Recomendação:</label>
              <input
                type='email'
                id='recommendation'
                name='recommendation'
                value={formData.recommendation}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  name='agreeTerms'
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                />{' '}
                Concordo com os termos de uso
                <div>
                  <a href='#' onClick={handleButtonClick}>
                    Ver Termos de Uso
                  </a>
                </div>
              </label>
            </div>
            <button type='submit'>Enviar</button>
          </form>
        )}
        <div
          id='myModal'
          ref={modalRef}
          className={`modal ${showModal ? 'show' : ''}`}
        >
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <p id='modal-details' dangerouslySetInnerHTML={{ __html: TermUseDevOpen()}}></p>
          </div>
        </div>
      </div>
      {error && <ErrorNotification message={error} severity='error' />}
    </div>
  )
}

export default Register
