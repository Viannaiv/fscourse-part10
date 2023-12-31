import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: variables
  })

  if (loading) {
    console.log('Retrieving repositories')
    return {data: null, loading, refetch}
  } else if (data) {
    console.log('Repositories retrieved')
  }

  return { repositories: data.repositories, error, loading, refetch }
}

export default useRepositories