<script lang="ts">
	import { onMount } from 'svelte';

	export let data;
	let groupedTeams = {};

	if (data?.hackathonTeams) {
		groupedTeams = data.hackathonTeams.reduce((acc, team) => {
			if (!acc[team.hackathon_id]) {
				acc[team.hackathon_id] = [];
			}
			acc[team.hackathon_id].push(team);
			return acc;
		}, {});
	}
	let title = 'Daedalus Hackathon - Season ';

	let showOnClient = false;
	onMount(() => {
		setTimeout(() => {
			showOnClient = true;
		}, 2000);
	});
</script>

{#if showOnClient && Object.keys(groupedTeams).length}
	{#each Object.keys(groupedTeams) as hackathonId}
		<div class="text-white mb-4">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>{data.hackathons?.find((hackathon) => hackathon.id === hackathonId)?.name}</th>
					</tr>
				</thead>
				{#each groupedTeams[hackathonId] as team}
					<tbody>
						<tr>
							<td>{team.name}</td>
						</tr>
					</tbody>
				{/each}
			</table>
		</div>
	{/each}
{:else}
	{#each Array(3) as _, index}
		<div class="text-white mb-4">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>{title} {index + 1}</th>
					</tr>
				</thead>
				{#each Array(5) as i}
					<tbody>
						<tr>
							<td><div class="placeholder w-40 h-5 animate-pulse"></div></td>
						</tr>
					</tbody>
				{/each}
			</table>
		</div>
	{/each}
{/if}
