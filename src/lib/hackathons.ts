import { eq } from 'drizzle-orm';
import { db } from './drizzle';
import { hackathonTeams, hackathons } from './drizzle/schema';
import type { NewHackathon, NewHackathonTeams } from '$apptypes';

// TODO:
// Get hackathon details by id
// Get table of all existing hackathons and their details (low prio)

export const createHackathon = async (hackathonData: NewHackathon) => {
	await db.insert(hackathons).values(hackathonData).execute();
};

export const getHackathons = async () => {
	const hackathonsData = await db.select().from(hackathons);
	return hackathonsData;
};

export const getHackathonById = async (hackathonId: string) => {
	const hackathonData = await db
		.select()
		.from(hackathons)
		.where(eq(hackathons.id, parseInt(hackathonId)));
	return hackathonData[0];
};

export const createTeam = async (teamData: NewHackathonTeams) => {
	await db.insert(hackathonTeams).values(teamData).execute();
};

export const getFinalTeamScore = (hackathonId: string) => {
	console.log('🚀 ~ file: hackathons.ts:11 ~ getFinalTeamScore ~ hackathonId:', hackathonId);
	// TODO: calculate scores
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
