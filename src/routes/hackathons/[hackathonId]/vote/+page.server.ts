import {
	createUserVote,
	getHackathonById,
	getHackathonJudgesByHackathonId,
	getHackathonParticipantByUserId,
	getHackathonTeamsByHackathonId,
	getUserVoteByUserId
} from '$lib/hackathons';
import { redirect } from '@sveltejs/kit';
import type { NewUserVote } from '@types';
import { nanoid } from 'nanoid';

export async function load({ params, locals }) {
	const hackathonId = params.hackathonId;
	const user = locals.user;
	if (!user) throw redirect(307, '/login');

	let userHasVoted = false;
	if (user) {
		try {
			const userVote = await getUserVoteByUserId(user.id, hackathonId);
			userHasVoted = !!userVote?.id;
		} catch (e) {
			console.log(e);
		}
	}
	if (userHasVoted) {
		throw redirect(303, '/already-voted');
	}

	try {
		const participant = await getHackathonParticipantByUserId(user.id, hackathonId);
		const hackathonJudges = await getHackathonJudgesByHackathonId(hackathonId);
		const isJudge = hackathonJudges.some((judge) => judge.user_id === user.id);
		const hackathonTeams = await getHackathonTeamsByHackathonId(hackathonId);
		const hackathon = getHackathonById(hackathonId);
		return { user, hackathonTeams, hackathon, isJudge, participant };
	} catch (e) {
		console.log(e);
	}
}

export const actions = {
	default: async ({ request, params }) => {
		const hackathonId = params.hackathonId;

		const form = await request.formData();
		const teamId = (form.get('team') ?? '') as string;
		const user_id = (form.get('user_id') ?? '') as string;

		if (!teamId || !user_id) return;

		try {
			if (teamId && user_id) {
				const vote: NewUserVote = {
					id: nanoid(),
					hackathon_id: hackathonId,
					hackathon_team_id: teamId,
					user_id: user_id
				};
				await createUserVote(vote);
			}
		} catch (error) {
			console.error(error);
		}
	}
};
