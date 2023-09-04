import q from 'qjuul'

interface PaginationButtonProps {
  pageNumber: number
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ pageNumber }) => {
  return (
    <q.div className="">
      <p>{pageNumber}</p>
    </q.div>
  )
}

export default PaginationButton
