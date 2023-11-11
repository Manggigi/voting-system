<script lang="ts">
	import HackathonList from '$lib/components/HackathonList.svelte';
	import PreviousHackatohnWinners from '@components/PreviousHackatohnWinners.svelte';

	export let data;
</script>

<div class="space-y-8 pb-12">
	<PreviousHackatohnWinners />
	<hr />

	<div>
		<h3 class="h3">Upcoming Hackathons</h3>
		<HackathonList
			hackathons={data.hackathons?.filter((hackathon) => hackathon.status === 'NEW')}
		/>
	</div>
	<hr />
	<div>
		<h3 class="h3">Completed Hackathons</h3>
		<HackathonList
			hackathons={data.hackathons?.filter((hackathon) => hackathon.status === 'COMPLETED')}
		/>
	</div>
</div>
