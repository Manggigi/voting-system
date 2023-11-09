import type { NewUser } from '@types';
import { auth } from '$lib/server/lucia';
import { redirect, type Actions } from '@sveltejs/kit';
import { decode } from 'decode-formdata';

export const load = async ({ locals }) => {
	if (locals.user) throw redirect(307, '/profile');
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = decode<NewUser & { password: string }>(await request.formData());

		try {
			await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: formData.username,
					password: formData.password
				},
				attributes: {
					username: formData.username,
					name: formData.name,
					avatar: formData.avatar
				}
			});
		} catch (error) {
			console.error(error);
		}
		throw redirect(303, '/login');
	}
};
