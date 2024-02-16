import React, { useState, useEffect } from "react";
import "../assets/styles/Review.css";
import UserContainer from "./UserContainer";
import Menu from "./Menu";

const Reviews = () => {
  const [reviews, setReviews] = useState([]); // Estado para armazenar os projetos
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual
  const [projectsPerPage] = useState(8); // Quantidade de projetos por página

  // Simulação de dados de projetos (substitua isso com sua lógica de obtenção de dados)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mockReviews = [
    { user: "Usuario 1", content: "Conteúdo do Card 1", review: 5 },
    { user: "Usuario 2", content: "Conteúdo do Card 2", review: 4 },

    // Adicione mais projetos conforme necessário
  ];

  useEffect(() => {
    // Simulando uma busca de projetos
    setReviews(mockReviews);
  }, [mockReviews]);

  // Filtrar os projetos com base no termo de busca
  const filteredReviews = reviews.filter((review) =>
    review.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica para calcular o número total de páginas
  const totalPages = Math.ceil(filteredReviews.length / projectsPerPage);

  // Lógica para determinar os projetos da página atual
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para lidar com a alteração do termo de busca
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  return (
    <div className="dashboard">
      <div className="left-container">
        <UserContainer />
        <Menu />
      </div>
      <div className="reviews-page">
        <h1>Avaliações</h1>
        <input
          type="text"
          placeholder="Buscar avaliações por usuario"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="review-cards">
          {currentReviews.length > 0 ? (
            currentReviews.map((review) => (
              <div key={review.id} className="review-card">
                <h2>{review.user}</h2>
                <p>{review.content}</p>
                <p>{review.review}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma avaliação disponível.</p>
          )}
        </div>
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
