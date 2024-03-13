import React from 'react'
import { useParams } from 'react-router-dom'
import '../assets/styles/TrainingDetails.css'
import Menu from './Menu'
import UserContainer from './UserContainer'

interface TrainingDetail {
  id: number
  trainer: string
  title: string
  devTag: string
  date: string
  time: string
  details: string
  duration: string
  developer_review: number
}

const TrainingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = []
    const roundedRating: number = Math.min(Math.round(rating), 5)
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= roundedRating ? 'filled' : ''}>
          ★
        </span>
      )
    }
    return stars
  }

  const trainingDetails: TrainingDetail[] = [
    {
      id: 1,
      trainer: 'John Doe',
      devTag: 'Frontend Developer',
      date: '15/02/2024',
      time: '09:00',
      details:
        'Este treinamento abordará os fundamentos do desenvolvimento frontend, incluindo HTML, CSS e JavaScript. Não é necessário conhecimento prévio.',
      duration: '2 horas',
      developer_review: 4,
      title: ''
    },
    {
      id: 2,
      trainer: 'Jane Smith',
      devTag: 'Backend Developer',
      date: '20/02/2024',
      time: '14:00',
      details:
        'Este treinamento abordará os fundamentos do desenvolvimento backend, incluindo Node.js, Express e MongoDB. É recomendado algum conhecimento prévio em programação.',
      duration: '3 horas',
      developer_review: 3,
      title: ''
    }
  ]

  const selectedTraining = trainingDetails.find(
    training => String(training.id) === id
  )

  if (!selectedTraining) {
    return <div>Detalhes do treinamento não encontrados para o ID {id}</div>
  }

  return (
    <div className='dashboard'>
      <div className='left-container'>
        <UserContainer />
        <Menu />
        <p>
          *Indique um amigo e após a primeira compra de pontos dele, você ganha
          10% de desconto na proxima compra
        </p>{' '}
      </div>
      <div className='training-details'>
        <h2>Detalhes do Treinamento</h2>
        <div className='detail-item'>
          <h3>Treinador:</h3>
          <p>{selectedTraining.trainer}</p>
        </div>
        <div className='detail-item'>
          <h3>Tag de Dev:</h3>
          <p>{selectedTraining.devTag}</p>
        </div>
        <div className='detail-item'>
          <h3>Titulo:</h3>
          <p>{selectedTraining.title}</p>
        </div>
        <div className='detail-item'>
          <h3>Detalhes:</h3>
          <p>{selectedTraining.details}</p>
        </div>
        <div className='detail-item'>
          <h3>Tempo de Duração:</h3>
          <p>{selectedTraining.duration}</p>
        </div>
        <div className='detail-item'>
          <h3>Data:</h3>
          <p>{selectedTraining.date}</p>
        </div>
        <div className='detail-item'>
          <h3>Hora:</h3>
          <p>{selectedTraining.time}</p>
        </div>
        <p>Avaliação do Dev: {selectedTraining.developer_review}</p>
        <div className='stars'>
          {renderStars(selectedTraining.developer_review)}
        </div>

        <button className='join-button'>Participar</button>
      </div>
    </div>
  )
}

export default TrainingDetails
