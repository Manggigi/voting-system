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
		modalRegistry.teamComponent.props.teamNameProp = teamName;
		modalRegistry.teamComponent.props.formVisibilityProp = true
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
</script>
<Modal components={modalRegistry} />

<h2 class="h2 mt-6 mb-12">{data.hackathon?.name}</h2>
<!-- TODO: invert this isJudge after testing -->
{#if !data.isJudge}
	<div>
		{#each data.hackathonTeams || [] as team, i}
			<div>
				<h2>{team.name}</h2>
				<button on:click={() => changeTeamName(i)}>Vote</button>
			</div>
		{/each}
	</div>
{:else}
	<!-- method="post" use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			isSubmitting = true;
			return async ({ result, update }) => {
				// Your form submission logic here
				isSubmitting = false;
				goto(routes.thankYou);
				// update(result);
			};
		}} -->
	<form>
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
