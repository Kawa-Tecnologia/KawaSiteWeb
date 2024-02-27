import React from 'react'
import UserContainer from './UserContainer'
import Menu from './Menu'
import TrainingHistory from './TrainingHistory'
import '../assets/styles/Menu.css'
import '../assets/styles/Dashboard.css'
import LastNews from './LastNews'
import { useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    // Lógica de logout aqui (limpar token, etc.)
    // Após o logout, redirecione para a página de login
    navigate('/devs/login')
  }

  return (
    <div className='dashboard'>
      <div className='left-container'>
        <UserContainer />
        <button onClick={handleLogout}>Logout</button>
        <Menu />
      </div>
      <div className='main-content'>
        <div className='training-section'>
          <TrainingHistory />
        </div>
        <div className='latest-news'>
          <LastNews />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
