import { StyleSheet } from 'react-native'
import { Link } from "react-router-native"
import Text from '../Text'
import FlexContainer from '../FlexContainer'

const styles = StyleSheet.create({
  container: {
    margin: 10
  }
})

const AppBarTab = ({ content, path }) => (
  <FlexContainer style={styles.container}>
    <Link to={path}>
      <Text color='light' fontWeight='bold'>{content}</Text>
    </Link>
  </FlexContainer>
)

export default AppBarTab