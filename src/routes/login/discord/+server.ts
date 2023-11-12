import { discordAuth } from '@server/lucia';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';

export const GET: RequestHandler = async ({ cookies }) => {
	const [url, state] = await discordAuth.getAuthorizationUrl();
	cookies.set('discord_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
};
