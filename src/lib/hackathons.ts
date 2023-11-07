import type { NewHackathon } from '$apptypes';
import { db } from './drizzle';
import { hackathons } from './drizzle/schema';

export const createHackathon = async (hackathonData: NewHackathon) => {
	await db.insert(hackathons).values(hackathonData).execute();
};

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
