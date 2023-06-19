import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import FlexContainer from './FlexContainer'
import theme from '../theme'

const styles = StyleSheet.create({
    appBarContainer: {
      paddingTop: Constants.statusBarHeight + 20,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexGrow: 0,
      backgroundColor: theme.colors.appBar
    }
  }
)

const AppBar = () => (
  <FlexContainer style={styles.appBarContainer}>
    <AppBarTab content='Repositories' />
  </FlexContainer>
)

export default AppBar