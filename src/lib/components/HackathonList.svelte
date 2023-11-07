<script lang="ts">
	import type { Hackathon } from '$apptypes';
	import { routes } from '$lib/routes';

	export let hackathons: Hackathon[] = [];
</script>

<ul role="list" class="bg-white divide-y divide-gray-100">
	{#each hackathons as hackathon}
		<li class="flex items-center justify-between gap-x-6 py-5">
			<div class="min-w-0">
				<div class="flex items-start gap-x-3">
					<p class="text-sm font-semibold leading-6 text-gray-900">{hackathon.name}</p>
					<p
						class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20"
					>
						Complete
					</p>
				</div>
				<div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
					<p class="whitespace-nowrap">
						Due on <time datetime="2023-03-17T00:00Z">March 17, 2023</time>
					</p>
					<svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
						<circle cx="1" cy="1" r="1" />
					</svg>
					<p class="truncate">Created by Leslie Alexander</p>
				</div>
			</div>
			<div class="flex flex-none items-center gap-x-4">
				<a
					href={routes.hackathon.hackaton(hackathon.id)}
					class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					>View project<span class="sr-only">{hackathon.name}</span></a
				>
			</div>
		</li>
	{/each}
</ul>
