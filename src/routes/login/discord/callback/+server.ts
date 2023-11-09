import { redirect } from '@sveltejs/kit';
import { auth, discordAuth } from '@server/lucia';
import type { RequestHandler } from './$types';
import { OAuthRequestError } from '@lucia-auth/oauth';

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
	// error=access_denied
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
		const { getExistingUser, discordUser, createUser } = await discordAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;

			const user = await createUser({
				attributes: {
					name: discordUser.global_name || 'guest',
					username: discordUser.username,
					avatar:
						`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.jpg` ||
						'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'
				}
			});
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
