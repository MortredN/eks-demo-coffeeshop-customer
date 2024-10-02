import { defineConfig } from 'drizzle-kit'

if (!process.env.DB_URL) {
  throw new Error('PostgreSQL DB credentials error')
}

export default defineConfig({
  schema: './db/schema.js',
  out: './db/migrations',
  dbCredentials: {
    url: process.env.DB_URL
  },
  dialect: 'postgresql'
})
