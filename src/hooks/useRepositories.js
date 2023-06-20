import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  })

  console.log('GET_REPOSITORIES query status: ', {data, error, loading})

  if (loading) return {data: null, loading, refetch}

  return { repositories: data.repositories, loading, refetch }
}

export default useRepositories