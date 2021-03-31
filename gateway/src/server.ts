import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server'

const getUserId = (token: string) => {
  return 1
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }: { request: any, context: any }) {
    // Pass the user's id from the context to underlying services
    // as a header called `user-id`
    request.http.headers.set('user-id', context.userId);
  }
}

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'server1', url: 'http://localhost:4000/' },
    { name: 'server2', url: 'http://localhost:4001/' },
    // Define additional services here
  ],
  buildService({ name, url }) {
    return new AuthenticatedDataSource({ url });
  },
})

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    console.log(req.headers);
    
    // Get the user token from the headers
    const token = req.headers.authorization || '';
    // Try to retrieve a user with the token
    const userId = getUserId(token);
    // Add the user ID to the context
    return { userId };
  },
})

server.listen(3000).then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `)
})
