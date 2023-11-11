// import { seed } from '$lib/drizzle/seed';
import { getHackathonById, getHackathons } from '$lib/hackathons';
import type { Hackathon } from '@types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// await seed();
	let hackathons: Hackathon[] = [];
	let hackathon: Hackathon | null = null;

	try {
		hackathons = await getHackathons();
		// TODO: get nearest start_date hackathon
		const currentHackathon = hackathons.filter(
			(h) => h.name === 'Daedalus Hackathon - Season 2'
		)[0];
		hackathon = await getHackathonById(currentHackathon.id);
	} catch (error) {
		console.log(error);
	}

	if (locals.user) {
		return {
			hackathon,
			user: locals.user,
			hackathons
		};
	}

	return {
		hackathon,
		hackathons
	};
}) satisfies LayoutServerLoad;
