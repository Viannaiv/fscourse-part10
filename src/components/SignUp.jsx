import { Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import FlexContainer from './FlexContainer'
import theme from '../theme'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
	form: {
		backgroundColor: theme.colors.light,
		padding: 10
	},
	submit: {
		backgroundColor: theme.colors.primary,
		borderRadius: 4,
		padding: 10,
		alignItems: 'center'
	}
})

const initialValues = {
  username : '',
  password: '',
	passwordConfirmation: ''
}

const SignUpForm = ({ onSubmit }) => {
  return (
    <FlexContainer style={styles.form}>
      <FormikTextInput name="username" placeholder="Username"/>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
			<FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry/>
			<FlexContainer style={styles.submit}>
				<Pressable onPress={onSubmit}>
					<Text color='light' fontWeight={'bold'}>Sign up</Text>
				</Pressable>
			</FlexContainer>
    </FlexContainer>
  )
}

const validationSchema = yup.object().shape({
  username: yup
		.string()
    .required('Username is required')
		.min(5, 'Username minimum length is 5')
		.max(30, 'Username maximum length is 30'),
  password: yup
		.string()
		.min(5, 'Password  minimum length is 5')
		.max(50, 'Password  maximum length is 50')
    .required('Password is required'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], "Passwords don't match")
		.required('Password confirmation is required')
})

const SignUp = () => {
	const [signUp] = useSignUp()
	const [signIn] = useSignIn()
	const navigate = useNavigate()

	const onSubmit = async (values) => {
		const { username, password } = values

		try {
			await signUp({ username, password })
			const { data } = await signIn({ username, password })
			console.log(data)
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	)
}

export default SignUp