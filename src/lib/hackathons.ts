import type { NewHackathon } from '$apptypes';
import { db } from './drizzle';
import { eq } from "drizzle-orm"
import { hackathons } from './drizzle/schema';

// TODO: 
// Get hackathon details by id
// Get table of all existing hackathons and their details (low prio)

export const createHackathon = async (hackathonData: NewHackathon) => {
	await db.insert(hackathons).values(hackathonData).execute();
};

export const getHackathons = async () => {
	const output = await db.select({
		id: hackathons.id,
		name: hackathons.name,
		description: hackathons.description,
		created_at: hackathons.created_at,
		updated_at: hackathons.updated_at
	}).from(hackathons);

	return output;
};

export const getHackathonById = async (idParameter: number) => { // Returns null if no hackathon with selected id exists.
	const output = await db.select({
		id: hackathons.id,
		name: hackathons.name,
		description: hackathons.description,
		created_at: hackathons.created_at,
		updated_at: hackathons.updated_at
	})
	.from(hackathons)
	.where(eq(hackathons.id, idParameter));

	return output;
}

export const getFinalTeamScore = (hackathonId: string) => {
	console.log('🚀 ~ file: hackathons.ts:11 ~ getFinalTeamScore ~ hackathonId:', hackathonId);
	// get user_votes
	// const userVotesData = db
	// 	.select()
	// 	.from(userVotes)
	// 	.where(eq(userVotes.hackathon_id, hackathonId))
	// 	.execute();
	// // get judges_votes
	// const judgesVotesData = db
	// 	.select()
	// 	.from(judgeVotes)
	// 	.where(eq(userVotes.hackathon_id, hackathonId))
	// 	.execute();

	// calculate final score

	return {
		team1Id: {
			hackathonTeamName: 'team1',
			finalScore: 80,
			communityScore: 10,
			judgesScore: 70
		},
		team2Id: {
			hackathonTeamName: 'team2',
			finalScore: 80,
			communityScore: 10,
			judgesScore: 70
		},
		team3Id: {
			hackathonTeamName: 'team3',
			finalScore: 80,
			communityScore: 10,
			judgesScore: 70
		}
	};
};
