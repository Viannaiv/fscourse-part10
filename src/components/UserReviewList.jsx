import { FlatList, View, StyleSheet } from 'react-native'
import theme from '../theme'
import useUser from '../hooks/useUser'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
	separator: {
		height: theme.separator.height
	}
})

const ItemSeparator = () => <View style={styles.separator} />

const UserReviewList = () => {
    const { user } = useUser(true)

	const reviews = (user && user.reviews)
    ? user.reviews.edges.map((edge) => edge.node)
    : []

	if (user) {
		return (
			<FlatList
				data={reviews}
				renderItem={({ item }) => <ReviewItem review={item} />}
				keyExtractor={({ id }) => id}
				ItemSeparatorComponent={ItemSeparator}
			/>
		)
	}
}

export default UserReviewList