import { getHackathonTeams } from '$lib/hackathons';

export async function load({ parent }) {
	const { hackathons } = await parent();
	try {
		const hackathonTeams = await getHackathonTeams();

		return {
			hackathons,
			hackathonTeams
		};
	} catch (e) {
		console.log(e);
	}
}
