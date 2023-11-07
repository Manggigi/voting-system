import type { NewUser } from '$apptypes';
import { eq } from 'drizzle-orm';
import { db } from './drizzle';
import { hackathonJudges, hackathons, users } from './drizzle/schema';

// get list of all hackathons
// get hackathon info by id (getHackathonById(hackathons.id))
// get hackathon team by id
// create new hackathon
// create new hackathon team
// derived table
// 	team_id REFERENCES hacakthon_team(id)
//	final_score total_votes *

// team_id		hackathon_id		judge_score		community_score
// 2			1
// 3			1
// 4			1

// final team score will be computed by the server. Use getFinalTeamScore() in hackathons.ts for that.
// 	returns object {
//
//	}
// hard code weights into function at hackathons.ts
//

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