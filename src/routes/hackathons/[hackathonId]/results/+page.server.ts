import { getHackathonById, getTeamsByHackathonId } from '$lib/hackathons.js';
import { getFinalTeamScore } from '$lib/hackathonsFinalScore.js';

export const load = async ({ params }) => {
	const hackathonId = params.hackathonId;
	try {
		const hackathon = await getHackathonById(hackathonId);
		const teams = await getTeamsByHackathonId(hackathonId);
		return {
			hackathon,
			teams,
			streamed: {
				finalScores: new Promise((fulfil) => {
					fulfil(getFinalTeamScore(hackathonId));
				})
			}
		};
	} catch (e) {
		console.log(e);
	}
};
