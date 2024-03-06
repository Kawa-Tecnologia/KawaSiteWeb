import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/Plans.css'
interface Payment {
  title: string
  image: string
  link: string
  price: number
}

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
    qr_code: '',
    period: '',
    active: true,
    text: ''
  })
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)
  const [modalPayment, setModalPayment] = useState<Payment>({
    title: '',
    image: '',
    link: '',
    price: 0
  })
  const [copied, setCopied] = useState<boolean>(false)

  const openModal = (title: string, plan: Plan) => {
    setShowModal(true)
    setModalTitle(title)
    setModalDetails(plan)
  }
  const openPaymentModal = (
    title: string,
    image: string,
    link: string,
    price: number
  ) => {
    setShowPaymentModal(true)
    setModalPayment({ title: title, image: image, link: link, price: price })
  }
  const closeModal = () => {
    setShowModal(false)
    setShowPaymentModal(false)
  }

  const handleButtonClick = (title: string, details: Plan) => {
    openModal(title, details)
  }
  const handleButtonClickPayment = (
    title: string,
    image: string,
    link: string,
    price: number
  ) => {
    openPaymentModal(title, image, link, price)
  }

  const renderDetails = (plan: Plan) => {
    return {
      __html: `     <p><strong>Descrição:</strong> ${plan.description.replace(
        /\n/g,
        '<br>'
      )}</p>
    <p><strong>Pontos:</strong> ${plan.points}</p>
    <p><strong>Preço:</strong> ${plan.amount}</p>
    <p><strong>Período:</strong> ${plan.period}</p>
    <!-- Adicione mais campos conforme necessário -->`
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(modalPayment.link)
      .then(() => setCopied(true))
      .catch(error => console.error('Failed to copy:', error))
  }

  const renderDetailPayment = (modalPayment: Payment) => {
    return (
      <div>
        <h2>{modalPayment.title}</h2>
        <img src={modalPayment.image} alt='Imagem de QR Code' />
        <p>
          <strong>Copia e Cola:</strong> {modalPayment.link}
        </p>
        <button onClick={copyToClipboard}>
          {copied ? 'Copiado!' : 'Copiar'}
        </button>

        <p>Preço: {modalPayment.price}</p>
      </div>
    )
  }

  const navigate = useNavigate()
  const goToCadastro = () => {
    navigate('/register')
  }

  const [plans, setPlans] = useState<Plan[]>([])
  const [plansService, setPlansService] = useState<Plan[]>([])

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/plans`, {
          headers: {
            Authorization: `Bearer 1234`
          }
        })
        if (data.plans) {
          const platform = data.plans.filter(
            (plan: Plan) => plan.type === 'platform'
          )
          const service = data.plans.filter(
            (plan: Plan) => plan.type === 'service'
          )
          setPlans(platform)
          setPlansService(service)
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
        <h2>Planos</h2>
        <p>* Pontos nunca expiram.</p>
        <div className='plano-container'>
          <div className='plano plataforma'>
            <h3>Plano de Plataforma</h3>
            * Precisa de treinamentos, quer evoluir na carreira, esses planos
            são para você.
            <br />
            * Conecte-se com diversos desenvolvedores que irão te levar ao proximo nivel.
            <br />
            <div className='plano-group'>
              {plans.map((plan, index) => (
                <div className='plano plano-item'
                key={index}>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  <p>Pontos: {plan.points}</p>
                  <p>Preço: R${plan.amount}</p>
                  <p>{plan?.period ? `Periodo: ${plan?.period}` : ''}</p>

                  <button
                    className='modal-button'
                    onClick={() => handleButtonClick(plan.name, plan)}
                  >
                    Mais Detalhes
                  </button>
                  <br />
                  <button
                    className='modal-button'
                    onClick={() =>
                      handleButtonClickPayment(
                        `Adquirir ${plan.name}`,
                        plan.qr_code, // Altere para o caminho correto da imagem do QR code
                        plan.text,
                        plan.amount // Altere para o preço correto
                      )
                    }
                  >
                    Adquirir {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className='plano plataforma'>
            <h3>Plano de Serviço</h3>
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
                  <p>{plan?.period ? `Periodo: ${plan?.period}` : ''}</p>

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
          <button id='modal-buy-button'>Adquirir Plano</button>
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
          <h2 id='modal-title'>Pagamento</h2>
          {renderDetailPayment(modalPayment)}
          <button id='modal-pay-button' onClick={goToCadastro}>
            Cadastrar
          </button>
          <p>
            Após o pagamento e o cadastro, aguarde email de confirmação,
            receberá em até 24h.
          </p>
          <p>
            *As próximas cobranças, serão encaminhadas por email e whatsapp.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Plans
