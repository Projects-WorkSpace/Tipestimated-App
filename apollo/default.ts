import { defineApolloClient } from '@nuxtjs/apollo'

export default defineApolloClient({
  httpEndpoint: process.env.NUXT_GRAPHQL_ENDPOINT as string,
  httpLinkOptions: {
    credentials: 'same-origin'
  },
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  },
  // LocalStorage token
  tokenName: 'auth-token',
  websocketsOnly: false,
  cookieAttributes: {
    sameSite: true,
  }
})
