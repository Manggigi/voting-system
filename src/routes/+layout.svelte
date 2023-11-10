<script lang="ts">
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.postcss';
	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	export let data;
</script>

<div class="text-slate-800">
	<Navbar user={data.user} />

	{#if $page.route.id?.includes('/hackathons/')}
		<slot />
	{:else}
		<main class="min-h-screen pt-20 bg-white">
			<Container>
				<slot />
			</Container>
		</main>
	{/if}
</div>
