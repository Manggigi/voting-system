import { auth } from '@server/lucia.js';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw error(401, 'Unauthorized');

	locals.user = undefined;
	try {
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
	} catch (e) {
		console.log(e);
	}
	throw redirect(307, '/login');
};
