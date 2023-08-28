import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const API_MOVIE_KEY = import.meta.env.VITE_MOVIE_API_KEY;
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${API_MOVIE_KEY}&t=batman`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data)
      }
      )
      .then(() => setLoading(false))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <div>
        {!loading && movie ? (
          <div>
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} alt={movie.Title} />
            </div>
        ):(<h1>Loading...</h1>)}
      </div>
    </>
  )
}

export default App
