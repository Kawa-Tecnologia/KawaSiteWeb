import React, { useState } from 'react'
import '../assets/styles/MessageForForum.css'
import axios from 'axios'
const MessageForForum: React.FC = () => {
  const [language, setLanguage] = useState<string>('')
  const [level, setLevel] = useState<string>('')
  const [tool, setTool] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [term, setTerm] = useState<number>(1)

  interface UserData {
    id: number
    fullname: string
    email: string
    points: number
    phone: number
    plan_id: number
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const user = localStorage.getItem('user')
    const storedUser: UserData = user ? JSON.parse(user) : null

    event.preventDefault()
    const stringMessage = `Treinamento Solicitado\nUsuario:Renato\nLinguagem de Programação:${language}\nNivel Tecnico do Solicitante:${level}\nFerramentas:${tool}\nDuração:${duration}\nDescrição:${description}`
    await axios.post(
      `${process.env.REACT_APP_FORUM_URL}/api/webhooks/${process.env.REACT_APP_WEBHOOK_ID}/${process.env.REACT_APP_DISCORD_TOKEN}`,
      {
        channel: 'devs',
        content: stringMessage
      }
    )
    const body = {
      name: storedUser?.fullname,
      email: storedUser?.email,
      phone: storedUser?.phone,
      description: description,
      value: 50,
      term: term,
      type: 'training',
      cep: '',
      local: 'online',
      agreeTerms: true,
      user_id: storedUser?.id
    }
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/request-devs`,
      body,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN_DEV}`
        }
      }
    )
  }

  return (
    <div className='dashboard'>
      <div className='main-content'>
        <div className='message-forum-container'>
          <h1>Solicitar treinamento para o Fórum/Prestadores</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='language'>Linguagem de Programação:</label>
            <input
              type='text'
              id='language'
              value={language}
              onChange={event => setLanguage(event.target.value)}
              required
            />

            <label htmlFor='level'>Nível Técnico do Solicitante:</label>
            <select
              id='level'
              value={level}
              onChange={event => setLevel(event.target.value)}
              required
            >
              <option value=''>Selecione o Nível</option>
              <option value='iniciante'>Iniciante</option>
              <option value='intermediario'>Intermediário</option>
              <option value='avancado'>Avançado</option>
            </select>

            <label htmlFor='tool'>Ferramenta:</label>
            <input
              type='text'
              id='tool'
              value={tool}
              onChange={event => setTool(event.target.value)}
              required
            />

            <label htmlFor='duration'>Duração:</label>
            <input
              type='text'
              id='duration'
              value={duration}
              onChange={event => setDuration(event.target.value)}
              required
            />

            <label htmlFor='description'>Descrição:</label>
            <input
              type='text'
              id='descricao'
              value={description}
              onChange={event => setDescription(event.target.value)}
              required
            />
            <label htmlFor='term'>Prazo em dias:</label>
            <input
              type='number'
              id='term'
              value={term.toString()}
              onChange={event => setTerm(parseInt(event.target.value))}
              required
            />
            <button type='submit'>Enviar Solicitação</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MessageForForum
