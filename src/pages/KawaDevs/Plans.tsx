import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/styles/Plans.css'

interface Plan {
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
}

const Plans: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalDetails, setModalDetails] = useState<Plan>({
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
    preference_id: ''
  })

  const openModal = (title: string, plan: Plan) => {
    setShowModal(true)
    setModalTitle(title)
    setModalDetails(plan)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleButtonClick = (title: string, details: Plan) => {
    openModal(title, details)
  }

  const renderDetails = (plan: Plan) => {
    return {
      __html: `     <p><strong>Descrição:</strong> ${plan.description.replace(
        /\n/g,
        '<br>'
      )}</p>
    <p><strong>Pontos:</strong> ${plan.points}</p>
    <p><strong>Preço:</strong> R$${plan.amount}</p>
    <!-- Adicione mais campos conforme necessário -->`
    }
  }

  const navigate = useNavigate()
  const goToCadastro = () => {
    navigate('/devs/register')
  }

  //const [plans, setPlans] = useState<Plan[]>([])
  const [plansService, setPlansService] = useState<Plan[]>([])

  useEffect(() => {
    const fetchDevelopers = async () => {
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
        console.error('Error fetching developers:', error)
      }
    }
    fetchDevelopers()
  }, [])

  return (
    <div>
      <section id='planos'>
        <h2>Pacotes</h2>
        <p>* Pontos nunca expiram.</p>
        <div className='plano-container'>
          {/* <div className='plano plataforma'>
            <h3>Pacotes de Plataforma</h3>
            * Cadastre-se com o Tipo Serviço e adquira pontos para prestar
                serviços e conquistar clientes.<br/>
            * Precisa de treinamentos, quer evoluir na carreira, esses pacotes
            são para você.
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
            <br />
            * Caso tenha prestado serviços em outras plataformas, poderá
            exportar as avaliações.
            <br />
            * Com apenas poucos serviços, você ja recupera o valor investido e
            consegue um ótimo lucro.
            <br />
            <div className='plano-group'>
              {plansService.map((plan, index) => (
                <div className='plano plano-item' key={index}>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  <p>Pontos: {plan.points}</p>
                  <p>Preço: R${plan.amount}</p>
                  <div className='button-container'>
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
    </div>
  )
}

export default Plans
