import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useState, Component } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce'
import RepositoryItem from './RepositoryItem'
import theme from '../theme'
import useRepositories from '../hooks/useRepositories'
import TextInput from './FormikTextInput/TextInput'

const styles = StyleSheet.create({
  separator: {
    height: theme.separator.height
  },
  listHeader: {
    padding: 10
  },
  input: {
    backgroundColor: theme.colors.white
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

const RepositorySearch = ({ state, stateChanger }) => {
  return (
    <TextInput
      value={state} 
      onChangeText={(value) => stateChanger(value)}
      placeholder={'Search'}
    >
    </TextInput>
  )
}

const RepositoryListHeader = ({ state, stateChanger }) => {
  return (
    <>
      <RepositorySearch state={state.searchText} stateChanger={stateChanger.searchText}/>
      <OrderingPicker state={state.ordering} stateChanger={stateChanger.ordering}/>
    </>
  )
}

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    const {
      state,
      stateChanger 
    } = this.props

    return (
      <RepositoryListHeader key={'RepositorySearch'} state={state} stateChanger={stateChanger} />
    )
  }

  render() {
    const { repositories, navigate } = this.props

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
        ListHeaderComponent={this.renderHeader}
        ListHeaderComponentStyle={styles.listHeader}
      />
    )
  }
}

const RepositoryList = () => {
  const [ordering, setOrdering] = useState(orderings.latestReview)
  const [searchText, setSearchText] = useState('')
  const [searchKeyword] = useDebounce(searchText, 500)

  const variables = {...ordering}
  if (searchText && searchKeyword) variables.searchKeyword = searchKeyword
  const { repositories } = useRepositories(variables)
  
  const navigate = useNavigate()

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      navigate={navigate}
      state={{ordering: ordering, searchText: searchText}}
      stateChanger={{ordering: setOrdering, searchText: setSearchText}}
    />
  )
}

export default RepositoryList