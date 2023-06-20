import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'

const useSignIn = () => {
	const [mutate, result] = useMutation(AUTHENTICATE)

	const signIn = async ({ username, password }) => {
		console.log('Signing in: ' + username)
		return await mutate({ variables: { credentials: { username, password }} })
	}

	return [signIn, result]
}

export default useSignIn