import React from "react";
import EmailButton from "./Mail";

const NavigationDev = ({ currentPage }) => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        {currentPage === "devs" && (
          <div>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Pagina Principal
              </a>
            </li>
            <li className="nav-item">
              <a href="/devs/login" className="nav-link">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a href="#planos" className="nav-link">
                Entre na Equipe
              </a>
            </li>
            <li className="nav-item">
              <a href="/devs/about-us" className="nav-link">
                Sobre Nós Devs
              </a>
            </li>
            <EmailButton />
          </div>
        )}
        {currentPage === "login" && (
          <div>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Pagina Principal
              </a>
            </li>
            <li className="nav-item">
              <a href="/devs/about-us" className="nav-link">
                Sobre Nós Devs
              </a>
            </li>
            <li className="nav-item">
              <a href="/devs" className="nav-link">
                Area Devs
              </a>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavigationDev;
