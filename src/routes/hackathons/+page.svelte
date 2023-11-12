<script lang="ts">
	import HackathonList from '$lib/components/HackathonList.svelte';
	import PreviousHackatohnWinners from '@components/PreviousHackatohnWinners.svelte';

	export let data;
</script>

<div class="space-y-8 pb-12">
	{#await data.streamed.finalScores}
		<div>
			<h3 class="h3 mb-2">Previous Hackathons Winner</h3>
			<div class="table-container text-white">
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Team Name</th>
							<th>Community Votes</th>
							<th>Judge Votes</th>
							<th>Final Score</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><div class="placeholder-circle w-5 animate-pulse"></div></td>
							<td><div class="placeholder-circle w-5 animate-pulse"></div></td>
							<td><div class="placeholder-circle w-5 animate-pulse"></div></td>
							<td><div class="placeholder-circle w-5 animate-pulse"></div></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	{:then finalScores}
		<PreviousHackatohnWinners {finalScores} />
		<hr />
	{/await}

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
