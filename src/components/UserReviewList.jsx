import { FlatList, View, StyleSheet } from 'react-native'
import theme from '../theme'
import useUser from '../hooks/useUser'
import ReviewItem from './ReviewItem'
import useDeleteReview from '../hooks/useDeleteReview'

const styles = StyleSheet.create({
	separator: {
		height: theme.separator.height
	}
})

const ItemSeparator = () => <View style={styles.separator} />

const UserReviewList = () => {
    const { user, refetch } = useUser(true)
    const [deleteReview] = useDeleteReview()

	const reviews = (user && user.reviews)
    ? user.reviews.edges.map((edge) => edge.node)
    : []

    const onDelete = async (id) => {
		try {
			const res = await deleteReview({ reviewId: id })
			console.log('Review deleted')
            refetch()
		} catch (error) {
			console.log(error)
		}
	}

	if (user) {
		return (
			<FlatList
				data={reviews}
				renderItem={({ item }) => 
                    <ReviewItem 
                        review={item}
                        deleteReview={() => onDelete(item.id)}
                    />
                }
				keyExtractor={({ id }) => id}
				ItemSeparatorComponent={ItemSeparator}
			/>
		)
	}
}

export default UserReviewList