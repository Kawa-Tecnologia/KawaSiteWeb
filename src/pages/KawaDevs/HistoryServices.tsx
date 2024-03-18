import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ServiceItem from '../../components/ServiceItem'
import LeftContainer from '../../components/LeftContainer'
import '../../assets/styles/History.css'
import { BackendStatus } from '../../utils/statusType'

interface Services {
  id: number
  request_dev_id: number
  user_id: number
  receive_user_id: number
  accomplished: boolean
  term: number
  date: string
  active: boolean
  value: number
  avaliation: number
  request_comment: string
  status: BackendStatus
}

const ServicesHistoryPage = () => {
  const [servicesPerformed, setServicesPerformed] = useState<Services[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const servicesPerPage = 8
  const [totalReceived, setTotalReceived] = useState<number>(0)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const servicesString = localStorage.getItem('services')

        if (servicesString) {
          const storageServices = JSON.parse(servicesString)
          setServicesPerformed(storageServices)
        } else {
          const token = localStorage.getItem('token')
          const userId = localStorage.getItem('userId')

          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/request-devs-records?receive_user_id=${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          if (response.data?.history) {
            setServicesPerformed(response.data.history)
          }
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    }

    fetchTransactions()
  }, [])
  useEffect(() => {
    const total = servicesPerformed.reduce(
      (accumulator, currentService) =>
        currentService.status === BackendStatus.PAID
          ? accumulator + currentService.value
          : accumulator,
      0
    )
    setTotalReceived(total)
  }, [servicesPerformed])
  // Paginação
  const indexOfLastService = currentPage * servicesPerPage
  const indexOfFirstService = indexOfLastService - servicesPerPage
  const currentServices = servicesPerformed.slice(
    indexOfFirstService,
    indexOfLastService
  )

  // Altera a página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='dashboard'>
      <LeftContainer />
      <div className='transaction-history'>
        <h1>Histórico de Serviço Prestado</h1>
        <div>Total Recebido: R${totalReceived.toFixed(2)}</div>

        <table>
          <thead>
            <tr>
              <th>Data da Entrega</th>
              <th>Id do Serviço</th>
              <th>Avaliação</th>
              <th className='hide-on-mobile'>Realizado</th>

              <th>Valor Recebido</th>
              <th className='hide-on-mobile'>Status da Solicitação</th>
            </tr>
          </thead>
          <tbody>
            {currentServices.length ? (
              currentServices.map(servicePerformed => (
                <ServiceItem
                  key={servicePerformed.id}
                  servicePerformed={servicePerformed}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6}>Nenhuma transação disponível.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='pagination'>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de{' '}
            {Math.ceil(servicesPerformed.length / servicesPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastService >= servicesPerformed.length}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServicesHistoryPage
