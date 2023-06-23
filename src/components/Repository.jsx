import { useParams } from 'react-router-native'
import { FlatList, View, StyleSheet } from 'react-native'
import { format } from 'date-fns'
import theme from '../theme'
import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'
import FlexContainer from './FlexContainer'
import Text from './Text'
import SecondaryText from './SecondaryText'

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height
  },
	reviewContainer: {
		backgroundColor: theme.colors.light,
		padding: 15,
		flexDirection: 'row'
	},
	listHeader: {
		marginBottom: 10
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

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryInfo = ({ repository }) => <RepositoryItem {...repository} showOpenButton />

const convertDate = (date) => format(new Date(date), 'dd.MM.yy')

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
				<Text fontWeight='bold'>{review.user.username}</Text>
				<SecondaryText>{convertDate(review.createdAt)}</SecondaryText>
				{review.text && <RepositoryText text={review.text} />}
			</FlexContainer>
		</FlexContainer>
	)
}

/*
node {
	id
	text
	rating
	createdAt
	user {
		id
		username
	}
}

Review's text field contains the textual review, 
rating field a numeric rating between 0 and 100, 
and createdAt the date when the review was created. 
Review's user field contains the reviewer's information, 
which is of type User.
*/

const Repository = () => {
	let { repositoryId } = useParams()
	const { repository } = useRepository(repositoryId)

	const reviews = (repository && repository.reviews)
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

	if (repository) {
		return (
			<FlatList
				data={reviews}
				renderItem={({ item }) => <ReviewItem review={item} />}
				keyExtractor={({ id }) => id}
				ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
				ListHeaderComponentStyle={styles.listHeader}
				ItemSeparatorComponent={ItemSeparator}
			/>
		)
	}
}

export default Repository