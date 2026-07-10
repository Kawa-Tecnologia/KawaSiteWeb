import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Dashboard, Folder, Star, History } from '@material-ui/icons'
import '../assets/styles/Menu.css'

interface UserData {
  name: string
  email: string
  points: number
  plan_id: number
}

const Menu: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const storedUserString = localStorage.getItem('user')
    if (storedUserString) {
      const storedUser: UserData = JSON.parse(storedUserString)
      setUser(storedUser)
    }
  }, [])

  if (!user) return null

  const { plan_id } = user

  if (plan_id === 9) {
    return null
  }

  return (
    <div className='menu-container'>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <div className='menu-toggle' onClick={toggleMenu}>
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
        <ul className='menu-list'>
          <li className='menu-item'>
            <NavLink to='/'>
              <Dashboard className='icon' />
              Página inicial
            </NavLink>
          </li>
          <li className='menu-item'>
            <NavLink to='/request-devs'>
              <Folder className='icon' />
              Solicitar serviço
            </NavLink>
          </li>
          <li className='menu-item'>
            <NavLink to='/about-us'>
              <History className='icon' />
              Sobre nós
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Menu
