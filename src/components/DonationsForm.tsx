import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import '../assets/styles/DonationsForm.css' // Arquivo de estilos
import axios from 'axios'
import HeaderPrincipal from './HeaderPrincipal'

function DonationsForm () {
  const [dados, setDados] = useState({
    name: '',
    history: '',
    image: '',
    qr_code: ''
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setDados(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const body = dados
    e.preventDefault()
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/register-donations`,
      body,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
        }
      }
    )
  }

  return (
    <div>
      <HeaderPrincipal/>
      <main>
        <h2>Cadastre sua instituição!</h2>

        <Container className='donations-container'>
          <Row>
            <Col md={6} className='donations-form'>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='name'>
                  <Form.Label>Nome da Instituição</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    value={dados.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId='history'>
                  <Form.Label>História da Instituição</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    name='history'
                    value={dados.history}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId='image'>
                  <Form.Label>Url da Foto</Form.Label>
                  <Form.Control type='text' />
                </Form.Group>
                <Form.Group controlId='qr_code'>
                  <Form.Label>Url da Imagem do Qr-code</Form.Label>
                  <Form.Control
                    type='text'
                    name='qr_code'
                    value={dados.qr_code}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Cadastrar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  )
}

export default DonationsForm
