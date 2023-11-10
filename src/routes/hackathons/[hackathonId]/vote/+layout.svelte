<script lang="ts">
	import Container from '@components/Container.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<main class="min-h-screen pt-20 bg-white">
	<Container>
		<slot />
	</Container>
</main>
