import { getHackathonById, getTeamsByHackathonId } from '$lib/hackathons.js';
import { getFinalTeamScore } from '$lib/hackathonsFinalScore.js';


export const load = async ({ params }) => {
	const hackathonId = params.hackathonId;
	try {
		const hackathon = await getHackathonById(hackathonId);
		const teams = await getTeamsByHackathonId(parseInt(hackathonId));
		const finalScores = await getFinalTeamScore(parseInt(hackathonId));
		console.log(teams.length)
		return { hackathon, teams, finalScores };
	} catch (e) {
		console.log(e);
	}
};
