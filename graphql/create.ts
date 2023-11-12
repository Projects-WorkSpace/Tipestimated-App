export const GetChannelsAndGroups = gql`
  query AllChannelsAndGroups($tipsterId: ID!) {
    allChannels(tipsterId: $tipsterId) {
      edges {
        node {
          id
          name
          isPrivate
          followerCount
          iconUrl
        }
      }
    }
    allGroups(tipsterId: $tipsterId) {
      edges {
        node {
          id
          name
          isPrivate
          followerCount
          iconUrl
        }
      }
    }
  }
`;

export const CreatePost = gql`
  mutation CreatePost($postData: CreatePredictionPostInput!) {
    createPost(postData: $postData) {
      success
      errors
      predictedPost {
        id
        createdAt
      }
    }
  }
`;
