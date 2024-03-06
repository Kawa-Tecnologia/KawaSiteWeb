import React, { useState } from 'react'
import UserContainer from './UserContainer'
import Menu from './Menu'
import '../assets/styles/MessageForForum.css'
import axios from 'axios'
const MessageForForum: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [linguagem, setLinguagem] = useState<string>('')
  const [nivel, setNivel] = useState<string>('')
  const [ferramenta, setFerramenta] = useState<string>('')
  const [duracao, setDuracao] = useState<string>('')
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
  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const user = localStorage.getItem("user")
    const storedUser: UserData = user ? JSON.parse(user) : null

    event.preventDefault()
    const stringMessage = `Treinamento Solicitado\nUsuario:Renato\nLinguagem de Programação:${linguagem}\nNivel Tecnico do Solicitante:${nivel}\nFerramentas:${ferramenta}\nDuração:${duracao}\nDescrição:${description}`
    await axios.post(
      'https://discord.com/api/webhooks/1210587866619715684/13hMQrBR6MT8Uga74ilD7Zp5xTNTIykHF2RZ6qaJOgSjq10SBliOY8Fvq0bakRscZda9',
      {
        channel: 'devs',
        content: stringMessage
      }
    )
    const body = {
      title: title,
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
    await axios.post(`${process.env.REACT_APP_API_URL}/api/request-devs`,body,{
      headers:{
        Authorization: `Bearer 1234`
      }
    })
  }

  return (
    <div className='dashboard'>
      <div className='left-container'>
        <UserContainer />
        <Menu />
      </div>
      <div className='main-content'>
        <div className='message-forum-container'>
          <h1>Solicitar treinamento para o Fórum/Prestadores</h1>
          <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Titulo:</label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={event => setTitle(event.target.value)}
              required
            />
            <label htmlFor='linguagem'>Linguagem de Programação:</label>
            <input
              type='text'
              id='linguagem'
              value={linguagem}
              onChange={event => setLinguagem(event.target.value)}
              required
            />

            <label htmlFor='nivel'>Nível Técnico do Solicitante:</label>
            <select
              id='nivel'
              value={nivel}
              onChange={event => setNivel(event.target.value)}
              required
            >
              <option value=''>Selecione o Nível</option>
              <option value='iniciante'>Iniciante</option>
              <option value='intermediario'>Intermediário</option>
              <option value='avancado'>Avançado</option>
            </select>

            <label htmlFor='ferramenta'>Ferramenta:</label>
            <input
              type='text'
              id='ferramenta'
              value={ferramenta}
              onChange={event => setFerramenta(event.target.value)}
              required
            />

            <label htmlFor='duracao'>Duração:</label>
            <input
              type='text'
              id='duracao'
              value={duracao}
              onChange={event => setDuracao(event.target.value)}
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
