import { getHackathonById } from '$lib/hackathons';

export const load = async ({ params }) => {
	const { hackathonId } = params;
	const hackathon = await getHackathonById(hackathonId);
	return { hackathon };
};
