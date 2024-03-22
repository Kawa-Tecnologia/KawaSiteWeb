import React, { useEffect } from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import '../assets/styles/FuturistModal.css'
import axios from 'axios'
import { BackendStatus } from '../utils/statusType'
interface ModalProps {
  modalIsOpen: boolean
  closeModal: () => void
}
interface Recommendation {
  status: string
  user_id: number
  recommendation: string
  discount_percentage: number
}
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

interface Recommendation {
  status: string
  user_id: number
  recommendation: string
  discount_percentage: number
}
const FuturisticModal: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [recommendation, setRecommendation] = useState<Recommendation>({
    status: '',
    user_id: 0,
    recommendation: '',
    discount_percentage: 0
  })
  const [plans, setPlans] = useState<Plan[]>([
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

  const fetchRecommendation = async () => {
    const stringRecommendation = localStorage.getItem('recommendation')
    if (stringRecommendation) {
      const storeRecommendation: Recommendation =
        JSON.parse(stringRecommendation)

      setRecommendation(storeRecommendation)
      return storeRecommendation
    } else {
      return recommendation
    }
  }
  const fetchPlans = async (recommendation: Recommendation) => {
    try {
      if (plans[0]?.id === 0) {
        const storedPlanString = localStorage.getItem('plansUser')
        if (storedPlanString) {
          const storedPlans: Plan[] = JSON.parse(storedPlanString)
          setPlans(storedPlans)
        } else {
          const recommendationValue = recommendation.status
          const url =
            recommendationValue === BackendStatus.APPROVED
              ? `${process.env.REACT_APP_API_URL}/api/plans?type=service&recommendation=${recommendationValue}`
              : `${process.env.REACT_APP_API_URL}/api/plans?type=service`

          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
            }
          })
          localStorage.setItem('plansUser', JSON.stringify(response.data.plans))
          setPlans(response.data.plans)
        }
      }
    } catch (error) {
      console.error('Erro ao buscar planos:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const recommendation: Recommendation = await fetchRecommendation()

      if (recommendation) {
        await fetchPlans(recommendation)
      }
    }
    fetchData()
  }, [])

  const handleCompra = async (
    preferenceId: string,
    discounted: boolean,
    preferenceIdWithoutDiscounted: string,
    points: string,
    amount: number
  ) => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (userId) {
      const body = {
        user_id: userId,
        status: BackendStatus.REQUESTED,
        type: 'points_adquired',
        points_required: points,
        amount: amount,
        date: new Date()
      }
      await axios.post(`${process.env.REACT_APP_API_URL}/api/buy`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (discounted) {
        if (recommendation) {
          const url = `/checkout/${preferenceId}`
          window.open(url, '_blank')
          return
        }
      }
      const url = `/checkout/${preferenceIdWithoutDiscounted}`
      window.open(url, '_blank')
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='Modal de Adquirir Pontos'
      className='futuristic-modal'
      overlayClassName='futuristic-modal-overlay'
    >
      <h2 className='modal-title'>Escolha a quantidade de pontos:</h2>
      * Checkout será aberto em outra janela, ative os pop-ups por favor
      <br />
      <div className='pontos-options-container'>
        {plans.map(plan => (
          <div key={plan.id} className='pontos-option'>
            <p>
              <strong>Descrição:</strong> {plan.description}
            </p>
            <p>
              <strong>Pontos:</strong> {plan.points}
            </p>
            {recommendation && plan.discounted_percentage > 0 ? (
              <p>
                <strong>Desconto:</strong> {plan.discounted_percentage}%
              </p>
            ) : (
              ''
            )}
            {recommendation &&
            plan.discounted_percentage > 0 &&
            plan.previous_amount > plan.amount ? (
              <p>
                <strong>Preço:</strong> De R${plan.previous_amount} por apenas
                R${plan.amount}
              </p>
            ) : (
              <p>
                <strong>Preço:</strong> Apenas R${plan.amount}
              </p>
            )}
            <button
              onClick={() =>
                handleCompra(
                  plan.preference_id,
                  plan.discounted_percentage > 0 && recommendation
                    ? true
                    : false,
                  plan.origin_preference_id,
                  plan.points,
                  plan.amount
                )
              }
            >
              Adquirir por R${plan.amount}
            </button>
          </div>
        ))}
      </div>
      <button onClick={closeModal} className='close-button'>
        Fechar
      </button>
    </Modal>
  )
}

export default FuturisticModal
