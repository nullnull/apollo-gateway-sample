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

export const DateTime = asNexusMethod(GraphQLDateTime, 'date')

export const schema = makeSchema({
  types: [],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
})
