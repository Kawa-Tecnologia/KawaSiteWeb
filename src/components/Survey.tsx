import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import '../assets/styles/Survey.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ErrorNotification from './Error'
interface SurveyFormData {
  email: string
  providerName: string
  name: string
  service: number
  technical_knowledge: number
  practicality: number
  availability: number
  term: number
  resolution: number
  content: string
  user_id: number
  receive_user_id: number
  project_id: number
  [key: string]: string | number
}
interface SurveyFormProps {
  email: string
  name: string
  providerName: string
  serviceId: string
}

const SurveyForm: React.FC<SurveyFormProps> = ({
  email,
  name,
  providerName,
  serviceId
}) => {
  const [formData, setFormData] = useState<SurveyFormData>({
    email: email,
    providerName: providerName,
    name: name,
    service: 0,
    technical_knowledge: 0,
    practicality: 0,
    availability: 0,
    term: 0,
    resolution: 0,
    content: '',
    user_id: 0,
    receive_user_id: 0,
    project_id: parseInt(serviceId)
  })
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleStarClick = (category: string, rating: number) => {
    const newValue = formData[category] === rating ? 0 : rating
    setFormData({ ...formData, [category]: newValue })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const body = formData
      await axios.post(`${process.env.REACT_APP_API_URL}/api/reviews`, body, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
        }
      })
      navigate('/solutions/thankyou')
    } catch (error) {
      setErrorMessage(
        'Não foi possivel gravar sua avaliação. Entre em contato com o suporte'
      )
    }
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setFormData({ ...formData, content: value })
  }

  return (
    <div className='container-survey'>
      <h1>Pesquisa de Avaliação do Prestador de Serviço</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email do Cliente:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='name'>Nome do Cliente:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='providerName'>Nome do Prestador de Serviço:</label>
        <input
          type='text'
          id='providerName'
          name='providerName'
          value={formData.providerName}
          onChange={handleInputChange}
          required
        />

        <h3>Atendimento:</h3>
        <div className='star-rating horizontal'>
          {[1, 2, 3, 4, 5].map(rating => (
            <label key={rating}>
              <input
                type='radio'
                name='service'
                value={rating}
                onChange={() => handleStarClick('service', rating)}
              />
              <StarIcon
                className='star'
                color={rating <= formData.service ? 'primary' : 'action'}
              />
            </label>
          ))}
        </div>

        <h3>Conhecimento Técnico:</h3>
        <div className='star-rating horizontal'>
          {[1, 2, 3, 4, 5].map(rating => (
            <label key={rating}>
              <input
                type='radio'
                name='technical_knowledge'
                value={rating}
                onChange={() => handleStarClick('technical_knowledge', rating)}
              />
              <StarIcon
                className='star'
                color={
                  rating <= formData.technical_knowledge ? 'primary' : 'action'
                }
              />
            </label>
          ))}
        </div>

        <h3>Praticidade:</h3>
        <div className='star-rating horizontal'>
          {[1, 2, 3, 4, 5].map(rating => (
            <label key={rating}>
              <input
                type='radio'
                name='practicality'
                value={rating}
                onChange={() => handleStarClick('practicality', rating)}
              />
              <StarIcon
                className='star'
                color={rating <= formData.practicality ? 'primary' : 'action'}
              />
            </label>
          ))}
        </div>

        <h3>Disponibilidade:</h3>
        <div className='star-rating horizontal'>
          {[1, 2, 3, 4, 5].map(rating => (
            <label key={rating}>
              <input
                type='radio'
                name='availability'
                value={rating}
                onChange={() => handleStarClick('availability', rating)}
              />
              <StarIcon
                className='star'
                color={rating <= formData.availability ? 'primary' : 'action'}
              />
            </label>
          ))}
        </div>

        <h3>Prazo:</h3>
        <div className='star-rating horizontal'>
          {[1, 2, 3, 4, 5].map(rating => (
            <label key={rating}>
              <input
                type='radio'
                name='term'
                value={rating}
                onChange={() => handleStarClick('term', rating)}
              />
              <StarIcon
                className='star'
                color={rating <= formData.term ? 'primary' : 'action'}
              />
            </label>
          ))}
        </div>

        <h3>Resolução:</h3>
        <div className='star-rating horizontal'>
          {[1, 2, 3, 4, 5].map(rating => (
            <label key={rating}>
              <input
                type='radio'
                name='resolution'
                value={rating}
                onChange={() => handleStarClick('resolution', rating)}
              />
              <StarIcon
                className='star'
                color={rating <= formData.resolution ? 'primary' : 'action'}
              />
            </label>
          ))}
        </div>
        <h3>Comentário:</h3>
        <textarea
          name='content'
          value={formData.content}
          onChange={handleCommentChange}
        />
        <button type='submit' id='submit-btn'>
          Enviar
        </button>
      </form>
      {errorMessage && (
        <ErrorNotification message={errorMessage} severity={'error'} />
      )}
    </div>
  )
}

export default SurveyForm
