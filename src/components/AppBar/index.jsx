import { StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import FlexContainer from '../FlexContainer'
import theme from '../../theme'
import useUser from '../../hooks/useUser'

import { useApolloClient } from '@apollo/client'
import { useAuthStorage } from '../../hooks/useAuthStorage'

const styles = StyleSheet.create({
    appBarContainer: {
      paddingTop: Constants.statusBarHeight + 20,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 20,
      flexDirection: 'row',
      backgroundColor: theme.colors.appBar
    }
  }
)

const AppBar = () => {
  const { user } = useUser()
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  console.log('Current user', user)

  const signOut = async () => {
    console.log('Signing out')
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }
  
  return (
    <FlexContainer style={styles.appBarContainer}>
      <ScrollView horizontal>
        <AppBarTab content='Repositories' path='/' />
        {user && <AppBarTab content='Create a review' path='/review' />}
        {user 
          ? <AppBarTab content='Sign out' path='#' onPress={signOut}/>
          : <AppBarTab content='Sign in' path='/signin' />
        }
      </ScrollView>
    </FlexContainer>
  )
}

export default AppBar