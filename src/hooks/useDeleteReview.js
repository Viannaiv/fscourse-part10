import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
	const [mutate, result] = useMutation(DELETE_REVIEW)

	const deleteReview = async ({ reviewId }) => {
		console.log(`Deleting review`)
		const res = await mutate({ variables: { deleteReviewId: reviewId} })
		
		return res
	}

	return [deleteReview, result]
}

export default useDeleteReview