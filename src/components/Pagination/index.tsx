import q from 'qjuul'
import PaginationButton from '../PaginationButton'
import { useEffect, useState } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const [showLeftDots, setShowLeftDots] = useState(false)
  const [showRightDots, setShowRightDots] = useState(false)
  const [showingNumbers, setShowingNumbers] = useState([0])

  useEffect(() => {
    if (totalPages > 5) {
      setShowLeftDots(currentPage > 4 ? true : false)
      setShowRightDots(currentPage < totalPages - 4 ? true : false)
    }
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
  }, [])

  return (
    <q.div>
      {totalPages > 0 && (
        <q.div className="flex gap-4">
          {showLeftDots && (
            <q.div className="flex">
              <PaginationButton pageNumber={1} />
              ...
            </q.div>
          )}

          {showingNumbers.map((page) => (
            <q.div>
              <PaginationButton pageNumber={page} />
            </q.div>
          ))}
          {showRightDots && (
            <q.div className="flex">
              ...
              <PaginationButton pageNumber={totalPages} />{' '}
            </q.div>
          )}
        </q.div>
      )}
    </q.div>
  )
}

export default Pagination
