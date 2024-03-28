import React from 'react'

const EmailButton: React.FC = () => {
  const handleEmailClick = () => {
    window.open(`mailto:${process.env.REACT_APP_MAIL}`)
  }

  return (
    <li className='nav-item'>
      <a
        href={`mailto:${process.env.REACT_APP_MAIL}`}
        className='nav-link'
        onClick={handleEmailClick}
      >
        Contato
      </a>
    </li>
  )
}

export default EmailButton