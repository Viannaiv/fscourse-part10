import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import RepositoryItem from './RepositoryItem'
import theme from '../theme'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height
  },
  listHeader: {
    padding: 10
  }
})

const orderings = {
  latestReview: {
    "orderBy": 'CREATED_AT',
    "orderDirection": 'DESC'
  },
  highestRating: {
    "orderBy": 'RATING_AVERAGE',
    "orderDirection": 'DESC'
  },
  lowestRating: {
    "orderBy": 'RATING_AVERAGE',
    "orderDirection": 'ASC'
  }
}

const ItemSeparator = () => <View style={styles.separator} />

const OrderingPicker = ({ state, stateChanger }) => (
  <Picker
    selectedValue={state}
    onValueChange={(itemValue) => stateChanger(itemValue)}
  >
    <Picker.Item label="Latest repositories" value={orderings.latestReview} />
    <Picker.Item label="Highest rated repositories" value={orderings.highestRating} />
    <Picker.Item label="Lowest rated repositories" value={orderings.lowestRating} />
  </Picker>
)

export const RepositoryListContainer = ({ 
  repositories,
  navigate,
  state,
  stateChanger 
}) => {
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
      ListHeaderComponent={<OrderingPicker state={state} stateChanger={stateChanger}/>}
      ListHeaderComponentStyle={styles.listHeader}
    />
  )
}

const RepositoryList = () => {
  const [ordering, setOrdering] = useState(orderings.latestReview)
  const { repositories } = useRepositories(ordering)
  const navigate = useNavigate()

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      navigate={navigate}
      state={ordering}
      stateChanger={setOrdering}
    />
  )
}

export default RepositoryList