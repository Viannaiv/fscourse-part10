import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
	const [mutate, result] = useMutation(CREATE_REVIEW)

	const createReview = async ({
		repositoryOwner,
		repositoryName,
		rating,
		reviewText
	}) => {
		console.log('Creating review: ', {repositoryOwner, repositoryName, rating, reviewText})
		const res = await mutate({ 
			variables: { 
				review: { 
					ownerName: repositoryOwner,
					repositoryName, 
					rating: Number(rating),
					text: reviewText
				}
			} 
    })
		
		return res
	}

	return [createReview, result]
}

export default useCreateReview