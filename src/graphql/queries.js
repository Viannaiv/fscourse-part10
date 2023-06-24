import { gql } from '@apollo/client'
import { REPOSITORY_FIELDS, REVIEW_FIELDS } from './fragments'

export const GET_REPOSITORIES = gql`
	${REPOSITORY_FIELDS}
  query repositories(
		$orderBy: AllRepositoriesOrderBy,
		$orderDirection: OrderDirection,
		$searchKeyword: String
	) {
    repositories(
			orderBy: $orderBy,
			orderDirection: $orderDirection,
			searchKeyword: $searchKeyword
		) {
			edges {
				node {
					...RepositoryFields
				}
			}
    }
  }
`

export const GET_USER = gql`
	${REVIEW_FIELDS}
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						...ReviewFields
						repository {
							id
							fullName
						}
					}
				}
			}
	  }
  }
`

export const GET_REPOSITORY = gql`
	${REPOSITORY_FIELDS}
	${REVIEW_FIELDS}
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
			...RepositoryFields
			url
			reviews {
				edges {
					node {
						...ReviewFields
						user {
							id
							username
						}
					}
				}
			}
	  }
  }
`
