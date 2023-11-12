import { getHackathons } from '$lib/hackathons';
import { getFinalTeamScore } from '$lib/hackathonsFinalScore';

export async function load() {
	try {
		const hackathons = await getHackathons();
		const currentHackathon = hackathons.filter(
			(h) => h.name === 'Daedalus Hackathon - Season 1'
		)[0];
		const finalScores = await getFinalTeamScore(currentHackathon.id);

		return {
			hackathons,
			finalScores
		};
	} catch (error) {
		console.log(error);
	}
}
