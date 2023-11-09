import { getUserById } from '../../lib/users';
import { auth } from '$lib/server/lucia';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { decode } from 'decode-formdata';

export const load = async ({ locals }) => {
	console.log('🚀 ~ file: +page.server.ts:7 ~ load ~ locals:', locals.user);
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = decode<{ username: string; password: string }>(await request.formData());

		try {
			const key = await auth.useKey('username', formData.username, formData.password);
			const session = await auth.createSession({ attributes: {}, userId: key.userId });
			locals.auth.setSession(session);

			// console.log('🚀 ~ file: +page.server.ts:15 ~ default: ~ locals.user:', locals.user);
		} catch (error) {
			console.log(error);
			return fail(404);
		}
		throw redirect(307, '/'); // not redirecting
	}
};
