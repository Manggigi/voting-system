import { getHackathonJudges } from '$lib/hackathons';

export async function load() {
	try {
		const hackathonJudges = await getHackathonJudges();

		return {
			hackathonJudges
		};
	} catch (e) {
		console.log(e);
	}
}
