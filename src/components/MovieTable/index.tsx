import type { movieObject } from '../../types/movie'
import q from 'qjuul'
import MovieTableRow from '../MovieTableRow'

interface MovieTableProps {
  handleModalOpen: (movie: movieObject) => void
  sortHandler: (sortType: string) => void
  movies: movieObject[]
}

const MovieTable: React.FC<MovieTableProps> = ({
  handleModalOpen,
  sortHandler,
  movies,
}) => {
  return (
    <q.div className="w-full">
      <q.table className="border-separate border-spacing-y-5 w-full">
        <q.thead>
          <q.tr>
            <q.th>Poster</q.th>
            <q.th onClick={() => sortHandler('title')}>Title</q.th>
            <q.th onClick={() => sortHandler('year')}>Year</q.th>
          </q.tr>
        </q.thead>
        <q.tbody>
          {movies.map((movie: movieObject) => (
            <MovieTableRow
              movie={movie}
              key={movie.imdbID}
              onClick={() => handleModalOpen(movie)}
            />
          ))}
        </q.tbody>
      </q.table>
    </q.div>
  )
}

export default MovieTable
