<script lang="ts">
	export let data;

	// let currentTimeStamp = new Date(); // Uncomment to set date to today.
	let currentTimeStamp = data.hackathon?.start_date!; // Uncomment to set date to hackathon day.
	let nextMonthTimeStamp = new Date();
	nextMonthTimeStamp.setMonth(currentTimeStamp.getMonth() + 1);
	// currentTimeStamp = nextMonthTimeStamp; // Uncomment to set date to 1 month after now (basically the day after hackathon voting day). Must have a declaration uncommented.
	
	let timeDifferenceInMilliseconds = data.hackathon?.end_date.getTime()! - currentTimeStamp.getTime();
	let countdownValue = timeDifferenceInMilliseconds
</script>

{#if currentTimeStamp < (data.hackathon?.start_date ?? nextMonthTimeStamp) || data.hackathon?.start_date == undefined}
	<h1>{data.hackathon?.name || "Something's wrong with this page..."}</h1>
	<h2>Hold your horses!</h2>
	<p>Voting hasn't even started yet. Check back on <b>{data.hackathon?.start_date.toDateString() || "another time as we fix what's wrong with this thing"}</b> to start voting!</p>
{:else if currentTimeStamp >= data.hackathon?.start_date && currentTimeStamp < data.hackathon?.end_date}
	<h1>{data.hackathon?.name}</h1>
	<h2>It's Voting Time!</h2>
	<p>Check back after the countdown timer's gone to zero!</p>
	<p>Time before voting season ends: {countdownValue}</p>
{:else if currentTimeStamp > data.hackathon?.end_date}
	<h1>{data.hackathon?.name} is now over!</h1>
	<table class="table-comfortable">
		<tr>
			<th>Team Name</th>
			<th>Community Votes</th>
			<th>Judge Votes</th>
			<th>Final Score</th>
		</tr>
		{#each data.finalScores?.scoreData || [] as team, i}
			<tr>
				<td>{team.teamName}</td>
				<td>{team.communityVotes}</td>
				<td>{team.judgeVotes}</td>
				<td>{team.finalScore.toFixed(2)}</td>
			</tr>
		{/each}
	</table>
{/if}