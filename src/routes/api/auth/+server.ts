import * as envPrivate from '$env/static/private';

const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${
	envPrivate.DISCORD_CLIENT_ID
}&redirect_uri=${encodeURIComponent(
	envPrivate.DISCORD_REDIRECT_URI
)}&response_type=code&scope=identify%20email%20guilds`;
// https://discord.com/api/oauth2/authorize?client_id=1171626542602911744&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fapi%2Fcallback&response_type=code&scope=identify%20email%20guilds

export const GET = async () => {
	const headers = new Headers();
	headers.set('Location', DISCORD_ENDPOINT);

	const response = new Response(null, { status: 302, headers });

	return response;
};
