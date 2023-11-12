import { getHackathons } from '$lib/hackathons';
import { getFinalTeamScore } from '$lib/hackathonsFinalScore';

export const ssr = true;
export async function load() {
	const hackathons = await getHackathons();
	const currentHackathon = hackathons.filter((h) => h.name === 'Daedalus Hackathon - Season 1')[0];
	return {
		hackathon: currentHackathon,
		streamed: {
			finalScores: new Promise((fulfil) => {
				fulfil(getFinalTeamScore(currentHackathon.id));
			})
		}
	};
}
