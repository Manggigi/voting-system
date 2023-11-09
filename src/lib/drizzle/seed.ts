import { db } from '$lib/drizzle';
import { hackathonTeams, hackathons } from './schema';

import newHackathonTeams from '$lib/data/newHackathonTeams.json';
import newHackathons from '$lib/data/newHackathons.json';
// import newUsers from '$lib/data/newUsers.json';
import type { Hackathon } from '@types';

export async function seed() {
	// Create table with raw SQL

	// const usersData = await db.select().from(users);
	// if (usersData.length === 0) {
	// 	const insertedUsers: User[] = await db.insert(users).values([]).returning();
	// 	console.log(`Seeded ${insertedUsers.length} users`);
	// }

	const hackathonsData = await db.select().from(hackathons);
	if (hackathonsData.length === 0) {
		const newHackathodsData = newHackathons.map((hackathon) => ({
			...hackathon,

			start_date: new Date(2023, 10, 11),
			end_date: new Date(2023, 10, 12)
		})) as Hackathon[];
		const insertedHackathons = await db.insert(hackathons).values(newHackathodsData).returning();
		console.log(`Seeded ${insertedHackathons.length} hackathons`);
	}

	const hackathonTeamsData = await db.select().from(hackathonTeams);
	if (hackathonTeamsData.length === 0) {
		const insertedHackathonTeams = await db
			.insert(hackathonTeams)
			.values(newHackathonTeams)
			.returning();
		console.log(`Seeded ${insertedHackathonTeams.length} hackathon teams`);
	}

	// // seed all usernames
	// const hackathonParticipantsData = await db.select().from(hackathonParticipants);
	// if (hackathonParticipantsData.length === 0) {
	// 	const insertedHackathonParticipants = await db
	// 		.insert(hackathonParticipants)
	// 		.values([])
	// 		.returning();
	// 	console.log(`Seeded ${insertedHackathonParticipants.length} hackathon participants`);
	// }

	return {};
}
