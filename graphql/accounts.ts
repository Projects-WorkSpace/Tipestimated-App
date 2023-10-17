export const ExpiredPredictedPosts = gql`
query ExpiredPredictedPosts($tipsterId: ID) {
    expiredPredictedPosts(tipsterId: $tipsterId) {
        edges {
            node {
                id
                createdAt
                likes
                isLikedByMe
                predictionpostitemSet {
                    edges {
                        node {
                            id
                            eventId
                            sport
                            country
                            leagueName
                            startTime
                            homeName
                            homeImage
                            awayName
                            awayImage
                            predictionName
                            predictionValue
                            odds
                            bookmaker
                            bookmakerImg
                            win
                            resultValue
                        }
                    }
                }
            }
        }
    }
}
`
export const ActivePredictedPosts = gql`
query ActivePredictedPosts($tipsterId: ID) {
    activePredictedPosts(tipsterId: $tipsterId) {
        edges {
            node {
                id
                createdAt
                likes
                isLikedByMe
                predictionpostitemSet {
                    edges {
                        node {
                            id
                            eventId
                            sport
                            country
                            leagueName
                            startTime
                            homeName
                            homeImage
                            awayName
                            awayImage
                            predictionName
                            predictionValue
                            odds
                            bookmaker
                            bookmakerImg
                            win
                            resultValue
                        }
                    }
                }
            }
        }
    }
}
`

export const GetTipster = gql`
query GetTipster($tipsterId: ID!){
    getTipster(id: $tipsterId) {
        id
        penName
        country
        favoriteSport
        otherSport
        telegramLink
        socialLink
        isApproved
        imageUrl
        followerCount
        isFollowedByUser
        user {
            id
            userName
        }
    }
}
`

export const FollowTipster = gql`
mutation FollowTipster($tipsterId: ID!, $userId: ID!) {
    followTipster(
        data: { tipsterId: $tipsterId, userId: $userId }
    ) {
        errors
        follower {
            id
        }
    }
}
`

export const UnFollowTipster = gql`
mutation UnFollowTipster($tipsterId: ID!, $userId: ID!)  {
    unFollowTipster(
        data: { tipsterId: $tipsterId, userId: $userId }
    ) {
        success
        errors
    }
}
`

export const LikePost = gql`
mutation LikePost($postId: ID!, $userId: ID!) {
    likePost(postId: $postId, userId: $userId) {
        success
        predictionPostLike {
            id
        }
        liked
    }
}
`
