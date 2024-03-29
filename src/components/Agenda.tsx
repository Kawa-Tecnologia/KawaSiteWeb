import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import '../assets/styles/Agenda.css'
import { BackendStatus, mapBackendToFrontendStatus } from '../utils/statusType'

interface Ticket {
  id: number
  project_id: number
  user_id: number
  date: Date
  status: BackendStatus
  receipt_id: number
  type: string
  points: number
}

const Agenda: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [projectsPerPage] = useState<number>(8)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/tickets?user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setTickets(response.data.tickets)
      } catch (error) {
        console.error('Erro ao buscar tickets:', error)
      }
    }

    fetchTickets()
  }, [])

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className='dashboard'>
      <div className='main-content'>
        <div className='agenda'>
          <h2>Agenda</h2>
          <div className='calendar'>
            <Calendar
              tileContent={({ date }) => {
                const hasTraining = tickets.some(ticket => {
                  const ticketDate = ticket.date
                  return (
                    new Date(ticketDate).toDateString() === date.toDateString()
                  )
                })
                return (
                  hasTraining && <p className='training-marker'>Treinamento</p>
                )
              }}
            />
          </div>
          <div className='agenda-items'>
            {tickets.map(ticket => (
              <div key={ticket.id} className='agenda-item'>
                <p>Status: {mapBackendToFrontendStatus(ticket.status)}</p>
                <p>Data: {ticket.date}</p>
              </div>
            ))}
          </div>
          <br />
          <div className='pagination'>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                background: currentPage === 1 ? 'gray' : '#0066CC'
              }}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de{' '}
              {Math.ceil((tickets?.length || 0) / projectsPerPage)}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(tickets.length / projectsPerPage)
              }
              style={{
                background:
                  currentPage === Math.ceil(tickets.length / projectsPerPage)
                    ? 'gray'
                    : '#0066CC'
              }}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Agenda
