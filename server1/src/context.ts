import { PrismaClient } from '@prisma/client'

export interface Context {
  prisma: PrismaClient
  userId?: string
}

const prisma = new PrismaClient()

export const context: Context = {
  prisma: prisma,
}
