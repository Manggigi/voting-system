import type { NewUserVote } from '@types';
import { createUserVote, getHackathonTeams, getUserVoteByUserId } from '$lib/hackathons';
import { redirect } from '@sveltejs/kit';

export async function load({ params, locals }) {
	const user = locals.user;
	if (user) {
		try {
			const userVote = await getUserVoteByUserId(user.id);
			console.log('🚀 ~ file: +page.server.ts:10 ~ load ~ userVote:', userVote);
			if (userVote?.id) {
				// already have a vote, do not proceed
				throw redirect(303, '/already-voted');
			}
		} catch (e) {
			console.log(e);
		}
	}

	const hackathonId = params.hackathonId as unknown as number;
	try {
		const hackathonTeams = await getHackathonTeams();

		return { user, hackathonId, hackathonTeams };
	} catch (e) {
		console.log(e);
	}
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
					user_id: user_id
				};
				await createUserVote(vote);
				console.log('🚀 ~ file: +page.server.ts:40 ~ default: ~ createUserVote:');
			}
		} catch (error) {
			console.error(error);
		}
	}
};
