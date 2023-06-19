import { Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import FlexContainer from './FlexContainer'
import theme from '../theme'

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

const onSubmit = (values) => {
	console.log(values)
}

const SignIn = () => (
	<Formik initialValues={initialValues} onSubmit={onSubmit}>
		{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
	</Formik>
)

export default SignIn