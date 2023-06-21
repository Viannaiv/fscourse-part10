import { useMutation, useApolloClient } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
import { useAuthStorage } from './useAuthStorage'

const useSignIn = () => {
	const authStorage = useAuthStorage()
	const apolloClient = useApolloClient()
	const [mutate, result] = useMutation(AUTHENTICATE)

	const signIn = async ({ username, password }) => {
		console.log(`Signing in: ${username}`)
		const res = await mutate({ variables: { credentials: { username, password }} })
		
		if (res.data.authenticate.accessToken) {
			await authStorage.setAccessToken(res.data.authenticate.accessToken)
			apolloClient.resetStore()
		}
		
		return res
	}

	return [signIn, result]
}

export default useSignIn