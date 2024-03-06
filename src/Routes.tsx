import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Dashboard from './components/Dashboard'
import SearchDevelopers from './pages/SearchDevelopers'
import TrainingDetails from './components/TrainingDetails'
import Agenda from './components/Agenda'
import ProjectsPage from './components/Projects'
import Reviews from './components/Reviews'
import MessageForForum from './components/MessageForForum'
import FinancePage from './components/Financial'
import { useTheme } from './components/ThemeProvider'
import AboutUs from './pages/AboutUs'
import AreaDevs from './pages/KawaDevs'
import UserProfile from './components/UserProfile'
import AboutUsDevs from './pages/AboutUsDevs'
import UnderConstruction from './pages/UnderConstruction'
import axios from 'axios'
import ResetPasswordPage from './pages/RecoveryPassword'
import AppSolutions from './pages/KawaSolutions/App'
import Services from './components/Services'
import Register from './pages/Register'
import RequestDevsPage from './pages/KawaSolutions/RequestDevsPage'
import JoinTheTeam from './pages/JoinTheTeam'
import './assets/styles/Modal.css'
import SurveyPage from './pages/SurveyPage'
import Doubts from './pages/Doubts'
const RoutesApp: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [authenticationChecked, setAuthenticationChecked] = useState(false)
  const [home, setHome] = useState(true)

  const { darkMode } = useTheme()

  const handleLogin = async (): Promise<void> => {
    setAuthenticated(true)
    setHome(false)
  }

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 403) {
        setAuthenticated(false)
        setAuthenticationChecked(true)
        window.location.href = '/devs/login' // ou utilize o Navigate do React Router, se preferir
      }
      return Promise.reject(error)
    }
  )

  useEffect(() => {
    const checkAuthentication = async () => {
      setAuthenticated(true)
      if (
        location.pathname.startsWith('/devs/') &&
        location.pathname !== '/devs/login' &&
        location.pathname !== '/devs/join-the-team' &&
        location.pathname !== '/devs/about-us'
      ) {
        const token = localStorage.getItem('token')
        if (token) {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/verifyToken`,
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
              setHome(false)
              return
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.response?.status === 403) {
                setAuthenticated(false)
                setAuthenticationChecked(true)
                return
              }
            }
          }
        }
        setAuthenticated(false)
      } else {
        setAuthenticationChecked(true)
      }
    }
    checkAuthentication()
  }, [])

  if (!authenticationChecked && !authenticated) {
    return <div>Logout...</div>
  }
  if (!authenticationChecked) {
    return <div>Atualizando...</div>
  }

  return (
    <div className={darkMode ? 'dark-theme' : 'light-theme'}>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/recovery-password/:email'
            element={<ResetPasswordPage />}
          />
          <Route path='/doubts' element={<Doubts />} />

          <Route path='/request-devs' element={<RequestDevsPage />} />
          <Route path='/devs/join-the-team' element={<JoinTheTeam />} />
          <Route path='/search-devs' element={<SearchDevelopers />} />
          <Route path='/survey-devs' element={<SurveyPage />} />

          <Route path='/under-construction' element={<UnderConstruction />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/devs/login' element={<Login onLogin={handleLogin} />} />
          <Route
            path='/devs/dashboard'
            element={
              authenticated ? <Dashboard /> : <Navigate to='/devs/login' />
            }
          />
          <Route
            path='/devs/training/:id'
            element={
              authenticated ? (
                <TrainingDetails />
              ) : (
                <Navigate to='/devs/login' />
              )
            }
          />
          <Route
            path='/devs/agenda'
            element={authenticated ? <Agenda /> : <Navigate to='/devs/login' />}
          />
          <Route
            path='/devs/services'
            element={
              authenticated ? <Services /> : <Navigate to='/devs/login' />
            }
          />
          <Route
            path='/devs/projects'
            element={
              authenticated ? <ProjectsPage /> : <Navigate to='/devs/login' />
            }
          />
          <Route
            path='/devs/reviews'
            element={
              authenticated ? <Reviews /> : <Navigate to='/devs/login' />
            }
          />
          <Route
            path='/devs/message-for-forum'
            element={
              authenticated ? (
                <MessageForForum />
              ) : (
                <Navigate to='/devs/login' />
              )
            }
          />
          <Route
            path='/devs/financial'
            element={
              authenticated ? <FinancePage /> : <Navigate to='/devs/login' />
            }
          />
          <Route path='/devs/about-us' element={<AboutUsDevs />} />
          <Route path='/devs' element={<AreaDevs />} />
          <Route
            path='/devs/profile'
            element={
              authenticated ? <UserProfile /> : <Navigate to='/devs/login' />
            }
          />
          <Route path='/solutions' element={<AppSolutions />} />
        </Routes>
        {!authenticated && !home ? <Navigate to='/devs/login' /> : null}

      </Router>
    </div>
  )
}

export default RoutesApp
