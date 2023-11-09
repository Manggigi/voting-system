// import { seed } from '$lib/drizzle/seed';
import { getHackathons } from '$lib/hackathons';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const hackathons = await getHackathons();
	// await seed();
	if (locals.user) {
		return {
			user: locals.user,
			hackathons
		};
	}

	return {
		hackathons
	};
}) satisfies LayoutServerLoad;
