import React from 'react'

const ContactButton: React.FC = () => {
  const handleContactClick = () => {
    const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER
    if (phoneNumber) {
      window.open(`https://wa.me/${phoneNumber}`, '_blank')
    }
  }

  return (
    <li className="nav-item">
      <a
        href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`}
        className="nav-link"
        onClick={handleContactClick}
      >
        Contato
      </a>
    </li>
  )
}

export default ContactButton