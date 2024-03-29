import React, { useEffect, useState } from 'react'
import '../assets/styles/TrainingCard.css'
import axios from 'axios'
//import Modal from 'react-modal'
import FuturisticModal from './FuturistModal'
import ErrorNotification from './Error'
import Pagination from './PaginationProps'

interface RequestDevs {
  id: number
  name: string
  description: string
  email: string
  phone: string
  term: number
  value: number
  points_required: number
  type: string
  cep: string
  local: string
  user_id_requested: number
}
interface UserData {
  name: string
  email: string
  points: number
  plan_id: number
  ProfessionalInfo: ProfessionalData
}

interface ProfessionalData {
  fantasy_name: string
  user_id: number
  name: string
  job_title: string
  company: string
  document_number: string
  experience_years: number
  skills: string[]
  tools: string[]
  cv_link: string
  profile_linkedin: string
  profile_github: string
  url: string
  presentation: string
  tag_id: number
  imageSrc: string
  [key: string]: string | number | string[]
}

interface TypeRequests {
  [key: string]: string
}
const RequestHistory: React.FC = () => {
  const [userPoints, setUserPoints] = useState<number>(
    Number(localStorage.getItem('userPoints')) || 0
  )
  const [user, setUser] = useState<UserData | null>(null)

  const userId = Number(localStorage.getItem('userId'))
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [requestDevs, setRequestDevs] = useState<RequestDevs[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [participationsIds, setParticipationsIds] = useState<number[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalRequestDevs, setModalRequestDevs] = useState<RequestDevs>({
    id: 0,
    name: '',
    description: '',
    email: '',
    phone: '',
    term: 0,
    value: 0,
    points_required: 0,
    type: '',
    local: '',
    cep: '',
    user_id_requested: 0
  })
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  useEffect(() => {
    const storedUserString = localStorage.getItem('user')
    if (storedUserString) {
      const storedUser: UserData = JSON.parse(storedUserString)
      setUser(storedUser)
    }
  }, [])
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/request-devs`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setRequestDevs(response.data.requestDevs)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message
        setError(errorMessage)
      } else {
        const errorStack = error instanceof Error ? error.stack : String(error)
        if (errorStack) setError(errorStack)
      }
      console.error('Erro ao buscar solicitações:', error)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/request-devs-records?receive_user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        if (response.data) {
          localStorage.setItem(
            'services',
            JSON.stringify(response.data.records)
          )
          const trainingParticipateIds = response.data.records
            .filter((record: { request_dev_id: number }) =>
              requestDevs.some(request => request.id === record.request_dev_id)
            )
            .map((record: { request_dev_id: number }) => record.request_dev_id)

          setParticipationsIds(trainingParticipateIds)
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || error.message
          setError(errorMessage)
        } else {
          const errorStack =
            error instanceof Error ? error.stack : String(error)
          if (errorStack) setError(errorStack)
        }

        console.error('Erro ao buscar ordens:', error)
      }
    }

    fetchOrders()
  }, [requestDevs])

  const handleAcquirePoints = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
    setShowModal(false)
  }

  const handleDetailsClick = (requestDevs: RequestDevs) => {
    setShowModal(true)
    setModalRequestDevs(requestDevs)
  }

  const handleCheckout = async (requestDevs: RequestDevs) => {
    if (userPoints < requestDevs.points_required) {
      return
    } else if (participationsIds.includes(requestDevs.id)) {
      return
    } else {
      const body = {
        request_dev_id: requestDevs.id,
        receive_user_id: userId,
        status: 'REQUESTED',
        points_required: requestDevs.points_required
      }

      const url = `${process.env.REACT_APP_API_URL}/api/request-devs-records`
      try {
        const { data } = await axios.post(url, body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (data.message === 'Solicitação criada com sucesso') {
          const updatedPoints = userPoints - requestDevs.points_required
          localStorage.setItem('userPoints', updatedPoints.toString())
          setUserPoints(updatedPoints)
          setParticipationsIds([...participationsIds, requestDevs.id])
          setSuccess('Serviço Adquirido!')
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || error.message
          setError(errorMessage)
        } else {
          const errorStack =
            error instanceof Error ? error.stack : String(error)
          if (errorStack) setError(errorStack)
        }
        console.error('Erro ao confirmar participação:', error)
      }
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const renderDetails = (requestDevs: RequestDevs) => {
    return (
      <div>
        <div>
          <strong>Nome:</strong> {requestDevs.name}
        </div>
        {userPoints > 0 &&
          requestDevs.phone &&
          participationsIds.includes(requestDevs.id) && (
            <div>
              <strong>Telefone Celular:</strong> {requestDevs.phone}
            </div>
          )}
        {userPoints > 0 &&
          requestDevs.email &&
          participationsIds.includes(requestDevs.id) && (
            <div>
              <strong>Email:</strong> {requestDevs.email}
            </div>
          )}
        {userPoints === 0 && (
          <div>
            <strong>Descrição:</strong>{' '}
            {requestDevs.description.substring(0, 20)}
            ...
          </div>
        )}
        {userPoints > 0 && (
          <div>
            <strong>Descrição:</strong> {requestDevs.description}
          </div>
        )}
        <div>
          <strong>Período:</strong> {requestDevs.term} dias
        </div>
        <div>
          <strong>Tipo:</strong> {typeRequest[requestDevs.type]}
        </div>
        <div>
          <strong>Local:</strong> {requestDevs.local}
        </div>
        {requestDevs.local === 'in person' && (
          <div>
            <strong>CEP:</strong> {requestDevs.cep}
          </div>
        )}
        {requestDevs.value > 100 && (
          <div>
            <strong>Valor a pagar: </strong>
            {requestDevs.value}
          </div>
        )}
        <div><strong>Pontos Necessários: </strong> {requestDevs.points_required}</div>
      </div>
    )
  }
  const filteredRequest = requestDevs?.filter(request =>
    request?.description?.toLowerCase().includes(searchTerm?.toLowerCase())
  )

  const totalPages = Math.ceil((filteredRequest?.length || 0) / 8)
  const trainingHistory = filteredRequest?.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  )

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber)
  const typeRequest: TypeRequests = {
    training: 'Treinamento',
    implementation: 'Implementação',
    course: 'Curso',
    technical_support: 'Suporte Tecnico',
    operational_support: 'Suporte Operacional',
    maintenance: 'Manutenção',
    other: 'Outro'
  }
  return (
    <div className='training-history'>
      <h2>Solicitações de Serviço Disponíveis</h2>
      <br />
      <div className='search'>
        <input
          type='text'
          placeholder='Buscar serviço'
          value={searchTerm}
          onChange={handleSearchChange}
          className='search-input'
        />
      </div>
      <br />

      <div className='trainings-grid'>
        {trainingHistory?.map((training, index) => (
          <div key={index} className='training-card'>
            <div className='training-details'>
              {training.user_id_requested === userId && (
                <div
                  className='gold-medal'
                  title='Você foi indicado pelo Solicitante, Aproveite!'
                >
                  🥇
                </div>
              )}
              {user?.ProfessionalInfo?.skills.some(skill =>
                training.description.toLowerCase().includes(skill.toLowerCase())
              ) && (
                <div
                  className='silver-medal'
                  title='Suas habilidades combinam a solicitação, Aproveite!'
                >
                  🥈
                </div>
              )}
              <div>
                <strong>Nome:</strong> {training.name}
              </div>
              <div>
                {userPoints > 0 &&
                  training.email &&
                  participationsIds.includes(training.id) && (
                    <div>
                      <strong>Email:</strong> {training.email}
                    </div>
                  )}
                {userPoints > 0 &&
                  training.phone &&
                  participationsIds.includes(training.id) && (
                    <div>
                      <strong>Telefone Celular:</strong> {training.phone}
                    </div>
                  )}
              </div>
              {userPoints === 0 && (
                <div>
                  <strong>Descrição:</strong>{' '}
                  {training.description.substring(0, 20)}
                  ...
                </div>
              )}
              {userPoints > 0 && (
                <div>
                  <strong>Descrição:</strong> {training.description}
                </div>
              )}
              <div>
                <strong>Prazo:</strong> {training.term} dias
              </div>
              <div>
                <strong>Local:</strong> {training.local}
              </div>
              <div>
                <strong>Tipo:</strong>{' '}
                {typeRequest[training.type] || 'Tipo  não especificado'}
              </div>
              {training.value > 100 && (
                <div>
                  <strong>Valor a pagar: </strong>
                  R${training.value}
                </div>
              )}
              <div>
                <strong>Pontos Necessários: </strong>
                {training.points_required}
              </div>
            </div>
            <div className='button-container'>
              <button onClick={() => handleDetailsClick(training)}>
                Detalhes
              </button>            
              {userPoints < training.points_required &&
              !participationsIds.includes(training.id) ? (
                <>
                  <button onClick={handleAcquirePoints}>Adquirir Pontos</button>
                  <FuturisticModal
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                  />
                </>
              ) : participationsIds.includes(training.id) ? (
                <button
                  onClick={() => {}}
                  disabled={true}
                  className={participationsIds.includes(training.id) ? 'disabled-button' : ''}

                >
                  Em atendimento
                </button>
              ) : (
                <button onClick={() => handleCheckout(training)}>
                  Liberar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <br />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
      <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>
            &times;
          </span>
          <p id='modal-details'>{renderDetails(modalRequestDevs)}</p>
        </div>
      </div>
      {error && <ErrorNotification message={error} severity='error' />}
      {success && <ErrorNotification message={success} severity='success' />}
    </div>
  )
}

export default RequestHistory
