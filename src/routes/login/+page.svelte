<script lang="ts">
	import { goto } from '$app/navigation';
	import type { User } from '$apptypes';
	import { routes } from '$lib/routes.js';
	import { userStore } from '$lib/stores.js';
	import { onMount } from 'svelte';

	export let data;
	let currentUser: User | null = null;

	const handleLogin = () => {
		if ($userStore) return;

		currentUser = JSON.parse(localStorage.getItem('user')!);
		// set user to localstorage
		const user: User = {
			id: 1,
			name: 'Gian Denorte',
			username: 'getgian',
			created_at: new Date(),
			avatar:
				'https://giandenorte.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar.e7bd1e3b.webp&w=256&q=75'
		};
		localStorage.setItem('user', JSON.stringify(user));
		userStore.set(user);

		setTimeout(() => {
			goto(routes.home);
		}, 1000);
	};
</script>

<div class="grid place-content-center h-96">
	{#if $userStore}
		<h1 class="h1">Successful Login</h1>
	{:else}
		<button
			on:click={handleLogin}
			class="rounded-md px-6 py-4 text-sm font-medium text-gray-800 bg-primary-500 hover:bg-gray-700 hover:text-white"
			>Login using Discord</button
		>
	{/if}
	<!-- <p>{JSON.stringify($userStore, null, 2)}</p> -->
</div>
