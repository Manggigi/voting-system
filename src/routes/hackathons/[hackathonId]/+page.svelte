<script lang="ts">
	import { routes } from '$lib/routes.js';

	export let data;
</script>

<h1 class="h3">{data.hackathon.name}</h1>
<p>{data.hackathon.description}</p>
<div class="mt-2">
	<a href={routes.hackathon.vote(data.hackathon.id)} class="btn variant-filled-primary btn-sm"
		>Vote Now</a
	>
	<a href={routes.hackathon.results(data.hackathon.id)} class="btn variant-ringed btn-sm"
		>View results</a
	>
</div>
<p class="mt-4">{JSON.stringify(data, null, 2)}</p>
