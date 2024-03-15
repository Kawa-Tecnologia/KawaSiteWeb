import React, { useState, useEffect } from 'react'
import '../assets/styles/Review.css'
import axios from 'axios'
import LeftContainer from './LeftContainer'
interface Review {
  user_id: string
  content: string
  receive_user_id: number
  avaliation: number
  project_id: number
}
interface StarProps {
  filled: boolean
}

const Star: React.FC<StarProps> = ({ filled }) => {
  return <span style={{ color: filled ? 'gold' : 'lightgray' }}>&#9733;</span>
}
const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [reviewsPerPage] = useState<number>(8)
  useEffect(() => {
    document.body.classList.add('dashboard-page') // Adiciona a classe ao body
    return () => {
      document.body.classList.remove('dashboard-page') // Remove a classe ao sair da página
    }
  }, [])
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const fetchReviews = async () => {
      try {
        const storedReviewsString = localStorage.getItem('reviews')
        if (storedReviewsString) {
          const storedReview: Review[] = JSON.parse(storedReviewsString)
          setReviews(storedReview)
        } else {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/reviews?receive_user_id=${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          localStorage.setItem('reviews', JSON.stringify(response.data.reviews))

          setReviews(response.data.reviews)
        }
      } catch (error) {
        console.error('Erro ao buscar reviews:', error)
      }
    }

    fetchReviews()
  }, [searchTerm, currentPage])

  const filteredReviews: Review[] = reviews?.filter(
    review => review.receive_user_id
  )

  const totalPages: number = Math.ceil(
    (filteredReviews?.length || 0) / reviewsPerPage
  )

  const indexOfLastReview: number = currentPage * reviewsPerPage
  const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage
  const currentReviews: Review[] = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  )
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} filled={i <= rating} />)
    }
    return stars
  }

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber)

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(event.target.value)

  return (
    <div className='dashboard'>
      <LeftContainer />
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
                <p>{renderStars(review.avaliation)}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma avaliação disponível.</p>
          )}
        </div>
        <br/>
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
