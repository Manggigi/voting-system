<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { routes } from '$lib/routes.js';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
	import type { HackathonTeam } from '@types';

	export let data;
	let isSubmitting = false;
	let valueSingle: string;
	const modalStore = getModalStore();
	const handleChangeTeam = (team: HackathonTeam) => {
		const modal: ModalSettings = {
			type: 'component',
			component: 'judgeVote',
			meta: {
				team: team,
				hackathonId: team.hackathon_id,
				userId: data.user?.id,
				judgeId: data.judge?.id
			}
		};
		modalStore.trigger(modal);
	};
</script>

<h2 class="h2 mt-6 mb-12">{data.hackathon?.name}</h2>
<!-- TODO: invert this isJudge for testing -->
{#if data.participant}
	<form
		method="post"
		action="?/userVote"
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
			{#each data.hackathonTeams?.filter((team) => team.id !== data.participant?.hackathon_team_id) || [] as team}
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
{/if}

<!-- TODO: invert this isJudge after testing -->
{#if data.judge}
	<div>
		{#each data.hackathonTeams || [] as team, i}
			<div>
				<h2>{team.name}</h2>
				<button on:click={() => handleChangeTeam(team)}>Vote</button>
			</div>
		{/each}
	</div>
{/if}
