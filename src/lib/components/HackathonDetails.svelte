<script lang="ts">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import tz from 'dayjs/plugin/timezone';

	import { goto } from '$app/navigation';
	import CountdownTimer from './CountdownTimer.svelte';

	dayjs.extend(utc);
	dayjs.extend(tz);

	const whyFreedive = '/banner.webp';

	// const deadline = dayjs('2023-11-12T23:59:59', 'Asia/Manila');
	const deadline = dayjs(new Date('11-12-2023'), 'Asia/Manila');
	const startDate = dayjs('2023-11-12T23:59:59', 'Asia/Manila');

	const onClickSubmit = () => {
		const enableSubmit = dayjs().isAfter(startDate);
		if (enableSubmit) {
			goto(true ? '/vote' : '/login');
		} else {
			alert('You can submit starting August 11, 2023 UTC+8');
		}
	};
</script>

<div
	class="md:h-[600px] bg-none md:bg-banner bg-no-repeat bg-cover object-right md:flex md:items-center"
>
	<div class="w-full md:w-[970px] text-white relative space-y-4 px-5 sm:px-[10%] mt-20">
		<img
			src={whyFreedive}
			alt="submit-video"
			class="w-full aspect-16/9 md:hidden object-cover rounded-lg"
		/>
		<h1 class="text-xl md:text-5xl lg:text-6xl font-bold">Hackathon Season 1</h1>
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
					<CountdownTimer deadline={new Date('11-12-2023 22:00')} />
				</b>
				<br />
				voting is until November 13, 2023 11:59PM Asia/Manila
			</p>
		</div>
		<div class="flex gap-2 flex-col md:flex-row">
			<button
				title="August 1 is the official start of the competition."
				on:click={onClickSubmit}
				disabled={dayjs().isAfter(deadline)}
				class="btn variant-filled-primary"
			>
				Submit Vote
			</button>
			<button on:click={() => goto('/guidelines')} class="btn variant-ghost-secondary">
				Guidelines
			</button>
		</div>
	</div>
</div>
