// import { seed } from '$lib/drizzle/seed';
import { getHackathons } from '$lib/hackathons';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	try {
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
	} catch (e) {
		console.log(e);
	}
}) satisfies LayoutServerLoad;
