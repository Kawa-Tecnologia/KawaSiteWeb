import React from 'react'
import { FaArrowUp } from 'react-icons/fa'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='site-footer'>
      <button
        className='back-to-top-button'
        aria-label='Voltar ao Topo'
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </button>
      <footer>
        <p>&copy; 2024 Kawa Tecnologia. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default Footer
