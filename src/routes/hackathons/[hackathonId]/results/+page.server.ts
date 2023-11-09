import { getHackathonById } from '$lib/hackathons.js';

export const load = async ({ params }) => {
	const hackathonId = params.hackathonId;
	try {
		const hackathon = await getHackathonById(hackathonId);
		return { hackathon };
	} catch (e) {
		console.log(e);
	}
};
