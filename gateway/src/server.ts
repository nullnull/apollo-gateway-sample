import { ApolloGateway } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server'

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'server1', url: 'http://localhost:4000/' },
    // Define additional services here
  ],
})

const server = new ApolloServer({
  gateway,
  subscriptions: false,
})

server.listen(3000).then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `)
})
