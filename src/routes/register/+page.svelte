<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;

	const handleRegister = () => {};
</script>

<div class="">Register</div>

<form method="post" use:enhance>
	<!-- username, password and confirmPassword -->
	<input type="text" name="username" placeholder="username" />
	<input type="text" name="name" placeholder="name" />
	<input type="text" hidden value="" name="avatar" />
	<input type="password" name="password" placeholder="pass" />
	<input type="password" name="confirmPassword" placeholder="confirmPass" />
	<input type="submit" value="register" />
</form>
