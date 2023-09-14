export const ObtainToken = gql`
	mutation tokenAuth($email: String!, $password: String!) {
		tokenAuth(email: $email, password: $password) {
			refreshExpiresIn
			token
			payload
			refreshToken
		}
	}
`;
export const RegisterAppUser = gql`
	mutation RegisterAppUser($email: String!, $userName: String!, $dob: Date!, $password1: String!, $password2: String!) {
		registerAppUser(input: { email: $email, userName: $userName, dob: $dob, password1: $password1, password2: $password2 }) {
			token
			payload
			clientMutationId
			errors {
				field
				messages
			}
			user {
				id
				userName
				email
				dob
				dateJoined
			}
		}
	}
`;

export const SignupTipster = gql`
mutation SignupTipster($penName: String!, $country: String, $favoriteSport: String!, $otherSport: String!, $telegramLink: String!, $socialLink: String!) {
  signupTipster(
    inputData: {
      penName: $penName, country: $country, favoriteSport: $favoriteSport, otherSport: $otherSport, telegramLink: $telegramLink, socialLink: $socialLink
    }
  ) {
    errors
    success
    tipster {
      id
      penName
      country
      favoriteSport
      otherSport
      telegramLink
      socialLink
      image
      isApproved
      createdAt
    }
	encodedId
  }
}
`
export const GetTipsterByUser = gql`
  query GetTipsterByUser {
    getTipsterByUser {
      id
      penName
      isApproved
      createdAt
    }
  }
`

export const AllSports = gql`
  query AllSports {
    allSports {
      edges {
        node {
          name
          icon
        }
      }
    }
  }
`

export const VerifyToken = gql`
mutation VerifyToken($token: String!) {
  verifyToken(token: $token) {
    payload
  }
}
`

export const Viewer = gql`
query Viewer($token: String!) {
  viewer(token: $token) {
    id
    email
    userName
  }
}
`

export const GetMoreUserData = gql`
query GetMoreUserData($first: Int!, $userId: ID) {
    tipsterFollowers(first: $first, userId: $userId) {
        edges {
            node {
                tipsterId {
                    id
                    penName
                }
                id
            }
        }
    }
    allTipsters(userId: $userId) {
        edges {
            node {
                id
                penName
            }
        }
    }
}
`

export const TipsterFollowers = gql`
query TipsterFollowers($first: Int, $penName: String) {
    allTipsters(first: $first, penName_Icontains: $penName) {
        edges {
            node {
                id
                penName
                country
                favoriteSport
                imageUrl
                createdAt
                followerCount
                isFollowedByUser
            }
        }
    }
}
`

export const FollowTipsterMutation = gql`
mutation FollowTipster($userId: ID!, $tipsterId: ID!) {
    followTipster(
        input: {userId: $userId, tipsterId: $tipsterId}
    ) {
        errors
        followers {
            id
            createdAt
        }
    }
}
`

export const UnFollowTipsterMutation = gql`
mutation UnFollowTipster($userId: ID!, $tipsterId: ID!) {
    unFollowTipster(
        input: {userId: $userId, tipsterId: $tipsterId}
    ) {
        errors
        success
    }
}
`

