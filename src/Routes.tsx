import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import App from './App'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SearchDevelopers from './components/SearchDevelopers'
import TrainingDetails from './components/TrainingDetails'
import Agenda from './components/Agenda'
import ChatButton from './components/ChatButton'
import ProjectsPage from './components/Projects'
import Reviews from './components/Reviews'
import MessageForForum from './components/MessageForForum'
import FinancePage from './components/Financial'
import { useTheme } from './components/ThemeProvider'
import AboutUs from './components/AboutUs'
import AreaDevs from './components/KawaDevs'
import UserProfile from './components/UserProfile'
import AboutUsDevs from './components/AboutUsDevs'
import UnderConstruction from './components/UnderConstruction'
import CadastroForm from './components/Cadastro'
import axios from 'axios'

const RoutesApp: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [authenticationChecked, setAuthenticationChecked] = useState(false)

  const { darkMode } = useTheme()

  const handleLogin = async (): Promise<void> => {
    setAuthenticated(true)
  }
  useEffect(() => {
    const checkAuthentication = async () => {
      setAuthenticated(true)
      if (
        location.pathname.startsWith('/devs/') &&
        location.pathname !== '/devs/login' &&
        location.pathname !== '/devs/about-us'
      ) {
        const token = localStorage.getItem('token')
        if (token) {
          try {
            const response = await axios.post(
              'http://localhost:3001/api/verifyToken',
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}` // Inclua o token JWT no cabeçalho de autorização
                }
              }
            )
            if (response.data.valid) {
              setAuthenticated(true)
              setAuthenticationChecked(true)
              return
            }
          } catch (error) {
            setAuthenticated(false)
            setAuthenticationChecked(false)

            return
          }
        }
        setAuthenticated(false)
      } else {
        setAuthenticationChecked(true)
      }
    }
    checkAuthentication()
  }, [])

  if (!authenticationChecked) {
    return <div>Atualizando...</div>
  }

  return (
    <div className={darkMode ? 'dark-theme' : 'light-theme'}>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/cadastro' element={<CadastroForm />} />

          <Route path='/search-devs' element={<SearchDevelopers />} />
          <Route path='/under-construction' element={<UnderConstruction />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/devs/login' element={<Login onLogin={handleLogin} />} />
          <Route
            path='/devs/dashboard'
            element={
              authenticated ? <Dashboard /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path='/devs/training/:id'
            element={
              authenticated ? (
                <TrainingDetails />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path='/devs/agenda'
            element={
              authenticated ? (
                <Agenda ordersData={[]} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path='/devs/projects'
            element={
              authenticated ? <ProjectsPage /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path='/devs/reviews'
            element={
              authenticated ? <Reviews /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path='/devs/message-for-forum'
            element={
              authenticated ? (
                <MessageForForum />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path='/devs/financial'
            element={
              authenticated ? <FinancePage /> : <Login onLogin={handleLogin} />
            }
          />
          <Route path='/devs/about-us' element={<AboutUsDevs />} />
          <Route path='/devs' element={<AreaDevs />} />
          <Route
            path='/devs/profile'
            element={
              authenticated ? <UserProfile /> : <Login onLogin={handleLogin} />
            }
          />
        </Routes>

        <ChatButton />
      </Router>
    </div>
  )
}

export default RoutesApp
