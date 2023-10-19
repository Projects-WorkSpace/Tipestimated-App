export const HomePageDataForUser = gql`
query PredictionPosts($userId: ID) {
    tipsterFollowers(userId: $userId, first: 2) {
        edges {
            node {
                id
                tipsterId {
                    id
                    penName
                }
            }
        }
    }
    predictionPosts {
        edges {
            node {
                id
                createdAt
                likes
                isLikedByMe
                tipsterId {
                    penName
                    id
                    telegramLink
                    socialLink
                    imageUrl
                    isFollowedByUser
                    followerCount
                    user {
                        userName
                    }
                }
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
                            bookmaker
                            bookmakerImg
                            odds
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

export const HomePageDataForAnonymousUser = gql`
query PredictionPosts {
    predictionPosts {
        edges {
            node {
                id
                createdAt
                likes
                isLikedByMe
                tipsterId {
                    penName
                    id
                    telegramLink
                    socialLink
                    imageUrl
                    isFollowedByUser
                    followerCount
                    user {
                        userName
                    }

                }
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
                            bookmaker
                            bookmakerImg
                            odds
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

