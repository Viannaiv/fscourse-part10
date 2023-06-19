import { StyleSheet, Image, Pressable } from 'react-native'
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
		flexGrow: 1,
		flexShrink: 1
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
	}
})

const convertCount = (count) => (count/1000).toFixed(1) + 'k'

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
    ownerAvatarUrl
}) => (
    <FlexContainer style={styles.itemContainer}>
			<FlexContainer style={styles.itemDescrptionContainer}>
				<Image style={styles.image} source={{uri: ownerAvatarUrl}}/>
				<FlexContainer style={styles.itemDescription}>
					<Text fontWeight={'bold'} fontSize='subheading'>{fullName}</Text>
					<SecondaryText>{description}</SecondaryText>
					<FlexContainer style={styles.language}>
						<Pressable onPress={()=>{}}>
							<Text color='light'>{language}</Text>
						</Pressable>
					</FlexContainer>
				</FlexContainer>
			</FlexContainer>
			<FlexContainer style={styles.itemInfoContainer}>
				<ItemInfo title={'Stars'} description={convertCount(stargazersCount)}/>
				<ItemInfo title={'Forks'} description={convertCount(forksCount)}/>
				<ItemInfo title={'Reviews'} description={reviewCount}/>
				<ItemInfo title={'Rating'} description={ratingAverage}/>
			</FlexContainer>
    </FlexContainer>
) 

export default RepositoryItem