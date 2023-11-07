import type { NewHackathon } from '$apptypes';
import { db } from './drizzle';
import { hackathons } from './drizzle/schema';

export const createHackathon = async (hackathonData: NewHackathon) => {
	await db.insert(hackathons).values(hackathonData).execute();
};
