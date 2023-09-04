import q from 'qjuul'

interface PaginationButtonProps {
  pageNumber: number
  handlePageChange: (pageNumber: number) => void
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  pageNumber,
  handlePageChange,
}) => {
  return (
    <q.div
      onClick={() => handlePageChange(pageNumber)}
      className="bg-red-400 p-2 rounded-md"
    >
      <p>{pageNumber}</p>
    </q.div>
  )
}

export default PaginationButton
