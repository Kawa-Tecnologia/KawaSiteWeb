import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SearchDevelopers from './components/SearchDevelopers'
import TrainingDetails from './components/TrainingDetails' // Importe o componente TrainingDetails
import Agenda from './components/Agenda'
import ChatButton from './components/ChatButton'
import ProjectsPage from './components/Projects'
import Reviews from './components/Reviews'
import MessageForForum from './components/MessageForForum'
import FinancePage from './components/Financial'
import CheckoutsPage from './components/Checkouts'
import { useTheme } from './components/ThemeProvider'
import AboutUs from './components/AboutUs'
import AreaDevs from './components/KawaDevs'
import UserProfile from './components/UserProfile'
import Checkout from './components/Checkout'
import AboutUsDevs from './components/AboutUsDevs'
import UnderConstruction from './components/UnderConstruction'

interface User {
  name: string
  email: string
  points: number
}
const RoutesApp: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({ name: '', email: '' })

  const { darkMode } = useTheme()
  const handleLogin = async (userData: User): Promise<void> => {
    setUser(userData)
    setAuthenticated(true)
  }
  return (
    <div className={darkMode ? 'dark-theme' : 'light-theme'}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/search-devs" element={<SearchDevelopers />} />
          <Route path="/under-construction" element={<UnderConstruction />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/devs/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/devs/dashboard"
            element={
              authenticated ? <Dashboard /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/devs/training/:id"
            element={
              authenticated ? (
                <TrainingDetails />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/devs/agenda"
            element={
              authenticated ? (
                <Agenda ordersData={[]} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/devs/projects"
            element={
              authenticated ? <ProjectsPage /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/devs/reviews"
            element={
              authenticated ? <Reviews /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/devs/message-for-forum"
            element={
              authenticated ? (
                <MessageForForum />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/devs/financial"
            element={
              authenticated ? <FinancePage /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/devs/checkouts"
            element={
              authenticated ? (
                <CheckoutsPage />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/devs/about-us" element={<AboutUsDevs />} />
          <Route path="/devs" element={<AreaDevs />} />
          <Route
            path="/devs/profile"
            element={
              authenticated ? <UserProfile /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/devs/checkout/:id"
            element={
              authenticated && user ? (
                <Checkout />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
        </Routes>
        <ChatButton />
      </Router>
    </div>
  )
}

export default RoutesApp
