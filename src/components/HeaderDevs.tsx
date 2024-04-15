import React from 'react'
import NavigationDev from './NavigationDevs'

const HeaderDevs = () => {
  return (
    <header className='header'>
      <div className='logo-container'>
        <img
          className='logo'
          src={require('../assets/images/kawa1.png')}
          alt='Kawa Devs'
          loading='lazy'
          style={{ width: '60%', height: '40%' }}
        />
        KAWA
      </div>
      <NavigationDev />
    </header>
  )
}

export default HeaderDevs
