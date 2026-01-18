import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable is not set. " +
    "Please add it to your Vercel project settings: " +
    "Project Settings > Environment Variables > Add DATABASE_URL"
  );
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
