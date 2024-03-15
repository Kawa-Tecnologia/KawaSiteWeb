import React from 'react'
import Menu from './Menu'
import UserContainer from './UserContainer'

const LeftContainer: React.FC = () => {
  return (
    <div className='left-container'>
      <UserContainer />
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
