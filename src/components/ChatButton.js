import React, { useState } from 'react';
import Chatbot from './Chatbot'; // Importe o arquivo Chatbot.js
import "../assets/styles/ChatButton.css";
import { Chat } from '@material-ui/icons'; // Importe o ícone de chat do Material-UI Icons

const chatbot = new Chatbot(); // Instância do chatbot

const ChatButton = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState(''); // Estado para armazenar a mensagem de entrada do usuário
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatStart = async () => {
    try {
      const response = await chatbot.sendMessage('start-chat');
      setChatHistory(prevChatHistory => [...prevChatHistory, { sender: 'bot', message: response }]); // Adicionar a resposta do chatbot ao histórico de chat
      setIsChatOpen(true); // Abrir a janela de chat ao iniciar o chat
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false); // Fechar a janela de chat
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value); // Atualizar o estado da mensagem de entrada do usuário
  };

  const handleSendMessage = async () => {
    try {
      if (inputMessage.trim() !== '') { // Verificar se a mensagem não está vazia
        const response = await chatbot.sendMessage(inputMessage); // Enviar mensagem para o chatbot
        setChatHistory(prevChatHistory => [...prevChatHistory, { sender: 'user', message: inputMessage }, { sender: 'bot', message: response }]); // Adicionar a mensagem de entrada e a resposta do chatbot ao histórico de chat
        setInputMessage(''); // Limpar a caixa de entrada de texto
      }
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage(); // Chamar a função handleSendMessage ao pressionar a tecla Enter
    }
  };

  return (
    <div className="chat-button-container">
      {/* Botão de chat */}
      <button className="chat-button" onClick={handleChatStart}>
        <Chat className='icon' />
      </button>

      {/* Janela de chat */}
      {isChatOpen && (
        <div className="chat-window">
          {/* Conteúdo da janela de chat */}
          {chatHistory.map((item, index) => (
            <div key={index} className={item.sender === 'user' ? 'user-message' : 'bot-message'}>
              {item.message}
            </div>
          ))}
          {/* Caixa de entrada de texto */}
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Adicionar o manipulador de eventos para o evento onKeyDown
            placeholder="Digite sua mensagem..."
          />
          {/* Botão para enviar mensagem */}
          <button onClick={handleSendMessage}>Enviar</button>
          {/* Botão para fechar a janela de chat */}
          <button className="close-chat-button" onClick={handleCloseChat}>
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatButton;