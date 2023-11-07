import type { NewUser } from '$apptypes';
import { db } from './drizzle';
import { users } from './drizzle/schema';

export const createUser = async (userData: NewUser) => {
	db.insert(users).values(userData).execute();
};
