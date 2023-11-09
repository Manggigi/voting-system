import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schemas from './schema';
import { DATABASE_URL } from '$env/static/private';

export const queryClient = postgres(DATABASE_URL);

// Connect to Vercel Postgres
export const db = drizzle(queryClient, {
	schema: {
		...schemas
	}
});
