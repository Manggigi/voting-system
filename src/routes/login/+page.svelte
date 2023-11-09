<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
</script>

<div class="">Login</div>

<form method="post" use:enhance>
	<input type="text" name="username" />
	<input type="password" name="password" />
	<input type="submit" value="Submit" />
</form>
