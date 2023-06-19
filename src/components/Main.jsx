import { StyleSheet } from 'react-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import FlexContainer from './FlexContainer'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  }
})

const Main = () => (
    <FlexContainer style = {styles.container}>
        <AppBar/>
        <RepositoryList/>
    </FlexContainer>
)

export default Main