<script lang="ts">
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.postcss';
	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	export let data;

	import JudgeVote from '@components/JudgeVote.svelte';
	import { initializeStores, storePopup, type ModalComponent, Modal } from '@skeletonlabs/skeleton';

	initializeStores();

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		judgeVote: { ref: JudgeVote }
	};
</script>

<Modal components={modalRegistry} />

<div class="text-slate-800">
	<Navbar user={data.user} />

	{#if $page.route.id === '/' || data.hackathonId}
		<slot />
	{:else}
		<Container>
			<slot />
		</Container>
	{/if}
</div>
