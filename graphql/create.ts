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
  mutation CreatePost($createPost: CreatePredictionPostInput!) {
    createPost(
      postData: {
        tipsterId: "VGlwc3RlclR5cGU6MQ=="
        channelId: []
        groupId: []
        postItems: {
          eventId: "nea6yvAJ"
          sport: "SOCCER"
          country: "England"
          leagueName: "Premier League"
          startTime: 1699839114
          homeName: "Liverpool"
          homeImage: "https://www.flashscore.com/res/image/data/vwC9RGhl-Imx2oQd8.png"
          awayName: "Everton"
          awayImage: "https://www.flashscore.com/res/image/data/EwJqZUZA-bRmKmISE.png"
          predictionName: "Full Time Result"
          predictionValue: "1"
          odds: 2.45
          bookmaker: "Bet365"
          bookmakerImg: "https://cdn.soccersapi.com/images/soccer/bookmakers/2.png"
        }
      }
    ) {
      success
      errors
      predictedPost {
        id
        createdAt
      }
    }
  }
`;
