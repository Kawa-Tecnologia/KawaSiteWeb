import React, { useEffect, useState } from 'react'
import '../../assets/styles/CadastroForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import ErrorNotification from '../../components/Error'
import { BackendStatus } from '../../utils/statusType'
import { useMediaQuery } from 'react-responsive'

interface Plan {
  id: number
  name: string
  description: string
  amount: number
  points: string
  previous_amount: number
  type: string
  endpoint: string
  period: string
  active: boolean
  text: string
  preference_id: string
  origin_preference_id: string
  discounted_percentage: number
}

const RegisterDev: React.FC = () => {
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
    plan_id: 9,
    active: false,
    ProfessionalInfo: {
      job_title: '',
      skills: [''],
      tag_id: '1',
      cv_link: '',
      presentation: '',
      profile_linkedin: '',
      profile_github: '',
      tools: [''],
      url: '',
      imageSrc: '',
      experience_years: 0
    },
    type: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showModalDetails, setShowModalDetails] = useState<boolean>(false)
  const [showTooltipModal, setShowTooltipModal] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState('')
  const [planSubscriptions, setPlanSubscriptions] = useState<Plan[]>([
    {
      id: 0,
      name: '',
      description: '',
      amount: 0,
      points: '',
      previous_amount: 0,
      type: '',
      endpoint: '',
      period: '',
      active: true,
      text: '',
      preference_id: '',
      origin_preference_id: '',
      discounted_percentage: 0
    }
  ])
  const openModal = () => {
    setShowModal(true)
  }
  const openModalDetails = () => {
    setShowModalDetails(true)
  }
  const closeModal = () => {
    setShowModal(false)
    setShowModalDetails(false)
  }

  const handleButtonClickDetails = () => {
    openModalDetails()
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
    return
  }
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      formData.document_number.replace(/\D/g, '').length !== 11 &&
      formData.document_number.replace(/\D/g, '').length !== 14
    ) {
      setError('Documento invalido')
      return
    }

    try {
      const body = {
        ...formData,
        status: BackendStatus.REQUESTED,
        type: 'subscription',
        points_required: 0,
        amount: planSubscriptions[0].amount,
        date: new Date()
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/buy/subscription`,
        body,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
          }
        }
      )
      const url = `${planSubscriptions[0].endpoint}`
      window.open(url, '_blank')
    } catch (error) {
      setError('Erro ao realizar o cadastro')
    }

    navigate('/devs/login')
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/plans?type=open`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
          }
        }
      )
      if (data.plans) {
        setPlanSubscriptions(data.plans)
      }
    }
    fetchData()
  }, [])
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    if (name === 'type') {
      setFormData(prevState => ({
        ...prevState,
        type: value
      }))
    } else if (name in formData.ProfessionalInfo) {
      setFormData(prevState => ({
        ...prevState,
        ProfessionalInfo: {
          ...prevState.ProfessionalInfo,
          [name]: value
        }
      }))
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData(prevState => ({
      ...prevState,
      ProfessionalInfo: {
        ...prevState.ProfessionalInfo,
        [name]: value
      }
    }))
  }
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState)
  }
  const renderDetails = (string: string) => {
    if (string === 'term') {
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
              O prestador esta ciente de que a negociação será diretamente com o solicitante, valores a receber,
              prazo e contratos, devem ser firmados com o mesmo;
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
            </li>
            <li>
              Todas as relações são documentadas e guardadas para fim de esclarecimentos e uma forma de qualificar 
              tanto o serviço prestado pelo prestador, quanto a fidelidade do cliente para com seus compromissos 
              profissionais e financeiros, honrar com o pagamento é um dever do cliente.
            </li>
            <li>
              O prestador é único e exclusivamente responsável pelo serviço/produto, em
              todos os aspectos legais e financeiros. Qualquer questão
              administrativa ou judicial quanto ao conteúdo do produto ou serviço prestado,
              suas características, qualidade, funcionalidades, oferta e
              publicidade, deve ser feita diretamente ao(à) solicitante(a) através do
              email ou telefone fornecido logo no inicio do processo;
            </li>
            <li>
              Ao concretizar a solicitação, você concorda e aceita de forma integral e
              irrestrita os Termos de Uso Kawa Solutions recomenda-se a leitura atenta do referido documento;
            </li>
            <li>
              Você deverá verificar com o solicitante do produto/serviço o prazo máximo para
              cancelamento do mesmo em caso de alguma inconsistência no processo;
            </li>
            <li>
              O prazo de cancelamento passará a valer a partir do acordo entre as partes.
              Assim, você, prestador, é responsável por verificar, imediatamente,
              se o produto/serviço foi efetivado;
            </li>
               <li>
              Kawa Solutions é uma plataforma de serviços de tecnologia e não possui
              vínculo empregatício/trabalhista ou de qualquer outra natureza com os prestadores de serviço. 
              Dessa forma, reitera-se que a Kawa Solutions não responde legal
              e/ou financeiramente pelo serviço/produto ora adquirido, posto que seu
              conteúdo, funcionalidade, qualidade, oferta e publicidade, são de
              inteira responsabilidade do Prestador que o criou e disponibilizou
              ao solicitante;
            </li>
            <li>
              Qualquer informação adicional sobre o serviço/produto deve ser levantada pelo
              solicitante diretamente com o prestador após a finalização do compromisso firmado. O prestador
              receberá o e-mail e telefone para contatar o solicitante;
            </li>
            <li>
              Seus dados de contato, como e-mail, telefone, etc., podem ser
              fornecidos ao solicitante ;
            </li>
            <li>
              A conclusão do cadastro confirma a ciência e concordância do solicitante
              quanto aos Termos de Uso;
            </li>
          </ul>`
      }
    } else {
      return {
        __html: `
        <div style="font-family: Arial, sans-serif; color: #fff; background-color: #2c3e50; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);">
        <h3> Plano Open to Work</h3>
      
        <style="font-size: 18px;">Com o Plano Open to Work, você terá direito a:</style>
        
        <ul style="list-style: none; padding-left: 0; font-size: 18px; margin-bottom: 20px;">
          <li>&#10004; Aparecer na busca dos recrutadores;<br/>
          &#10004; Ser cadastrado em pelo menos 3 sites de vagas;<br/>
          <!-- &#10004; Entrar no grupo do Discord;<br/>
          &#10004; Acessar a plataforma para realizar, dar treinamentos e prestar serviços remunerados(freelancer); --!>
          </li>
        </ul>
      
        *Não perca essa oportunidade de aumentar sua visibilidade e encontrar as melhores oportunidades de trabalho!
      </div>
  `
      }
    }
  }

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer)
    }
    if (location.pathname === '/devs/register-devs') {
      setTimer(setTimeout(handleFormAbandoned, 60000))
    }
  }
  const handleTooltipClick = (message: string) => () => {
    setTooltipMessage(message)

    setShowTooltipModal(true)
  }
  const handleFormAbandoned = async () => {
    alert('Preencha seus dados, email, telefone celular')

    const body = formData

    if (
      body.email.includes('.com') ||
      body.phone.replace(/\D/g, '').length === 11
    ) {
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
        setError('Erro ao criar o abandono de cadastro')
      }
    }
  }

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    localStorage.setItem('formDataRegisterDev', JSON.stringify(formData))
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
  const goToNextStep = () => {
    setFormStep(prevStep => prevStep + 1)
  }

  const goToPreviousStep = () => {
    setFormStep(prevStep => prevStep - 1)
  }
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
            </div>

            <div>
              <label htmlFor='document_number'>CPF/CNPJ:</label>
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
              <label htmlFor='job_title'>Cargo:</label>
              <input
                type='text'
                id='job_title'
                name='job_title'
                value={formData.ProfessionalInfo?.job_title}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='presentation'>Apresentação:</label>
              <input
                type='text'
                id='presentation'
                name='presentation'
                value={formData.ProfessionalInfo?.presentation}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='tag_id'> Nível Técnico:</label>

              <select
                name='tag_id'
                value={formData.ProfessionalInfo?.tag_id}
                onChange={handleSelectChange}
                style={{ width: '300px' }}
              >
                <option value='1'>Principiante</option>
                <option value='2'>Junior</option>
                <option value='3'>Pleno</option>
                <option value='4'>Senior</option>
                <option value='5'>Especialista</option>
              </select>
            </div>
            <div>
              <label htmlFor='profile_linkedin'>Perfil do Linkedin:</label>
              <input
                type='text'
                id='profile_linkedin'
                name='profile_linkedin'
                value={formData.ProfessionalInfo?.profile_linkedin}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='profile_github'>Perfil do Github:</label>
              <input
                type='text'
                id='profile_github'
                name='profile_github'
                value={formData.ProfessionalInfo?.profile_github || ''}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='cv_link'>Link do Curriculo:</label>
              <input
                type='text'
                id='cv_link'
                name='cv_link'
                value={formData.ProfessionalInfo?.cv_link}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='skills'>
                Habilidades:{' '}
                <Tooltip title='Informe as habilidades separadas por (,).'>
                  <span
                    onClick={handleTooltipClick(
                      'Informe as ferramentas separadas por (,).'
                    )}
                    style={{ cursor: 'pointer' }}
                  >
                    (?)
                  </span>
                </Tooltip>{' '}
              </label>
              <textarea
                id='skills'
                name='skills'
                value={formData.ProfessionalInfo.skills}
                onChange={handleInputChange}
                required
                rows={5}
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='tools'>
                Ferramentas:
                <Tooltip title='Informe as ferramentas separadas por (,).'>
                  <span
                    onClick={handleTooltipClick(
                      'Informe as ferramentas separadas por (,).'
                    )}
                    style={{ cursor: 'pointer' }}
                  >
                    (?)
                  </span>
                </Tooltip>{' '}
              </label>
              <textarea
                id='tools'
                name='tools'
                value={formData.ProfessionalInfo.tools}
                onChange={handleInputChange}
                required
                rows={5}
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='url'>Site:</label>
              <input
                type='text'
                id='url'
                name='url'
                value={formData.ProfessionalInfo.url}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='experience_years'>Anos de Experiência:</label>
              <input
                type='number'
                id='experience_years'
                name='experience_years'
                value={formData.ProfessionalInfo.experience_years}
                onChange={handleInputChange}
                required
                style={{ width: '300px' }}
              />
            </div>
            <div>
              <label htmlFor='password'>Senha:</label>
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
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
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
                <option value='openToWork'>Open To Work</option>
              </select>
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  name='agreeTerms'
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                  style={{ width: '300px' }}
                />{' '}
                Concordo com os termos de uso
                <div>
                  <a href='#' onClick={handleButtonClick}>
                    Ver Termos de Uso
                  </a>
                </div>
              </label>
            </div>
            <div>
              <button
                type='button'
                className='modal-button'
                onClick={() => handleButtonClickDetails()}
              >
                Mais Detalhes
              </button>
            </div>
            <button type='button' onClick={goToPreviousStep}>
              Voltar
            </button>
            <div>
              <button type='submit'>
                Adquirir Plano Mensal por apenas R$19,99/mes
              </button>
            </div>
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
              <label htmlFor='document_number'>CPF/CNPJ:</label>
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
              <label htmlFor='job_title'>Cargo:</label>
              <input
                type='text'
                id='job_title'
                name='job_title'
                value={formData.ProfessionalInfo?.job_title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='presentation'>Apresentação:</label>
              <input
                type='text'
                id='presentation'
                name='presentation'
                value={formData.ProfessionalInfo?.presentation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='tag_id'> Nível Técnico:</label>

              <select
                name='tag_id'
                value={formData.ProfessionalInfo?.tag_id}
                onChange={handleSelectChange}
              >
                <option value='1'>Principiante</option>
                <option value='2'>Junior</option>
                <option value='3'>Pleno</option>
                <option value='4'>Senior</option>
                <option value='5'>Especialista</option>
              </select>
            </div>
            <div>
              <label htmlFor='profile_linkedin'>Perfil do Linkedin:</label>
              <input
                type='text'
                id='profile_linkedin'
                name='profile_linkedin'
                value={formData.ProfessionalInfo?.profile_linkedin}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='profile_github'>Perfil do Github:</label>
              <input
                type='text'
                id='profile_github'
                name='profile_github'
                value={formData.ProfessionalInfo?.profile_github || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='cv_link'>Link do Curriculo:</label>
              <input
                type='text'
                id='cv_link'
                name='cv_link'
                value={formData.ProfessionalInfo?.cv_link}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='skills'>
                Habilidades:{' '}
                <Tooltip title='Informe as habilidades separadas por (,).'>
                  <span
                    onClick={handleTooltipClick(
                      'Informe as ferramentas separadas por (,).'
                    )}
                    style={{ cursor: 'pointer' }}
                  >
                    (?)
                  </span>
                </Tooltip>{' '}
              </label>
              <input
                type='text'
                id='skills'
                name='skills'
                value={formData.ProfessionalInfo.skills}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='tools'>
                Ferramentas:
                <Tooltip title='Informe as ferramentas separadas por (,).'>
                  <span
                    onClick={handleTooltipClick(
                      'Informe as ferramentas separadas por (,).'
                    )}
                    style={{ cursor: 'pointer' }}
                  >
                    (?)
                  </span>
                </Tooltip>{' '}
              </label>
              <input
                type='text'
                id='tools'
                name='tools'
                value={formData.ProfessionalInfo.tools}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='url'>Site:</label>
              <input
                type='text'
                id='url'
                name='url'
                value={formData.ProfessionalInfo.url}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='experience_years'>Anos de Experiência:</label>
              <input
                type='number'
                id='experience_years'
                name='experience_years'
                value={formData.ProfessionalInfo.experience_years}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor='password'>Senha:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type='button' onClick={togglePasswordVisibility}>
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
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
                <option value='openToWork'>Open To Work</option>
              </select>
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
            <div>
              <button
                type='button'
                className='modal-button'
                onClick={() => handleButtonClickDetails()}
              >
                Mais Detalhes
              </button>
            </div>
            <div>
              <button type='submit'>
                Adquirir Plano Mensal por apenas R$19,99/mes
              </button>
            </div>
          </form>
        )}
        <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <p
              id='modal-details'
              dangerouslySetInnerHTML={renderDetails('term')}
            ></p>
          </div>
        </div>
        <div id='myModal' className={`modal ${showModalDetails ? 'show' : ''}`}>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <p
              id='modal-details-plan'
              dangerouslySetInnerHTML={renderDetails('details')}
            ></p>
          </div>
        </div>
      </div>
      {error && <ErrorNotification message={error} severity='error' />}
      <div id='myModal' className={`modal ${showTooltipModal ? 'show' : ''}`}>
        <div className='modal-content'>
          <span className='close' onClick={() => setShowTooltipModal(false)}>
            &times;
          </span>
          <p style={{ color: 'black' }}>{tooltipMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default RegisterDev
