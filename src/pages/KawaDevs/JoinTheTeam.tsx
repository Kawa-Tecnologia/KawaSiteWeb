import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../assets/styles/Plans.css'
import NavigationDev from '../../components/NavigationDevs'
import '../../assets/styles/JoinTheTeam.css'
interface Plan {
  name: string
  description: string
  amount: number
  points: string
  previous_amount: number
  type: string
  qr_code: string
  period: string
  active: boolean
  text: string
}

const JoinTheTeam: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalDetails, setModalDetails] = useState<Plan>({
    name: '',
    description: '',
    amount: 0,
    points: '',
    previous_amount: 0,
    type: '',
    qr_code: '',
    period: '',
    active: true,
    text: ''
  })
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)
  //const [plans, setPlans] = useState<Plan[]>([])
  const [plansService, setPlansService] = useState<Plan[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const planString = localStorage.getItem('plans')
        if (planString) {
          const storedPlan: Plan[] = JSON.parse(planString)
          setPlansService(storedPlan)
        } else {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/plans`,
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
              }
            }
          )

          if (data.plans) {
            // const platform = data.plans.filter(
            //   (plan: Plan) => plan.type === 'platform'
            // )
            const service = data.plans.filter(
              (plan: Plan) => plan.type === 'service'
            )
            //setPlans(platform)
            setPlansService(service)
            localStorage.setItem('plans', JSON.stringify(service))
          }
        }
      } catch (error) {
        console.error('Error fetching plans:', error)
      }
    }
    fetchPlans()
  }, [])

  const openModal = (title: string, plan: Plan) => {
    setShowModal(true)
    setModalTitle(title)
    setModalDetails(plan)
  }

  const closeModal = () => {
    setShowModal(false)
    setShowPaymentModal(false)
  }

  const handleButtonClick = (title: string, details: Plan) => {
    openModal(title, details)
  }

  const renderDetails = (plan: Plan) => {
    return {
      __html: `<p><strong>Descrição:</strong> ${plan.description.replace(
        /\n/g,
        '<br>'
      )}</p>
    <p><strong>Pontos:</strong> ${plan.points}</p>
    <p><strong>Preço:</strong> ${plan.amount}</p>
    <!-- Adicione mais campos conforme necessário -->`
    }
  }

  const goToCadastro = () => {
    navigate('/devs/register')
  }

  return (
    <div>
      <header className='header'>
        <div className='logo-container'>
          <img
            className='logo'
            src={require('../../assets/images/kawa.jpg')}
            alt='Kawa Devs'
          />
        </div>
        <NavigationDev />
      </header>
      <div className='join'>
        <div className='join-the-team'>
          <section id='planos'>
            <h2>Pacotes</h2>
            <p>*Pontos nunca expiram.</p>
            <div className='plano-container'>
              {/* <div className='plano plataforma'>
                <h3>Pacotes de Plataforma</h3>
                * Cadastre-se com o Tipo Plataforma e adquira pontos para
                alavancar sua carreira.         <br/>
                * Precisa de treinamentos, quer evoluir
                na carreira, esses pacotes são para você.
                <br />
                * Conecte-se com diversos desenvolvedores que irão te levar ao
                proximo nivel.
                <br />
                <div className='plano-group'>
                  {plans.map((plan, index) => (
                    <div className='plano plano-item' key={index}>
                      <h3>{plan.name}</h3>
                      <p>{plan.description}</p>
                      <p>Pontos: {plan.points}</p>
                      <p>Preço: R${plan.amount}</p>
                      <button
                        className='modal-button'
                        onClick={() => handleButtonClick(plan.name, plan)}
                      >
                        Mais Detalhes
                      </button>
                      <br />
                      <button id='modal-pay-button' onClick={goToCadastro}>
                        Cadastrar
                      </button>
                    </div>
                  ))}
                </div>
              </div> */}
              <div className='plano plataforma'>
                <h3>Pacotes de Serviço</h3>
                * Cadastre-se com o Tipo Serviço e adquira pontos para prestar
                serviços e conquistar clientes.
                <br /> * Caso tenha prestado serviços em outras plataformas,
                poderá exportar as avaliações.
                <br />
                * Com apenas poucos serviços, você ja recupera o valor investido
                e consegue um ótimo lucro.
                <br />
                <div className='plano-group'>
                  {plansService.map((plan, index) => (
                    <div className='plano plano-item' key={index}>
                      <h3>{plan.name}</h3>
                      <p>{plan.description}</p>
                      <p>Pontos: {plan.points}</p>
                      <p>Preço: R${plan.amount}</p>
                      <button
                        className='modal-button'
                        onClick={() => handleButtonClick(plan.name, plan)}
                      >
                        Mais Detalhes
                      </button>
                      <br />
                      <button id='modal-pay-button' onClick={goToCadastro}>
                        Cadastrar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
            <div className='modal-content'>
              <span className='close' onClick={closeModal}>
                &times;
              </span>
              <h2 id='modal-title'>{modalTitle}</h2>
              <p
                id='modal-details'
                dangerouslySetInnerHTML={renderDetails(modalDetails)}
              ></p>
              <button id='modal-pay-button' onClick={goToCadastro}>
                Cadastrar
              </button>{' '}
            </div>
          </div>
          <div
            id='paymentModal'
            className={`modal ${showPaymentModal ? 'show' : ''}`}
          >
            <div className='modal-content'>
              <span className='close' onClick={closeModal}>
                &times;
              </span>
              <button id='modal-pay-button' onClick={goToCadastro}>
                Cadastrar
              </button>
              <p>
                Após o pagamento e o cadastro, aguarde email de confirmação,
                receberá em até 24h.
              </p>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinTheTeam
