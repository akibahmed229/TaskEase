import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pool: Pool = new Pool({
    connectionString: "postgresql://taskease_backend:taskease_backend123:5033",
});

export const db:NodePgDatabase = drizzle(pool);
