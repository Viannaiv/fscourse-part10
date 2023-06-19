import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: theme.colors.grey,
		borderRadius: 4,
		padding: 10,
	},
	onError: {
		borderColor: theme.colors.error,
	}
})

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
		styles.input,
		error && styles.onError,
		style
	]

  return <NativeTextInput style={textInputStyle} {...props} />
}

export default TextInput