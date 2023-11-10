<script lang="ts">
	import HackathonList from '$lib/components/HackathonList.svelte';

	export let data;
</script>

<div class="space-y-8">
	{#if data.user}
		<h3 class="h3">Welcome, {data.user?.name}!</h3>
		<hr />
	{/if}
	<div>
		<h3 class="h3">Upcoming Hackathons</h3>
		<HackathonList hackathons={data.hackathons} />
	</div>
	<hr />

	<div>
		<!-- maybe wildcard of avatar of "?" -->
		<h3 class="h3">Current Hackathons Winners</h3>
		<p class="">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident odio debitis, illo id vel
			ratione quia, minima eligendi tempora eveniet est a rem natus fugiat sapiente alias deleniti
			dolor quos.
		</p>
	</div>
</div>
