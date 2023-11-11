// import { seed } from '$lib/drizzle/seed';
import { getHackathonById, getHackathons } from '$lib/hackathons';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// await seed();
	const hackathons = await getHackathons();
	// TODO: get nearest start_date hackathon
	const foo = hackathons.filter((h) => h.name === 'Daedalus Hackathon - Season 2')[0];
	const hackathon = await getHackathonById(foo.id);

	if (locals.user) {
		return {
			hackathon,
			user: locals.user,
			hackathons
		};
	}
}) satisfies LayoutServerLoad;
