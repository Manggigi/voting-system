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
	let judgeVotesData: number;
	let judgeVotesDataBuffer = [];

	let output = [];
	for (let i = 0; i < teamData.length; i++) {
		teamIdBuffer = teamData[i].hackathon_teams?.id!;
		judgeVotesDataBuffer = await getJudgeVotesByHackathonId(hackathonId, teamIdBuffer!);
		judgeVotesData = 0;
		
		for (let j = 0; j < judgeVotesDataBuffer.length; j++) {
			judgeVotesData += judgeVotesDataBuffer[j].score;
		}

		userVotesDataBuffer = await getUserVotesByHackathonId(hackathonId, teamIdBuffer!);

        let weightedCommunityVotes = (userVotesDataBuffer.length / (numberOfCommunityVoters - numberOfJudges)) * communityWeight;
        let weightedJudgeVotes = ((judgeVotesData) / (numberOfJudges * maxScorePerJudge)) * judgeWeight;

		output[i] = {
			teamName: teamData[i].hackathon_teams?.name,
			communityVotes: userVotesDataBuffer.length,
			judgeVotes: judgeVotesData,
            weightedCommunityVotes: weightedCommunityVotes,
			weightedJudgeVotes: weightedJudgeVotes,
            finalScore: weightedCommunityVotes + weightedJudgeVotes
		}
	}

	teamIdBuffer = 0;
	return {
		output
	}
};