import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import TrainingDetails from './TrainingDetails'
import Agenda from './Agenda'
import Services from './Services'
import ProjectsPage from './Projects'
import Reviews from './Reviews'
import MessageForForum from './MessageForForum'
import FinancePage from './Financial'
import axios from 'axios'
import UserProfile from './UserProfile'
import ServicesHistoryPage from '../pages/KawaDevs/HistoryServices'
import TrainingPage from '../pages/KawaDevs/TrainingDevs'
import LeftContainer from './LeftContainer'

const MainRoutes = () => {
  const [authenticated, setAuthenticated] = useState(true)
  const [home, setHome] = useState(true)

  const navigate = useNavigate()

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.clear()
    navigate('/devs/login')
  }

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 403) {
        setAuthenticated(false)
        navigate('/devs/login')
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
              setHome(false)
              return
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.response?.status === 403) {
                setAuthenticated(false)
                return
              }
            }
          }
        }
        setAuthenticated(false)
      }
    }
    checkAuthentication()
  }, [])

  return (
    <>
      <div>
        {' '}
        {authenticated && !home ? (
          <LeftContainer handleLogout={handleLogout} />
        ) : (
          ''
        )}
      </div>
      <Routes>
        <Route
          path='/dashboard'
          element={
            authenticated ? <Dashboard /> : <Navigate to='/devs/login' />
          }
        />
        <Route
          path='/training/:id'
          element={
            authenticated ? <TrainingDetails /> : <Navigate to='/devs/login' />
          }
        />
        <Route
          path='/training-dev'
          element={
            authenticated ? <TrainingPage /> : <Navigate to='/devs/login' />
          }
        />
        <Route
          path='/agenda'
          element={authenticated ? <Agenda /> : <Navigate to='/devs/login' />}
        />
        <Route
          path='/services'
          element={authenticated ? <Services /> : <Navigate to='/devs/login' />}
        />
        <Route
          path='/projects'
          element={
            authenticated ? <ProjectsPage /> : <Navigate to='/devs/login' />
          }
        />
        <Route
          path='/reviews'
          element={authenticated ? <Reviews /> : <Navigate to='/devs/login' />}
        />
        <Route
          path='/message-for-forum'
          element={
            authenticated ? <MessageForForum /> : <Navigate to='/devs/login' />
          }
        />
        <Route
          path='/financial'
          element={
            authenticated ? <FinancePage /> : <Navigate to='/devs/login' />
          }
        />
        <Route
          path='/history-services'
          element={
            authenticated ? (
              <ServicesHistoryPage />
            ) : (
              <Navigate to='/devs/login' />
            )
          }
        />
        <Route
          path='/profile'
          element={
            authenticated ? <UserProfile /> : <Navigate to='/devs/login' />
          }
        />
      </Routes>
    </>
  )
}

export default MainRoutes
