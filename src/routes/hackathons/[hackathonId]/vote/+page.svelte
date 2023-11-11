<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { routes } from '$lib/routes.js';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let data;
	let isSubmitting = false;
	let valueSingle: string;
	let isJudge = false;
</script>

<h2 class="h2 mt-6 mb-12">{data.hackathon?.name}</h2>
{#if !isJudge}
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
		<ListBox
			hover="variant-outline-secondary"
			active="variant-glass-secondary"
			class="space-y-2 mb-4"
		>
			{#each data.hackathonTeams || [] as team}
				<ListBoxItem class="bg-slate-100 " bind:group={valueSingle} name="team" value={team.id}
					>{team.name}</ListBoxItem
				>
			{/each}
		</ListBox>
		<button
			disabled={!data.user?.id || isSubmitting || !valueSingle}
			class="btn btn-lg variant-filled-secondary w-full"
			type="submit">{isSubmitting ? 'Submitting...' : 'Submit Vote'}</button
		>
	</form>
{:else}
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
		<select class="select" size={data.hackathonTeams?.length} name="team" id="team">
			{#each data.hackathonTeams || [] as team}
				<option value={team.id}>{team.name}</option>
			{/each}
		</select>
		<button
			disabled={!data.user?.id || isSubmitting || !valueSingle}
			class="btn btn-lg variant-filled-secondary w-full"
			type="submit">{isSubmitting ? 'Submitting...' : 'Submit Vote'}</button
		>
	</form>
{/if}
