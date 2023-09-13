import { useEffect, useState } from 'react'
import './App.css'
import q from 'qjuul'
import { MovieForm, Pagination, MovieTable, MovieModal } from './components'
import type { movieObject } from './types/movie'
import { fetchMovie } from './api/fetchMovie'
import { useLocation } from 'react-router-dom'
import { useNavigateToPage } from './util/navigate'

function App() {
  const [movies, setMovies] = useState<movieObject[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMovie, setModalMovie] = useState<movieObject | null>(null)
  const navigateToPage = useNavigateToPage()
  const searchParams = new URLSearchParams(window.location.search)
  const [movieTitle, setMovieTitle] = useState(searchParams.get('title') || '')
  const [movieYear, setMovieYear] = useState(searchParams.get('year') || '')
  const [movieType, setMovieType] = useState(searchParams.get('type') || '')
  const [sortAscending, setSortAscending] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const handleFetchMovie = async () => {
      const response = await fetchMovie(title, page, type, year)
      console.log(year)
      if (response.Response == 'True') {
        setMovies(response.Search)
        setTotalPages(Number(response.totalResults))
        setCurrentPage(Number(page))
        setLoading(false)
      }
    }
    const searchParams = new URLSearchParams(location.search)
    const title = searchParams.get('title') || ''
    const page = searchParams.get('page') || ''
    const type = searchParams.get('type') || ''
    const year = searchParams.get('year') || ''

    if (title) {
      handleFetchMovie()
    } else {
      setLoading(false)
    }
  }, [location.search])

  const calculatePages = (totalResults: number): number => {
    return Math.round(totalResults / 10)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    navigateToPage(movieTitle, movieType, movieYear, pageNumber.toString())
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
          <q.h1
            onClick={() => navigateToPage()}
            className="py-8 hover:cursor-pointer text-red-800 text-5xl font-bold"
            co="rgb(220 38 38)"
          >
            Cinemateket
          </q.h1>
          <MovieForm
            {...{
              movieTitle,
              movieType,
              movieYear,
              setMovieTitle,
              setMovieType,
              setMovieYear,
            }}
          />
          <q.div className="flex pt-10">
            {!loading && movies.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={calculatePages(totalPages)}
                handlePageChange={handlePageChange}
              />
            )}
          </q.div>
          {loading ? (
            <q.h1>Loading...</q.h1>
          ) : movies.length > 0 ? (
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