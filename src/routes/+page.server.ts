import { UsersTable, db } from '$lib/drizzle';
import { seed } from '$lib/seed';

export async function load() {
	let users;
	let startTime = Date.now();
	try {
		users = await db.select().from(UsersTable);
	} catch (error) {
		const e = error as Error;
		if (e.message === `relation "users" does not exist`) {
			console.log('Table does not exist, creating and seeding it with dummy data now...');
			// Table is not created yet
			await seed();
			startTime = Date.now();
			users = await db.select().from(UsersTable);
		} else {
			throw e;
		}
	}
	const duration = Date.now() - startTime;
	return {
		duration,
		users
	};
}
