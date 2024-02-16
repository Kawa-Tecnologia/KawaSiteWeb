class Chatbot {
    // Método para enviar uma mensagem ao chatbot
    async sendMessage(message) {
      // Lógica para enviar a mensagem ao chatbot e obter a resposta
      // Por exemplo, você pode usar uma API de chatbot ou qualquer outro serviço de chatbot
      // Neste exemplo, estou apenas retornando uma resposta estática
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = this.getChatbotResponse(message);
          resolve(response);
        }, 1000); // Simulando uma resposta após 1 segundo
      });
    }
  
    // Método para obter a resposta do chatbot com base na mensagem recebida
    getChatbotResponse(message) {
        // Verificar a mensagem do usuário e retornar uma resposta com base nela
        switch (message.toLowerCase()) {
          case 'oi':
            return 'Olá! Como posso ajudar?';
          case 'como está o tempo hoje?':
            return 'Está ensolarado e quente!';
          case 'tchau':
            return 'Até logo! Se precisar de mais alguma coisa, estou aqui.';
          default:
            return 'Desculpe, não entendi. Pode repetir?';
        }
      }
  }
  
  export default Chatbot;