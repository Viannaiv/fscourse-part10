import { Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import FlexContainer from './FlexContainer'
import theme from '../theme'
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
}

const SignInForm = ({ onSubmit }) => {
  return (
    <FlexContainer style={styles.form}>
      <FormikTextInput name="username" placeholder="Username"/>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
			<FlexContainer style={styles.submit}>
				<Pressable onPress={onSubmit}>
					<Text color='light' fontWeight={'bold'}>Sign in</Text>
				</Pressable>
			</FlexContainer>
    </FlexContainer>
  )
}

const validationSchema = yup.object().shape({
  username: yup
		.string()
    .required('Username is required'),
  password: yup
		.string()
    .required('Password is required'),
})

const SignIn = () => {
	const [signIn] = useSignIn()
	const navigate = useNavigate()

	const onSubmit = async (values) => {
		const { username, password } = values

		try {
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
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	)
}

export default SignIn