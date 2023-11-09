import { getHackathonTeams } from '$lib/hackathons';

export async function load() {
	try {
		const hackathonTeams = await getHackathonTeams();

		return {
			hackathonTeams
		};
	} catch (e) {
		console.log(e);
	}
}
