<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	let score = 0;
	let comment = '';
	const handleSubmit = () => {
		// function here to submit vote

		modalStore.close();
	};
</script>

<div
	transition:fade={{ duration: 300 }}
	class="relative z-10"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

	<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
		<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<form
				class="relative transform overflow-hidden rounded-lg bg-slate-200 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full w-full sm:max-w-lg sm:p-6"
			>
				<div>
					<div class="mt-3 text-center sm:mt-5">
						<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
							{$modalStore[0]?.meta.team.name}
						</h3>
						<div class="mt-2">
							<!-- form here -->
							<form>
								<div class="flex flex-col space-y-2">
									<input:hidden name="hackathon_judge_id" value={$modalStore[0]?.meta.team.id} />
									<label class="score">
										<input type="number" name="score" placeholder="score" max="25" />
									</label>
									<label class="comments">
										<textarea name="comments" placeholder="comments" />
									</label>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="mt-4 space-y-2 sm:space-y-0 sm:flex sm:align-middle sm:items-center gap-3">
					<button
						on:click={handleSubmit}
						type="button"
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
