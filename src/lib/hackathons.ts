import { eq } from 'drizzle-orm';
import { db } from './drizzle';
import { hackathons } from './drizzle/schema';

export const getHackathons = async () => {
	const hackathonsData = await db.select().from(hackathons);
	return hackathonsData;
};

export const getHackathonById = async (hackathonId: string) => {
	const hackathon = await db
		.select()
		.from(hackathons)
		.where(eq(hackathons.id, parseInt(hackathonId)));
	return hackathon;
};
