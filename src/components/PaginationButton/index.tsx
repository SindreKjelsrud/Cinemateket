import q from 'qjuul'

interface PaginationButtonProps {
  pageNumber: number
  isCurrentPage?: boolean
  handlePageChange: (pageNumber: number) => void
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  pageNumber,
  handlePageChange,
  isCurrentPage,
}) => {
  return (
    <q.div
      onClick={() => handlePageChange(pageNumber)}
      className={
        isCurrentPage
          ? 'bg-red-600 p-2 rounded-md hover:cursor-pointer'
          : 'bg-red-400 p-2 rounded-md hover:cursor-pointer'
      }
    >
      <p>{pageNumber}</p>
    </q.div>
  )
}

export default PaginationButton
