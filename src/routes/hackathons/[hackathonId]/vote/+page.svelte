<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { routes } from '$lib/routes.js';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import Team from "./Team.svelte"

	export let data;
	let isSubmitting = false;
	let valueSingle: string;

	let teamName: string; // Will be moved to an array that goes like this: [{team: "MAPEH", hasVoted: true}, {team: "Team Chibog}, hasVoted: false}]
	let formVisibility: boolean;
	const changeTeamName = (id: number) => {
		teamName = data.hackathonTeams && data.hackathonTeams[id] && data.hackathonTeams[id].name ? data.hackathonTeams[id].name: "Something went wrong. Please contact an administrator.";
		if (modalRegistry.teamComponent?.props?.teamNameProp) modalRegistry.teamComponent.props.teamNameProp = teamName;
		if (modalRegistry.teamComponent?.props?.formVisibilityProp) modalRegistry.teamComponent.props.formVisibilityProp = true;
		modalStore.trigger(modal);
	}

	initializeStores();
	const modalRegistry: Record<string, ModalComponent> = {
		teamComponent: {
			ref: Team,
			props: {teamNameProp: teamName!, formVisibilityProp: formVisibility!}
		}
	}
	const modalStore = getModalStore();
	const modal: ModalSettings = {
		type: 'component',
		component: "teamComponent"
	};
	// data.isJudge = !data.isJudge; // Comment to retain normal logic. Uncomment to reverse.
</script>
<Modal components={modalRegistry} />

<h2 class="h2 mt-6 mb-12">{data.hackathon?.name}</h2>
<!-- TODO: invert this isJudge for testing -->
{#if !data.isJudge}
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
<!-- TODO: invert this isJudge after testing -->
{:else if data.isJudge}
	<div>
		{#each data.hackathonTeams || [] as team, i}
			<div>
				<h2>{team.name}</h2>
				<button on:click={() => changeTeamName(i)}>Vote</button> <!-- Rename changeTeamName to something that suits the function better -->
			</div>
		{/each}
	</div>
{/if}
