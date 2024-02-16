/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const ContactButton = () => {
  const handleContactClick = () => {
    const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <li className="nav-item">
      <a
        className="nav-link"
        onClick={handleContactClick}
        style={{ cursor: "pointer" }}
      >
        Contato
      </a>
    </li>
  );
};
export default ContactButton;
