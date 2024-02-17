import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/TrainingCard.css' // Importe o arquivo de estilos CSS

interface Training {
  id: number
  trainer: string
  devTag: string
  title: string
  date: string
  time: string
  duration: number
  developer_review: number
}

const TrainingHistory: React.FC = () => {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const trainingHistory: Training[] = [
    // Aqui você pode obter o histórico de divulgação de treinamentos
    {
      id: 1,
      trainer: 'Treinador 1',
      devTag: 'Dev',
      title: 'Node',
      date: '10/02/2024',
      time: '10:00',
      duration: 120,
      developer_review: 5,
    },
    {
      id: 2,
      trainer: 'Treinador 2',
      devTag: 'Dev',
      title: 'Javascript',
      date: '11/02/2024',
      time: '11:00',
      duration: 60,
      developer_review: 4.2,
    },
    {
      id: 3,
      trainer: 'Treinador 3',
      devTag: 'Dev',
      title: 'React',
      date: '12/02/2024',
      time: '13:00',
      duration: 90,
      developer_review: 3.8,
    },
    {
      id: 1,
      trainer: 'Treinador 1',
      devTag: 'Dev',
      title: 'Node',
      date: '10/02/2024',
      time: '10:00',
      duration: 120,
      developer_review: 5,
    },
    {
      id: 2,
      trainer: 'Treinador 2',
      devTag: 'Dev',
      title: 'Javascript',
      date: '11/02/2024',
      time: '11:00',
      duration: 60,
      developer_review: 4.2,
    },
    {
      id: 3,
      trainer: 'Treinador 3',
      devTag: 'Dev',
      title: 'React',
      date: '12/02/2024',
      time: '13:00',
      duration: 90,
      developer_review: 3.8,
    },
    {
      id: 1,
      trainer: 'Treinador 1',
      devTag: 'Dev',
      title: 'Node',
      date: '10/02/2024',
      time: '10:00',
      duration: 120,
      developer_review: 5,
    },
    {
      id: 2,
      trainer: 'Treinador 2',
      devTag: 'Dev',
      title: 'Javascript',
      date: '11/02/2024',
      time: '11:00',
      duration: 60,
      developer_review: 4.2,
    },
    {
      id: 3,
      trainer: 'Treinador 3',
      devTag: 'Dev',
      title: 'React',
      date: '12/02/2024',
      time: '13:00',
      duration: 90,
      developer_review: 3.8,
    },
    // Adicione mais itens de histórico de treinamento, se necessário
  ]
  const navigate = useNavigate()

  // Funções de manipulação de eventos e renderização de estrelas continuam aqui...

  const handleDetailsClick = (id: number) => {
    navigate(`/devs/training/${id}`)
  }

  const handleCheckout = (id: number) => {
    navigate(`/devs/checkout/${id}`)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  const startIndex = (page - 1) * 4
  const endIndex = Math.min(startIndex + 4, trainingHistory.length)

  return (
    <div className="training-history">
      <h2>Treinamentos Disponíveis</h2>
      <br />
      <div className="search">
        <input
          type="text"
          placeholder="Buscar treinamento"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <br />

      <div className="trainings-grid">
        {trainingHistory.slice(startIndex, endIndex).map((training, index) => (
          <div key={index} className="training-card">
            <div className="training-details">
              <div>
                <strong>Treinador:</strong> {training.trainer}
              </div>
              <div>
                <strong>Tag de Dev:</strong> {training.devTag}
              </div>
              <div>
                <strong>Título:</strong> {training.title}
              </div>
              <div>
                <strong>Data:</strong> {training.date}
              </div>
              <div>
                <strong>Hora:</strong> {training.time} (Horário de Brasília)
              </div>
              <div>
                <strong>Duração:</strong> {training.duration} minutos
              </div>
              <div>
                <strong>Avaliação do Dev:</strong> {training.developer_review}
              </div>
            </div>
            <div className="button-container">
              <button onClick={() => handleDetailsClick(training.id)}>
                Detalhes
              </button>
              <button onClick={() => handleCheckout(training.id)}>
                Participar
              </button>{' '}
            </div>
          </div>
        ))}
        <div className="pagination">
          <button onClick={prevPage} disabled={page === 1}>
            Anterior
          </button>
          <span>Página {page}</span>
          <button
            onClick={nextPage}
            disabled={endIndex >= trainingHistory.length}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  )
}

export default TrainingHistory
