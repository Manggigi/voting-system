import { getHackathonJudges } from '$lib/hackathons';

export async function load() {
	const hackathonJudges = await getHackathonJudges();
	// getUsersData
	return {
		hackathonJudges
	};
}
