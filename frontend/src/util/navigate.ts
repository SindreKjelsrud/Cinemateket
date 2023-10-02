import { useNavigate } from 'react-router'

export const useNavigateToPage = () => {
  const navigate = useNavigate()

  return (title?: string, type?: string, year?: string, page: string = '1') => {
    if (!title) {
      navigate('')
      window.location.reload()
    } else {
      let query = `?s=${title}&page=${page}`

      if (type) query += `&type=${type}`
      if (year) query += `&y=${year}`

      navigate(query)
    }
  }
}
