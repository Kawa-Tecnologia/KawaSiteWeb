import React, { useEffect, useState } from 'react'

interface StarProps {
  filled: boolean
}

const Star: React.FC<StarProps> = ({ filled }) => {
  return <span style={{ color: filled ? 'gold' : 'lightgray' }}>&#9733;</span>
}
interface Client {
  id: number
  nome: string
  avaliacao: number
  content: string
}

function LeftContainer () {
  const [clientData, setClientData] = useState<Client[]>([])
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} filled={i <= rating} />)
    }
    return stars
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = {
          data: [
            {
              id: 1,
              nome: 'Cliente 1',
              avaliacao: 4,
              content: 'Muito boa plataforma, simples e facil'
            },
            {
              id: 2,
              nome: 'Cliente 2',
              avaliacao: 3,
              content: 'Muito boa plataforma, simples e facil'
            },
            {
              id: 3,
              nome: 'Cliente 1',
              avaliacao: 4,
              content: 'Muito boa plataforma, simples e facil'
            },
            {
              id: 4,
              nome: 'Cliente 2',
              avaliacao: 3,
              content: 'Muito boa plataforma, simples e facil'
            },
            {
              id: 5,
              nome: 'Cliente 2',
              avaliacao: 3,
              content: 'Muito boa plataforma, simples e facil'
            }
          ]
        }
        setClientData(response.data)
      } catch (error) {
        console.error('Erro ao buscar dados dos clientes:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='left-container-client'>
      <h2>Avaliação dos Clientes</h2>
      <ul>
        {clientData.map(client => (
          <li key={client.id}>
            Nome: {client.nome}
            <br />
            Avaliação: {renderStars(client.avaliacao)}
            <br />
            Comentario: {client.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LeftContainer
