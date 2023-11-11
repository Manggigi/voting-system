<script lang="ts">
	import Container from '@components/Container.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Container>
	<slot />
</Container>
