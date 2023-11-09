import { getTeamsByHackathonId, getJudgeVotesByHackathonId, getUserVotesByHackathonId } from "./hackathons";
import { getJudges, getUsers } from "./users";

export const getFinalTeamScore = async (hackathonId: number) => {
	console.log('🚀 ~ file: hackathons.ts:11 ~ getFinalTeamScore ~ hackathonId:', hackathonId);

	const teamData = await getTeamsByHackathonId(hackathonId);
	let teamIdBuffer: number;
	let userVotesDataBuffer: any;
	let y = await getUsers();
    let numberOfCommunityVoters = y.length;
    let x = await getJudges(hackathonId);
	let numberOfJudges = x.length;
	const communityWeight = 20;
	const judgeWeight = 80;
	const maxScorePerJudge = 5;
	let userVoterList = [];
	let userVotesData = [];
	let judgeVoterList = [];
	let judgeVotesData = [];
	let judgeVotesDataBuffer: any;
	let totalJudgeVotesData: any;
	let output = [];
	for (let i = 0; i < teamData.length; i++) {
		// For every team participating in the hackathon, i, get the weighted sum of all user votes
		// and add this sum to the weighted sum of all judge.score to get the final score.
		teamIdBuffer = teamData[i].hackathon_teams?.id!;
		judgeVotesDataBuffer = await getJudgeVotesByHackathonId(hackathonId, teamIdBuffer!);
		judgeVotesData[i] = 0;
		
		for (let j = 0; j < judgeVotesDataBuffer.length; j++) {
			judgeVotesData[i] += judgeVotesDataBuffer[j].score;
		}

		userVotesDataBuffer = await getUserVotesByHackathonId(hackathonId, teamIdBuffer!);

        let weightedCommunityVotes = (userVotesDataBuffer.length / (numberOfCommunityVoters - numberOfJudges)) * communityWeight;
        let weightedJudgeVotes = ((judgeVotesData[i]) / (numberOfJudges * maxScorePerJudge)) * judgeWeight;

		output[i] = {
			teamName: teamData[i].hackathon_teams?.name,
			communityVotes: userVotesDataBuffer.length,
			judgeVotes: judgeVotesData[i],
            weightedCommunityVotes: weightedCommunityVotes,
			weightedJudgeVotes: weightedJudgeVotes,
            finalScore: weightedCommunityVotes + weightedJudgeVotes
		}
		
		// I don't think garbage collection will work within this loop so this here frees up the whole array:
		judgeVotesData = []; // Nvm I'll jsut turn this into another buffer variable
	}

	// const userVotesData = await getUserVotesByHackathonId(hackathonId, hackathonTeam);
	// const judgeVotesData = await getJudgeVotesByHackathonId(hackathonId, hackathonTeam);

	// let totalJudgeVotesData = 0; // Array.reduce() works too.
	// for (let i = 0; i < judgeVotesData.length; i++) {
	// 	totalJudgeVotesData += judgeVotesData[i].score;
	// }



	teamIdBuffer = 0;
	return {
		output
	}
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

	// return {
	// 	team1Id: {
	// 		hackathonTeamName: 'team1',
	// 		finalScore: 80,
	// 		communityScore: 10,
	// 		judgesScore: 70
	// 	},
	// 	team2Id: {
	// 		hackathonTeamName: 'team2',
	// 		finalScore: 80,
	// 		communityScore: 10,
	// 		judgesScore: 70
	// 	},
	// 	team3Id: {
	// 		hackathonTeamName: 'team3',
	// 		finalScore: 80,
	// 		communityScore: 10,
	// 		judgesScore: 70
	// 	}
	// };
};