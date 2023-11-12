<script lang="ts">
	export let finalScores;
	let sortedData = finalScores?.scoreData?.sort((a, b) => b.finalScore - a.finalScore) || [];
	let winnerTeam = sortedData ? sortedData[0] : null;
</script>

{#if winnerTeam === null}
	<div>
		<h3 class="h3 mb-2">Previous Hackathons Winner</h3>
		<p>No previous hackathon winner</p>
	</div>
{:else}
	<div>
		<h3 class="h3 mb-2">Previous Hackathons Winner</h3>
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
					<tr>
						<td>{winnerTeam.teamName}</td>
						<td>{winnerTeam.communityVotes}</td>
						<td>{winnerTeam.judgeVotes}</td>
						<td>{winnerTeam.finalScore.toFixed(2)}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
{/if}
