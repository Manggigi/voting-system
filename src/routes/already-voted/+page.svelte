<script lang="ts">
	import { routes } from '$lib/routes.js';
	export let data;
</script>

<div class="card mt-12 p-4 text-center text-white">
	<header class="card-header h2">You have already casted your vote!</header>
	<section class="p-4">
		<p class="mt-4">
			You have successfully casted your vote.<br />
			You can view the results of the voting process in
			<a class="font-bold hover:text-slate-500" href={routes.home}>hackathon page.</a>
		</p>
	</section>
</div>
