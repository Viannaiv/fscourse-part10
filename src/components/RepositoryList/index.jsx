import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import theme from '../../theme'
import useRepositories from '../../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height
  }
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem {...item} />}
      ItemSeparatorComponent={ItemSeparator} 
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList