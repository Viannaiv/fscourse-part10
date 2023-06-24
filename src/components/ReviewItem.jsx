import { format } from 'date-fns'
import { StyleSheet, Pressable, Alert } from 'react-native'
import FlexContainer from './FlexContainer'
import Text from './Text'
import SecondaryText from './SecondaryText'
import theme from '../theme'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: theme.colors.light,
        padding: 10
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
    },
    reviewInnerContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    openRepositoryButton: {
		backgroundColor: theme.colors.primary,
		borderRadius: 4,
		padding: 10,
		marginRight: 10,
		alignItems: 'center',
        flexGrow: 1
	},
    deleteReviewButton: {
		backgroundColor: theme.colors.error,
		borderRadius: 4,
		padding: 10,
		alignItems: 'center',
        flexGrow: 1
	},
    buttonContainer: {
        flexDirection: 'row'
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

const deleteButtonAlert = (deleteReview) =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
        {text: 'CANCEL'},
        {text: 'DELETE', onPress: () => {
            console.log('DELETE Pressed')
            deleteReview()
        }}
    ])

const ReviewButton = ({ style, text, onPress }) => (
    <FlexContainer style={style}>
        <Pressable onPress={onPress}>
            <Text color='light' fontWeight={'bold'}>{text}</Text>
        </Pressable>
    </FlexContainer>
)

const ReviewItem = ({ review, deleteReview }) => {
    const navigate = useNavigate()

	return (
        <FlexContainer style={styles.reviewContainer}>
            <FlexContainer style={styles.reviewInnerContainer}>
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
            { review.repository &&
                <FlexContainer style={styles.buttonContainer}>
                    <ReviewButton 
                        text={'View repository'} 
                        style={styles.openRepositoryButton} 
                        onPress={() => navigate(`/${review.repository.id}`)}
                    />
                    <ReviewButton 
                        text={'Delete review'} 
                        style={styles.deleteReviewButton}
                        onPress={() => deleteButtonAlert(deleteReview)}
                    />
                </FlexContainer>
            }
        </FlexContainer>
	)
}

export default ReviewItem