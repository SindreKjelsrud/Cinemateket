import { useNavigate } from 'react-router'

const navigate = useNavigate()

export const navigateToPage = (
  title?: string,
  page: string = '1',
  type?: string,
  year?: string
) => {
  if (!title) navigate('')
  else {
    let query = `?title=${title}&page=${page}`

    if (type) query += `&type=${type}`
    if (year) query += `&year=${year}`

    navigate(query)
  }
}
