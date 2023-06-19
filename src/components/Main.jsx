import { StyleSheet } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import FlexContainer from './FlexContainer'
import SignIn from './SignIn'
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
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="/signin" element={<SignIn />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </FlexContainer>
)

export default Main