import React from 'react'
import '../assets/styles/KawaDevs.css'
import NavigationDev from '../components/NavigationDevs'
import Plans from './Plans'


const AreaDevs: React.FC = () => {

 

  return (
    <div>
    <header className='header'>
      <div className='logo-container'>
        <img
          className='logo'
          src={require('../assets/images/kawa.jpg')}
          alt='Kawa Devs'
        />
      </div>
      <NavigationDev  />
    </header>

      <div className="container-devs">
        <div className="center">{/* Conteúdo da Esquerda */}</div>

        <div className="left"style={{ textAlign: 'center' }}>
            <img src={require('../assets/images/kawa.jpg')}  alt="Kawa Devs" />
            <h1>Bem-vindo à Kawa Devs</h1>
            <h3>Transformando sua carreira através de pessoas.</h3>
            <p>Venha participar da nossa equipe, bora ver do que somos capazes
            juntos!</p>
            <p>
              <a href="#contato" className="cta-button">
                Contate-nos
              </a>
            </p>
        </div>
      </div>

      <Plans />

      <section id="sobre-nos">
        <h2>Sobre Nós</h2>
        <p>
          Estamos focados em transformar as experiências com tecnologia em algo
          incrível na vida das pessoas.
        </p>
        <br/>

        <h2>Projetos</h2>
        <p>Aqui estão alguns dos nossos projetos recentes:</p>
        {/* Insira os projetos aqui */}
        <br/>

        <h2>Contato</h2>
        <p>Entre em contato conosco pelo email: kawatech2023@gmail.com.</p>
        {/* Formulário de contato */}
        <br/>

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
