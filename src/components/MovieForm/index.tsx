import type { movieObject } from '../../types/movie'
import Modal from 'react-modal'
import q from 'qjuul'

interface MovieFormProps {
  handleMovieSubmit: (event: any) => void
  setMovieTitle: (title: string) => void
  setMovieYear: (year: string) => void
  setMovieType: (type: string) => void
}

const MovieForm: React.FC<MovieFormProps> = ({
  handleMovieSubmit,
  setMovieTitle,
  setMovieType,
  setMovieYear,
}) => {
  return (
    <q.form
      className="flex flex-col gap-3 card p-4 rounded-lg w-full px-28"
      onSubmit={handleMovieSubmit}
    >
      <q.label>Choose a movie title:</q.label>
      <q.input
        type="text"
        id="movieTitle"
        placeholder="Movie title"
        onChange={(e) => setMovieTitle(e.target.value)}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
      <q.label>Choose year movie was made: (OPTIONAL)</q.label>
      <q.select
        className="p-2 rounded-md border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        onChange={(e) => setMovieYear(e.target.value)}
      >
        {/* Option for year 1923-2023 */}
        <q.option value="">All years</q.option>
        {Array.from(Array(100), (e, i) => {
          const year = 2023 - i
          return (
            <q.option key={i} value={year}>
              {year}
            </q.option>
          )
        })}
      </q.select>
      <q.label>Choose type: (OPTIONAL)</q.label>
      <q.select
        className="p-2 rounded-md border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        onChange={(e) => setMovieType(e.target.value)}
      >
        <q.option value="">All types</q.option>
        <q.option value="movie">Movies</q.option>
        <q.option value="series">Series</q.option>
        <q.option value="episode">Episodes</q.option>
      </q.select>
      <q.button className="bg-white p-3 my-2 rounded-md w-2/5 mx-auto text-red-900 font-semibold">
        Find movies
      </q.button>
    </q.form>
  )
}

export default MovieForm
