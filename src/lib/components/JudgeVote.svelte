<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { HackathonTeam } from '@types';
	const modalStore = getModalStore();

	export let parent;
	let formElement: HTMLFormElement;
	type Meta = {
		team: HackathonTeam;
		hackathonId: string;
		userId: string;
		judgeId: string;
	};
	$: meta = $modalStore[0]?.meta as Meta;
</script>

<div
	transition:fade={{ duration: 300 }}
	class="relative z-10"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
		<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<form
				bind:this={formElement}
				method="post"
				action="?/judgeVote"
				class="relative transform overflow-hidden rounded-lg bg-slate-200 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full w-full sm:max-w-lg sm:p-6"
			>
				<div>
					<div class="mt-3 text-center sm:mt-5">
						<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
							{meta?.team?.name}
						</h3>
						<div class="mt-2">
							<input type="hidden" name="hackathon_judge_id" value={meta?.judgeId} />
							<input type="hidden" name="hackathon_team_id" value={meta?.team?.id} />
							<input type="hidden" name="user_id" value={meta?.userId} />
							<div class="flex flex-col space-y-2">
								<label class="score">
									<input
										class="input rounded-lg"
										type="number"
										name="score"
										placeholder="score"
										max="25"
									/>
								</label>
								<label class="comments">
									<input
										class="input h-40 rounded-lg"
										type="text"
										name="comments"
										placeholder="comments"
									/>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-4 space-y-2 sm:space-y-0 sm:flex sm:align-middle sm:items-center gap-3">
					<button
						type="submit"
						on:click|preventDefault={() => {
							const res = confirm('Confirm submit vote');
							console.log('🚀 ~ file: JudgeVote.svelte:70 ~ res:', res);
							if (res) {
								formElement.submit();
							}
						}}
						class="btn variant-filled-secondary w-full order-2"
					>
						Submit Vote
					</button>
					<button
						on:click={() => modalStore.close()}
						type="button"
						class="btn variant-outline-secondary text-purple-700 w-full order-1"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
