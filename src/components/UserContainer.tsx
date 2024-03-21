import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import '../assets/styles/PointsModal.css'
import '../assets/styles/UserContainer.css'
import FuturisticModal from './FuturistModal'
import { Star } from '@material-ui/icons' 
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
interface UserContainerProps {
  handleLogout: React.MouseEventHandler<HTMLButtonElement>
}
const UserContainer: React.FC<UserContainerProps> = ({ handleLogout }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [rating, setRating] = useState<number>(0) 

  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || ''
  const devTag = localStorage.getItem('tagName') || ''
  const points = localStorage.getItem('userPoints') || ''
  useEffect(() => {
    const pointsElement = document.getElementById('user-points')
    if (pointsElement) {
      pointsElement.textContent = points.toString()
    }
  }, [points])
  useEffect(() => {
    const storedUserString = localStorage.getItem('user')
    if (storedUserString) {
      const storedUser: UserData = JSON.parse(storedUserString)
      setUser(storedUser)
      setRating(storedUser.avaliation)
    }
    document.body.style.backgroundColor = '#000'

    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  const handleAcquirePoints = () => {
    setModalIsOpen(true)
  }

  const handleProfile = () => {
    navigate('/devs/profile')
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div className='user-container'>
      <h3>{userName}</h3>
      <button onClick={handleProfile}>Perfil do Usuario</button>

      <p>
        Avaliação:{' '}
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            style={{ color: index < rating ? 'yellow' : 'gray' }}
          />
        ))}
      </p>
      <p>Tag de Dev: {devTag}</p>
      <p>
        Pontos: <span id='user-points'>{points}</span>
      </p>
      <button onClick={handleAcquirePoints}>Adquirir Pontos</button>
      <button onClick={handleLogout}>Logout</button>

      {user && [5, 6, 7, 8, null].includes(user.plan_id) ? (
        <FuturisticModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      ) : (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Modal de Adquirir Pontos'
        >
          <h2>Escolha a quantidade de pontos:</h2>* Checkout será aberto em
          outra janela, ative os pop-ups por favor
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
