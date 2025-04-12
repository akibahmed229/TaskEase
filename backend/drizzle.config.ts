import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/sechema.ts',
  out: './drizzle',
  dbCredentials: {
    host: 'localhost',
    port: 5033,
    database: 'taskease',
    user: 'taskease_backend',
    password: 'taskease_backend123',
    ssl: false,
  },
})
