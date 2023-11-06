import { db } from '$lib/drizzle';
import type { NewUser, User } from '$apptypes';
import { users } from './schema';

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

	const insertedUsers: User[] = await db.insert(users).values(newUsers).returning();
	console.log(`Seeded ${insertedUsers.length} users`);

	return {
		insertedUsers
	};
}
