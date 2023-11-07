<script lang="ts">
	import { createUser } from '$lib/users.js';

	export let data;
	console.log(data.users);
	console.log(data.teamScores);

	// guide on how to use functions from other files
	const handleSubmit = async () => {
		await createUser({
			name: 'John Doe',
			username: 'haha',
			avatar: 'https://i.pravatar.cc/300'
		});
	};
</script>

<h1>
	<!-- {JSON.stringify(data.users, null, 2)} -->

	{JSON.stringify(data.teamScores, null, 2)}
</h1>
