<script lang="ts">
	export let data;
</script>

<h1 class="h3">full teams lists</h1>
<ul>
	{#each data.hackathonTeams as team}
		<li>{team.name}</li>
	{/each}
</ul>
