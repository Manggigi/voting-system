import { sql } from '@vercel/postgres';
import { db } from './drizzle';
import { UsersTable } from './drizzle';
import type { NewUser, User } from '$apptypes';

const newUsers: NewUser[] = [
	{
		name: 'Guillermo Rauch',
		username: 'rauchg',
		avatar: 'https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg'
	},
	{
		name: 'Lee Robinson',
		username: 'lee',
		avatar: 'https://pbs.twimg.com/profile_images/1587647097670467584/adWRdqQ6_400x400.jpg'
	},
	{
		name: 'Steven Tey',
		username: 'stey',
		avatar: 'https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg'
	},
	{
		name: 'Tim Neutkens',
		username: 'timneutkens',
		avatar: 'https://pbs.twimg.com/profile_images/1435507969880527872/8jXw1IHR_400x400.jpg'
	}
];

export async function seed() {
	// Create table with raw SQL
	const createTable = await sql.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        avatar VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `);
	console.log(`Created "users" table`);

	const insertedUsers: User[] = await db.insert(UsersTable).values(newUsers).returning();
	console.log(`Seeded ${insertedUsers.length} users`);

	return {
		createTable,
		insertedUsers
	};
}
