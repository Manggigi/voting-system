import type { UserVote } from '@types';
import {
	getTeamsByHackathonId,
	getJudgeVotesByHackathonId,
	getUserVotesByHackathonId,
	getJudgesByHackathonId,
	getAlltUserVotesInHackathon
} from './hackathons';

export const getFinalTeamScore = async (hackathonId: number) => {
	console.log('🚀 ~ file: hackathons.ts:11 ~ getFinalTeamScore ~ hackathonId:', hackathonId);

	const teamData = await getTeamsByHackathonId(hackathonId);
	let teamIdBuffer: number | undefined = undefined;
	let userVotesDataBuffer: UserVote[] = [];
	const y = await getAlltUserVotesInHackathon(hackathonId);
	const numberOfCommunityVoters = y.length;
	const x = await getJudgesByHackathonId(hackathonId);
	const numberOfJudges = x.length;

	const communityWeight = 20;
	const judgeWeight = 80;
	const maxScorePerJudge = 25;
	let judgeVotesDataBuffer: number;
	let judgeVotesData = [];

	const scoreData = [];
	for (let i = 0; i < teamData.length; i++) {
		if (teamData[i].hackathon_teams) {
			teamIdBuffer = teamData[i].hackathon_teams?.id;
		} else {
			// Set a default value for teamIdBuffer
			teamIdBuffer = undefined;
		}

		// teamIdBuffer = teamData[i].hackathon_teams?.id!;
		judgeVotesData = await getJudgeVotesByHackathonId(hackathonId, teamIdBuffer!);
		judgeVotesDataBuffer = 0;

		for (let j = 0; j < judgeVotesData.length; j++) {
			judgeVotesDataBuffer += judgeVotesData[j].score;
		}

		userVotesDataBuffer = await getUserVotesByHackathonId(hackathonId, teamIdBuffer!);

		let weightedCommunityVotes =
			(userVotesDataBuffer.length / numberOfCommunityVoters) * communityWeight;
		let weightedJudgeVotes =
			(judgeVotesDataBuffer / (numberOfJudges * maxScorePerJudge)) * judgeWeight;

		if (Number.isNaN(weightedCommunityVotes)) weightedCommunityVotes = 0;
		if (Number.isNaN(weightedJudgeVotes)) weightedJudgeVotes = 0;

		const finalScore = weightedCommunityVotes + weightedJudgeVotes;
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
		console.log(scoreData[i].finalScore);
	}
	return {
		scoreData
	};
};
