import { useEffect, useState } from 'react'
import './App.css'
import q from 'qjuul'
import { MovieForm, Pagination, MovieTable, MovieModal } from './components'
import type { movieObject } from './types/movie'

function App() {
  const API_MOVIE_KEY = 'd92949d8'
  const [movies, setMovies] = useState<movieObject[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMovie, setModalMovie] = useState<movieObject | null>(null)
  const [movieType, setMovieType] = useState('')
  const [movieYear, setMovieYear] = useState('')
  const [movieTitle, setMovieTitle] = useState('')
  const [sortAscending, setSortAscending] = useState(true)

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

  const sortHandler = (sortType: string) => {
    let sortedMovies: movieObject[] = []

    if (sortType === 'title') {
      sortedMovies = [...movies].sort((m1, m2) =>
        sortAscending
          ? m1.Title.localeCompare(m2.Title)
          : m2.Title.localeCompare(m1.Title)
      )
    }
    if (sortType === 'year') {
      sortedMovies = [...movies].sort((m1, m2) =>
        sortAscending
          ? m1.Year.localeCompare(m2.Year)
          : m2.Year.localeCompare(m1.Year)
      )
    }

    setSortAscending(!sortAscending)
    setMovies(sortedMovies)
  }

  return (
    <>
      <q.div className="flex flex-col justify-center items-center mx-auto w-2/4">
        <MovieModal {...{ setModalOpen, modalMovie, modalOpen }} />
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
            <MovieTable {...{ handleModalOpen, sortHandler, movies }} />
          ) : (
            <q.h1>Loading...</q.h1>
          )}
        </q.div>
      </q.div>
    </>
  )
}

export default App
