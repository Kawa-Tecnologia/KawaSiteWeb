import React from 'react'
import '../assets/styles/UnderConstruction.css'
import Navigation from '../components/Navigation'

const UnderConstruction: React.FC = () => {
  return (
    <div>
       <header className='header'>
        <div className='logo-container'>
          <img
            className='logo'
            src={require('../assets/images/kawa.jpg')}
            alt='Kawa Tecnologia'
          />
        </div>
        <Navigation />
      </header>
    <div className='under-container'>
      <h1>Em Construção</h1>
      <p>
        Esta página ainda está em desenvolvimento. Volte em breve para ver o
        conteúdo completo!
      </p>
      <img
        src={require('../assets/images/underconstruction.png')}
        alt='Em Construção'
      />
    </div></div>
  )
}

export default UnderConstruction
