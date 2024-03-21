import React from 'react'
import '../assets/styles/UnderConstruction.css'
import HeaderPrincipal from '../components/HeaderPrincipal'

const UnderConstruction: React.FC = () => {
  return (
    <div>
       <HeaderPrincipal/>
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
