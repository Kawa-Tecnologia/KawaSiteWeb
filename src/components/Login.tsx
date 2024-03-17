import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import TrainingDetails from './TrainingDetails'
import Agenda from './Agenda'
import Services from './Services'
import ProjectsPage from './Projects'
import Reviews from './Reviews'
import MessageForForum from './MessageForForum'
import FinancePage from './Financial'
import axios from 'axios'
import Login from '../pages/KawaDevs/Login'
import UserProfile from './UserProfile'
//import TransactionHistoryPage from '../pages/KawaDevs/HistoryPoints'
import ServicesHistoryPage from '../pages/KawaDevs/HistoryServices'

const LoginRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [authenticationChecked, setAuthenticationChecked] = useState(false)
  const [home, setHome] = useState(true)

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
        window.location.href = '/devs/login'
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
        location.pathname !== '/devs/about-us' &&
        location.pathname !== '/devs/register' &&
        location.pathname !== '/devs/register-devs'
      ) {
        const token = localStorage.getItem('token')
        if (token) {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/verifyToken`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`
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
    <Routes>
      <Route path='/login' element={<Login onLogin={handleLogin} />} />
      <Route
        path='/dashboard'
        element={authenticated ? <Dashboard /> : <Navigate to='/login' />}
      />
      <Route
        path='/training/:id'
        element={
          authenticated ? <TrainingDetails /> : <Navigate to='/login' />
        }
      />
      <Route
        path='/agenda'
        element={authenticated ? <Agenda /> : <Navigate to='/login' />}
      />
      <Route
        path='/services'
        element={authenticated ? <Services /> : <Navigate to='/login' />}
      />
      <Route
        path='/projects'
        element={
          authenticated ? <ProjectsPage /> : <Navigate to='/login' />
        }
      />
      <Route
        path='/reviews'
        element={authenticated ? <Reviews /> : <Navigate to='/login' />}
      />
      <Route
        path='/message-for-forum'
        element={
          authenticated ? <MessageForForum /> : <Navigate to='/login' />
        }
      />
      <Route
        path='/financial'
        element={
          authenticated ? <FinancePage /> : <Navigate to='/login' />
        }
      />
       <Route
        path='/history-services'
        element={
          authenticated ? <ServicesHistoryPage /> : <Navigate to='/login' />
        }
      />
      {/* <Route
        path='/history-points'
        element={
          authenticated ? <TransactionHistoryPage /> : <Navigate to='/login' />
        }
      /> */}
       <Route
          path='/profile'
          element={
            authenticated ? <UserProfile /> : <Navigate to='/devs/login' />
          }
        />
      {!authenticated && !home ? <Navigate to='/login' /> : null}
    </Routes>
  )
}

export default LoginRoutes
