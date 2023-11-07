import { getHackathonById } from '$lib/hackathons.js';

export const load = async ({ params }) => {
	const hackathonId = params.hackathonId;
	const hackathon = await getHackathonById(hackathonId);
	return { hackathon };
};
