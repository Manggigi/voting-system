<script>
	export let data;
	console.log(data.users);
</script>

<h1>
	{JSON.stringify(data.users, null, 2)}
</h1>
