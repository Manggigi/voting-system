<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { routes } from '$lib/routes.js';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let data;
	let isSubmitting = false;
	let valueSingle: string;
</script>

<h2 class="h2 mb-12">{data.hackathon?.name}</h2>

<form
	method="post"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		isSubmitting = true;
		return async ({ result, update }) => {
			// Your form submission logic here
			isSubmitting = false;
			goto(routes.thankYou);
			// update(result);
		};
	}}
>
	<!-- select from list of teams -->
	<input type="hidden" value={data.user?.id} name="user_id" />
	<!-- <select name="team" id="team"> -->
	<ListBox class="space-y-4 mb-4">
		{#each data.hackathonTeams || [] as team}
			<ListBoxItem bind:group={valueSingle} name="team" value={team.id}>{team.name}</ListBoxItem>
			<!-- <option value={team.id}>{team.name}</option> -->
		{/each}
	</ListBox>
	<!-- </select> -->
	<button
		disabled={!data.user?.id || isSubmitting || !valueSingle}
		class="btn variant-filled-primary w-full"
		type="submit">{isSubmitting ? 'Submitting...' : 'Submit Vote'}</button
	>
</form>
