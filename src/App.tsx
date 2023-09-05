import { useEffect, useState } from 'react'
import './App.css'
import q from 'qjuul'
import { MovieTableRow, MovieForm, Pagination } from './components'
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

          <MovieForm
            {...{
              handleMovieSubmit,
              setMovieTitle,
              setMovieType,
              setMovieYear,
            }}
          />
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
