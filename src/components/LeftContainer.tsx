import React from 'react'
import Menu from './Menu'
import UserContainer from './UserContainer'
interface UserContainerProps {
  handleLogout: React.MouseEventHandler<HTMLButtonElement>
}
const LeftContainer: React.FC<UserContainerProps> = ({ handleLogout }) => {
  return (
    <div className='left-container'>
      <UserContainer handleLogout={handleLogout} />
      <Menu />

      <h5>
        *Indique um amigo e após a primeira compra de pontos dele, você ganha
        10% de desconto na proxima compra
      </h5>

      <div style={{ backgroundColor: 'black' }}></div>
    </div>
  )
}

export default LeftContainer
