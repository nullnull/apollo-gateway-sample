import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { context } from './context'
import { transformSchemaFederation } from 'graphql-transform-federation'

const loggerPlugin = {

  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext) {
    console.log('Request started! Query:\n' +
      requestContext.request.query);

    return {

      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      parsingDidStart(requestContext) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      validationDidStart(requestContext) {
        console.log('Validation started!');
      },

    }
  },
};

const federatedSchema = transformSchemaFederation(schema, {})

const server = new ApolloServer({
  schema: federatedSchema,
  context: context,
  plugins: [
    loggerPlugin
  ]
})

server.listen(4001).then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `)
})
