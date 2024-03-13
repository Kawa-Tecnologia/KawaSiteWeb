import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import '../assets/styles/PointsModal.css'
import FuturisticModal from './FuturistModal'
import { Star } from '@material-ui/icons'; // Importa o ícone de estrela
interface UserData {
  name: string
  email: string
  points: number
  plan_id: number
  avaliation: number
  ProfessionalInfo: {
    Tag: {
      tag: string
    }
  }
}
interface Recommendation {
  status: string
  user_id: number
  recommendation: string
  discount_percentage: number
}
const UserContainer: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [recommendation, setRecommendation] = useState<Recommendation>({
    status: '',
    user_id: 0,
    recommendation: '',
    discount_percentage: 0
  })
  const [rating, setRating] = useState<number>(0); // Supondo que a avaliação seja sempre 5

  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || ''
  const devTag = localStorage.getItem('tagName') || ''
  const points = localStorage.getItem('userPoints') || ''

  useEffect(() => {
    const storedUserString = localStorage.getItem('user')
    if (storedUserString) {
      const storedUser: UserData = JSON.parse(storedUserString)
      setUser(storedUser)
      setRating(storedUser.avaliation)
    }

    const storedRecommendationString = localStorage.getItem('recommendation')
    if (storedRecommendationString) {
      const storedRecommendation: Recommendation = JSON.parse(
        storedRecommendationString
      )
      setRecommendation(storedRecommendation)
    }
    document.body.style.backgroundColor = '#000';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [])

  const handleAdquirirPontos = () => {
    setModalIsOpen(true)
  }

  const handleProfile = () => {
    navigate('/devs/profile')
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleLogout = () => {
    navigate('/devs/login')
  }

  return (
    <div className='user-container'>
      <h3>{userName}</h3>
      <button onClick={handleProfile}>Perfil do Usuario</button>

      <p>Avaliação: {[...Array(5)].map((_, index) => (
          <Star key={index} style={{ color: index < rating ? 'yellow' : 'gray' }} />
        ))}</p>
      <p>Tag de Dev: {devTag}</p>
      <p>Pontos: {points}</p>
      <button onClick={handleAdquirirPontos}>Adquirir Pontos</button>
      <button onClick={handleLogout}>Logout</button>

      {user && [5, 6, 7, 8, null].includes(user.plan_id) ? (
        <FuturisticModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          recommendation={recommendation}
        />
      ) : (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Modal de Adquirir Pontos'
        >
          <h2>Escolha a quantidade de pontos:</h2>
          <div className='pontos-options-container'>
            <div className='pontos-option'>
              <p>1000 Pontos por R$10,00</p>
              <button onClick={() => {}}>Comprar</button>
            </div>
            <div className='pontos-option'>
              <p>2000 Pontos por R$20,00</p>
              <button onClick={() => {}}>Comprar</button>
            </div>
            <div className='pontos-option'>
              <p>5000 Pontos por R$50,00</p>
              <button onClick={() => {}}>Comprar</button>
            </div>
            <div className='pontos-option'>
              <p>10000 Pontos por R$98,00</p>
              <button onClick={() => {}}>Comprar</button>
            </div>
          </div>
          <button onClick={closeModal}>Fechar</button>
        </Modal>
      )}
    </div>
  )
}

export default UserContainer
