import { useEffect, useState } from 'react'
import './App.css'
import q from 'qjuul'
import { PaginationButton } from './components'
import Pagination from './components/Pagination'

function App() {
  const API_MOVIE_KEY = 'd92949d8'
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetch(
      `http://www.omdbapi.com/?apikey=${API_MOVIE_KEY}&s=spider-man&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search)
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

  return (
    <>
      <q.div className="flex flex-col justify-center items-center mx-auto w-3/4">
        <q.div className="flex flex-col w-full items-center">
          <q.h1>All movies</q.h1>
          <q.div className="flex pt-2">
            {!loading && totalPages && (
              <Pagination
                currentPage={currentPage}
                totalPages={calculatePages(totalPages)}
                handlePageChange={handlePageChange}
              />
            )}
          </q.div>
        </q.div>
        {!loading && movies ? (
          <q.div>
            <q.table className="border-separate border-spacing-y-5">
              <q.tr>
                <q.th>Poster</q.th>
                <q.th>Title</q.th>
                <q.th>Year</q.th>
              </q.tr>
              {movies.map((movie: any) => (
                <q.tr className="card rounded-md">
                  <q.td className="p-2">
                    <q.img src={movie.Poster} alt={movie.Title} width="100" />
                  </q.td>
                  <q.td>{movie.Title}</q.td>
                  <q.td>{movie.Year}</q.td>
                </q.tr>
              ))}
            </q.table>
          </q.div>
        ) : (
          <q.h1>Loading...</q.h1>
        )}
      </q.div>
    </>
  )
}

export default App
