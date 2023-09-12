import { movieResponse } from '../types/movie'

const API_MOVIE_KEY = import.meta.env.VITE_API_MOVIE_KEY

export const fetchMovie = async (
  title: string,
  page: string = '1',
  type?: string,
  year?: string
): Promise<movieResponse> => {
  let query = `http://www.omdbapi.com/?apikey=${API_MOVIE_KEY}&s=${title}&page=${page}`

  if (type) query += `&type=${type}`
  if (year) query += `&year=${year}`

  const response = await fetch(query)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.log('Error:', error)
    })

  return response
}
