import React, { useState } from 'react'
import Chatbot from './Chatbot' 
import '../assets/styles/ChatButton.css'
import { Chat } from '@material-ui/icons' 

const chatbot = new Chatbot() 

const ChatButton: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<
    { sender: string; message: string }[]
  >([])
  const [inputMessage, setInputMessage] = useState<string>('') 
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

  const handleChatStart = async () => {
    try {
      const response: string = await chatbot.sendMessage('start-chat')
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: 'bot', message: response },
      ]) 
      setIsChatOpen(true) 
    } catch (error) {
      console.error('Error sending message to chatbot:', error)
    }
  }

  const handleCloseChat = () => {
    setIsChatOpen(false) 
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value) 
  }

  const handleSendMessage = async () => {
    try {
      if (inputMessage.trim() !== '') {
        const response: string = await chatbot.sendMessage(inputMessage) 
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { sender: 'user', message: inputMessage },
          { sender: 'bot', message: response },
        ]) 
        setInputMessage('') 
      }
    } catch (error) {
      console.error('Error sending message to chatbot:', error)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage() 
    }
  }

  return (
    <div className="chat-button-container">
      <button className="chat-button" onClick={handleChatStart}>
        <Chat className="icon" />
      </button>

      {isChatOpen && (
        <div className="chat-window">
          {chatHistory.map((item, index) => (
            <div
              key={index}
              className={
                item.sender === 'user' ? 'user-message' : 'bot-message'
              }
            >
              {item.message}
            </div>
          ))}
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} 
            placeholder="Digite sua mensagem..."
          />
          <button onClick={handleSendMessage}>Enviar</button>
          <button className="close-chat-button" onClick={handleCloseChat}>
            Fechar
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatButton
