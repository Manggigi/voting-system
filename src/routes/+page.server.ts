// import { seed } from '$lib/drizzle/seed';
import { getHackathons } from '$lib/hackathons';

export async function load() {
	const hackathons = await getHackathons();
	// await seed();

	return {
		hackathons
	};
}
