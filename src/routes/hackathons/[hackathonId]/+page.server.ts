import { getHackathonById } from '$lib/hackathons';

export const load = async ({ params }) => {
	const { hackathonId } = params;
	try {
		const hackathon = await getHackathonById(hackathonId);
		return { hackathon };
	} catch (e) {
		console.log(e);
	}
};
