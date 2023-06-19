import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
  }
})

const FlexContainer = ({style, ...props}) => {
  const containerStyle = [
    styles.container,
    style
  ]

  return <View style={containerStyle} {...props}></View>
}

export default FlexContainer