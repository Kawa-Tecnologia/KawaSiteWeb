import React, { useState } from 'react'
import UserContainer from './UserContainer'
import Menu from './Menu'
import '../assets/styles/MessageForForum.css'

const MessageForForum: React.FC = () => {
  // Estados para armazenar os valores dos campos do formulário
  const [linguagem, setLinguagem] = useState<string>('')
  const [nivel, setNivel] = useState<string>('')
  const [ferramenta, setFerramenta] = useState<string>('')
  const [duracao, setDuracao] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  // Função para lidar com o envio do formulário
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aqui você pode enviar os dados do formulário para onde desejar, por exemplo, uma API
    console.log('Dados do formulário:', {
      linguagem,
      nivel,
      ferramenta,
      duracao,
    })
  }

  return (
    <div className="dashboard">
      <div className="left-container">
        <UserContainer />
        <Menu />
      </div>
      <div className="main-content">
        <div className="message-forum-container">
          <h1>Enviar Mensagem para o Fórum</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="linguagem">Linguagem de Programação:</label>
            <input
              type="text"
              id="linguagem"
              value={linguagem}
              onChange={(event) => setLinguagem(event.target.value)}
              required
            />

            <label htmlFor="nivel">Nível Técnico do Solicitante:</label>
            <select
              id="nivel"
              value={nivel}
              onChange={(event) => setNivel(event.target.value)}
              required
            >
              <option value="">Selecione o Nível</option>
              <option value="iniciante">Iniciante</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>

            <label htmlFor="ferramenta">Ferramenta:</label>
            <input
              type="text"
              id="ferramenta"
              value={ferramenta}
              onChange={(event) => setFerramenta(event.target.value)}
              required
            />

            <label htmlFor="duracao">Duração:</label>
            <input
              type="text"
              id="duracao"
              value={duracao}
              onChange={(event) => setDuracao(event.target.value)}
              required
            />

            <label htmlFor="description">Descrição:</label>
            <input
              type="text"
              id="descricao"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />

            <button type="submit">Enviar Solicitação</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MessageForForum
