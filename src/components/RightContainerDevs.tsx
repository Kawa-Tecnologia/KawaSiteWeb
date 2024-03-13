import React, { useEffect, useState } from 'react'

interface StarProps {
  filled: boolean;
}

const Star: React.FC<StarProps> = ({ filled }) => {
  return (
    <span style={{ color: filled ? 'gold' : 'lightgray' }}>
      &#9733;
    </span>
  );
};

interface Client {
  id: number
  nome: string
  avaliacao: number
  content: string
}
function RightContainerDevs () {
  const [clientData, setClientData] = useState<Client[]>([])
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} filled={i <= rating} />);
    }
    return stars;
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = {
          data: [
            {
              id: 1,
              nome: 'Dev 1',
              avaliacao: 4,
              content:
                'Muito boa plataforma, me ajudou a conquistar clientes'
            },
            {
              id: 2,
              nome: 'Dev 2',
              avaliacao: 5,
              content:
                'Muito boa plataforma, me ajudou a lucrar nesses ultimos meses'
            },
            {
                id: 1,
                nome: 'Dev 1',
                avaliacao: 4,
                content:
                  'Muito boa plataforma, me ajudou a conquistar clientes'
              },
              {
                id: 2,
                nome: 'Dev 2',
                avaliacao: 5,
                content:
                  'Muito boa plataforma, me ajudou a lucrar nesses ultimos meses'
              },
              {
                id: 2,
                nome: 'Dev 2',
                avaliacao: 5,
                content:
                  'Muito boa plataforma, me ajudou a lucrar nesses ultimos meses'
              },
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
    <div className='right-container-client'>
      <h2>Avaliação dos Devs</h2>
      <ul>
        {clientData.map(client => (
          <li key={client.id}>
            Nome: {client.nome}
            <br />
            Avaliação: {renderStars(client.avaliacao)}
            <br />
            Comentário: {client.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RightContainerDevs
