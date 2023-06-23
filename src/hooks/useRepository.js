import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (repositoryId) => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network'
  })

  if (loading) {
    console.log('Retrieving repository')
    return {data: null, loading, refetch}
  } else if (data.repository) {
    console.log('Repository retrieved')
  } else if (error) {
    console.log('Error in retrieving repository: ', error)
  } else {
    console.log('Repository could not be found')
  }

  return { repository: data.repository, error, loading, refetch }
}

export default useRepository