import React from 'react'
import '../../assets/styles/KawaDevs.css'
import Plans from './Plans'
import HeaderDevs from '../../components/HeaderDevs'
import Layout from '../../components/Layout'

const AreaDevs: React.FC = () => {
  return (
    <Layout
      pageTitle='Kawa Devs'
      pageDescription='Plataforma para desenvolvedores, freelancers e empresas prestadoras de serviços de tecnologia.'
    >
      <div>
        <HeaderDevs />

        <div className='container-devs'>
          <div className='left' style={{ textAlign: 'center' }}>
          <section className='banner'>
              <div className='banner-left'>
            <img
              src={require('../../assets/images/kawa.jpg')}
              alt='Kawa Devs'
              style={{ width: '50%', height: '30%' }}
            />
            <h1>Bem-vindo à Kawa Devs</h1>
            <h3>Transformando sua carreira através de pessoas.</h3>
            <p>
              Venha participar da nossa equipe, bora ver do que somos capazes
              juntos!
            </p>
            <p>
              <a
                href={`mailto:${process.env.REACT_APP_MAIL}`}
                className='cta-button'
              >
                Contate-nos
              </a>
            </p>
            </div>
            </section>
          </div>
        </div>

        <Plans />

        <section id='sobre-nos'>
          <h2>Sobre Nós</h2>
          <p>
            Estamos focados em transformar as experiências com tecnologia em
            algo incrível na vida das pessoas.
          </p>
          <br />

          <h2>Projetos</h2>
          <p>Aqui estão alguns dos nossos projetos recentes:</p>
          <br />

          <h2>Contato</h2>
          <p>
            Entre em contato conosco pelo email: suporte@kawatecnologia.com.br
          </p>
          <br />

          <h2>Nossos Parceiros</h2>
          <p>Entre em contato conosco para tornar-se um parceiro.</p>
        </section>
        <footer>
          <p>&copy; 2024 Kawa Tecnologia. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Layout>
  )
}

export default AreaDevs
