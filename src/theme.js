import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    light: 'white',
    appBar: '#24292e',
    mainBackground: '#e1e4e8',
    grey: '#A9A9A9',
    error: '#d73a4a'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  separator: {
    height: 10
  }
}

export default theme