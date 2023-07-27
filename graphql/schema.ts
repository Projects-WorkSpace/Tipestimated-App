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
