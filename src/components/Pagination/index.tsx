import q from 'qjuul'
import PaginationButton from '../PaginationButton'
import { useEffect, useState } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  handlePageChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const [showLeftDots, setShowLeftDots] = useState(false)
  const [showRightDots, setShowRightDots] = useState(false)
  const [showingNumbers, setShowingNumbers] = useState([0])

  useEffect(() => {
    if (totalPages > 5) {
      setShowLeftDots(currentPage > 4 ? true : false)
      setShowRightDots(currentPage < totalPages - 3 ? true : false)
    }
    console.log('hei')
    if (!showLeftDots && !showRightDots) {
      setShowingNumbers(Array.from(Array(totalPages).keys()))
    }
    if (!showLeftDots && showRightDots) {
      setShowingNumbers([1, 2, 3, 4, 5])
    }

    if (showLeftDots && !showRightDots) {
      setShowingNumbers([
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ])
    }

    if (showLeftDots && showRightDots) {
      setShowingNumbers([currentPage - 1, currentPage, currentPage + 1])
    }
  }, [totalPages, currentPage, showLeftDots, showRightDots])

  return (
    <q.div>
      {totalPages > 0 && (
        <q.div className="flex gap-4">
          {showLeftDots && (
            <q.div className="flex">
              <PaginationButton
                pageNumber={1}
                handlePageChange={handlePageChange}
              />
              ...
            </q.div>
          )}

          {showingNumbers.map((page) => (
            <q.div>
              <PaginationButton
                pageNumber={page}
                handlePageChange={handlePageChange}
                isCurrentPage={page === currentPage}
              />
            </q.div>
          ))}
          {showRightDots && (
            <q.div className="flex">
              ...
              <PaginationButton
                pageNumber={totalPages}
                handlePageChange={handlePageChange}
              />{' '}
            </q.div>
          )}
        </q.div>
      )}
    </q.div>
  )
}

export default Pagination
