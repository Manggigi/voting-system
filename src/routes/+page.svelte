<script lang="ts">
	import HackathonList from '$lib/components/HackathonList.svelte';

	export let data;
</script>

<div class="space-y-4">
	<div>
		<h3 class="h3">Current Hackathons Winners</h3>
		<!-- maybe wildcard of avatar of "?" -->
		<p class="">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident odio debitis, illo id vel
			ratione quia, minima eligendi tempora eveniet est a rem natus fugiat sapiente alias deleniti
			dolor quos.
		</p>
	</div>
	<hr />
	<div>
		<h3 class="h3">Upcoming Hackathons</h3>
		<HackathonList hackathons={data.hackathons} />
	</div>
	<hr />
	<h4 class="h4 mt-4">
		Current User
		<!-- <div>{JSON.stringify(, null, 2)}</div> -->
	</h4>
</div>
