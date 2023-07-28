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