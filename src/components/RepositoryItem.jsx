import { StyleSheet, Image, Pressable } from 'react-native'
import * as Linking from 'expo-linking'
import Text from './Text'
import FlexContainer from './FlexContainer'
import theme from '../theme'
import SecondaryText from './SecondaryText'

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  },
	language: {
		backgroundColor: theme.colors.primary,
		padding: 3,
		marginTop: 10,
		borderRadius: 4
	},
	itemContainer: {
		backgroundColor: theme.colors.light,
		padding: 15,
	},
	itemDescrptionContainer: {
		flexDirection: 'row'
	},
	itemInfoContainer: {
		flexDirection: 'row',
		paddingTop: 10
	},
	itemDescription: {
		paddingLeft: 20,
		alignItems: 'flex-start',
		flexShrink: 1,
		justifyContent: 'space-between'
	},
	itemInfo: {
		alignItems: 'center',
		flexGrow: 1
	},
	openGitHub: {
		backgroundColor: theme.colors.primary,
		borderRadius: 4,
		padding: 10,
		marginTop: 10,
		alignItems: 'center'
	}
})

const convertCount = (count) => {
	if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
	return count
}

const ItemInfo = ({title, description}) => (
	<FlexContainer style={styles.itemInfo}>
		<Text fontWeight={'bold'}>{description}</Text>
		<SecondaryText>{title}</SecondaryText>
	</FlexContainer>
)
  
const RepositoryItem = ({
	fullName,
	description,
	language,
	stargazersCount,
	forksCount,
	reviewCount,
	ratingAverage,
	ownerAvatarUrl,
	url,
	showOpenButton
}) => {
	return (
		<FlexContainer style={styles.itemContainer} testID='repositoryItem'>
			<FlexContainer style={styles.itemDescrptionContainer}>
				<Image style={styles.image} source={{ uri: ownerAvatarUrl }} />
				<FlexContainer style={styles.itemDescription}>
					<Text fontWeight={'bold'} fontSize='subheading'>{fullName}</Text>
					<SecondaryText>{description}</SecondaryText>
					<FlexContainer style={styles.language}>
							<Text color='light'>{language}</Text>
					</FlexContainer>
				</FlexContainer>
			</FlexContainer>
			<FlexContainer style={styles.itemInfoContainer}>
				<ItemInfo title={'Stars'} description={convertCount(stargazersCount)} />
				<ItemInfo title={'Forks'} description={convertCount(forksCount)} />
				<ItemInfo title={'Reviews'} description={convertCount(reviewCount)} />
				<ItemInfo title={'Rating'} description={ratingAverage} />
			</FlexContainer>
			{showOpenButton && 
				<FlexContainer style={styles.openGitHub}>
					<Pressable onPress={() => {url ? Linking.openURL(url) : console.log('No repository url provided')}}>
						<Text color='light' fontWeight={'bold'}>Open in GitHub</Text>
					</Pressable>
				</FlexContainer>
			}
		</FlexContainer>
	)
} 

export default RepositoryItem