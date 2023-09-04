import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const API_MOVIE_KEY = import.meta.env.VITE_MOVIE_API_KEY
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${API_MOVIE_KEY}&s=batman`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search)
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <div>
        {!loading && movies ? (
          <div>
            {movies.map((movie: any) => (
              <div>
                <h1>{movie.Title}</h1>
                <img src={movie.Poster} alt={movie.Title} />
              </div>
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  )
}

export default App
