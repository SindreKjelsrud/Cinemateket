import { useEffect, useState } from 'react'
import './App.css'
import q from 'qjuul'

function App() {
  const API_MOVIE_KEY = 'd92949d8'
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${API_MOVIE_KEY}&s=spider-man`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search)
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <q.div>
        <div>
          <h1>All movies</h1>
        </div>
        {!loading && movies ? (
          <div>
            <table>
              <tr>
                <th>Poster</th>
                <th>Title</th>
                <th>Year</th>
              </tr>
              {movies.map((movie: any) => (
                <tr>
                  <td>
                    <img src={movie.Poster} alt={movie.Title} width="100" />
                  </td>
                  <td>{movie.Title}</td>
                  <td>{movie.Year}</td>
                </tr>
              ))}
            </table>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </q.div>
    </>
  )
}

export default App
