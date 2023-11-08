export const GetChannelsAndGroups = gql`
  query AllChannelsAndGroups {
    allChannels(tipsterId: "VGlwc3RlclR5cGU6MQ==") {
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
    allGroups(tipsterId: "VGlwc3RlclR5cGU6MQ==") {
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
