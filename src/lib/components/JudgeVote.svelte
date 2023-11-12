<script lang="ts">
	import { fade } from 'svelte/transition';
	export let parent;

	import JudgeVoteForm from './JudgeVoteForm.svelte';
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
			<JudgeVoteForm />
		</div>
	</div>
</div>
