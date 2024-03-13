import React from 'react'

const EmailButton: React.FC = () => {
  const handleEmailClick = () => {
    window.open(`mailto:${process.env.REACT_APP_MAIL}`)
  }

  return (
    <li className='nav-item'>
      <span
        className='nav-link'
        onClick={handleEmailClick}
        style={{ cursor: 'pointer' }}
      >
        Contato
      </span>
    </li>
  )
}

export default EmailButton
