import { getHackathonById, getTeamsByHackathonId } from '$lib/hackathons.js';
import { getFinalTeamScore } from '$lib/hackathonsFinalScore.js';

export const load = async ({ params }) => {
	const hackathonId = params.hackathonId;
	try {
		const hackathon = await getHackathonById(hackathonId);
		const teams = await getTeamsByHackathonId(hackathonId);
		const finalScores = await getFinalTeamScore(hackathonId);
		return { hackathon, teams, finalScores };
	} catch (e) {
		console.log(e);
	}
};
