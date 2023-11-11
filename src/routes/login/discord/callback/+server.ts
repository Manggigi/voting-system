import { redirect } from '@sveltejs/kit';
import { auth, discordAuth } from '@server/lucia';
import type { RequestHandler } from './$types';
import { OAuthRequestError } from '@lucia-auth/oauth';
// import participantsList from '$lib/data/whitelistedParticipants.json';
// import judgesList from '$lib/data/whitelistedJudges.json';
// import { createHackathonJudge, createHackathonParticipant } from '$lib/hackathons';
import { getUserByUsername, updateUserByUsername } from '$lib/users';
// import { nanoid } from 'nanoid';

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
	const error = url.searchParams.get('error');
	if (error) throw redirect(307, '/');

	const storedState = cookies.get('discord_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}
	try {
		const { getExistingUser, discordUser, createUser, createKey } =
			await discordAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			if (!discordUser.verified) {
				throw new Error('Email not verified');
			}

			const avatar = discordUser.avatar
				? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.jpg`
				: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png';

			const existingDatabaseUserWithUsername = await getUserByUsername(discordUser.username);
			if (existingDatabaseUserWithUsername) {
				const newData = {
					...existingDatabaseUserWithUsername,
					name: discordUser.global_name || 'guest',
					avatar
				};
				await updateUserByUsername(discordUser.username, newData);
				const user = auth.transformDatabaseUser(existingDatabaseUserWithUsername);
				await createKey(user.userId);
				return user;
			}

			const newUser = {
				name: discordUser.global_name || 'guest',
				username: discordUser.username,
				created_at: new Date(),
				avatar
			};

			const user = await createUser({ attributes: newUser });

			// try {
			// 	// TODO: create hackathonParticipant
			// 	const participant = participantsList.find(
			// 		(participant) => participant.username === discordUser.username
			// 	);
			// 	if (participant?.username) {
			// 		await createHackathonParticipant({
			// 			id: nanoid(),
			// 			hackathon_id: participant.hackathon_id,
			// 			hackathon_team_id: participant.hackathon_team_id,
			// 			user_id: user.userId
			// 		});
			// 	}
			// 	// TODO: create hackathonJudge
			// 	const judge = judgesList.find((judge) => judge.username === discordUser.username);
			// 	if (judge?.username) {
			// 		await createHackathonJudge({
			// 			id: nanoid(),
			// 			hackathon_id: judge.hackathon_id,
			// 			user_id: user.userId
			// 		});
			// 	}
			// } catch (error) {
			// 	console.log(error);
			// }

			return user;
		};
		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			return new Response(null, {
				status: 400
			});
		}

		return new Response(null, {
			status: 500
		});
	}
};
