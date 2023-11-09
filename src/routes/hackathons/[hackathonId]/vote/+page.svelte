<script lang="ts">
	import { enhance } from '$app/forms';
	import { userStore } from '$lib/stores.js';

	export let data;
</script>

<h1 class="h1">vote</h1>

<form method="post" use:enhance>
	<!-- select from list of teams -->
	<input type="hidden" value={$userStore?.id} name="user_id" />
	<select name="team" id="team">
		{#each data.hackathonTeams as team}
			<option value={team.id}>{team.id}: {team.name}</option>
		{/each}
	</select>
	<button disabled={!$userStore} class="btn variant-filled-primary" type="submit"
		>Submit Vote</button
	>
</form>
