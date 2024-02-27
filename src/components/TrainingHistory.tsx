import React, { useEffect, useState } from 'react'
import '../assets/styles/TrainingCard.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'

interface Project {
  id: number
  title: string
  description: string
  trainer: string
  devTag: string
  date: Date
  duration: number
  developer_review: number
  points_required: number
}

const TrainingHistory: React.FC = () => {
  const [userPoints, setUserPoints] = useState<number>(
    Number(localStorage.getItem('userPoints')) || 0
  );  const userId = Number(localStorage.getItem('userId'))
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [participationsIds, setParticipationsIds] = useState<number[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalProjects, setModalProjects] = useState<Project>({
    id: 0,
    title: '',
    description: '',
    trainer: '',
    devTag: '',
    date: new Date(),
    duration: 0,
    developer_review: 0,
    points_required: 0
  })
  const filteredProjects = projects.filter(project =>
    project?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  )
  const totalPages = Math.ceil(filteredProjects.length / 8)

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber)
  const token = localStorage.getItem('token')
  const trainingHistory = filteredProjects.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  )
  const handleAdquirirPontos = () => {
    setModalIsOpen(true)
  }
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:3001/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProjects(response.data.projects)
    } catch (error) {
      console.error('Erro ao buscar projetos:', error)
    }
  }
  const closeModal = () => {
    setModalIsOpen(false)

    setShowModal(false)
  }
  useEffect(() => {
    fetchProjects()
  }, [searchTerm, currentPage])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/orders?user=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (response.data) {
          const trainingParticipeIds = response.data.orders
            .filter((order: { project_id: number }) =>
              projects.some(project => project.id === order.project_id)
            )
            .map((order: { project_id: number }) => order.project_id)

          setParticipationsIds(trainingParticipeIds)
        }
      } catch (error) {
        console.error('Erro ao buscar ordens:', error)
      }
    }

    fetchOrders()
  }, [userId, projects])

  const openModal = (project: Project) => {
    setShowModal(true)
    setModalProjects(project)
  }

  const renderDetails = (project: Project) => {
    return (
      <div className='modal-content'>
        <span className='close' onClick={() => {}}>
          &times;
        </span>
        <div>
          <strong>Treinador:</strong> {project.trainer}
        </div>
        <div>
          <strong>Tag de Dev:</strong> {project.devTag}
        </div>
        <div>
          <strong>Título:</strong> {project.title}
        </div>
        <div>
          <strong>Descrição:</strong> {project.description}
        </div>
        <div>
          <strong>Data:</strong> {project.date.toLocaleString()} (Horário de
          Brasília)
        </div>
        <div>
          <strong>Duração:</strong> {project.duration} minutos
        </div>
        <div>
          <strong>Avaliação do Dev:</strong> {project.developer_review}
        </div>
        <div>Pontos Necessarios: {project.points_required}</div>
      </div>
    )
  }

  const handleDetailsClick = (project: Project) => {
    openModal(project)
  }

  const handleCheckout = async (project: Project) => {
    
    if (userPoints < project.points_required) {
      console.log('Botão de Adquirir Pontos clicado')
    } else if (participationsIds.includes(project.id)) {
      // Se o usuário já participou do treinamento, não permita que ele clique novamente
      console.log('Usuário já participou deste treinamento')
      return
    } else {
      const body = {
        project_id: project.id,
        user_id: userId,
        points: userPoints,
        status: 'APPROVED'
      }

      const url = 'http://localhost:3001/api/receipts'
      const { data } = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.message === 'Recebimento criado com sucesso') {
        const updatedPoints = userPoints - project.points_required;
        localStorage.setItem('userPoints', updatedPoints.toString());
        setUserPoints(updatedPoints)
        setParticipationsIds([...participationsIds, project.id]);
        toast.success('Participação Confirmada!', {
          position: 'top-center',
        });
      }
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }
  const handleCompra = (quantidade: number, preco: number) => {
    // Lógica para processar a compra
    console.log(
      `Compra de ${quantidade} pontos realizada por R$${preco.toFixed(2)}`
    )
  }
  return (
    <div className='training-history'>
      <h2>Treinamentos Disponíveis</h2>
      <br />
      <div className='search'>
        <input
          type='text'
          placeholder='Buscar treinamento'
          value={searchTerm}
          onChange={handleSearchChange}
          className='search-input'
        />
      </div>
      <br />

      <div className='trainings-grid'>
        {trainingHistory.map((training, index) => (
          <div key={index} className='training-card'>
            <div className='training-details'>
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
                <strong>Descrição:</strong> {training.description}
              </div>
              <div>
                <strong>Data:</strong> {training.date} (Horário de Brasília)
              </div>
              <div>
                <strong>Duração:</strong> {training.duration} minutos
              </div>
              <div>
                <strong>Avaliação do Dev:</strong> {training.developer_review}
              </div>
              <div>Pontos Necessarios: {training.points_required}</div>
            </div>
            <div className='button-container'>
              <button onClick={() => handleDetailsClick(training)}>
                Detalhes
              </button>
            </div>
            <div className='button-container'>
              {userPoints < training.points_required ? (
                <>
                  <button onClick={handleAdquirirPontos}>
                    Adquirir Pontos
                  </button>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel='Modal de Adquirir Pontos'
                  >
                    <h2>Escolha a quantidade de pontos:</h2>
                    <div className='pontos-options-container'>
                      <div className='pontos-option'>
                        <p>1000 Pontos por R$10,00</p>
                        <button onClick={() => handleCompra(1000, 10)}>
                          Comprar
                        </button>
                      </div>
                      <div className='pontos-option'>
                        <p>2000 Pontos por R$20,00</p>
                        <button onClick={() => handleCompra(2000, 20)}>
                          Comprar
                        </button>
                      </div>
                      <div className='pontos-option'>
                        <p>5000 Pontos por R$50,00</p>
                        <button onClick={() => handleCompra(5000, 50)}>
                          Comprar
                        </button>
                      </div>
                      <div className='pontos-option'>
                        <p>10000 Pontos por R$98,00</p>
                        <button onClick={() => handleCompra(10000, 98)}>
                          Comprar
                        </button>
                      </div>
                    </div>
                    <button onClick={closeModal}>Fechar</button>
                  </Modal>
                </>
              ) : participationsIds.includes(training.id) ? (
                <button
                  onClick={() => {}}
                  disabled={true}
                  className='disabled-button' // Adicione a classe CSS aqui
                >
                  Confirmado
                </button>
              ) : (
                <button onClick={() => handleCheckout(training)}>
                  Participar
                </button>
              )}
            </div>
          </div>
        ))}
        <br />
        <div className='pagination'>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
          <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
            <div className='modal-content'>
              <span className='close' onClick={closeModal}>
                &times;
              </span>
              <p id='modal-details'>{renderDetails(modalProjects)}</p>
              <button id='modal-buy-button'>Adquirir Pontos</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default TrainingHistory
