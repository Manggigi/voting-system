import { auth } from '$lib/server/lucia';
import { getUserById } from '$lib/users';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	// validate session
	const session = await event.locals.auth.validate();
	if (session) {
		const user = await getUserById(session.user.userId); //not saving to locals.user
		event.locals.user = user;
	}
	return await resolve(event);
};
