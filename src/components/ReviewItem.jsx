import { format } from 'date-fns'
import { StyleSheet } from 'react-native'
import FlexContainer from './FlexContainer'
import Text from './Text'
import SecondaryText from './SecondaryText'
import theme from '../theme'

const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: theme.colors.light,
        padding: 15,
        flexDirection: 'row'
    },
    reviewRatingContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: theme.colors.primary,
        borderWidth: 2,
        borderRadius: 20,
    },
    reviewInfoContainer: {
        marginLeft: 10,
        flexShrink: 1
    },
    reviewTextContainer: {
        marginTop: 5,
    }
  })

const convertDate = (date) => format(new Date(date), 'dd.MM.yyyy')

const RepositoryText = ({ text }) => {
	return (
		<FlexContainer style={styles.reviewTextContainer}>
				<Text>{text}</Text>
		</FlexContainer>
	)
}

const ReviewItem = ({ review }) => {
	return (
		<FlexContainer style={styles.reviewContainer}>
			<FlexContainer style={styles.reviewRatingContainer}>
				<Text color='primary' fontWeight='bold'>{review.rating}</Text>
			</FlexContainer>
			<FlexContainer style={styles.reviewInfoContainer}>
				{review.user && <Text fontWeight='bold'>{review.user.username}</Text>}
				{review.repository && <Text fontWeight='bold'>{review.repository.fullName}</Text>}
                <SecondaryText>{convertDate(review.createdAt)}</SecondaryText>
				{review.text && <RepositoryText text={review.text} />}
			</FlexContainer>
		</FlexContainer>
	)
}

export default ReviewItem