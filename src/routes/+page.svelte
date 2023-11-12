<script lang="ts">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import tz from 'dayjs/plugin/timezone';
	import { goto } from '$app/navigation';
	import CountdownTimer from '@components/CountdownTimer.svelte';
	import { routes } from '$lib/routes.js';

	dayjs.extend(utc);
	dayjs.extend(tz);

	const whyFreedive = '/card.webp';

	export let data;
	const deadline: Date = new Date('11-12-2023 22:00');

	// const deadline = dayjs('2023-11-12T23:59:59', 'Asia/Manila');
	// const deadline = dayjs(new Date('11-12-2023'), 'Asia/Manila');
	// const startDate = dayjs('2023-11-12T23:59:59', 'Asia/Manila');
	const enableSubmit =
		dayjs().isAfter(data.hackathon?.start_date) && dayjs().isBefore(data.hackathon?.end_date);

	const onClickSubmit = () => {
		if (enableSubmit) {
			goto(data.user ? routes.hackathon.vote(data.hackathon?.id!) : routes.login);
		} else {
			alert('You can submit starting August 11, 2023 UTC+8');
		}
	};
</script>

<main
	class="md:h-screen bg-none md:bg-banner bg-no-repeat bg-cover object-right md:flex md:items-center"
>
	<div
		class="w-full md:w-[970px] -z-10 md:z-auto text-white relative space-y-4 px-5 sm:px-[10%] mt-20"
	>
		<img
			src={whyFreedive}
			alt="submit-video"
			class="w-full aspect-16/9 md:hidden object-cover rounded-lg"
		/>
		<h1 class="text-xl md:text-5xl lg:text-6xl font-bold animate-pulse">
			{data.hackathon?.name || 'Welcome to Daedalus'}
		</h1>
		<div class="max-w-md">
			<p class="text-xs md:text-sm lg:text-lg md:leading-6">Voting System</p>
			<p class="text-sm font-semibold block md:hidden">
				{`#MAPEH #ReactPressPHP #CastAway #Team Chibog #D'Rocketeers🚀`}
			</p>
		</div>
		<div class="flex">
			<p>
				<b class="text-secondary text-4xl">
					<!-- MM-DD-YYYY HH:mm -> new Date('11-12-2023 22:00')  -->
					<!-- default to 12am if no time provided -> new Date('11-12-2023') -->
					{#if !!deadline}
						<CountdownTimer {deadline} />
					{:else}
						"Coming Soon"
					{/if}
				</b>
				<br />
				voting will start on {dayjs(deadline).format('MMMM DD, YYYY hh:mm A')}
			</p>
		</div>
		<div class="flex gap-2 flex-col md:flex-row">
			<button
				title="August 1 is the official start of the competition."
				on:click={onClickSubmit}
				disabled={!enableSubmit}
				class="btn variant-filled-secondary"
			>
				Submit Vote
			</button>
			<button
				on:click={() =>
					goto(data?.hackathon?.id ? routes.hackathon.results(data.hackathon.id) : '#')}
				class="btn variant-outline-secondary"
			>
				View Results
			</button>
		</div>
	</div>
</main>
