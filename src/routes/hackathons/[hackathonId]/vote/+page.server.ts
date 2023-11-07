import type { NewUserVote, User } from '$apptypes';
import { createUserVote, getHackathonTeams, getUserVoteById } from '$lib/hackathons';
import { redirect } from '@sveltejs/kit';

export async function load({ params, cookies }) {
	const user = cookies.get('user');
	if (user) {
		const userData: User = JSON.parse(user);
		const userVote = await getUserVoteById(userData.id.toString());
		console.log('🚀 ~ file: +page.server.ts:10 ~ load ~ userVote:', userVote);
		if (userVote?.id) {
			// already have a vote, do not proceed
			throw redirect(303, '/already-voted');
		}
	}

	const hackathonId = params.hackathonId as unknown as number;
	const hackathonTeams = await getHackathonTeams();

	return { hackathonId, hackathonTeams };
}

export const actions = {
	default: async ({ request, params }) => {
		const hackathonId = params.hackathonId as unknown as number;

		const form = await request.formData();
		const teamId = (form.get('team') ?? '') as string;
		const user_id = (form.get('user_id') ?? '') as string;

		if (!teamId || !user_id) return;

		try {
			if (teamId && user_id) {
				const vote: NewUserVote = {
					hackathon_id: Number(hackathonId),
					hackathon_team_id: Number(teamId),
					user_id: Number(user_id)
				};
				await createUserVote(vote);
			}
		} catch (error) {
			console.error(error);
		}
	}
};
