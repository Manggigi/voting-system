<script lang="ts">
	export let data;
</script>

<h1>results will be posted in {data.hackathon.end_date.toDateString()}</h1>
<pre>{JSON.stringify(data, null, 2)}</pre>
