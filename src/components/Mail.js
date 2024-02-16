/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const EmailButton = () => {
  const handleEmailClick = () => {
    window.open(`mailto:${process.env.REACT_APP_MAIL}`);
  };

  return (
    <li className="nav-item">
      <a
        className="nav-link"
        onClick={handleEmailClick}
        style={{ cursor: "pointer" }}
      >Contato
      </a>
    </li>
  );
};

export default EmailButton;
