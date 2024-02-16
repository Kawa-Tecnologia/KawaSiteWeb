# Use a imagem oficial do Node.js como base
FROM node:18.16.0-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do seu projeto para o diretório de trabalho
COPY . .

# Instale as dependências do projeto
RUN npm install --force

# Construa o projeto
RUN npm run build

# Exponha a porta em que o servidor da aplicação será executado
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["npm", "start"]