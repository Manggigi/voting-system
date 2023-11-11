<script lang="ts">
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
</script>

<h1 class="h3">Teams list</h1>
{#each Object.keys(groupedTeams) as hackathonId}
	<div class="card p-4 my-4 text-neutral-100">
		<h2>Hackathon {data.hackathons?.find((hackathon) => hackathon.id === hackathonId)?.name}</h2>
		<ol class="list text-neutral-300">
			{#each groupedTeams[hackathonId] as team}
				<li>{team.name}</li>
			{/each}
		</ol>
	</div>
{/each}
