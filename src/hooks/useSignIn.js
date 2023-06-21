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
			try {
				const accessToken = await authStorage.getAccessToken()
				console.log('Sign in: Token found in storage before sign in:', accessToken)
			} catch (e) {
				console.log('Sign in: retrieving token from storage failed when it should')
			}

			await authStorage.setAccessToken(res.data.authenticate.accessToken)
			apolloClient.resetStore()
			
			try {
				const accessToken = await authStorage.getAccessToken()
				console.log('Sign in: Token found in storage after sign in:', accessToken)
			} catch (e) {
				console.log('Sign in: retrieving token from storage failed after sign in')
			}
		}
		
		return res
	}

	return [signIn, result]
}

export default useSignIn