<script lang="ts">
	import { routes } from '$lib/routes';
	import type { Hackathon } from '@types';

	export let hackathons: Hackathon[] = [];
	const sortedHackathons = hackathons.sort((a, b) => a.end_date.getTime() - b.end_date.getTime());
</script>

<ul role="list" class="bg-white divide-y divide-gray-100">
	{#each sortedHackathons as hackathon}
		<li class="flex items-center justify-between gap-x-6 py-5">
			<div class="min-w-0">
				<div class="flex items-start gap-x-3">
					<p class="text-sm font-semibold leading-6 text-gray-900">{hackathon.name}</p>
					<p
						class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset {hackathon.status ===
						'COMPLETED'
							? 'text-green-700 bg-green-50 ring-green-600/20'
							: 'text-blue-700 bg-blue-50 ring-blue-600/20'} "
					>
						{hackathon.status}
					</p>
				</div>
				<div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
					<p class="whitespace-nowrap">
						Due on <time datetime={hackathon.end_date.toTimeString()}
							>{hackathon.end_date.toDateString()}</time
						>
					</p>
					<svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
						<circle cx="1" cy="1" r="1" />
					</svg>
					<p class="truncate">Created by Daedalus</p>
				</div>
			</div>
			<div class="flex flex-none items-center gap-x-4">
				<a href={routes.hackathon.hackaton(hackathon.id)} class="btn variant-outline-secondary"
					>View details<span class="sr-only">{hackathon.name}</span></a
				>
			</div>
		</li>
	{/each}
</ul>
