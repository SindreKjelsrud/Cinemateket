import q from 'qjuul'

interface PaginationButtonProps {
  pageNumber: number
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ pageNumber }) => {
  return (
    <q.div className="bg-red-400 p-2 rounded-md">
      <p>{pageNumber}</p>
    </q.div>
  )
}

export default PaginationButton
