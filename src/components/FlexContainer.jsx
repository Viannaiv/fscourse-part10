import { View, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  ...theme.containers
})

const FlexContainer = ({containerType, style, ...props}) => {
  const containerStyle = [
    styles.container,
    containerType === 'appbar' && styles.appBarContainer,
    style
  ]

  return <View style={containerStyle} {...props}></View>
}

export default FlexContainer