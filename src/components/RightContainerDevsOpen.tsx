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
function RightContainerDevsOpen () {
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
                'Consegui meu primeiro emprego, graças a Kawa Devs'
            },
            {
              id: 2,
              nome: 'Dev 2',
              avaliacao: 5,
              content:
                'Estou recebendo diversos contatos de recrutadores'
            },
            {
                id: 1,
                nome: 'Dev 1',
                avaliacao: 4,
                content:
                  'Minha primeira vaga como dev'
              },
              {
                id: 2,
                nome: 'Dev 2',
                avaliacao: 5,
                content:
                  'Após meses procurando, consegui sair do desemprego'
              },
              {
                id: 2,
                nome: 'Dev 2',
                avaliacao: 5,
                content:
                  'Muito boa plataforma, me ajudou a conseguir meu emprego'
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

export default RightContainerDevsOpen
