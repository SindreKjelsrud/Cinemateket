import { useEffect, useState } from 'react'
import './App.css'
import q from 'qjuul'
import Pagination from './components/Pagination'
import { MovieTableRow } from './components'
import type { movieObject } from './types/movie'
import Modal from 'react-modal'

function App() {
  const API_MOVIE_KEY = 'd92949d8'
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMovie, setModalMovie] = useState<movieObject | null>(null)
  const [movieType, setMovieType] = useState('')
  const [movieYear, setMovieYear] = useState('')
  const [movieTitle, setMovieTitle] = useState('')

  console.log('App mounted')

  useEffect(() => {
    fetch(
      `http://www.omdbapi.com/?apikey=${API_MOVIE_KEY}&s=spider-man&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search)
        console.log(data)
        setTotalPages(data.totalResults)
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error))
  }, [currentPage])

  const calculatePages = (totalResults: number): number => {
    return Math.round(totalResults / 10)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleModalOpen = (movie: movieObject) => {
    setModalOpen(true)
    setModalMovie(movie)
  }

  const handleMovieSubmit = (event: any) => {
    event.preventDefault()
    fetch(
      `http://www.omdbapi.com/?apikey=${API_MOVIE_KEY}&s=${movieTitle}&type=${movieType}&y=${movieYear}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search)
        console.log(data)
        setTotalPages(data.totalResults)
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error))
  }

  return (
    <>
      <q.div className="flex flex-col justify-center items-center mx-auto w-2/4">
        <Modal
          className="p-6 bg-black rounded-lg outline-none" // styles for the modal container
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" // styles for the overlay
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
        >
          <q.div className="flex">
            <q.img
              className="h-44 max-w-sm mx-auto mb-4 rounded-md shadow"
              src={modalMovie?.Poster}
              alt={modalMovie?.Title}
            />
            <q.div className="flex flex-col px-10 pt-5">
              <q.h1 className="text-xl font-bold mb-4">
                {modalMovie?.Title}
              </q.h1>
              <q.p>Year: {modalMovie?.Year}</q.p>
              <q.p>Type: {modalMovie?.Type}</q.p>
              <q.a
                className='"underline text-blue-500 hover:text-blue-700"'
                href={`https://www.imdb.com/title/${modalMovie?.imdbID}`}
              >
                {`https://www.imdb.com/title/${modalMovie?.imdbID}`}
              </q.a>
            </q.div>
          </q.div>
        </Modal>
        <q.div className="flex flex-col w-full items-center">
          <q.h1 className="py-4">All movies</q.h1>

          <q.form className="flex flex-col gap-3 card p-4 rounded-lg w-full px-28">
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
          <q.div className="flex pt-10">
            {!loading && totalPages && (
              <Pagination
                currentPage={currentPage}
                totalPages={calculatePages(totalPages)}
                handlePageChange={handlePageChange}
              />
            )}
          </q.div>
          {!loading && movies ? (
            <q.div className="w-full">
              <q.table className="border-separate border-spacing-y-5 w-full">
                <q.thead>
                  <q.tr>
                    <q.th>Poster</q.th>
                    <q.th>Title</q.th>
                    <q.th>Year</q.th>
                  </q.tr>
                </q.thead>
                <q.tbody>
                  {movies.map((movie: any) => (
                    <MovieTableRow
                      movie={movie}
                      key={movie.imdbID}
                      onClick={() => handleModalOpen(movie)}
                    />
                  ))}
                </q.tbody>
              </q.table>
            </q.div>
          ) : (
            <q.h1>Loading...</q.h1>
          )}
        </q.div>
      </q.div>
    </>
  )
}

export default App
