// import { seed } from '$lib/drizzle/seed';
import { getHackathons } from '$lib/hackathons';

export async function load() {
	// const currentUser = event.locals.user || null;
	const hackathons = await getHackathons();
	// await seed();

	return {
		// currentUser,
		hackathons
	};
}
