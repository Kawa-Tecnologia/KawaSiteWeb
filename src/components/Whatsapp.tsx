import React from 'react';

const ContactButton: React.FC = () => {
  const handleContactClick = () => {
    const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER;

    if (phoneNumber) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const link = isMobile ? `whatsapp://send?phone=${phoneNumber}` : `https://wa.me/${phoneNumber}`;
      window.open(link, isMobile ? '_self' : '_blank');
    }
  };

  return (
    <a
      className="nav-link"
      onClick={handleContactClick}
    >
      Contato
    </a>
  );
};

export default ContactButton;