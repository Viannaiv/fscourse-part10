import { Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import FlexContainer from './FlexContainer'
import theme from '../theme'
import useCreateReview from '../hooks/useCreateReview'
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
  repositoryOwner : '',
  repositoryName: '',
	rating: '',
	reviewText: ''
}

const NewReviewForm = ({ onSubmit }) => {
  return (
    <FlexContainer style={styles.form}>
      <FormikTextInput name="repositoryOwner" placeholder="Repository owner name"/>
      <FormikTextInput name="repositoryName" placeholder="Repository name"/>
			<FormikTextInput name="rating" placeholder="Rating between 0 and 100"/>
      <FormikTextInput name="reviewText" placeholder="Review" multiline/>
			<FlexContainer style={styles.submit}>
				<Pressable onPress={onSubmit}>
					<Text color='light' fontWeight={'bold'}>Create a review</Text>
				</Pressable>
			</FlexContainer>
    </FlexContainer>
  )
}

const validationSchema = yup.object().shape({
  repositoryOwner: yup
		.string()
    .required('Repository owner name is required'),
	repositoryName: yup
		.string()
    .required('Repository name is required'),
	rating: yup
		.number()
    .required('Rating is required')
		.min(0, 'Rating can not be less than 0')
		.max(100, 'Rating can not be higher than 100'),
	reviewText: yup
		.string()
    .optional()
})

const NewReview = () => {
	const [createReview] = useCreateReview()
	const navigate = useNavigate()

	const onSubmit = async (values) => {
		const { repositoryOwner, repositoryName, rating, reviewText } = values
		try {
			const { data } = await createReview({ repositoryOwner, repositoryName, rating, reviewText })
			console.log(data)
			navigate(`/${data.createReview.repositoryId}`)
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
			{({ handleSubmit }) => <NewReviewForm onSubmit={handleSubmit} />}
		</Formik>
	)
}

export default NewReview