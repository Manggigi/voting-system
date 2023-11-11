<script lang="ts">
	import HackathonList from '$lib/components/HackathonList.svelte';

	export let data;
</script>

<div>
	<h1 class="h3">Hackathon lists</h1>
	<HackathonList hackathons={data.hackathons} />
</div>
