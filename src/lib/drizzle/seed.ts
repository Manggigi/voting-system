import { db } from '$lib/drizzle';
import type { NewUser, User } from '$apptypes';
import { hackathons, users } from './schema';

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

	const usersData = await db.select().from(users);
	if (usersData.length === 0) {
		const insertedUsers: User[] = await db.insert(users).values(newUsers).returning();
		console.log(`Seeded ${insertedUsers.length} users`);
	}

	const hackathonsData = await db.select().from(hackathons);
	if (hackathonsData.length === 0) {
		const insertedHackathons = await db
			.insert(hackathons)
			.values([
				{
					name: 'Daedalus Hackathon - Season 1',
					description: `Hackathon Voting System
					- A squad is composed of 3-5 members. Squad composition is carefully selected by the judging committee based on each individual’s skill level.
- Choose your Squad Lead/Captain!
- Have fun!`,
					status: 'NEW',
					start_date: new Date(2023, 10, 11),
					end_date: new Date(2023, 10, 12)
				}
			])
			.returning();
		console.log(`Seeded ${insertedHackathons.length} hackathons`);
	}

	return {};
}
