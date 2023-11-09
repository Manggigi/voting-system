// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User } from '@types';

declare global {
	namespace App {
		interface Locals {
			user: User | undefined;
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = Omit<User, 'id' | 'created_at'>;
		type DatabaseSessionAttributes = unknown;
	}
}

export {};
