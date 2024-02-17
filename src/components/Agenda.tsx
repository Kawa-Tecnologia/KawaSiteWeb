import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import UserContainer from './UserContainer'
import Menu from './Menu'
import { Value } from 'react-calendar/dist/cjs/shared/types'

interface Training {
  id: number
  created_at: Date
  title: string
  trainer: string
  time: string
}

interface Order {
  producer_id: number
  client_id: number
  training: Training
  value: number
  points: number
  discount: number
  quantity: number
  payment_id: number
}

const Agenda: React.FC<{ ordersData: Order[] }> = ({ ordersData }) => {
  const [agenda, setAgenda] = useState<Order[]>([])
  const [selectedDate, setSelectedDate] = useState<Value | null>(null)

  const sendWhatsAppMessage = (training: Training) => {
    console.log(
      `Enviando mensagem de WhatsApp para ${training.trainer}: ${training.title}`,
    )
  }

  const markTraining = (training: Order) => {
    setAgenda([...agenda, training])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      agenda.forEach((training) => {
        const trainingTime = new Date(training.training.created_at)
        const difference = trainingTime.getTime() - now.getTime()
        const hoursDifference = difference / (1000 * 3600)
        if (hoursDifference <= 1 && hoursDifference > 0) {
          sendWhatsAppMessage(training.training)
        }
      })
    }, 60000)
    return () => clearInterval(interval)
  }, [agenda])

  return (
    <div className="dashboard">
      <div className="left-container">
        <UserContainer />
        <Menu />
      </div>
      <div className="main-content">
        <div className="agenda">
          <h2>Agenda</h2>
          <div className="calendar">
            <Calendar
              onChange={(value) => setSelectedDate(value)}
              value={selectedDate as Value}
              tileContent={({ date }) => {
                const hasTraining = ordersData.some((order) => {
                  const trainingDate = new Date(order.training.created_at)
                  return trainingDate.toDateString() === date.toDateString()
                })
                return (
                  hasTraining && <p className="training-marker">Treinamento</p>
                )
              }}
            />
          </div>
          <div className="agenda-items">
            {ordersData.map((order) => (
              <div key={order.training.id} className="agenda-item">
                <h3>{order.training.title}</h3>
                <p>Treinador: {order.training.trainer}</p>
                <p>Data: {order.training.created_at.toDateString()}</p>
                <p>Hora: {order.training.time}</p>
                <button onClick={() => markTraining(order)}>Marcar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Agenda
