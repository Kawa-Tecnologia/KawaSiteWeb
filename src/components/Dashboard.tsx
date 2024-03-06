import React, { useEffect, useState } from 'react'
import UserContainer from './UserContainer'
import Menu from './Menu'
import TrainingHistory from './TrainingHistory'
import '../assets/styles/Menu.css'
import '../assets/styles/Dashboard.css'
import RequestHistory from './RequestHistory'
import { FaBell } from 'react-icons/fa'

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

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null)
  const [showNotifications, setShowNotifications] = useState<boolean>(false) // Estado para controlar a exibição das notificações
  const [hasMissingInfo, setHasMissingInfo] = useState<boolean>(false)
  useEffect(() => {
    const storedUserString = localStorage.getItem('user')
    if (storedUserString) {
      const storedUser: UserData = JSON.parse(storedUserString)
      setUser(storedUser)
      setHasMissingInfo(
        !storedUser.ProfessionalInfo ||
          Object.values(storedUser.ProfessionalInfo).some(value => {
            if (Array.isArray(value)) {
              return value.length === 0
            }
            return !value
          })
      )
      toggleNotifications()
    }
  }, [])

  const toggleNotifications = () => {
    setShowNotifications(prevState => !prevState)
  }

  if (!user) return null

  const { plan_id } = user

  switch (plan_id) {
    case 5:
    case 6:
    case 7:
    case 8:
    case null:
      return (
        <div className='dashboard'>
          <div className='left-container'>
            <UserContainer />
            <Menu />
          </div>
          <div className='main-content'>
            <div
              className='notification-icon-container'
              onClick={() => toggleNotifications()}
            >
              <FaBell className='notification-icon' />{' '}
              {/* Ícone de notificação */}
              {showNotifications && hasMissingInfo ? (
                <div className='notification-bar'>
                  Por favor, complete suas informações profissionais, são
                  necessarias para a divulgação do seu perfil.
                </div>
              ) : null}
              <div className='request-devs-section'>
                <RequestHistory />
              </div>
            </div>
          </div>
        </div>
      )
    case 1:
    case 2:
    case 3:
      return (
        <div className='dashboard'>
          <div className='left-container'>
            <UserContainer />
            <Menu />
          </div>
          <div className='main-content'>
            <div
              className='notification-icon-container'
              onClick={() => toggleNotifications()}
            >
              <FaBell className='notification-icon' />{' '}
              {/* Ícone de notificação */}
              {showNotifications && hasMissingInfo ? (
                <div className='notification-bar'>
                  Por favor, complete suas informações profissionais, são
                  necessarias para a divulgação do seu perfil.
                </div>
              ) : null}
              <div className='training-section'>
                <TrainingHistory />
              </div>
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div className='dashboard'>
          <div className='left-container'>
            <UserContainer />
            <Menu />
          </div>
          <div className='main-content'>
            <FaBell className='notification-icon' />{' '}
            {/* Ícone de notificação */}
            {showNotifications && hasMissingInfo ? (
              <div className='notification-bar'>
                Por favor, complete suas informações profissionais, são
                necessarias para a divulgação do seu perfil.
              </div>
            ): null}
            <div className='request-devs-section'>
              <RequestHistory />
            </div>
            <div className='training-section'>
              <TrainingHistory />
            </div>
          </div>
        </div>
      )
  }
}

export default Dashboard
