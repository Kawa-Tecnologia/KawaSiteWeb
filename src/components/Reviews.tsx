import React, { useState, useEffect } from 'react'
import '../assets/styles/Review.css'
import UserContainer from './UserContainer'
import Menu from './Menu'
import axios from 'axios'
interface Review {
  user_id: string
  content: string
  receive_user_id: number
  avaliation: number
  project_id: number
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]) // Estado para armazenar as avaliações
  const [searchTerm, setSearchTerm] = useState<string>('') // Estado para armazenar o termo de busca
  const [currentPage, setCurrentPage] = useState<number>(1) // Estado para controlar a página atual
  const [reviewsPerPage] = useState<number>(8) // Quantidade de avaliações por página

  useEffect(() => {
    // Recupere o token JWT do armazenamento (por exemplo, localStorage)
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reviews?receive_user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}` // Inclua o token JWT no cabeçalho de autorização
            }
          }
        )

        setReviews(response.data.reviews)
      } catch (error) {
        console.error('Erro ao buscar reviews:', error)
      }
    }

    fetchReviews()
  }, [searchTerm, currentPage]) // Atualize a lista de reviews quando o termo de busca ou a página atual mudar

  // Filtrar as avaliações com base no termo de busca
  const filteredReviews: Review[] = reviews?.filter(
    review => review.receive_user_id
  )

  // Lógica para calcular o número total de páginas
  const totalPages: number = Math.ceil(
    (filteredReviews?.length || 0) / reviewsPerPage
  )

  // Lógica para determinar as avaliações da página atual
  const indexOfLastReview: number = currentPage * reviewsPerPage
  const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage
  const currentReviews: Review[] = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  )

  // Função para mudar de página
  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber)

  // Função para lidar com a alteração do termo de busca
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(event.target.value)

  return (
    <div className='dashboard'>
      <div className='left-container'>
        <UserContainer />
        <Menu />
      </div>
      <div className='reviews-page'>
        <h1>Avaliações</h1>
        <input
          type='text'
          placeholder='Buscar avaliações por usuário'
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className='review-cards'>
          {currentReviews.length > 0 ? (
            currentReviews.map((review, index) => (
              <div key={index} className='review-card'>
                <h2>{review.user_id}</h2>
                <p>{review.content}</p>
                <p>{review.avaliation}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma avaliação disponível.</p>
          )}
        </div>
        <div className='pagination'>
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
