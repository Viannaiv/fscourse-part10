import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import theme from '../theme'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height
  }
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, navigate }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => {
        return (
          <Pressable onPress={() => {navigate(`/${item.id}`)}} >
            <RepositoryItem {...item} />
          </Pressable>
        )
      }}
      ItemSeparatorComponent={ItemSeparator} 
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()
  const navigate = useNavigate()

  return <RepositoryListContainer repositories={repositories} navigate={navigate}/>
}

export default RepositoryList