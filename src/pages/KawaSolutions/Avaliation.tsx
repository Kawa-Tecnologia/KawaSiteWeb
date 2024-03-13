import React from 'react';

const Avaliacoes: React.FC = () => {
  const avaliacoesPlataforma = [
    { id: 1, nomeCliente: 'Cliente 1', avaliacao: 4.5, comentario: 'Ótima plataforma!' },
    { id: 2, nomeCliente: 'Cliente 2', avaliacao: 5, comentario: 'Serviço excelente!' },
  ];

  const avaliacoesDevs = [
    { id: 1, nomeCliente: 'Cliente 1', avaliacao: 4, comentario: 'Bom desenvolvedor.' },
    { id: 2, nomeCliente: 'Cliente 2', avaliacao: 3.5, comentario: 'Poderia ser melhor.' },
  ];

  return (
    <div>
      <h2>Avaliações da Plataforma</h2>
      {avaliacoesPlataforma.map(avaliacao => (
        <div key={avaliacao.id}>
          <p>{avaliacao.nomeCliente}</p>
          <p>Avaliação: {avaliacao.avaliacao}</p>
          <p>Comentário: {avaliacao.comentario}</p>
        </div>
      ))}

      <h2>Avaliações dos Desenvolvedores</h2>
      {avaliacoesDevs.map(avaliacao => (
        <div key={avaliacao.id}>
          <p>{avaliacao.nomeCliente}</p>
          <p>Avaliação: {avaliacao.avaliacao}</p>
          <p>Comentário: {avaliacao.comentario}</p>
        </div>
      ))}
    </div>
  );
};

export default Avaliacoes;