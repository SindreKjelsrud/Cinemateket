import { useEffect, useState, FormEvent } from 'react'
import './App.css'
import q from 'qjuul'
import { MovieForm, Pagination, MovieTable, MovieModal } from './components'
import type { movieObject } from './types/movie'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchMovie } from './api/fetchMovie'

function App() {
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

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const title = searchParams.get('title') || ''
  const type = searchParams.get('type') || ''
  const year = searchParams.get('y') || ''
  const page = searchParams.get('page') || ''

  useEffect(() => {
    handleMovieSubmit()
  }, [title, type, year])

  const handleMovieSubmit = async ({
    event,
    pageNumber,
  }: {
    event?: FormEvent
    pageNumber?: number
  } = {}) => {
    if (event) event.preventDefault()

    let pageNum: number
    if (pageNumber) {
      pageNum = pageNumber
    } else {
      pageNum = Number(page)
    }

    if (!movieTitle && !movieType && !movieYear) {
      setLoading(false)
    }

    navigate(
      movieYear && movieType
        ? `?title=${movieTitle}&type=${movieType}&y=${movieYear}&page=${pageNum}`
        : movieYear
        ? `?title=${movieTitle}&y=${movieYear}&page=${pageNum}`
        : movieYear && movieType
        ? `?title=${movieTitle}&type=${movieType}&page=${pageNum}`
        : `?title=${movieTitle}&page=${pageNum}`
    )

    const response = await fetchMovie(title, type, year, pageNum)
    if (response.Response === 'True') {
      setMovies(response.Search)
      setTotalPages(response.totalResults)
      setLoading(false)
    }
  }

  const calculatePages = (totalResults: number): number => {
    return Math.round(totalResults / 10)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    handleMovieSubmit({ pageNumber })
  }

  const handleModalOpen = (movie: movieObject) => {
    setModalOpen(true)
    setModalMovie(movie)
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
      <q.div className="flex flex-col justify-center items-center mx-auto  w-3/4 md:w-3/5 lg:w-2/4">
        <MovieModal {...{ setModalOpen, modalMovie, modalOpen }} />
        <q.div className="flex flex-col w-full items-center">
          <q.h1 className="py-4">All movies</q.h1>
          <MovieForm
            {...{
              handleMovieSubmit,
              setMovieTitle,
              setMovieType,
              setMovieYear,
              movieTitle,
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
          {loading ? (
            <q.h1>Loading...</q.h1>
          ) : movies ? (
            <MovieTable {...{ handleModalOpen, sortHandler, movies }} />
          ) : (
            <q.h2>Find a list of movies by searching above ☝️ </q.h2>
          )}
        </q.div>
      </q.div>
    </>
  )
}

export default App
