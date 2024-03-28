import React from 'react'
interface PaginationProps {
  currentPage: number
  totalPages: number
  paginate: (pageNumber: number) => void
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate
}) => {
  return (
    <div className='pagination'>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          background: currentPage === 1 ? 'gray' : '#0066CC'
        }}
      >
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages || 1}
      </span>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={(currentPage === totalPages) || totalPages === 0}
        style={{
          background: (currentPage === totalPages) || totalPages === 0 ? 'gray' : '#0066CC'
        }}
      >
        Próxima
      </button>
    </div>
  )
}

export default Pagination
