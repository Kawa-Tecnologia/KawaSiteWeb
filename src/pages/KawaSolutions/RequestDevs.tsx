import axios from 'axios'
import React, { ChangeEvent, useState, useEffect, useRef } from 'react'
import Tooltip from '@mui/material/Tooltip'
import '../../assets/styles/Modal.css'
import InputMask from 'react-input-mask'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import MicIcon from '@mui/icons-material/Mic'
import { useMediaQuery } from 'react-responsive'
import ErrorNotification from '../../components/Error'
import TermUse from '../../contexts/TermUse'

const RequestDevs = () => {
  const { transcript } = useSpeechRecognition()
  const [showTooltipModal, setShowTooltipModal] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState('')
  const [formStep, setFormStep] = useState(1)
  const [error, setError] = useState<string>('')
  const [formData, setFormData] = useState(() => {
    const cachedFormData = localStorage.getItem('formDataRequest')
    return cachedFormData
      ? JSON.parse(cachedFormData)
      : {
          name: '',
          email: '',
          phone: '',
          description: '',
          value: 0,
          term: 0,
          type: 'training',
          cep: '',
          local: 'online',
          agreeTerms: false,
          user_id_requested: 0
        }
  })

  const [showModal, setShowModal] = useState<boolean>(false)
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
    openModal()
  }
  useEffect(() => {
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      description: transcript
    }))
  }, [transcript])

  const handleButtonClickSpeech = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' })
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    resetTimer()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const requiredFields = {
      name: 'Nome',
      email: 'E-mail',
      description: 'Descrição',
      phone: 'Telefone',
      agreeTerms: 'Termos de uso'
    }

    for (const [field, fieldName] of Object.entries(requiredFields)) {
      if (!formData[field]) {
        alert(`O campo ${fieldName} é obrigatório.`)
        return
      }
    }

    const body = {
      ...formData,
      type: formData.type || 'training'
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/request-devs`,
        body,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
          }
        }
      )
      setFormData({
        name: '',
        email: '',
        phone: '',
        description: '',
        value: 0,
        term: 0,
        type: 'training',
        cep: '',
        local: 'online',
        agreeTerms: false,
        user_id_requested: 0
      })
      alert('Solicitação criada, aguarde contato dos nossos desenvolvedores!')
    } catch (error) {
      setError(
        'Verifique se todas as informações foram preenchidas corretamente'
      )
      console.log(error)
    }
  }

  const renderCepField = () => {
    if (formData.local === 'in person') {
      return (
        <div>
          <label htmlFor='cep'>CEP:</label>
          <input
            type='text'
            id='cep'
            name='cep'
            value={formData.cep}
            onChange={handleChange}
            required
          />
        </div>
      )
    }
    return null
  }

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer)
    }

    if (
      location.pathname === '/request-devs' ||
      location.pathname === '/solutions'
    ) {
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
      body.type = 'Requester'
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/abandoned-requests`,
        body,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
          }
        }
      )
    }
  }

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    localStorage.setItem('formDataRequest', JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [])
  const handleTooltipClick = (message: string) => () => {
    setTooltipMessage(message)

    setShowTooltipModal(true)
  }
  const goToNextStep = () => {
    setFormStep(prevStep => prevStep + 1)
  }

  const goToPreviousStep = () => {
    setFormStep(prevStep => prevStep - 1)
  }
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <div className='container-request'>
      <section id='services'>
        <h3>Faça sua solicitação e aguarde contato.</h3>

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
              <label htmlFor='name'>Nome:</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
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
                onChange={handleChange}
                required
                style={{ width: '300px' }}
              />
            </div>

            <div>
              <label htmlFor='phone'>Telefone Celular:</label>
              <InputMask
                mask='(99)99999-9999'
                maskChar='-'
                type='tel'
                id='phone'
                name='phone'
                placeholder='XX-XXXXX-XXXX'
                value={formData.phone}
                onChange={handleChange}
                required
                style={{ width: '300px' }}
              />
            </div>
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
              <label htmlFor='type'>
                Tipo de Serviço:
                <Tooltip title='Selecione o tipo de serviço que vai solicitar.'>
                  <span
                    onClick={handleTooltipClick(
                      'Selecione o tipo de serviço que vai solicitar.'
                    )}
                    style={{ cursor: 'pointer' }}
                  >
                    (?)
                  </span>
                </Tooltip>{' '}
              </label>
              <select
                id='type'
                name='type'
                value={formData.type}
                onChange={handleChange}
                required
                style={{ width: '300px' }}
              >
                <option value='training'>Treinamento</option>
                <option value='implementation'>Implementação</option>
                <option value='course'>Curso</option>
                <option value='technical_support'>Suporte Técnico</option>
                <option value='operational_support'>Suporte Operacional</option>
                <option value='maintenance'>Manutenção</option>
                <option value='other'>Outro</option>
              </select>
            </div>
            <div>
              <label htmlFor='description'>
                Descrição da Solicitação:
                <button
                  type='button'
                  onClick={handleButtonClickSpeech}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '30%',
                    padding: 0,
                    backgroundColor: '#00adb5',
                    border: 'none'
                  }}
                >
                  <MicIcon style={{ fontSize: 20 }} />{' '}
                </button>
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                style={{ width: '300px' }}
              />
            </div>{' '}
            <div>
              <label htmlFor='value'>
                Valor Disponivel:
                <Tooltip title='Valor aproximado que está disposto a pagar pelo serviço'>
                  <span
                    onClick={handleTooltipClick(
                      'Valor aproximado que está disposto a pagar pelo serviço'
                    )}
                    style={{ cursor: 'pointer' }}
                  >
                    (?)
                  </span>
                </Tooltip>{' '}
              </label>
              <select
                id='value'
                name='value'
                value={formData.value}
                onChange={handleChange}
                required
                style={{ width: '300px' }}
              >
                <option value='0'>Selecione um valor</option>
                <option value='50'>Até R$ 50,00</option>
                <option value='100'>Até R$ 100,00</option>
                <option value='150'>Até R$ 150,00</option>
                <option value='200'>Até R$ 200,00</option>
                <option value='0.0'>Não Definido</option>
              </select>
              <input
                type='number'
                id='value-customized'
                name='value'
                value={formData.value}
                onChange={handleChange}
                placeholder='ou informe um valor personalizado'
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='term'>Prazo em dias:</label>
              <input
                type='number'
                id='term'
                name='term'
                value={formData.term}
                onChange={handleChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='local'>Local:</label>
              <select
                id='local'
                name='local'
                value={formData.local}
                onChange={handleChange}
                required
                style={{ width: '300px' }}
              >
                <option value='online'>Remoto/Online</option>
                <option value='in person'>Presencial</option>
              </select>
            </div>
            {renderCepField()}
            <div>
              <label>
                <input
                  type='checkbox'
                  name='agreeTerms'
                  checked={formData.agreeTerms}
                  onChange={handleChange}
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
            <div style={{ color: 'black' }}>
              {' '}
              * Serviço prestado pela plataforma tem 7 dias de suporte grátis.
            </div>
          </form>
        )}
        {!isMobile && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name'>Nome:</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='phone'>Telefone Celular:</label>
              <InputMask
                mask='(99)99999-9999'
                maskChar='-'
                type='tel'
                id='phone'
                name='phone'
                placeholder='XX-XXXXX-XXXX'
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='type'>
                Tipo de Serviço:
                <Tooltip title='Selecione o tipo de serviço que vai solicitar.'>
                  <span
                    onClick={handleTooltipClick(
                      'Selecione o tipo de serviço que vai solicitar.'
                    )}
                    style={{ cursor: 'pointer' }}
                  >
                    (?)
                  </span>
                </Tooltip>{' '}
              </label>
              <select
                id='type'
                name='type'
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value='training'>Treinamento</option>
                <option value='implementation'>Implementação</option>
                <option value='course'>Curso</option>
                <option value='technical_support'>Suporte Técnico</option>
                <option value='operational_support'>Suporte Operacional</option>
                <option value='maintenance'>Manutenção</option>
                <option value='other'>Outro</option>
              </select>
            </div>
            <div>
              <label htmlFor='description'>
                Descrição da Solicitação:
                <button
                  type='button'
                  onClick={handleButtonClickSpeech}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '30%',
                    padding: 0,
                    backgroundColor: '#00adb5',
                    border: 'none'
                  }}
                >
                  <MicIcon style={{ fontSize: 20 }} />{' '}
                </button>
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>{' '}
            <div>
              <label htmlFor='value'>
                Valor Disponivel:
                <Tooltip title='Valor aproximado que está disposto a pagar pelo serviço'>
                  <span
                    onClick={handleTooltipClick(
                      'Valor aproximado que está disposto a pagar pelo serviço'
                    )}
                    style={{ cursor: 'pointer' }}
                  >
                    (?)
                  </span>
                </Tooltip>{' '}
              </label>
              <select
                id='value'
                name='value'
                value={formData.value}
                onChange={handleChange}
                required
              >
                <option value='0'>Selecione um valor</option>
                <option value='50'>Até R$ 50,00</option>
                <option value='100'>Até R$ 100,00</option>
                <option value='150'>Até R$ 150,00</option>
                <option value='200'>Até R$ 200,00</option>
                <option value='0.0'>Não Definido</option>
              </select>
              <input
                type='number'
                id='value-customized'
                name='value'
                value={formData.value}
                onChange={handleChange}
                placeholder='ou informe um valor personalizado'
                required
              />
            </div>
            <div>
              <label htmlFor='term'>Prazo em dias:</label>
              <input
                type='number'
                id='term'
                name='term'
                value={formData.term}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='local'>Local:</label>
              <select
                id='local'
                name='local'
                value={formData.local}
                onChange={handleChange}
                required
              >
                <option value='online'>Remoto/Online</option>
                <option value='in person'>Presencial</option>
              </select>
            </div>
            {renderCepField()}
            <div>
              <label>
                <input
                  type='checkbox'
                  name='agreeTerms'
                  checked={formData.agreeTerms}
                  onChange={handleChange}
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
            <div style={{ color: 'black' }}>
              {' '}
              * Serviço prestado pela plataforma tem 7 dias de suporte grátis.
            </div>
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
            <div
              className='modal-content-wrapper'
              dangerouslySetInnerHTML={{ __html: TermUse() }}
            ></div>
          </div>
        </div>
        <div
          id='myModal'
          ref={modalRef}
          className={`modal ${showTooltipModal ? 'show' : ''}`}
        >
          <div className='modal-content'>
            <span className='close' onClick={() => setShowTooltipModal(false)}>
              &times;
            </span>
            <p style={{ color: 'black' }}>{tooltipMessage}</p>
          </div>
        </div>
      </section>
      {error && <ErrorNotification message={error} severity='error' />}
    </div>
  )
}

export default RequestDevs
