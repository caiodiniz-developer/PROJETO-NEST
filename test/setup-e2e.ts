import 'dotenv/config'

import { PrismaPg } from '@prisma/adapter-pg'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { PrismaClient } from '../src/generated/prisma/client.js'

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()
const databaseURL = generateUniqueDatabaseURL(schemaId)

process.env.DATABASE_URL = databaseURL

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseURL }, { schema: schemaId }),
})

beforeAll(async () => {
  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
