import { getHackathonById } from '$lib/hackathons';

export const load = async ({ params }) => {
	const { hackathonId } = params;
	const hackathons = await getHackathonById(hackathonId);
	return { hackathon: hackathons[0] };
};
