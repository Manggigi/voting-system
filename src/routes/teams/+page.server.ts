import { getHackathonTeams } from '$lib/hackathons';

export async function load() {
	const hackathonTeams = await getHackathonTeams();

	return {
		hackathonTeams
	};
}
