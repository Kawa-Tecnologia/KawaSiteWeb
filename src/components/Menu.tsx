import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Dashboard,
  Folder,
  Star,
  History,
  School
  // Schedule,
  // AttachMoney,
  // Forum,
  // EmojiPeople
} from '@material-ui/icons'
//import ThemeToggle from './ThemeToggle'
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

  switch (plan_id) {
    case 9:
      return null
    case 5:
    case 6:
    case 7:
    case 8:
    case null:
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
                <NavLink to='/devs/dashboard'>
                  <Dashboard className='icon' />
                  Dashboard
                </NavLink>
              </li>
              <li className='menu-item'>
                <NavLink to='/devs/services'>
                  <Folder className='icon' />
                  Serviços
                </NavLink>
              </li>
              <li className='menu-item'>
                <NavLink to='/devs/reviews'>
                  <Star className='icon' />
                  Avaliações
                </NavLink>
              </li>
              <li className='menu-item'>
                <NavLink to='/devs/history-services'>
                  <History className='icon' />
                  Histórico de Serviço Prestado
                </NavLink>
              </li>
              <li className='menu-item'>
                <NavLink to='/devs/training-dev'>
                  <School className='icon' />
                  Treinamentos
                </NavLink>
              </li>
              {/* <li className='menu-item'>
              <NavLink to='/devs/history-points'>
                <Star className='icon' />
                Historico
              </NavLink>
            </li> */}
              <li className='menu-item'>{/* <ThemeToggle /> */}</li>
            </ul>
          </div>
        </div>
      )
    // case 1:
    // case 2:
    // case 3:
    //   return (
    //     <div className='container-menu'>
    //       <div className='menu'>
    //         <li className='menu-item'>
    //           <NavLink to='/devs/dashboard'>
    //             <Dashboard className='icon' />
    //             Dashboard
    //           </NavLink>
    //         </li>
    //         <li className='menu-item'>
    //           <NavLink to='/devs/projects'>
    //             <Folder className='icon' />
    //             Projetos
    //           </NavLink>
    //         </li>
    //         <li className='menu-item'>
    //           <NavLink to='/devs/reviews'>
    //             <Star className='icon' />
    //             Avaliações
    //           </NavLink>
    //         </li>
    //         <li className='menu-item'>
    //           <NavLink to='/devs/financial'>
    //             <AttachMoney className='icon' />
    //             Financeiro
    //           </NavLink>
    //         </li>
    //         <li className='menu-item'>
    //           <NavLink to='/devs/agenda'>
    //             <Schedule className='icon' />
    //             Agenda
    //           </NavLink>
    //         </li>
    //         <li className='menu-item'>
    //           <a
    //             href='https://discord.com/channels/1202738133821554719/1202738134417276939'
    //             target='_blank'
    //             rel='noreferrer'
    //           >
    //             <Forum className='icon' />
    //             Acesse o Discord
    //           </a>
    //         </li>
    //         <li className='menu-item'>
    //           <NavLink to='/devs/message-for-forum'>
    //             <EmojiPeople className='icon' />
    //             Solicitar Treinamento
    //           </NavLink>
    //         </li>
    // <li className='menu-item'>
    //           <NavLink to='/devs/training-dev'>
    //             <School className='icon' />
    //             Treinamentos
    //           </NavLink>
    //         </li>
    // ;<li className='menu-item'>
    //{' '}
    //<NavLink to='/devs/history-points'>
    // <History className='icon' />
    // Historico //{' '}
    //</NavLink>
    //{' '}
    //</li>
    //   <li className='menu-item'>
    //   <NavLink to='/devs/history-services'>
    //     <Star className='icon' />
    //     Historico de Serviço Prestado
    //   </NavLink>
    // </li>
    //         <li className='menu-item'>
    //           <ThemeToggle />
    //         </li>
    //       </div>
    //     </div>
    //   )
    default:
      return (
        <div className='container-menu'>
          <div className='menu'>
            <li className='menu-item'>
              <NavLink to='/devs/dashboard'>
                <Dashboard className='icon' />
                Dashboard
              </NavLink>
            </li>
            <li className='menu-item'>
              <NavLink to='/devs/services'>
                <Folder className='icon' />
                Serviços
              </NavLink>
            </li>
            <li className='menu-item'>
              <NavLink to='/devs/reviews'>
                <Star className='icon' />
                Avaliações
              </NavLink>
            </li>
            <li className='menu-item'>
              <NavLink to='/devs/history-services'>
                <History className='icon' />
                Historico de Serviço Prestado
              </NavLink>
            </li>
            <li className='menu-item'>
              <NavLink to='/devs/training-dev'>
                <School className='icon' />
                Treinamentos
              </NavLink>
            </li>
            {/* <li className='menu-item'>
              <NavLink to='/devs/history-points'>
                <Star className='icon' />
                Historico
              </NavLink>
            </li> */}
            <li className='menu-item'>{/* <ThemeToggle /> */}</li>
          </div>
        </div>
      )
    // return (
    //   <div className='container-menu'>
    //     <div className='menu'>
    //       <li className='menu-item'>
    //         <NavLink to='/devs/dashboard'>
    //           <Dashboard className='icon' />
    //           Dashboard
    //         </NavLink>
    //       </li>
    //       <li className='menu-item'>
    //         <NavLink to='/devs/projects'>
    //           <Folder className='icon' />
    //           Projetos
    //         </NavLink>
    //       </li>
    //       <li className='menu-item'>
    //         <NavLink to='/devs/services'>
    //           <Folder className='icon' />
    //           Serviços
    //         </NavLink>
    //       </li>
    //       <li className='menu-item'>
    //         <NavLink to='/devs/reviews'>
    //           <Star className='icon' />
    //           Avaliações
    //         </NavLink>
    //       </li>
    //       <li className='menu-item'>
    //         <NavLink to='/devs/financial'>
    //           <AttachMoney className='icon' />
    //           Financeiro
    //         </NavLink>
    //       </li>
    //       <li className='menu-item'>
    //         <NavLink to='/devs/agenda'>
    //           <Schedule className='icon' />
    //           Agenda
    //         </NavLink>
    //       </li>
    //       <li className='menu-item'>
    //         <a
    //           href='https://discord.com/channels/1202738133821554719/1202738134417276939'
    //           target='_blank'
    //           rel='noreferrer'
    //         >
    //           <Forum className='icon' />
    //           Acesse o Discord
    //         </a>
    //       </li>
    //       <li className='menu-item'>
    //         <NavLink to='/devs/message-for-forum'>
    //           <EmojiPeople className='icon' />
    //           Solicitar Treinamento
    //         </NavLink>
    //       </li>
    // <li className='menu-item'>
    //   <NavLink to='/devs/history-points'>
    //     <History className='icon' />
    //     Historico
    //   </NavLink>
    // </li>
    //   <li className='menu-item'>
    //   <NavLink to='/devs/history-services'>
    //     <History className='icon' />
    //     Historico de Serviço Prestado
    //   </NavLink>
    // </li>
    // <li className='menu-item'>
    //           <NavLink to='/devs/training-dev'>
    //             <School className='icon' />
    //             Treinamentos
    //           </NavLink>
    //         </li>
    //       <li className='menu-item'>
    //         <ThemeToggle />
    //       </li>
    //     </div>
    //   </div>
    // )
  }
}

export default Menu
