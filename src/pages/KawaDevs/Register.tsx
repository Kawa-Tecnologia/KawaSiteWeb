import React, { useEffect, useState } from 'react'
import '../../assets/styles/CadastroForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import ErrorNotification from '../../components/Error'

const Register: React.FC = () => {
  const [error, setError] = useState<string>('')

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
  }

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(setTimeout(handleFormAbandoned, 60000))
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

  return (
    <div className='register'>
      <div className='cadastro-container'>
        <form onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>
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
        <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <p id='modal-details' dangerouslySetInnerHTML={renderDetails()}></p>
          </div>
        </div>
      </div>
      {error && <ErrorNotification message={error} severity='error' />}
    </div>
  )
}

export default Register
