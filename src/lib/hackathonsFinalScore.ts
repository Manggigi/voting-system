import {
	getTeamsByHackathonId,
	getJudgeVotesByHackathonId,
	getUserVotesByHackathonId,
	getJudgesByHackathonId,
	getAlltUserVotesInHackathon
} from './hackathons';
import { getJudges, getUsers } from './users';

export const getFinalTeamScore = async (hackathonId: number) => {
	console.log('🚀 ~ file: hackathons.ts:11 ~ getFinalTeamScore ~ hackathonId:', hackathonId);

	const teamData = await getTeamsByHackathonId(hackathonId);
	let teamIdBuffer: number;
	let userVotesDataBuffer: any;
	let y = await getAlltUserVotesInHackathon(hackathonId);
	let numberOfCommunityVoters = y.length;
	let x = await getJudgesByHackathonId(hackathonId);
	let numberOfJudges = x.length;

	const communityWeight = 20;
	const judgeWeight = 80;
	const maxScorePerJudge = 25;
	let judgeVotesDataBuffer: number;
	let judgeVotesData = [];

	let scoreData = [];
	for (let i = 0; i < teamData.length; i++) {
		teamIdBuffer = teamData[i].hackathon_teams?.id!;
		judgeVotesData = await getJudgeVotesByHackathonId(hackathonId, teamIdBuffer!);
		judgeVotesDataBuffer = 0;

		for (let j = 0; j < judgeVotesData.length; j++) {
			judgeVotesDataBuffer += judgeVotesData[j].score;
		}

		userVotesDataBuffer = await getUserVotesByHackathonId(hackathonId, teamIdBuffer!);

		let weightedCommunityVotes =
			(userVotesDataBuffer.length / (numberOfCommunityVoters)) * communityWeight;
		let weightedJudgeVotes =
			(judgeVotesDataBuffer / (numberOfJudges * maxScorePerJudge)) * judgeWeight;

		if (Number.isNaN(weightedCommunityVotes)) weightedCommunityVotes = 0;
		if (Number.isNaN(weightedJudgeVotes)) weightedJudgeVotes = 0;

		let finalScore = weightedCommunityVotes + weightedJudgeVotes
		scoreData[i] = {
			teamName: teamData[i].hackathon_teams?.name,
			communityVotes: userVotesDataBuffer.length,
			judgeVotes: judgeVotesDataBuffer,
			weightedCommunityVotes: weightedCommunityVotes,
			weightedJudgeVotes: weightedJudgeVotes,
			finalScore: finalScore
		};
	}

	teamIdBuffer = 0;
	for (let i = 0; i < scoreData.length; i++) {
		console.log(scoreData[i].finalScore)
	}
	return {
		scoreData
	};
};
