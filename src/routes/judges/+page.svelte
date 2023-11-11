<script lang="ts">
	export let data;
</script>

<h1 class="h3">full judges lists</h1>
<ul>
	{#each data.hackathonJudges || [] as judge}
		<li>{judge.user_id}</li>
	{/each}
</ul>
