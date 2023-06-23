import { useParams } from 'react-router-native'
import { StyleSheet } from 'react-native'
import theme from '../theme'
import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'

const styles = StyleSheet.create({
  
})

const Repository = () => {
    let { repositoryId } = useParams()

    const { repository } = useRepository(repositoryId)

    if (repository) return <RepositoryItem {...repository} showOpenButton />
}

export default Repository