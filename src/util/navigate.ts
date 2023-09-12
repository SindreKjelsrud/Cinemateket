import { useNavigate } from 'react-router'

export const useNavigateToPage = () => {
  const navigate = useNavigate()

  return (title?: string, page: string = '1', type?: string, year?: string) => {
    if (!title) navigate('')
    else {
      let query = `?title=${title}&page=${page}`

      if (type) query += `&type=${type}`
      if (year) query += `&year=${year}`

      console.log(query)

      navigate(query)
    }
  }
}
