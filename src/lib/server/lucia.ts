import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { queryClient } from '$lib/drizzle';
import { discord } from '@lucia-auth/oauth/providers';
import * as envPrivate from '$env/static/private';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: postgresAdapter(queryClient, {
		user: 'users',
		key: 'user_key',
		session: 'user_session'
	}),
	getUserAttributes: (data) => {
		return {
			discordUsername: data.username
		};
	}
});

// {
// 	client_id: envPrivate.DISCORD_CLIENT_ID,
// 	client_secret: envPrivate.DISCORD_CLIENT_SECRET,
// 	grant_type: 'authorization_code',
// 	redirect_uri: envPrivate.DISCORD_REDIRECT_URI,
// 	code: returnCode!,
// 	scope: 'identify email guilds'
// }

export const discordAuth = discord(auth, {
	clientId: envPrivate.DISCORD_CLIENT_ID,
	clientSecret: envPrivate.DISCORD_CLIENT_SECRET,
	redirectUri: envPrivate.DISCORD_REDIRECT_URI
});

export type Auth = typeof auth;
