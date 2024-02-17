import React from 'react'
import '../assets/styles/AboutUs.css' // Importa o arquivo de estilos
import Navigation from './Navigation'

const AboutUsDevs: React.FC = () => {
  return (
    <div>
      <header>
        <div className="logo-container">
          <img
            src={require('../assets/images/kawa_tech.png')}
            alt="Kawa Tecnologia"
          />
        </div>
        <Navigation currentPage={'about-us'} />
      </header>
      <div className="sobre-nos">
        <header></header>
        <main>
          <section className="section-box">
            <h2>Missão</h2>
            <p>
              Auxiliar desenvolvedores a construirem uma carreira solida e
              prazerosa, proporcionando oportunidades de networking,
              experiências em projetos e apoio para alcançarem seus objetivos
              profissionais.
            </p>
          </section>
          <section className="section-box">
            <h2>Visão</h2>
            <p>
              Ser reconhecido como um ponto de referência para desenvolvedores
              de sistemas em busca de crescimento profissional, oferecendo uma
              plataforma abrangente que promova a troca de conhecimentos,
              experiências e oportunidades, impulsionando suas carreiras para o
              próximo nível.
            </p>
          </section>
          <section className="section-box">
            <h2>Valores</h2>
            <ul>
              <li>
                <strong>Excelência:</strong> Buscamos a excelência em tudo o que
                fazemos, desde a qualidade do conteúdo até o suporte oferecido
                aos nossos usuários.
              </li>
              <br />
              <li>
                <strong>Colaboração:</strong> Acreditamos no poder da
                colaboração e do compartilhamento de conhecimento entre os
                membros da nossa comunidade para alcançar objetivos comuns.
              </li>
              <br />

              <li>
                <strong>Integridade:</strong> Pautamos nossas ações na
                transparência, ética e respeito mútuo, mantendo sempre a
                honestidade em todas as nossas interações.
              </li>
              <br />

              <li>
                <strong>Empoderamento:</strong> Queremos capacitar os
                desenvolvedores, oferecendo-lhes as ferramentas e recursos
                necessários para que possam crescer e alcançar seus objetivos
                profissionais.
              </li>
              <br />

              <li>
                <strong>Inovação:</strong> Estamos constantemente buscando novas
                formas de agregar valor aos nossos usuários, seja por meio de
                tecnologias inovadoras ou de novas abordagens educacionais.
              </li>
              <br />

              <li>
                <strong>Comunidade:</strong> Valorizamos a diversidade e
                inclusão, promovendo um ambiente acolhedor e colaborativo onde
                todos se sintam bem-vindos e respeitados.
              </li>
            </ul>
          </section>
        </main>
        <footer>
          <p>&copy; © 2024 Kawa Tecnologia. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  )
}

export default AboutUsDevs
