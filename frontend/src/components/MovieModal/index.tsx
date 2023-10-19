import type { modalMovieType } from '../../types/movie'
import q from 'qjuul'
import Modal from 'react-modal'

interface MovieModalProps {
  setModalOpen: (status: boolean) => void
  modalMovie: modalMovieType
  modalOpen: boolean
}

const MovieModal: React.FC<MovieModalProps> = ({
  setModalOpen,
  modalMovie,
  modalOpen,
}) => {
  return (
    <Modal
      className="p-6 bg-black rounded-lg outline-none" // styles for the modal container
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" // styles for the overlay
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <q.div className="flex">
        <q.img
          className="h-44 max-w-sm mx-auto mb-4 rounded-md shadow"
          src={modalMovie?.poster}
          alt={modalMovie?.title}
        />
        <q.div className="flex flex-col px-10 pt-5">
          <q.h1 className="text-xl font-bold mb-4">{modalMovie?.title}</q.h1>
          <q.p>Year: {modalMovie?.year}</q.p>
          <q.p>Type: {modalMovie?.type}</q.p>
          <q.a
            className='"underline text-blue-500 hover:text-blue-700"'
            href={`https://www.imdb.com/title/${modalMovie?.imdbID}`}
          >
            {`https://www.imdb.com/title/${modalMovie?.imdbID}`}
          </q.a>
        </q.div>
      </q.div>
    </Modal>
  )
}

export default MovieModal
