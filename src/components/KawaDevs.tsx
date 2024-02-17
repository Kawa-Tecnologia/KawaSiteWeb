import React from 'react'
import '../assets/styles/KawaDevs.css'
import NavigationDev from './NavigationDevs'
import Plans from './Plans'

const AreaDevs: React.FC = () => {
  return (
    <div>
      <header>
        <div className="logo-container">
          <img src={require('../assets/images/kawa.jpg')} alt="Kawa Devs" />
        </div>
        <NavigationDev currentPage={'devs'} />
      </header>

      <div className="container">
        <div className="center">{/* Conteúdo da Esquerda */}</div>

        <div className="left">
          <section className="banner">
            <img src={require('../assets/images/kawa.jpg')} alt="Kawa Devs" />
            <h1>Bem-vindo à Kawa Devs</h1>
            <h3>Transformando sua carreira através de pessoas.</h3>
            Venha participar da nossa equipe, bora ver do que somos capazes
            juntos!
            <p>
              <a href="#contato" className="cta-button">
                Contate-nos
              </a>
            </p>
          </section>
        </div>
      </div>

      <Plans />

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
        {/* Insira os projetos aqui */}
      </section>
      <section id="contato">
        <h2>Contato</h2>
        <p>Entre em contato conosco pelo email: kawatech2023@gmail.com.</p>
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
  )
}

export default AreaDevs
