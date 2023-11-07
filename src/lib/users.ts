import type { NewUser } from '$apptypes';
import { eq } from 'drizzle-orm';
import { db } from './drizzle';
import { hackathonJudges, hackathons, users } from './drizzle/schema';

export const createUser = async (userData: NewUser) => {
	db.insert(users).values(userData).execute();
};

export const getUsers = async () => {
	const usersData = await db.select().from(users);
	return usersData;
};

export const getUserById = async (idParameter: number) => {
	const usersData = await db.select().from(users).where(eq(users.id, idParameter));
	return usersData;
};

export const getJudges = async () => {
	const output = await db
		.select()
		.from(hackathonJudges)
		.innerJoin(hackathons, eq(hackathons.id, hackathonJudges.hackathon_id))
		.innerJoin(users, eq(users.id, hackathonJudges.user_id));

	return output;
};

export const deleteUser = async (idParameter: number) => {
	await db.delete(users).where(eq(users.id, idParameter));
};
