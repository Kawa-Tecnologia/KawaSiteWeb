import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Button } from 'react-bootstrap'
import DonationsCard from '../components/DonationsCard'
import Navigation from '../components/Navigation'
import '../assets/styles/Donations.css'
import { Link } from 'react-router-dom'

function Donations () {
  const [employments, setEmployments] = useState([
    { name: '', description: '', qr_code: '', image: '' }
  ])

  useEffect(() => {
    setEmployments([
      {
        name: 'Alan Kardec - Marmitas',
        description:
          'Centro Espírita que faz doação todas as quintas de marmitex para moradores de rua',
        qr_code: 'string',
        image:
          'https://img.freepik.com/fotos-gratis/pessoas-que-estao-com-coracao-de-borracha_1150-18576.jpg?w=1380&t=st=1709906724~exp=1709907324~hmac=75351b0a213e51f0d51bdca7164f2b81a53727f841fe04aadafd06f32093bb57'
      },
      {
        name: 'Alan Kardec 2 - Marmitas',
        description:
          'Centro Espírita 2 que faz doação todas as quintas de marmitex para moradores de rua',
        qr_code: 'string',
        image:
          'https://img.freepik.com/fotos-gratis/pessoas-que-estao-com-coracao-de-borracha_1150-18576.jpg?w=1380&t=st=1709906724~exp=1709907324~hmac=75351b0a213e51f0d51bdca7164f2b81a53727f841fe04aadafd06f32093bb57'
      },
      {
        name: 'Alan Kardec 4 - Marmitas',
        description:
          'Centro Espírita 4 que faz doação todas as quintas de marmitex para moradores de rua',
        qr_code: 'string',
        image:
          'https://img.freepik.com/fotos-gratis/pessoas-que-estao-com-coracao-de-borracha_1150-18576.jpg?w=1380&t=st=1709906724~exp=1709907324~hmac=75351b0a213e51f0d51bdca7164f2b81a53727f841fe04aadafd06f32093bb57'
      }
    ])
  }, [])

  return (
    <div>
      <header className='header'>
        <div className='logo-container'>
          <img
            className='logo'
            src={require('../assets/images/kawa.jpg')}
            alt='Kawa Tecnologia'
          />
        </div>
        <Navigation />
      </header>
      <div className='content-container'>
        <div className='intro-section'>
          <h1>Doe a quem precisa</h1>
          <p>
            Página voltada apenas à divulgação de instituições de caridade,
            nenhum valor é repassado à Kawa Tecnologia.
          </p>
          <Link to="/register-donations">
          <Button variant="primary">Cadastre sua instituição</Button>
          </Link>
        </div>
        <div className='image-section'>
          <Image
            src='https://img.freepik.com/vetores-gratis/logotipo-da-caridade-com-a-mao_23-2147503001.jpg?size=626&ext=jpg&ga=GA1.1.1311184811.1709733450&semt=sph'
            alt='Imagem de Apelo à Doação'
            style={{ width: '100%', height: '20vh', objectFit: 'cover' }} // Define a largura como 100% e a altura como 20% da altura da viewport (vh)
          />
        </div>
        <div className='bank-details-section'>
          <h2>Doações via QR-code PIX</h2>
          <p>Aqui estão os detalhes para fazer uma doação por PIX:</p>
          <ul>
            <li>
              Aproxime a câmera do QR-Code ou copie e cole o código para seu
              aplicativo bancário.
            </li>
            <li>Doe QUALQUER valor.</li>
            <li>Obrigado!</li>
            <li>Os dados da empresa constam abaixo:</li>
          </ul>
        </div>
        <div className='donations-cards-section'>
          <Row>
            {employments.map((employment, index) => (
              <Col key={index} md={4}>
                <DonationsCard institution={employment} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Donations
