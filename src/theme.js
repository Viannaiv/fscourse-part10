import Constants from 'expo-constants'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarText: '#f2f2f2'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: 'System'
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  separator: {
    height: 10
  },
  containers: {
    container: {
      flexGrow: 1,
      flexShrink: 1
    },
    appBarContainer: {
      paddingTop: Constants.statusBarHeight + 20,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexGrow: 0,
      backgroundColor: '#24292e'
    }
  }
}

export default theme