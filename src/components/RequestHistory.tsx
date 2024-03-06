import React, { useEffect, useState } from 'react'
import '../assets/styles/TrainingCard.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'
import Payment from './Payment'

interface RequestDevs {
  id: number
  name: string
  title: string
  description: string
  email: string
  phone: string
  term: number
  value: number
  points_required: number
  type: string
  cep: string
  local: string
}

interface Payment {
  title: string
  image: string
  link: string
  price: number
}

const RequestHistory: React.FC = () => {
  const [userPoints, setUserPoints] = useState<number>(
    Number(localStorage.getItem('userPoints')) || 0
  )
  const userId = Number(localStorage.getItem('userId'))
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)
  const [modalPayment, setModalPayment] = useState<Payment>({
    title: '',
    image: '',
    link: '',
    price: 0
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [requestDevs, setRequestDevs] = useState<RequestDevs[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [participationsIds, setParticipationsIds] = useState<number[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalRequestDevs, setModalRequestDevs] = useState<RequestDevs>({
    id: 0,
    name: '',
    title: '',
    description: '',
    email: '',
    phone: '',
    term: 0,
    value: 0,
    points_required: 0,
    type: '',
    local: '',
    cep: ''
  })

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
      console.error('Erro ao buscar projetos:', error)
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
          const trainingParticipateIds = response.data.records
            .filter((record: { request_dev_id: number }) =>
              requestDevs.some(request => request.id === record.request_dev_id)
            )
            .map((record: { request_dev_id: number }) => record.request_dev_id)

          setParticipationsIds(trainingParticipateIds)
        }
      } catch (error) {
        console.error('Erro ao buscar ordens:', error)
      }
    }

    fetchOrders()
  }, [requestDevs])

  const handleAdquirirPontos = () => {
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
      console.log('Botão de Adquirir Pontos clicado')
    } else if (participationsIds.includes(requestDevs.id)) {
      console.log('Usuário já participou deste treinamento')
      return
    } else {
      const body = {
        request_dev_id: requestDevs.id,
        receive_user_id: userId,
        status: 'REQUESTED'
      }

      const url = `${process.env.REACT_APP_API_URL}/api/request-devs-records`
      try {
        const { data } = await axios.post(url, body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (data.message === 'Recebimento criado com sucesso') {
          const updatedPoints = userPoints - requestDevs.points_required
          localStorage.setItem('userPoints', updatedPoints.toString())
          setUserPoints(updatedPoints)
          setParticipationsIds([...participationsIds, requestDevs.id])
          toast.success('Participação Confirmada!', {
            position: 'top-center'
          })
        }
      } catch (error) {
        console.error('Erro ao confirmar participação:', error)
      }
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleCompra = (payment: Payment) => {
    openPaymentModal(payment)
  }

  const openPaymentModal = (payment: Payment) => {
    setShowPaymentModal(true)
    setModalPayment(payment)
  }

  const renderDetails = (requestDevs: RequestDevs) => (
    <div className='modal-content'>
      <span className='close' onClick={() => {}}>
        &times;
      </span>
      <div>
        <strong>Nome:</strong> {requestDevs.name}
      </div>
      {userPoints > 0 &&
        requestDevs.phone &&
        participationsIds.includes(requestDevs.id) && (
          <div>
            <strong>Telefone:</strong> {requestDevs.phone}
          </div>
        )}
      {userPoints > 0 &&
        requestDevs.email &&
        participationsIds.includes(requestDevs.id) && (
          <div>
            <strong>Email:</strong> {requestDevs.email}
          </div>
        )}
      <div>
        <strong>Título:</strong> {requestDevs.title}
      </div>
      {userPoints === 0 && (
        <div>
          <strong>Descrição:</strong> {requestDevs.description.substring(0, 20)}
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
        <strong>Tipo:</strong> {requestDevs.type}
      </div>
      <div>
        <strong>Local:</strong> {requestDevs.local}
      </div>
      {requestDevs.local === 'in person' && (
        <div>
          <strong>CEP:</strong> {requestDevs.cep}
        </div>
      )}
      {userPoints > 0 &&
        requestDevs.email &&
        participationsIds.includes(requestDevs.id) && (
          <div>
            <strong>Valor a Pagar:</strong> {requestDevs.value}
          </div>
        )}
      {userPoints > 0 && (
        <div>Pontos Necessários: {requestDevs.points_required}</div>
      )}
    </div>
  )
  const filteredRequest = requestDevs?.filter(request =>
    request?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  )

  const totalPages = Math.ceil((filteredRequest?.length || 0) / 8);
  const trainingHistory = filteredRequest?.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  )

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber)

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
                      <strong>Telefone:</strong> {training.phone}
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
                <strong>Tipo:</strong> {training.type}
              </div>
              {userPoints > 0 &&
                training.phone &&
                participationsIds.includes(training.id) && (
                  <div>
                    <strong>Valor a Pagar:</strong> {training.value}
                  </div>
                )}
              {userPoints > 0 && (
                <div>
                  <strong>Pontos Necessários: </strong>
                  {training.points_required}
                </div>
              )}
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
                        <p>10000 Pontos por R$100,00</p>
                        <button onClick={() => handleCompra(modalPayment)}>
                          Comprar
                        </button>
                      </div>
                      <div className='pontos-option'>
                        <p>20000 Pontos por R$200,00</p>
                        <button onClick={() => handleCompra(modalPayment)}>
                          Comprar
                        </button>
                      </div>
                      <div className='pontos-option'>
                        <p>15000 Pontos por R$150,00</p>
                        <button onClick={() => handleCompra(modalPayment)}>
                          Comprar
                        </button>
                      </div>
                      <div className='pontos-option'>
                        <p>50000 Pontos por R$500,00</p>
                        <button onClick={() => handleCompra(modalPayment)}>
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
                  className='disabled-button'
                >
                  Em atendimento
                </button>
              ) : (
                <button onClick={() => handleCheckout(training)}>
                  Entrar em Contato
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
        </div>
      </div>
      <ToastContainer />
      {showPaymentModal && (
        <div id='myModal' className={`modal ${showPaymentModal ? 'show' : ''}`}>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowPaymentModal(false)}>
              &times;
            </span>
            <h2 id='modal-title'>Pagamento</h2>
            <Payment
              title={'1'}
              image={''}
              link={''}
              price={0}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
      <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>
            &times;
          </span>
          <p id='modal-details'>{renderDetails(modalRequestDevs)}</p>
          <button id='modal-buy-button'>Adquirir Pontos</button>
        </div>
      </div>
    </div>
  )
}

export default RequestHistory
