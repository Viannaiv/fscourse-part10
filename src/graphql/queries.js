import { gql } from '@apollo/client'
import { REPOSITORY_FIELDS } from './fragments'

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
  query {
    me {
			id
			username
	  }
  }
`

export const GET_REPOSITORY = gql`
	${REPOSITORY_FIELDS}
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
			...RepositoryFields
			url
			reviews {
				edges {
					node {
						id
						text
						rating
						createdAt
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
