import { useNavigate } from 'react-router'

export const useNavigateToPage = () => {
  const navigate = useNavigate()

  return (title?: string, type?: string, year?: string, page: string = '1') => {
    if (!title) navigate('')
    else {
      let query = `?title=${title}&page=${page}`

      if (year) query += `&year=${year}`
      if (type) query += `&type=${type}`

      navigate(query)
    }
  }
}
