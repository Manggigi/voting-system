import { db } from '$lib/drizzle';
import { users as usersTable } from './../lib/drizzle/schema';

export async function load() {
	let users;

	try {
		users = await db.select().from(usersTable);
	} catch (error) {
		const e = error as Error;
		console.log(e);
	}
	return {
		users
	};
}
