import React, { useEffect, useState } from 'react';
interface Client {
    id: number;
    nome: string;
    avaliacao: number;
    // Adicione mais propriedades conforme necessário
}
function RightContainer() {
    const [clientData, setClientData] = useState<(Client[])>([]);

    useEffect(() => {
        // Realizar consulta ao backend para obter os dados dos clientes
        const fetchData = async () => {
            try {
                const response = {
                    data: [
                        {
                            id: 1,
                            nome: 'Cliente 1',
                            avaliacao: 4.5,
                            // Adicione mais informações conforme necessário
                        },
                        {
                            id: 2,
                            nome: 'Cliente 2',
                            avaliacao: 3.8,
                            // Adicione mais informações conforme necessário
                        },
                        // Adicione mais clientes conforme necessário
                    ]
                }
                setClientData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados dos clientes:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="right-container">
            {/* Renderizar os dados dos clientes e suas avaliações aqui */}
            <h2>Avaliação dos Clientes</h2>
            <ul>
                {clientData.map(client => (
                    <li key={client.id}>
                        <p>Nome: {client.nome}</p>
                        <p>Avaliação: {client.avaliacao}</p>
                        {/* Adicione mais informações conforme necessário */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RightContainer;