import React from "react";
import { useNavigate } from "react-router-dom";
import "./assets/styles/DevsCard.css";
import "./assets/styles/Banner.css";
import Navigation from "./components/Navigation";
const DevCard = ({ imageSrc, name, role }) => {
  return (
    <div className="dev-card">
      <img src={imageSrc} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();

  const handleFindDevsClick = () => {
    navigate("/search-devs");
  };

  const developers = [
    {
      imageSrc: "imagem1.jpg",
      name: "Nome do Desenvolvedor 1",
      role: "Cargo do Desenvolvedor 1",
    },
    {
      imageSrc: "imagem2.jpg",
      name: "Nome do Desenvolvedor 2",
      role: "Cargo do Desenvolvedor 2",
    },
    {
      imageSrc: "imagem1.jpg",
      name: "Nome do Desenvolvedor 1",
      role: "Cargo do Desenvolvedor 1",
    },
    {
      imageSrc: "imagem2.jpg",
      name: "Nome do Desenvolvedor 2",
      role: "Cargo do Desenvolvedor 2",
    },
    {
      imageSrc: "imagem1.jpg",
      name: "Nome do Desenvolvedor 1",
      role: "Cargo do Desenvolvedor 1",
    },
    {
      imageSrc: "imagem2.jpg",
      name: "Nome do Desenvolvedor 2",
      role: "Cargo do Desenvolvedor 2",
    },
    {
      imageSrc: "imagem1.jpg",
      name: "Nome do Desenvolvedor 1",
      role: "Cargo do Desenvolvedor 1",
    },
    {
      imageSrc: "imagem2.jpg",
      name: "Nome do Desenvolvedor 2",
      role: "Cargo do Desenvolvedor 2",
    },
  ];

  return (
    <div>
      <header className="header">
  <div className="logo-container">
    <img
      className="logo"
      src={require("./assets/images/kawa.jpg")}
      alt="Kawa Tecnologia"
    />
  </div>
  <Navigation currentPage={"home"}/>
</header>

      <div className="container">

        <div className="left">
          <section className="banner">
            <div className="banner-left">
              <img
                src={require("./assets/images/kawa.jpg")}
                alt="Kawa Tecnologia"
              />
            </div>
            <div className="banner-center">
              <h1>Bem-vindo à Kawa Tecnologia</h1>
              
              <h3>
                Transformando Ideias Criativas em Negócios Rentáveis e
                Lucrativos
              </h3>
              Tire seu projeto do papel, bora ver do que somos capazes juntos!
              <p>
                <a href="#contato" className="cta-button">
                  Contate-nos
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="right">
          <div className="banner-right">
            <section id="devs" className="devs-section">
              <div className="devs-content">
                <h2>Desenvolvedores Open to Work</h2>
                <div className="dev-cards-container">
                  {/* Iterar sobre os desenvolvedores e renderizar os cartões */}
                  {developers.map((dev, index) => (
                    <DevCard
                      key={index}
                      imageSrc={require(`./assets/images/0-minimalist-gift-voucher___media_library_original_1600_914.jpg`)}
                      name={dev.name}
                      role={dev.role}
                    />
                  ))}
                </div>
                {/* Insira os desenvolvedores aqui */}
              </div>
              <p>
                <button
                  className="find-dev-button"
                  onClick={handleFindDevsClick}
                >
                  Clique aqui e encontre o DEV que estava procurando!
                </button>
              </p>
            </section>
          </div>
        </div>
      </div>

      
      <section id="sobre-nos">
        <h2>Sobre Nós</h2>
        <p>
          Estamos focados em transformar as experiências com tecnologia em algo
          incrível na vida das pessoas.
        </p>
      </section>
      <section id="projetos">
        <h2>Projetos</h2>
        <p>Aqui estão alguns dos nossos projetos recentes:</p>
        Kawa Devs
      </section>
      <section id="contato">
        <h2>Contato</h2>
        <p>
          Entre em contato conosco Whatsapp: (11)91428-7025.
        </p>
        {/* Formulário de contato */}
      </section>
      <section id="partners">
        <h2>Nossos Parceiros</h2>
        <p>Entre em contato conosco para tornar-se um parceiro.</p>
        {/* Logos dos parceiros */}
      </section>
      <footer>
        <p>&copy; 2024 Kawa Tecnologia. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
