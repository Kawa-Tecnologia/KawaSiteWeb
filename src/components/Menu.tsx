import React from 'react'
import { Link } from 'react-router-dom'
import {
  Dashboard,
  Folder,
  Star,
  Schedule,
  AttachMoney,
  Forum,
  EmojiPeople,
} from '@material-ui/icons'
import ThemeToggle from './ThemeToggle'
import '../assets/styles/Menu.css'

const Menu: React.FC = () => {
  return (
    <div className="container-menu">
      <div className="menu">
        <li className="menu-item">
          <Link to="/devs/dashboard">
            <Dashboard className="icon" />
            Dashboard
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/devs/projects">
            <Folder className="icon" />
            Projetos
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/devs/reviews">
            <Star className="icon" />
            Avaliações
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/devs/financial">
            <AttachMoney className="icon" />
            Financeiro
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/devs/agenda">
            <Schedule className="icon" />
            Agenda
          </Link>
        </li>
        <li className="menu-item">
          <a
            href="https://discord.com/channels/1202738133821554719/1202738134417276939"
            target="_blank"
            rel="noreferrer"
          >
            <Forum className="icon" />
            Acesse o Discord
          </a>
        </li>
        <li className="menu-item">
          <Link to="/devs/message-for-forum">
            <EmojiPeople className="icon" />
            Solicitar Treinamento
          </Link>
        </li>
        <li className="menu-item">
          <ThemeToggle />
        </li>
      </div>
    </div>
  )
}

export default Menu
