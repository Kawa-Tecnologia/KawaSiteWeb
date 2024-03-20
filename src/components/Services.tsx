import React, { useState, useEffect } from 'react'
import '../assets/styles/Services.css'
import axios from 'axios'
import { BackendStatus, mapBackendToFrontendStatus } from '../utils/statusType'

interface Service {
  id: number
  request_dev_id: number
  receive_user_id: number
  accomplished: boolean
  term: number
  date: Date
  active: boolean
  value: number
  avaliation: number
  request_comment: string
  status: BackendStatus
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [servicesPerPage] = useState<number>(8)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    const fetchService = async () => {
      try {
        const storedServicesString = localStorage.getItem('services')
        if (storedServicesString) {
          const storedService: Service[] = JSON.parse(storedServicesString)
          setServices(storedService)
        } else {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/request-devs-records?receive_user_id=${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          setServices(response.data.records)
        }
      } catch (error) {
        console.error('Erro ao buscar services:', error)
      }
    }

    fetchService()
  }, [searchTerm, currentPage])
  const filteredServices: Service[] = services?.filter(
    service => service.receive_user_id
  )

  const totalPages: number = Math.ceil(
    (filteredServices?.length || 0) / servicesPerPage
  )

  const indexOfLastService: number = currentPage * servicesPerPage
  const indexOfFirstService: number = indexOfLastService - servicesPerPage
  const currentServices: Service[] = filteredServices?.slice(
    indexOfFirstService,
    indexOfLastService
  )

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber)
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(event.target.value)

  const handleServiceStatusChange = async (
    serviceId: number,
    newStatus: string
  ) => {
    const token = localStorage.getItem('token')
    let receivedValueNumber: number = 0
    if (newStatus === BackendStatus.PAID) {
      const confirmValueReceived = window.confirm(
        'Deseja informar o valor recebido?'
      )
      if (confirmValueReceived) {
        const receivedValue = prompt('Informe o valor recebido:', '0')

        if (receivedValue === null) {
          receivedValueNumber = 0
        } else if (parseInt(receivedValue) > 0 || receivedValue !== null) {
          const parsedValue = receivedValue.replace(',', '.')

          receivedValueNumber = parseFloat(parsedValue)
        }
      }
    }
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/request-devs-records/${serviceId}`,
        { status: newStatus, value: receivedValueNumber, date: new Date(), accomplished:true },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const updatedServices = services.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            status: newStatus as BackendStatus
          }
        }
        return service
      })

      setServices(updatedServices)
    } catch (error) {
      console.error('Erro ao atualizar o status do serviço:', error)
    }
  }

  return (
    <div className='dashboard'>
      <div className='services-page'>
        <h1>Serviços</h1>
        <input
          type='text'
          placeholder='Buscar serviços por usuário'
          value={searchTerm}
          onChange={handleSearchChange}
          className='services-page-input custom-placeholder'
        />

        <div className='service-cards'>
          {currentServices?.length > 0 ? (
            currentServices.map((service, index) => (
              <div key={index} className='service-card'>
                <h2>Id do Serviço:{service.request_dev_id}</h2>
                <p>Status:{mapBackendToFrontendStatus(service.status)}</p>
                <p>Data:{service.date}</p>
                <p>Realizado:{service.accomplished}</p>
                <p>Avaliação:{service.avaliation}</p>
                <p>Comentario:{service.request_comment}</p>
                <button
                  onClick={() =>
                    handleServiceStatusChange(service.id, BackendStatus.CANCELED)
                  }
                  disabled={
                    service.status === BackendStatus.CANCELED || service.status === BackendStatus.PAID
                  }
                  style={{
                    backgroundColor:
                      service.status === BackendStatus.CANCELED || service.status === BackendStatus.PAID
                        ? 'gray'
                        : ''
                  }}
                >
                  Marcar como Não Realizado
                </button>
                <button
                  onClick={() => handleServiceStatusChange(service.id, BackendStatus.PAID)}
                  disabled={
                    service.status === BackendStatus.CANCELED || service.status === BackendStatus.PAID
                  }
                  style={{
                    backgroundColor:
                      service.status === BackendStatus.CANCELED || service.status === BackendStatus.PAID
                        ? 'gray'
                        : ''
                  }}
                >
                  Marcar como Realizado
                </button>
              </div>
            ))
          ) : (
            <p>Nenhum serviço disponível.</p>
          )}
        </div>
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
    </div>
  )
}

export default Services
