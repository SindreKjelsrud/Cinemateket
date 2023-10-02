export type movieObject = {
  poster: string
  title: string
  type: string
  year: string
  imdbID: string
}

export type modalMovieType = movieObject | null

export type movieResponse = {
  response: string
  totalResults: string
  search: movieObject[]
}
