import type { movieObject } from '../../types/movie'
import q from 'qjuul'
import MovieTableRow from './MovieTableRow'
import arrow from '../../../public/arrow-down-up-svgrepo-com.svg'

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
        <q.thead className="">
          <q.tr>
            <q.th className="text-left"></q.th>
            <q.th
              className=" text-left hover:cursor-pointer"
              onClick={() => sortHandler('title')}
            >
              <q.div className="flex font-bold">
                Title
                <q.img src={arrow} className="w-3 ml-1 " />
              </q.div>
            </q.th>
            <q.th
              className="text-left hover:cursor-pointer"
              onClick={() => sortHandler('year')}
            >
              <q.div className="flex">
                Year
                <q.img src={arrow} className="w-3 ml-1" />
              </q.div>
            </q.th>
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
