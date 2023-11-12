import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(307, '/login');
	}

	if (!locals.user.is_super_admin) {
		throw error(401, 'Unauthorized');
	}

	return {};
};
