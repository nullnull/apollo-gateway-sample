import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus'
import { GraphQLDateTime } from 'graphql-iso-date'
import { Context } from './context'

export const DateTime = asNexusMethod(GraphQLDateTime, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsersServer2', {
      type: 'Server2User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      },
    })
    t.nonNull.string('server2OK', {
      resolve: (_parent, _args, context: Context) => {
        return "response from server2"
      },
    })
  }
})

const User = objectType({
  name: 'Server2User',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('email')
  },
})

export const schema = makeSchema({
  types: [
    Query,
    User,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
