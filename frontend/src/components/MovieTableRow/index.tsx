import type { movieObject } from '../../types/movie'
import Modal from 'react-modal'
import q from 'qjuul'
import { useState } from 'react'

interface MovieTableRowProps {
  movie: movieObject
  onClick: () => void
}

const mainAppElement = document.getElementById('root')

Modal.setAppElement(mainAppElement as HTMLElement)

const MovieTableRow: React.FC<MovieTableRowProps> = ({ movie, onClick }) => {
  return (
    <q.tr onClick={onClick} className="card rounded-md hover:cursor-pointer">
      <q.td className="p-2">
        <q.img src={movie.Poster} alt={movie.Title} width="100" />
      </q.td>
      <q.td>{movie.Title}</q.td>
      <q.td>{movie.Year}</q.td>
    </q.tr>
  )
}

export default MovieTableRow
