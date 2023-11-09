import { auth } from '$lib/server/lucia';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { decode } from 'decode-formdata';

export const load = async () => {
	throw redirect(307, '/login/discord');
};
