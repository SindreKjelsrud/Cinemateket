export type movieObject = {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

export type modalMovieType = movieObject | null

export type movieResponse = {
  Response: string
  totalResults: string
  Search: movieObject[]
}
