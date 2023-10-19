import { movieResponse } from '../types/movie'

//const API_MOVIE_KEY = import.meta.env.VITE_MOVIE_API_KEY

export const fetchMovie = async (
  title: string,
  page: string = '1',
  type?: string,
  year?: string
): Promise<movieResponse>=> {
  let query = `http://localhost:5212/movie?s=${title}&pageNumber=${page}`

  if (type) query += `&type=${type}`
  if (year) query += `&y=${year}`

  const response = await fetch(query)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.search)
      return data
    })
    .catch((error) => {
      console.log('Error:', error)
    })
  return response
}