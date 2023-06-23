import { gql } from '@apollo/client'
import { REPOSITORY_FIELDS } from './fragments'

export const GET_REPOSITORIES = gql`
	${REPOSITORY_FIELDS}
  query {
    repositories {
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
	  }
  }
`
