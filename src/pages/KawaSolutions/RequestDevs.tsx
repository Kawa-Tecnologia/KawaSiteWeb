import axios from 'axios'
import React, { ChangeEvent, useState, useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip'
import '../../assets/styles/Modal.css'
import InputMask from 'react-input-mask'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import MicIcon from '@mui/icons-material/Mic'

const RequestDevs = () => {
  const { transcript } = useSpeechRecognition()
  const [showTooltipModal, setShowTooltipModal] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState('')

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
    if (!formData.agreeTerms) {
      alert('Por favor, concorde com os termos de uso.')
      return
    }

    const body = formData

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
        type: '',
        cep: '',
        local: 'online',
        agreeTerms: false,
        user_id_requested: 0
      })
      alert('Solicitação criada, aguarde contato dos nossos desenvolvedores!')
    } catch (error) {
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

  const renderDetails = () => {
    return {
      __html: `
      <h3>Termos de Uso</h3>
      <ul>
        <li>
          Para problemas e dúvidas sobre a utilização da plataforma, como realizar a solicitação do serviço,
          treinamento, entre outros e suporte em geral, por favor, envie
          email para suporte@kawatecnologia.com.br ou whatsapp (11)914287025;
        </li>
        <li>
          O solicitante esta ciente de que podem haver custos adicionais para que o prestador de serviço 
		  consiga finalizar o atendimento a solicitação, como custos operacionais, custos para terceiros;
        </li>
        <li>
		  A Kawa Tecnologia não se responsabiliza por eventuais problemas que podem ocorrer durante o 
		  processo da prestação de serviço, tendo como responsaveis, o solicitante e o próprio prestador, 
		  que como cientes, deverão firmar um contrato ou termo da prestação, garantindo a integridade e
		  acordos que deverão ser firmados antes da realização do mesmo.
        </li>
        <li>
		  A Kawa Tecnologia se reserva no direito de prestar suporte aos envolvidos, buscando a melhor 
		  solução para o caso, tendo em vista, a boa relação entre as partes e disponibilizando o canal de 
		  suporte para esclarecimentos e intermediar o acordo.
		</li> <li>
    A Kawa Tecnologia irá oferecer suporte tecnico de até 7 dias para o solicitante caso o prestador
    de serviço não o faça, após a finalização do serviço .
  </li>
		<li>
		  Todas as relações são documentadas e guardadas para fim de esclarecimentos e uma forma de qualificar 
		  tanto o serviço prestado pelo prestador, quanto a fidelidade do cliente para com seus compromissos 
		  profissionais e financeiros, honrar com o pagamento é um dever do cliente.
		</li>
		<li>
          O prestador é único e exclusivamente responsável pelo serviço/produto, em
          todos os aspectos legais e financeiros. Qualquer questão
          administrativa ou judicial quanto ao conteúdo do serviço ou produto adquirido,
          suas características, qualidade, funcionalidades, oferta e
          publicidade, deve ser feita diretamente ao(à) Prestador(a) através do
          email ou telefone fornecido logo no inicio do processo;
        </li>
        <li>
          Ao concretizar a solicitação, você concorda e aceita de forma integral e
          irrestrita os Termos de Uso Kawa Solutions recomenda-se a leitura atenta do referido documento;
        </li>
        <li>
          Você deverá verificar com o prestador do produto/serviço o prazo para
          solicitar o cancelamento do mesmo em caso de alguma inconsistência no processo;
        </li>
        <li>
          O prazo de cancelamento passará a valer a partir do acordo entre as partes.
          Assim, você, solicitante, é responsável por verificar, imediatamente,
          se o produto/serviço adquirido foi efetivado;
        </li>
           <li>
          Kawa Solutions é uma plataforma de serviços de tecnologia e não possui
          vínculo empregatício/trabalhista ou de qualquer outra natureza com os prestadores de serviço. 
		  Dessa forma, reitera-se que a Kawa Solutions não responde legal
          e/ou financeiramente pelo serviço/produto ora adquirido, posto que seu
          conteúdo, funcionalidade, qualidade, oferta e publicidade, são de
          inteira responsabilidade do Prestador que o criou e disponibilizou
          através da plataforma;
        </li>
        <li>
          Qualquer informação adicional sobre o serviço/produto deve ser levantada pelo
          solicitante diretamente com o prestador após a finalização do compromisso firmado. O solicitante
          receberá o e-mail e telefone para contatar o prestador;
        </li>
        <li>
          Seus dados de contato, como e-mail, telefone, etc., podem ser
          fornecidos ao prestador ;
        </li>
        <li>
          A conclusão da solicitação confirma a ciência e concordância do solicitante
          quanto aos Termos de Uso;
        </li>
      </ul>`
    }
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
  return (
    <div className='container-request'>
      <section id='services'>
        <h3>Faça sua solicitação e aguarde contato.</h3>
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

        <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <p id='modal-details' dangerouslySetInnerHTML={renderDetails()}></p>
          </div>
        </div>
        <div id='myModal' className={`modal ${showTooltipModal ? 'show' : ''}`}>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowTooltipModal(false)}>
              &times;
            </span>
            <p style={{ color: 'black' }}>{tooltipMessage}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RequestDevs
