import {
	createJudgeVote,
	createUserVote,
	getHackathonById,
	getHackathonJudgesByHackathonId,
	getHackathonParticipantByUserId,
	getHackathonTeamsByHackathonId,
	getJudgeVotesByUserId,
	getUserVoteByUserId
} from '$lib/hackathons';
import { redirect } from '@sveltejs/kit';
import type { JudgeVote, NewUserVote } from '@types';
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
		let judgeVotes: JudgeVote[] = [];
		const participant = await getHackathonParticipantByUserId(user.id, hackathonId);
		const hackathonJudges = await getHackathonJudgesByHackathonId(hackathonId);
		const judge = hackathonJudges.find((judge) => judge.user_id === user.id);
		if (judge?.id) {
			judgeVotes = await getJudgeVotesByUserId(user.id, hackathonId);
		}
		const hackathonTeams = await getHackathonTeamsByHackathonId(hackathonId);
		const hackathon = getHackathonById(hackathonId);
		return { user, hackathonTeams, hackathon, judge, participant, judgeVotes };
	} catch (e) {
		console.log(e);
	}
}

export const actions = {
	userVote: async ({ request, params }) => {
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
	},
	judgeVote: async ({ request, params }) => {
		const hackathonId = params.hackathonId;
		const form = await request.formData();
		const hackathon_team_id = (form.get('hackathon_team_id') ?? '') as string;
		const user_id = (form.get('user_id') ?? '') as string;
		const hackathon_judge_id = (form.get('hackathon_judge_id') ?? '') as string;
		const comments = (form.get('comments') ?? '') as string;
		const score = (form.get('score') ?? '') as string;
		if (!hackathon_team_id || !user_id || !hackathon_judge_id || !score || !comments) return;

		// if (!hackathon_team_id || !user_id || !score || !comments) return; //for testing non judge user

		try {
			if (hackathon_team_id && user_id && hackathon_judge_id && score) {
				const vote: JudgeVote = {
					id: nanoid(),
					hackathon_id: hackathonId,
					hackathon_team_id,
					user_id,
					hackathon_judge_id,
					comments,
					score: Number(score),
					created_at: new Date()
				};
				await createJudgeVote(vote);
			}
		} catch (error) {
			console.error(error);
		}
	}
};
