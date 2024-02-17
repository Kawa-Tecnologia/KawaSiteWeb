import React, { useState, useEffect } from 'react'
import '../assets/styles/Checkouts.css'
import UserContainer from './UserContainer'
import Menu from './Menu'

interface Checkout {
  id: number
  title: string
  description: string
}

const CheckoutsPage: React.FC = () => {
  const [checkouts, setCheckouts] = useState<Checkout[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [checkoutsPerPage] = useState<number>(8)

  const mockCheckouts: Checkout[] = [
    {
      id: 1,
      title: 'Projeto 1',
      description: 'Descrição do Projeto 1',
    },
    {
      id: 2,
      title: 'Projeto 2',
      description: 'Descrição do Projeto 2',
    },
    // Outros objetos de Checkout
  ]

  useEffect(() => {
    setCheckouts(mockCheckouts)
  }, [mockCheckouts])

  const filteredCheckouts = checkouts.filter((checkout) =>
    checkout.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredCheckouts.length / checkoutsPerPage)

  const indexOfLastCheckout = currentPage * checkoutsPerPage
  const indexOfFirstCheckout = indexOfLastCheckout - checkoutsPerPage
  const currentCheckouts = filteredCheckouts.slice(
    indexOfFirstCheckout,
    indexOfLastCheckout,
  )

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value)

  return (
    <div className="dashboard">
      <div className="left-container">
        <UserContainer />
        <Menu />
      </div>
      <div className="checkouts-page">
        <h1>Checkouts</h1>
        <input
          type="text"
          placeholder="Buscar checkouts"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="checkout-cards">
          {currentCheckouts.length > 0 ? (
            currentCheckouts.map((checkout) => (
              <div key={checkout.id} className="checkout-card">
                <h2>Checkout: {checkout.title}</h2>
                <p>Descrição: {checkout.description}</p>
              </div>
            ))
          ) : (
            <p>Nenhum checkout disponível.</p>
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

export default CheckoutsPage
