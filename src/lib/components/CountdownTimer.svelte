<script lang="ts">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import tz from 'dayjs/plugin/timezone';
	import { onMount } from 'svelte';

	dayjs.extend(utc);
	dayjs.extend(tz);

	export let deadline: Date;

	let countdown = '000';

	const getDeadlineString = (currentDate: any) => {
		const deadlineTime = dayjs(deadline).tz('Asia/Manila');

		// If currentDate is after deadline, return '000'
		if (currentDate.isAfter(deadlineTime)) {
			return '000';
		}

		const secondsToGo = deadlineTime.diff(currentDate, 'seconds');
		const daysToGo = Math.floor(secondsToGo / (3600 * 24));
		const hours = Math.floor((secondsToGo - daysToGo * 3600 * 24) / 3600);
		const minutes = Math.floor((secondsToGo - daysToGo * 3600 * 24 - hours * 3600) / 60);
		const seconds = secondsToGo - daysToGo * 3600 * 24 - hours * 3600 - minutes * 60;

		if (daysToGo === 0) {
			return `${hours}:${minutes}:${seconds}`;
		} else {
			return `${daysToGo}D ${hours}H ${minutes}m ${seconds}s`;
		}
	};

	onMount(() => {
		return setInterval(() => {
			countdown = getDeadlineString(dayjs());
		}, 1000);
	});
</script>

{countdown}
