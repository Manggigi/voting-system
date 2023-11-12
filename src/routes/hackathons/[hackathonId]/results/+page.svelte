<script lang="ts">
	import CountdownTimer from '@components/CountdownTimer.svelte';

	export let data;

	let currentTimeStamp = new Date(); // Uncomment to set date to today.
	let nextMonthTimeStamp = new Date();
	nextMonthTimeStamp.setMonth(currentTimeStamp.getMonth() + 1);

	let showOnClient = true;
</script>

{#if showOnClient}
	{#if currentTimeStamp < (data.hackathon?.start_date ?? nextMonthTimeStamp) || data.hackathon?.start_date == undefined}
		<div class="card mt-12 p-4 text-center text-white">
			<header class="card-header h2">Hold your horses!</header>
			<section class="p-4">
				<h6 class="h6">{data.hackathon?.name || "Something's wrong with this page..."}</h6>
				<p class="mt-4"></p>
				Voting hasn't even started yet. Check back on<b>
					{' ' + data.hackathon?.start_date.toDateString() ||
						"another time as we fix what's wrong with this thing"}</b
				> to start voting!
			</section>
		</div>
	{:else if currentTimeStamp >= data.hackathon?.start_date && currentTimeStamp < data.hackathon?.end_date}
		<div class="card mt-12 p-4 text-center text-white">
			<header class="card-header h2">It's Voting Time!</header>
			<section class="p-4">
				<h6 class="h6">{data.hackathon?.name}</h6>
				<p class="mt-4"></p>
				<p>Check back after the countdown timer's gone to zero!</p>
				<p>Time before voting season ends: <CountdownTimer deadline={data.hackathon.end_date} /></p>
			</section>
		</div>
	{:else if currentTimeStamp > data.hackathon?.end_date}
		<h2 class="h2 mb-4">{data.hackathon?.name} is now over!</h2>
		<div class="table-container text-white">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Team Name</th>
						<th>Community Votes</th>
						<th>Judge Votes</th>
						<th>Final Score</th>
					</tr>
				</thead>
				<tbody>
					{#await data.streamed?.finalScores}
						{#each Array(5) as i}
							<tr>
								<td> <div class="placeholder-circle w-5 animate-pulse"></div></td>
								<td> <div class="placeholder-circle w-5 animate-pulse"></div></td>
								<td> <div class="placeholder-circle w-5 animate-pulse"></div></td>
								<td> <div class="placeholder-circle w-5 animate-pulse"></div></td>
							</tr>
						{/each}
					{:then finalScores}
						{#if finalScores?.['scoreData'].length === 0}
							<tr>
								<td colspan="4">No results yet</td>
							</tr>
						{:else}
							{#each finalScores?.['scoreData'] as team, i}
								<tr>
									<td>{team.teamName}</td>
									<td>{team.communityVotes}</td>
									<td>{team.judgeVotes}</td>
									<td>{team.finalScore.toFixed(2)}</td>
								</tr>
							{/each}
						{/if}
					{/await}
					<!-- {#each sortedData || [] as team, i}
						<tr>
							<td>{team.teamName}</td>
							<td>{team.communityVotes}</td>
							<td>{team.judgeVotes}</td>
							<td>{team.finalScore.toFixed(2)}</td>
						</tr>
					{/each} -->
				</tbody>
			</table>
		</div>
	{/if}
{:else}
	...loading
{/if}
