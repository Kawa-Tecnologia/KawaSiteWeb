import React from 'react'
import '../assets/styles/UnderConstruction.css'
import HeaderPrincipal from '../components/HeaderPrincipal'
import Seo from '../components/Seo'

const UnderConstruction: React.FC = () => {
  return (
    <div>
      <Seo
        title='Página em construção | Kawa Tecnologia'
        description='Esta página da Kawa Tecnologia ainda está em desenvolvimento.'
        path='/under-construction'
        noindex
      />
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
        loading="lazy" 
      />
    </div></div>
  )
}

export default UnderConstruction
