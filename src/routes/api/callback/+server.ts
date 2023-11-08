import * as envPrivate from '$env/static/private';

export const GET = async ({ url }) => {
	// fetch returnCode set in the URL parameters.
	const returnCode = url.searchParams.get('code');
	console.log('returnCode =>', returnCode);

	// initializing data object to be pushed to Discord's token endpoint.
	// the endpoint returns access & refresh tokens for the user.
	const dataObject = {
		client_id: envPrivate.DISCORD_CLIENT_ID,
		client_secret: envPrivate.DISCORD_CLIENT_SECRET,
		grant_type: 'authorization_code',
		redirect_uri: envPrivate.DISCORD_REDIRECT_URI,
		code: returnCode!,
		scope: 'identify email guilds'
	};

	// performing a Fetch request to Discord's token endpoint
	const request: Response = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		body: new URLSearchParams(dataObject),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	const response = await request.json();
	const headers = new Headers();
	headers.set('Location', '/');

	const response2 = new Response(null, { status: 302, headers });

	// redirect to front page in case of error
	if (response.error) {
		console.log('redirect to / due error');
		return response2;
	}

	// redirect user to front page with cookies set
	const access_token_expires_in = new Date(Date.now() + response.expires_in); // 10 minutes
	const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

	const headers2 = new Headers();
	headers2.set('Location', '/');
	headers2.append(
		'set-cookie',
		`disco_access_token=${response.access_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${access_token_expires_in}`
	);
	headers2.append(
		'set-cookie',
		`disco_refresh_token=${response.refresh_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${refresh_token_expires_in}`
	);

	console.log('redirect to / with cookies');
	const response3 = new Response(null, { status: 302, headers: headers2 });
	return response3;
};
