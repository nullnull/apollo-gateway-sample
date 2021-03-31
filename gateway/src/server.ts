import { ApolloServer } from 'apollo-server'
import { schema } from './schema'

const server = new ApolloServer({
  schema: schema,
})

server.listen(3000).then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `)
})
