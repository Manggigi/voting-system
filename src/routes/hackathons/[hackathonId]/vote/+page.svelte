<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data;
	let isSubmitting = false;
	let team: number;
</script>

<h1 class="h1">vote</h1>

<form
	method="post"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		isSubmitting = true;
		return async ({ result, update }) => {
			// Your form submission logic here
			isSubmitting = false;
			goto('/already-voted');
			// update(result);
		};
	}}
>
	<!-- select from list of teams -->
	<input type="hidden" value={data.user?.id} name="user_id" />
	<select name="team" id="team">
		{#each data.hackathonTeams || [] as team}
			<option value={team.id}>{team.id}: {team.name}</option>
		{/each}
	</select>
	<button disabled={!data.user?.id || isSubmitting} class="btn variant-filled-primary" type="submit"
		>{isSubmitting ? 'Submitting...' : 'Submit Vote'}</button
	>
</form>
