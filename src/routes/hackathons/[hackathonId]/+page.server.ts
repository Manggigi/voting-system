import { getHackathonById } from '$lib/hackathons';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	if (!locals.user) throw redirect(307, '/login/discord');
	const { hackathonId } = params;
	try {
		const hackathon = await getHackathonById(hackathonId);
		return { hackathon };
	} catch (e) {
		console.log(e);
	}
};
