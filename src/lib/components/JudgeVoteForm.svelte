<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { HackathonTeam } from '@types';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const modalStore = getModalStore();
	let formElement: HTMLFormElement;

	type Meta = {
		team: HackathonTeam;
		hackathonId: string;
		userId: string;
		judgeId: string;
	};
	$: meta = $modalStore[0]?.meta as Meta;

	// yup validated forms
	const { form, errors, handleSubmit } = createForm({
		initialValues: {
			score: '',
			comments: ''
		},
		validationSchema: yup.object().shape({
			score: yup
				.number()
				.typeError('you must specify a number up to 25')
				.min(0, 'Min value 0.')
				.max(25, 'Max score is 25.')
				.integer()
				.required('Score is required'),
			comments: yup.string().required('Comments is required')
		}),
		onSubmit: async (values) => {
			const foo = {
				...values,
				hackathon_judge_id: meta?.judgeId,
				hackathon_team_id: meta?.team?.id,
				user_id: meta?.userId
			};
			formElement.submit();
			modalStore.close();
		}
	});
</script>

<form bind:this={formElement} method="post" action="?/judgeVote" class="hidden">
	<input name="hackathon_judge_id" value={meta?.judgeId} />
	<input name="hackathon_team_id" value={meta?.team?.id} />
	<input name="user_id" value={meta?.userId} />
	<input type="number" name="score" bind:value={$form.score} />
	<input type="text" name="comments" bind:value={$form.comments} />
</form>

<form
	on:submit|preventDefault={handleSubmit}
	class="relative transform overflow-hidden rounded-lg bg-slate-200 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full w-full sm:max-w-lg sm:p-6"
>
	<div>
		<div class="mt-3 text-center sm:mt-5">
			<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
				{meta?.team?.name}
			</h3>
			<div class="mt-2">
				<div class="flex flex-col space-y-2">
					<label class="score">
						<input
							class="input rounded-lg"
							bind:value={$form.score}
							name="score"
							placeholder="score, up to 25"
						/>
						{#if !$form.score}
							<small class="text-[red] -mt-[10px]">{$errors.score}</small>
						{/if}
						{#if Number($form.score) < 0 || Number($form.score) > 25}
							<small class="text-[red] -mt-[10px]">Score is from 0 to 25</small>
						{/if}
					</label>
					<label class="comments">
						<input
							class="input h-40 rounded-lg"
							bind:value={$form.comments}
							name="comments"
							placeholder="comments"
						/>
						{#if !$form.comments}
							<small class="text-[red] -mt-[10px]">{$errors.comments}</small>
						{/if}
					</label>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-4 space-y-2 sm:space-y-0 sm:flex sm:align-middle sm:items-center gap-3">
		<button type="submit" class="btn variant-filled-secondary w-full order-2">Submit Vote</button>
		<button
			on:click={() => modalStore.close()}
			type="button"
			class="btn variant-outline-secondary text-purple-700 w-full order-1"
		>
			Cancel
		</button>
	</div>
</form>
