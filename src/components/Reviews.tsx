import React, { useState, useEffect } from 'react'
import '../assets/styles/Review.css'
import UserContainer from './UserContainer'
import Menu from './Menu'

interface Review {
  user: string
  content: string
  review: number
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]) // Estado para armazenar as avaliações
  const [searchTerm, setSearchTerm] = useState<string>('') // Estado para armazenar o termo de busca
  const [currentPage, setCurrentPage] = useState<number>(1) // Estado para controlar a página atual
  const [projectsPerPage] = useState<number>(8) // Quantidade de avaliações por página

  // Simulação de dados de avaliações (substitua isso com sua lógica de obtenção de dados)
  const mockReviews: Review[] = [
    { user: 'Usuario 1', content: 'Conteúdo do Card 1', review: 5 },
    { user: 'Usuario 2', content: 'Conteúdo do Card 2', review: 4 },
    // Adicione mais avaliações conforme necessário
  ]

  useEffect(() => {
    // Simulando uma busca de avaliações
    setReviews(mockReviews)
  }, [mockReviews])

  // Filtrar as avaliações com base no termo de busca
  const filteredReviews: Review[] = reviews.filter((review) =>
    review.user.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Lógica para calcular o número total de páginas
  const totalPages: number = Math.ceil(filteredReviews.length / projectsPerPage)

  // Lógica para determinar as avaliações da página atual
  const indexOfLastProject: number = currentPage * projectsPerPage
  const indexOfFirstProject: number = indexOfLastProject - projectsPerPage
  const currentReviews: Review[] = filteredReviews.slice(
    indexOfFirstProject,
    indexOfLastProject,
  )

  // Função para mudar de página
  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber)

  // Função para lidar com a alteração do termo de busca
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => setSearchTerm(event.target.value)

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
          placeholder="Buscar avaliações por usuário"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="review-cards">
          {currentReviews.length > 0 ? (
            currentReviews.map((review, index) => (
              <div key={index} className="review-card">
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
  )
}

export default Reviews
