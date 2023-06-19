import { Pressable } from 'react-native'
import Text from './Text'

const AppBarTab = ({ content }) => (
  <Pressable onPress={() => { } }>
    <Text color='appBar' fontWeight='bold'>{content}</Text>
  </Pressable>
)

export default AppBarTab