const API_MOVIE_KEY = import.meta.env.VITE_MOVIE_API_KEY

export const fetchMovie = async (
  title: string,
  type: string,
  year: string,
  pageNum: number
) => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_MOVIE_KEY}&s=${title}&type=${type}&y=${year}&page=${pageNum}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  return response
}
