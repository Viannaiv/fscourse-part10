import { useQuery } from '@apollo/client'
import { GET_USER } from '../graphql/queries'

const useUser = () => {
  const { data, error, loading, refetch } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network'
  })

  if (loading) {
    console.log('Retrieving user information')
    return {user: null, loading, refetch}
  } else if (data.me) {
    console.log('User information retrieved')
  } else if (error) {
    console.log('Error in retrieving data: ', error)
  } else {
    console.log('No signed in user')
  }

  return { user: data.me, error, loading, refetch }
}

export default useUser