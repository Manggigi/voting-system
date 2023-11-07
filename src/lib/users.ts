import type { NewUser } from '$apptypes';
import { eq } from 'drizzle-orm';
import { db } from './drizzle';
import { hackathonJudges, hackathons, users } from './drizzle/schema';

export const createUser = async (userData: NewUser) => {
	db.insert(users).values(userData).execute();
};

export const getUsers = async () => {
	const output = await db.select({
		id: users.id,
		name: users.name,
		username: users.username,
		avatar: users.avatar,
		created_at: users.created_at
	}).from(users);

	return output;
};

export const getUserById = async (idParameter: number) => {
	const output = await db.select({
		id: users.id,
		name: users.id,
		username: users.username,
		created_at: users.created_at
	})
	.from(users)
	.where(eq(users.id, idParameter));

	return output; // Might be a good idea to go with output[0] in case we screw up somewhere down the line.
}

export const getJudges = async () => {
	const output = await db.select({
		id: users.id,
		name: users.name,
		username: users.username,
		avatar: users.avatar
	})
	.from(hackathonJudges)
	.innerJoin(hackathons, eq(hackathons.id, hackathonJudges.hackathon_id))
	.innerJoin(users, eq(users.id, hackathonJudges.user_id));

	return output;
};

export const deleteUser = async (idParameter: number) => {
	const output = await db.delete(users)
	.where(eq(users.id, idParameter));
};