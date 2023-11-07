import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	schema: './src/lib/drizzle/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!
	}
} satisfies Config;
