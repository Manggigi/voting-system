import type { User } from '@types';
import { writable } from 'svelte/store';

export const userStore = writable<User | null>();
