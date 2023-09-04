import { useEffect, useState } from 'react'
import './App.css'
import q from 'qjuul'
import { PaginationButton } from './components'

function App() {
  const API_MOVIE_KEY = 'd92949d8'
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${API_MOVIE_KEY}&s=spider-man`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search)
        setTotalPages(data.totalResults)
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error))
  }, [])

  const calculatePages = (totalResults: number): number => {
    return Math.round(totalResults / 10)
  }

  return (
    <>
      <q.div>
        <q.div>
          <q.h1>All movies</q.h1>
          <q.h2>Pages</q.h2>
          <q.p>{calculatePages(totalPages)}</q.p>
          <q.div className="flex gap-4">
            {Array.from(Array(calculatePages(totalPages)).keys()).map(
              (page) => (
                <PaginationButton pageNumber={page + 1} />
              )
            )}
          </q.div>
        </q.div>
        {!loading && movies ? (
          <q.div>
            <q.table>
              <q.tr>
                <q.th>Poster</q.th>
                <q.th>Title</q.th>
                <q.th>Year</q.th>
              </q.tr>
              {movies.map((movie: any) => (
                <q.tr>
                  <q.td>
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
