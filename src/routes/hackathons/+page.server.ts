import { getHackathons } from '$lib/hackathons';

export async function load() {
	const hackathons = await getHackathons();

	return {
		hackathons
	};
}
