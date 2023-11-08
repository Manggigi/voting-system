export async function GET() {
	console.log('redirect to / with cleared cookies');

	const headers = new Headers({
		'set-cookie': `disco_access_token=; Path=/; HttpOnly; SameSite=Strict;`
	});
	headers.append('set-cookie', `disco_refresh_token=; Path=/; HttpOnly; SameSite=Strict;`);
	headers.set('Location', '/');

	console.log('redirect to / with cookies');
	const response = new Response(null, { status: 302, headers });
	return response;
}
