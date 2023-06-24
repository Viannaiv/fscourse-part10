import { useParams } from 'react-router-native'
import { FlatList, View, StyleSheet } from 'react-native'
import theme from '../theme'
import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
	separator: {
		height: theme.separator.height
	},
	listHeader: {
		marginBottom: 10
	}
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryInfo = ({ repository }) => <RepositoryItem {...repository} showOpenButton />

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