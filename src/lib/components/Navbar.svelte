<script lang="ts">
	import { routes } from '$lib/routes';
	import type { User } from '@types';
	import LoginButton from './LoginButton.svelte';

	export let user: User | undefined = undefined;
	$: isLoggedIn = !!user;
	let menuOpen = false;
</script>

<nav class="bg-gray-800 w-full fixed top-0">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<!-- TODO: add logo here -->
					<img class="h-8 w-auto" src="/favicon.webp" alt="Daedalus" />
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<a href={routes.home} class="btn variant-soft-secondary">Home</a>
						{#if isLoggedIn}
							<a
								href={routes.hackathon.base}
								class="btn text-[rgb(var(--color-secondary-200))] hover:variant-soft-surface"
								>Hackathons</a
							>
							<a
								href={routes.teams.base}
								class="btn text-[rgb(var(--color-secondary-200))] hover:variant-soft-surface"
								>Teams</a
							>
							<a
								href={routes.judges.base}
								class="btn text-[rgb(var(--color-secondary-200))] hover:variant-soft-surface"
								>Judges</a
							>
						{/if}
					</div>
				</div>
			</div>
			<div class="hidden sm:ml-6 sm:block">
				<div class="flex items-center space-x-4">
					<!-- Profile dropdown -->
					{#if isLoggedIn}
						<div class="relative ml-3">
							<div>
								<button
									type="button"
									class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									id="user-menu-button"
									aria-expanded="false"
									aria-haspopup="true"
									on:click={() => (menuOpen = !menuOpen)}
								>
									<span class="absolute -inset-1.5" />
									<span class="sr-only">Open user menu</span>
									<img
										class="h-8 w-8 rounded-full"
										src={user?.avatar ||
											'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'}
										alt=""
									/>
								</button>
							</div>

							{#if menuOpen}
								<div
									class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="user-menu-button"
									tabindex="-1"
								>
									<a
										on:click={() => {
											menuOpen = !menuOpen;
											user = undefined;
										}}
										href={routes.logout}
										class="block px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabindex="-1"
										id="user-menu-item-2">Sign out</a
									>
								</div>
							{/if}
						</div>
					{:else}
						<LoginButton />
					{/if}
				</div>
			</div>

			<div class="-mr-2 flex sm:hidden">
				<!-- Mobile menu button -->
				{#if isLoggedIn}
					<button
						type="button"
						class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						aria-controls="mobile-menu"
						aria-expanded="false"
						on:click={() => (menuOpen = !menuOpen)}
					>
						<span class="absolute -inset-0.5" />
						<span class="sr-only">Open main menu</span>
						<!--
					Icon when menu is closed.

					Menu open: "hidden", Menu closed: "block"
				-->
						<svg
							class="block h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
						<!--
					Icon when menu is open.

					Menu open: "block", Menu closed: "hidden"
				-->
						<svg
							class="hidden h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				{:else}
					<LoginButton />
				{/if}
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	{#if menuOpen}
		<div class="sm:hidden" id="mobile-menu">
			<div class="space-y-1 px-2 pb-3 pt-2">
				<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
				<a
					on:click={() => (menuOpen = !menuOpen)}
					href={routes.home}
					class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Home</a
				>
				<a
					on:click={() => (menuOpen = !menuOpen)}
					href={routes.hackathon.base}
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
					>Hackathon</a
				>
				<a
					on:click={() => (menuOpen = !menuOpen)}
					href={routes.teams.base}
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
					>Teams</a
				>
				<a
					on:click={() => (menuOpen = !menuOpen)}
					href={routes.judges.base}
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
					>Judges</a
				>
			</div>
			<div class="border-t border-gray-700 pb-3 pt-4">
				<div class="flex items-center px-5">
					<div class="flex-shrink-0">
						<img
							class="h-10 w-10 rounded-full"
							src={user?.avatar ||
								'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'}
							alt=""
						/>
					</div>
					<div class="ml-3">
						<div class="text-base font-medium text-white">{user?.name}</div>
						<div class="text-sm font-medium text-gray-400">{user?.username}</div>
					</div>
				</div>
				<div class="mt-3 space-y-1 px-2">
					<a
						on:click={() => {
							menuOpen = !menuOpen;
							user = undefined;
						}}
						href={routes.logout}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
						>Sign out</a
					>
				</div>
			</div>
		</div>
	{/if}
</nav>
